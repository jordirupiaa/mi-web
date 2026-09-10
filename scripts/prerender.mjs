// Prerendering step, run once at the end of `npm run build` (see
// package.json). Produces real, static index.html files for every
// page × language combination — the actual rendered content, with the
// correct <title>/<meta description>/Open Graph/hreflang already baked in
// for that specific page and language — instead of the single generic
// index.html every route shared before. This is what makes the site fully
// readable to crawlers and link-preview bots that don't execute
// JavaScript, and lets each of the 6 languages be indexed at its own URL.
//
// How: `render()` (from src/entry-server.tsx, compiled just before this
// script runs by `vite build --ssr`) renders the real app tree —
// react-i18next resolves the title/description strings, react-router
// resolves the page, images.ts's `import.meta.glob` resolves to the exact
// same hashed asset URLs the client build already produced — all via
// Vite's own SSR build, not a generic TS/JS runner, specifically because a
// generic runner wouldn't understand `import.meta.glob` at all. The result
// is spliced into a copy of the already-built dist/index.html (kept as an
// in-memory template, read once) via a handful of targeted string
// replacements, then written to the path each route/language actually
// serves from (dist/index.html itself for the default homepage, nested
// directories with their own index.html for everything else — matching
// how static hosts resolve a URL to a file).
//
// If anything below throws, the whole `npm run build` fails loudly rather
// than silently shipping a stale or half-written dist/ — see the fallback
// note in public/_redirects and public/robots.txt for what still works even
// if this step is ever skipped entirely.

import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const DIST = join(ROOT, 'dist')
const SITE_URL = 'https://www.hotelcasamas.com'

/** Every prerendered page, and which `seo.*Title`/`seo.*Description` keys describe it. */
const ROUTE_META = [
  { suffix: '', seoKey: 'home', priority: '1.0', changefreq: 'weekly' },
  { suffix: 'habitaciones', seoKey: 'rooms', priority: '0.9', changefreq: 'weekly' },
  { suffix: 'nosotros', seoKey: 'about', priority: '0.6', changefreq: 'monthly' },
  { suffix: 'ubicacion', seoKey: 'location', priority: '0.7', changefreq: 'monthly' },
  { suffix: 'contacto', seoKey: 'contact', priority: '0.6', changefreq: 'monthly' },
  { suffix: 'aviso-legal', seoKey: 'avisoLegal', priority: '0.2', changefreq: 'yearly' },
  { suffix: 'privacidad', seoKey: 'privacidad', priority: '0.2', changefreq: 'yearly' },
  { suffix: 'cookies', seoKey: 'cookies', priority: '0.2', changefreq: 'yearly' },
]

/** Spanish is the default, unprefixed language (existing URLs, unchanged); see src/utils/localizedPath.ts. */
const DEFAULT_LANGUAGE = 'es'
const LANGUAGES = ['es', 'en', 'fr', 'ca', 'de', 'it']
const OG_LOCALE = { es: 'es_ES', en: 'en_GB', fr: 'fr_FR', ca: 'ca_ES', de: 'de_DE', it: 'it_IT' }

/** The URL path for a given route suffix + language — must match src/utils/localizedPath.ts exactly. */
function pathFor(suffix, lang) {
  const bare = suffix ? `/${suffix}` : '/'
  if (lang === DEFAULT_LANGUAGE) return bare
  return bare === '/' ? `/${lang}` : `/${lang}${bare}`
}

function escapeAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function replaceOne(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender: expected tag not found in template (${label})`)
  return html.replace(pattern, replacement)
}

async function main() {
  const template = readFileSync(join(DIST, 'index.html'), 'utf8')
  const { render } = await import(pathToFileURL(join(ROOT, 'dist-ssr', 'entry-server.js')).href)

  const sitemapUrls = []

  for (const { suffix, seoKey, priority, changefreq } of ROUTE_META) {
    for (const lang of LANGUAGES) {
      const urlPath = pathFor(suffix, lang)
      const absoluteUrl = urlPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${urlPath}`

      const { html: appHtml, t } = await render(urlPath, lang)
      const title = t(`seo.${seoKey}Title`)
      const description = t(`seo.${seoKey}Description`)

      let page = template

      page = replaceOne(page, /<html lang="[^"]*">/, `<html lang="${lang}">`, 'html lang')
      page = replaceOne(page, /<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`, 'title')
      page = replaceOne(
        page,
        /<meta name="description" content="[^"]*" \/>/,
        `<meta name="description" content="${escapeAttr(description)}" />`,
        'meta description'
      )
      page = replaceOne(
        page,
        /<link rel="canonical" href="[^"]*" \/>/,
        `<link rel="canonical" href="${absoluteUrl}" />`,
        'canonical'
      )
      page = replaceOne(
        page,
        /<meta property="og:title" content="[^"]*" \/>/,
        `<meta property="og:title" content="${escapeAttr(title)}" />`,
        'og:title'
      )
      page = replaceOne(
        page,
        /<meta property="og:description" content="[^"]*" \/>/,
        `<meta property="og:description" content="${escapeAttr(description)}" />`,
        'og:description'
      )
      page = replaceOne(
        page,
        /<meta property="og:url" content="[^"]*" \/>/,
        `<meta property="og:url" content="${absoluteUrl}" />`,
        'og:url'
      )
      page = replaceOne(
        page,
        /<meta property="og:locale" content="[^"]*" \/>/,
        `<meta property="og:locale" content="${OG_LOCALE[lang]}" />\n` +
          LANGUAGES.filter((l) => l !== lang)
            .map((l) => `    <meta property="og:locale:alternate" content="${OG_LOCALE[l]}" />`)
            .join('\n'),
        'og:locale'
      )
      page = replaceOne(
        page,
        /<meta name="twitter:title" content="[^"]*" \/>/,
        `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
        'twitter:title'
      )
      page = replaceOne(
        page,
        /<meta name="twitter:description" content="[^"]*" \/>/,
        `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
        'twitter:description'
      )

      // hreflang: ties every language version of this same page together,
      // plus x-default pointing at the unprefixed Spanish version — this is
      // what lets Google actually serve the right language's URL in search
      // results instead of only ever indexing one.
      const hreflangLinks = LANGUAGES.map((l) => {
        const href = `${SITE_URL}${pathFor(suffix, l)}`
        return `    <link rel="alternate" hreflang="${l}" href="${href}" />`
      }).join('\n')
      const xDefaultHref = `${SITE_URL}${pathFor(suffix, DEFAULT_LANGUAGE)}`
      page = replaceOne(
        page,
        /<link rel="canonical" href="[^"]*" \/>/,
        (match) => `${match}\n${hreflangLinks}\n    <link rel="alternate" hreflang="x-default" href="${xDefaultHref}" />`,
        'hreflang insertion point'
      )

      page = replaceOne(page, /<div id="root"><\/div>/, `<div id="root">${appHtml}</div>`, 'root div')

      const outDir = urlPath === '/' ? DIST : join(DIST, urlPath.slice(1))
      mkdirSync(outDir, { recursive: true })
      writeFileSync(join(outDir, 'index.html'), page, 'utf8')

      sitemapUrls.push({ loc: absoluteUrl, priority, changefreq, suffix })
    }
  }

  // Sitemap: one <url> per page/language, each carrying its own hreflang
  // alternates (the sitemap-level form Google documents alongside the
  // per-page <link> tags above — belt and suspenders, both point at the
  // same URLs).
  const urlEntries = sitemapUrls
    .map(({ loc, priority, changefreq, suffix }) => {
      const alternates = LANGUAGES.map(
        (l) => `      <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${pathFor(suffix, l)}" />`
      ).join('\n')
      return (
        `  <url>\n` +
        `    <loc>${loc}</loc>\n` +
        `    <changefreq>${changefreq}</changefreq>\n` +
        `    <priority>${priority}</priority>\n` +
        `${alternates}\n` +
        `  </url>`
      )
    })
    .join('\n')

  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    `${urlEntries}\n` +
    `</urlset>\n`
  writeFileSync(join(DIST, 'sitemap.xml'), sitemap, 'utf8')

  rmSync(join(ROOT, 'dist-ssr'), { recursive: true, force: true })

  console.log(`Prerendered ${sitemapUrls.length} page/language combinations (${ROUTE_META.length} pages × ${LANGUAGES.length} languages).`)
}

main().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})

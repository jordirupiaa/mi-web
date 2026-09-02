import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import { AppRoutes } from './AppRoutes'

import es from './i18n/locales/es.json'
import en from './i18n/locales/en.json'
import fr from './i18n/locales/fr.json'
import ca from './i18n/locales/ca.json'
import de from './i18n/locales/de.json'
import it from './i18n/locales/it.json'

const RESOURCES = { es, en, fr, ca, de, it }

/**
 * Compiled by Vite's SSR build (see scripts/prerender.mjs, which runs
 * `vite build --ssr` against this file) into a plain Node module — that's
 * what makes `import.meta.glob` in src/data/images.ts resolve correctly to
 * the exact same hashed asset URLs the real client bundle uses. Running
 * this file through a generic TS runner instead (esbuild/tsx without Vite's
 * involvement) would not understand that Vite-only macro at all.
 *
 * Deliberately does not touch `window`/`document` — this executes in Node,
 * not a browser, and it must not depend on effects (`useEffect` never runs
 * during renderToStaticMarkup) for anything that affects the output; the
 * i18n language is fixed by creating a *fresh* i18next instance per call
 * instead, so every render is fully isolated (no shared mutable state
 * leaking between the dozens of route/language combinations
 * scripts/prerender.mjs renders in one process).
 */
export async function render(url: string, lang: keyof typeof RESOURCES) {
  const i18n = i18next.createInstance()
  await i18n.init({
    resources: { [lang]: { translation: RESOURCES[lang] } },
    lng: lang,
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
  })
  // The fallback language's resources must be loaded too, for any key
  // missing in a given translation file (see the FAQ/roomTranslations
  // "falls back to Spanish" convention used throughout this app).
  if (lang !== 'es') i18n.addResourceBundle('es', 'translation', es)

  const html = renderToStaticMarkup(
    <StaticRouter location={url}>
      <I18nextProvider i18n={i18n}>
        <AppRoutes />
      </I18nextProvider>
    </StaticRouter>
  )

  return { html, t: i18n.getFixedT(lang) }
}

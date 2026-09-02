import type { SupportedLanguageCode } from '../i18n'

/**
 * The default language (Spanish) keeps the existing, unprefixed URLs
 * (/habitaciones, /contacto...) exactly as they were before multi-language
 * routing existed — no existing link, bookmark or indexed search result
 * breaks. Every other supported language gets the same path prefixed with
 * its code (/en/habitaciones, /fr/habitaciones...). See src/AppRoutes.tsx.
 */
export const DEFAULT_LANGUAGE: SupportedLanguageCode = 'es'

const LANG_PREFIX_PATTERN = /^\/(en|fr|ca|de|it)(\/.*)?$/

/** Strips a leading /en, /fr... language prefix off a pathname, if present. Always returns a path starting with "/". */
export function stripLanguagePrefix(pathname: string): string {
  const match = pathname.match(LANG_PREFIX_PATTERN)
  if (!match) return pathname
  return match[2] || '/'
}

/**
 * Builds the equivalent URL for `pathname` (which may or may not already
 * carry a language prefix) in `targetLang` — the function both the
 * LanguageSwitcher and every internal nav link (Navbar, Footer) use so a
 * visitor navigating in, say, English stays on /en/... throughout the site
 * instead of being bounced back to the unprefixed Spanish URLs.
 */
export function localizedPath(pathname: string, targetLang: SupportedLanguageCode): string {
  const bare = stripLanguagePrefix(pathname)
  if (targetLang === DEFAULT_LANGUAGE) return bare
  return bare === '/' ? `/${targetLang}` : `/${targetLang}${bare}`
}

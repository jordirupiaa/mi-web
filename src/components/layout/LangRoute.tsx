import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/**
 * Wraps one language's route subtree (the default, unprefixed Spanish
 * routes get `lang="es"`; each /en, /fr... subtree gets its own code — see
 * AppRoutes.tsx) and forces react-i18next to that language, regardless of
 * what the browser/localStorage would otherwise detect. Critical so a
 * crawler (or anyone) landing directly on /en/habitaciones actually sees
 * the English page, not whatever language got auto-detected — and so
 * picking "Español" in the switcher while on /en/habitaciones resets
 * react-i18next once react-router lands back on the unprefixed route, not
 * just the URL.
 *
 * During prerendering (scripts/prerender.tsx) this effect never runs (SSR
 * doesn't execute effects) — there, the i18n instance is already created
 * with the right language from the start, so the static output is correct
 * without needing this at all. This effect is what keeps *client-side*
 * navigation (e.g. clicking a link without a full page reload) in sync
 * once the app has hydrated.
 */
export function LangRoute({ lang }: { lang: string }) {
  const { i18n } = useTranslation()

  useEffect(() => {
    if (lang !== i18n.resolvedLanguage) {
      void i18n.changeLanguage(lang)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  return <Outlet />
}

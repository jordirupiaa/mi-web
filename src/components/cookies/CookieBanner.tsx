import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useCookieConsent } from '../../context/CookieConsentContext'
import { localizedPath } from '../../utils/localizedPath'

/**
 * Shown once, on first visit (until the visitor picks one of the three
 * options below), and never again after that — see CookieConsentContext
 * for how the choice is remembered. Three equally-prominent first-layer
 * options, as AEPD guidance requires: accepting must not be easier than
 * rejecting, and "reject" must be a real, one-click option here, not
 * buried inside "configure".
 */
export function CookieBanner() {
  const { t, i18n } = useTranslation()
  const { consent, hydrated, acceptAll, rejectAll, openPreferences } = useCookieConsent()
  const lang = (i18n.resolvedLanguage ?? 'es') as Parameters<typeof localizedPath>[1]

  if (!hydrated || consent !== null) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t('cookies.bannerTitle')}
      className="fixed inset-x-0 bottom-0 z-[200] border-t border-sand-200 bg-warmwhite/98 p-5 shadow-lifted backdrop-blur sm:p-6"
    >
      <div className="container-hotel flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="font-display text-lg text-charcoal-800">{t('cookies.bannerTitle')}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-charcoal-600">
            {t('cookies.bannerBody')}{' '}
            <Link to={localizedPath('/cookies', lang)} className="font-medium text-terracotta-700 hover:underline">
              {t('cookies.policyLink')}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={openPreferences}
            className="rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-charcoal-700 transition-colors hover:bg-sand-100"
          >
            {t('cookies.configure')}
          </button>
          <button
            type="button"
            onClick={rejectAll}
            className="rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-charcoal-700 transition-colors hover:bg-sand-100"
          >
            {t('cookies.rejectAll')}
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-full bg-terracotta-600 px-5 py-2.5 text-sm font-semibold text-warmwhite transition-colors hover:bg-terracotta-700"
          >
            {t('cookies.acceptAll')}
          </button>
        </div>
      </div>
    </div>
  )
}

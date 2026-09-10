import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { useCookieConsent } from '../../context/CookieConsentContext'

/**
 * The "Configurar" / reopen-preferences panel: granular per-category
 * toggles. Reachable both from the first-visit banner and, at any later
 * time, from the cookie-settings link in the footer and the button on the
 * Cookie Policy page — same component either way, always pre-filled with
 * whatever was last saved (or off, if nothing was saved yet).
 */
export function CookiePreferencesModal() {
  const { t } = useTranslation()
  const { consent, preferencesOpen, closePreferences, savePreferences, rejectAll, acceptAll } = useCookieConsent()
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    if (preferencesOpen) {
      setAnalytics(consent?.analytics ?? false)
      setMarketing(consent?.marketing ?? false)
    }
  }, [preferencesOpen, consent])

  useEffect(() => {
    if (!preferencesOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePreferences()
    }
    window.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [preferencesOpen, closePreferences])

  if (!preferencesOpen) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('cookies.modalTitle')}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-charcoal-900/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) closePreferences()
      }}
    >
      <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-warmwhite p-6 shadow-lifted sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl text-charcoal-800">{t('cookies.modalTitle')}</h2>
          <button
            type="button"
            onClick={closePreferences}
            aria-label={t('roomGallery.close')}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-charcoal-500 hover:bg-sand-100"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{t('cookies.modalBody')}</p>

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-sand-200 p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold text-charcoal-800">{t('cookies.necessaryLabel')}</p>
              <span className="shrink-0 rounded-full bg-sand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-charcoal-500">
                {t('cookies.alwaysActive')}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-charcoal-600">{t('cookies.necessaryDescription')}</p>
          </div>

          <label className="flex cursor-pointer items-start justify-between gap-4 rounded-2xl border border-sand-200 p-4">
            <div>
              <p className="font-semibold text-charcoal-800">{t('cookies.analyticsLabel')}</p>
              <p className="mt-1.5 text-sm text-charcoal-600">{t('cookies.analyticsDescription')}</p>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 rounded border-sand-300 text-terracotta-600 focus:ring-terracotta-500"
            />
          </label>

          <label className="flex cursor-pointer items-start justify-between gap-4 rounded-2xl border border-sand-200 p-4">
            <div>
              <p className="font-semibold text-charcoal-800">{t('cookies.marketingLabel')}</p>
              <p className="mt-1.5 text-sm text-charcoal-600">{t('cookies.marketingDescription')}</p>
            </div>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 rounded border-sand-300 text-terracotta-600 focus:ring-terracotta-500"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
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
            className="rounded-full border border-sand-300 px-5 py-2.5 text-sm font-semibold text-charcoal-700 transition-colors hover:bg-sand-100"
          >
            {t('cookies.acceptAll')}
          </button>
          <button
            type="button"
            onClick={() => savePreferences({ analytics, marketing })}
            className="rounded-full bg-terracotta-600 px-5 py-2.5 text-sm font-semibold text-warmwhite transition-colors hover:bg-terracotta-700"
          >
            {t('cookies.save')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

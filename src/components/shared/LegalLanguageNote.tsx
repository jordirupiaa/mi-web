import { useTranslation } from 'react-i18next'

/**
 * The legal pages' body text (Aviso Legal, Privacidad, Cookies) is
 * deliberately Spanish-only, in every UI language — it's the legally
 * governing text under Spanish law, and machine/best-effort translation of
 * binding legal wording (GDPR rights, cancellation terms, jurisdiction...)
 * risks introducing a real discrepancy between what a non-Spanish-speaking
 * guest reads and what actually governs. This note (translated, unlike the
 * page body) tells non-Spanish visitors that plainly instead of silently
 * switching languages on them mid-site.
 */
export function LegalLanguageNote() {
  const { t } = useTranslation()
  return (
    <p className="mt-6 rounded-xl bg-sand-100 px-4 py-3 text-sm text-charcoal-600">{t('legal.languageNote')}</p>
  )
}

import { useTranslation } from 'react-i18next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useBusinessHours, useBusinessSettings } from '../hooks/useHotelData'
import { Spinner, ErrorMessage } from '../components/ui/Feedback'
import { BusinessHoursList } from '../components/shared/BusinessHoursList'
import { PoliciesTable } from '../components/shared/PoliciesTable'
import { buildDirectBookUrl } from '../utils/directBook'
import { formatPhoneDisplay } from '../utils/formatPhone'
import { PageSeo } from '../components/shared/PageSeo'

export function Contact() {
  const { t } = useTranslation()
  const { data: settings, loading: loadingSettings, error: errorSettings } = useBusinessSettings()
  const { data: hours, loading: loadingHours, error: errorHours } = useBusinessHours()

  return (
    <div className="pt-20">
      <PageSeo title={t('seo.contactTitle')} description={t('seo.contactDescription')} />
      <section className="container-hotel py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-600">{t('contact.eyebrow')}</p>
          <h1 className="mt-3 text-balance font-display text-4xl text-charcoal-800 md:text-5xl">
            {t('contact.heading')}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-charcoal-600">{t('contact.body')}</p>
        </div>
      </section>

      <section className="container-hotel grid gap-10 pb-16 md:grid-cols-2">
        <div className="rounded-3xl bg-sand-50 p-8">
          <h2 className="font-display text-xl text-charcoal-800">{t('contact.detailsTitle')}</h2>
          {loadingSettings && <Spinner label={t('contact.loadingContact')} />}
          {errorSettings && <ErrorMessage message={errorSettings} />}
          {!loadingSettings && !errorSettings && (
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-600" aria-hidden="true" />
                <span className="text-charcoal-700">{settings?.business_address ?? 'Lloret de Mar, Girona, España'}</span>
              </li>
              {settings?.business_phone && (
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-terracotta-600" aria-hidden="true" />
                  <a href={`tel:${settings.business_phone}`} className="text-charcoal-700 hover:text-terracotta-700">
                    {formatPhoneDisplay(settings.business_phone)}
                  </a>
                </li>
              )}
              {settings?.business_email && (
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-terracotta-600" aria-hidden="true" />
                  <a href={`mailto:${settings.business_email}`} className="text-charcoal-700 hover:text-terracotta-700">
                    {settings.business_email}
                  </a>
                </li>
              )}
            </ul>
          )}

          <a
            href={buildDirectBookUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-terracotta-600 px-6 py-3 text-sm font-semibold text-warmwhite transition-colors hover:bg-terracotta-700"
          >
            {t('contact.goToBooking')}
          </a>
        </div>

        <div>
          <h2 className="font-display text-xl text-charcoal-800">{t('contact.policiesTitle')}</h2>
          <div className="mt-6">
            <PoliciesTable />
          </div>
        </div>
      </section>

      <section className="container-hotel pb-24">
        <div className="rounded-3xl bg-warmwhite p-8 ring-1 ring-sand-200">
          <h2 className="font-display text-xl text-charcoal-800">{t('contact.hoursTitle')}</h2>
          <div className="mt-6">
            {loadingHours && <Spinner label={t('contact.loadingHours')} />}
            {errorHours && <ErrorMessage message={errorHours} />}
            {!loadingHours && !errorHours && hours && hours.length > 0 && <BusinessHoursList hours={hours} />}
            {!loadingHours && !errorHours && hours && hours.length === 0 && (
              <p className="text-sm text-charcoal-400">{t('contact.hoursEmpty')}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

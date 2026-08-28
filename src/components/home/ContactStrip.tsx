import { useTranslation } from 'react-i18next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useBusinessSettings } from '../../hooks/useHotelData'
import { Spinner } from '../ui/Feedback'
import { formatPhoneDisplay } from '../../utils/formatPhone'

export function ContactStrip() {
  const { t } = useTranslation()
  const { data: settings, loading } = useBusinessSettings()

  return (
    <section className="container-hotel py-20">
      <div className="rounded-3xl bg-sand-100 px-6 py-12 md:px-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-600">{t('contactStrip.eyebrow')}</p>
            <h2 className="mt-3 font-display text-2xl text-charcoal-800">{t('contactStrip.heading')}</h2>
          </div>

          {loading ? (
            <div className="md:col-span-2">
              <Spinner label={t('contactStrip.loading')} />
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-3 md:col-span-2">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-600" aria-hidden="true" />
                <span className="text-sm text-charcoal-700">
                  {settings?.business_address ?? 'Lloret de Mar, Girona, España'}
                </span>
              </div>
              {settings?.business_phone && (
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-600" aria-hidden="true" />
                  <a href={`tel:${settings.business_phone}`} className="text-sm text-charcoal-700 hover:text-terracotta-700">
                    {formatPhoneDisplay(settings.business_phone)}
                  </a>
                </div>
              )}
              {settings?.business_email && (
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-600" aria-hidden="true" />
                  <a href={`mailto:${settings.business_email}`} className="text-sm text-charcoal-700 hover:text-terracotta-700">
                    {settings.business_email}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

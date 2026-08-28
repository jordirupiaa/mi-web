import { useTranslation } from 'react-i18next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { BUSINESS_INFO } from '../../data/businessInfo'
import { formatPhoneDisplay } from '../../utils/formatPhone'

export function ContactStrip() {
  const { t } = useTranslation()

  return (
    <section className="container-hotel py-20">
      <div className="rounded-3xl bg-sand-100 px-6 py-12 md:px-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-600">{t('contactStrip.eyebrow')}</p>
            <h2 className="mt-3 font-display text-2xl text-charcoal-800">{t('contactStrip.heading')}</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 md:col-span-2">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-600" aria-hidden="true" />
              <span className="text-sm text-charcoal-700">{BUSINESS_INFO.address}</span>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-600" aria-hidden="true" />
              <a href={`tel:${BUSINESS_INFO.phone}`} className="text-sm text-charcoal-700 hover:text-terracotta-700">
                {formatPhoneDisplay(BUSINESS_INFO.phone)}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-600" aria-hidden="true" />
              <a href={`mailto:${BUSINESS_INFO.email}`} className="text-sm text-charcoal-700 hover:text-terracotta-700">
                {BUSINESS_INFO.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useTranslation } from 'react-i18next'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { BUSINESS_INFO } from '../data/businessInfo'
import { PoliciesTable } from '../components/shared/PoliciesTable'
import { buildDirectBookUrl } from '../utils/directBook'
import { formatPhoneDisplay } from '../utils/formatPhone'
import { PageSeo } from '../components/shared/PageSeo'

export function Contact() {
  const { t } = useTranslation()

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
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-600" aria-hidden="true" />
              <span className="text-charcoal-700">{BUSINESS_INFO.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-terracotta-600" aria-hidden="true" />
              <a href={`tel:${BUSINESS_INFO.phone}`} className="text-charcoal-700 hover:text-terracotta-700">
                {formatPhoneDisplay(BUSINESS_INFO.phone)}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-terracotta-600" aria-hidden="true" />
              <a href={`mailto:${BUSINESS_INFO.email}`} className="text-charcoal-700 hover:text-terracotta-700">
                {BUSINESS_INFO.email}
              </a>
            </li>
          </ul>

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
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-terracotta-600" aria-hidden="true" />
            <h2 className="font-display text-xl text-charcoal-800">{t('contact.hoursTitle')}</h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-charcoal-600">{t('contact.hoursBody')}</p>
        </div>
      </section>
    </div>
  )
}

import { useTranslation } from 'react-i18next'
import { MapPin, Waves, MapPinned, Music } from 'lucide-react'
import { BUSINESS_INFO } from '../data/businessInfo'
import { BEACH_IMAGES, NIGHTLIFE_IMAGE } from '../data/images'
import { PageSeo } from '../components/shared/PageSeo'

const NEARBY_PLACE_KEYS = ['beach', 'church', 'casino', 'busStation', 'museum'] as const

export function Location() {
  const { t } = useTranslation()
  const address = BUSINESS_INFO.address
  const mapQuery = encodeURIComponent(address)

  return (
    <div className="pt-20">
      <PageSeo title={t('seo.locationTitle')} description={t('seo.locationDescription')} />
      <section className="container-hotel py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-600">{t('location.eyebrow')}</p>
          <h1 className="mt-3 text-balance font-display text-4xl text-charcoal-800 md:text-5xl">
            {t('location.heading')}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-charcoal-600">{t('location.body')}</p>
        </div>
      </section>

      <section className="container-hotel grid gap-8 pb-16 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-sand-200">
          <iframe
            title={t('location.mapTitle')}
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-96 w-full md:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="flex flex-col justify-center gap-6">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-600" aria-hidden="true" />
            <p className="text-base text-charcoal-700">{address}</p>
          </div>
          <div className="flex items-start gap-3">
            <Waves className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-600" aria-hidden="true" />
            <p className="text-base text-charcoal-700">{t('hotelFacts.beachDistance')}</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <img src={BEACH_IMAGES.church} alt={t('location.streetAlt')} className="h-40 w-full rounded-2xl object-cover shadow-soft" loading="lazy" />
            <img src={BEACH_IMAGES.castle} alt={t('location.promenadeAlt')} className="h-40 w-full rounded-2xl object-cover object-top shadow-soft" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="container-hotel grid gap-8 pb-24 md:grid-cols-2">
        <div className="rounded-3xl bg-sand-50 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <MapPinned className="h-5 w-5 text-terracotta-600" aria-hidden="true" />
            <h2 className="font-display text-xl text-charcoal-800">{t('location.nearbyTitle')}</h2>
          </div>
          <ul className="mt-6 divide-y divide-sand-200">
            {NEARBY_PLACE_KEYS.map((key) => (
              <li key={key} className="flex items-center justify-between py-3 text-sm">
                <span className="font-medium text-charcoal-700">{t(`nearbyPlaces.${key}`)}</span>
                <span className="text-charcoal-500">{t(`nearbyPlaces.${key}Distance`)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-sand-200">
          <img
            src={NIGHTLIFE_IMAGE}
            alt={t('location.nightlifeAlt')}
            className="h-48 w-full object-cover"
            loading="lazy"
          />
          <div className="flex items-start gap-3 p-6">
            <Music className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-600" aria-hidden="true" />
            <div>
              <p className="font-semibold text-charcoal-800">{t('location.nightlifeTitle')}</p>
              <p className="mt-1 text-sm leading-relaxed text-charcoal-600">
                {t('location.nightlifeBody')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import { useTranslation } from 'react-i18next'
import { CheckCircle2, Music, ShoppingBag, Waves } from 'lucide-react'
import { ROOM_GALLERY_IMAGES } from '../data/images'
import { TOTAL_ROOMS } from '../data/hotelFacts'
import { PageSeo } from '../components/shared/PageSeo'

const QUICK_FACT_ICONS = [Waves, ShoppingBag, Music]
const FACILITY_KEYS = ['garden', 'terrace', 'wifi', 'elevator', 'reception', 'luggage', 'transfer', 'vending'] as const

export function About() {
  const { t } = useTranslation()

  const QUICK_FACTS = [
    { icon: QUICK_FACT_ICONS[0], label: t('about.quickFact1') },
    { icon: QUICK_FACT_ICONS[1], label: t('about.quickFact2') },
    { icon: QUICK_FACT_ICONS[2], label: t('about.quickFact3') },
  ]

  return (
    <div className="pt-20">
      <PageSeo title={t('seo.aboutTitle')} description={t('seo.aboutDescription')} />
      <section className="container-hotel py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-600">{t('about.eyebrow')}</p>
          <h1 className="mt-3 text-balance font-display text-4xl text-charcoal-800 md:text-5xl">
            {t('about.heading')}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-charcoal-600">{t('about.description')}</p>
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl justify-center">
          <div className="rounded-2xl bg-sand-100 px-8 py-4 text-center">
            <span className="font-display text-3xl text-charcoal-800">{TOTAL_ROOMS}</span>
            <span className="ml-2 text-sm text-charcoal-500">{t('about.roomsLabel')}</span>
          </div>
        </div>
      </section>

      <section className="container-hotel grid gap-6 pb-20 sm:grid-cols-3">
        <img src={ROOM_GALLERY_IMAGES[0]} alt={t('about.galleryAlt1')} className="h-72 w-full rounded-3xl object-cover shadow-card" loading="lazy" />
        <img src={ROOM_GALLERY_IMAGES[1]} alt={t('about.galleryAlt2')} className="h-72 w-full rounded-3xl object-cover shadow-card" loading="lazy" />
        <img src={ROOM_GALLERY_IMAGES[2]} alt={t('about.galleryAlt3')} className="h-72 w-full rounded-3xl object-cover shadow-card" loading="lazy" />
      </section>

      <section className="bg-sand-50 py-24">
        <div className="container-hotel grid gap-16 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-charcoal-800 md:text-3xl">{t('about.closeTitle')}</h2>
            <ul className="mt-6 space-y-4">
              {QUICK_FACTS.map((fact) => (
                <li key={fact.label} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-marine-500/10 text-marine-600">
                    <fact.icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <span className="text-base text-charcoal-700">{fact.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-charcoal-400">{t('hotelFacts.noParking')}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-charcoal-800 md:text-3xl">{t('about.facilitiesTitle')}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {FACILITY_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-2 text-sm text-charcoal-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-marine-600" aria-hidden="true" />
                  {t(`hotelFacilities.${key}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

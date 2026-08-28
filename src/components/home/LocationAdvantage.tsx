import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Footprints, Music, Waves } from 'lucide-react'
import { BEACH_IMAGES, HERO_IMAGE } from '../../data/images'

export function LocationAdvantage() {
  const { t } = useTranslation()

  const POINTS = [
    { icon: Waves, title: t('hotelFacts.beachDistance'), description: t('locationAdvantage.point1Description') },
    { icon: Footprints, title: t('locationAdvantage.point2Title'), description: t('locationAdvantage.point2Description') },
    { icon: Music, title: t('locationAdvantage.point3Title'), description: t('locationAdvantage.point3Description') },
  ]

  return (
    <section className="container-hotel grid gap-12 py-24 md:grid-cols-2 md:items-center md:gap-16">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-600">{t('locationAdvantage.eyebrow')}</p>
        <h2 className="mt-3 text-balance font-display text-3xl text-charcoal-800 md:text-4xl">
          {t('locationAdvantage.heading')}
        </h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-charcoal-600">
          {t('locationAdvantage.body')}
        </p>

        <ul className="mt-8 space-y-6">
          {POINTS.map((point) => (
            <li key={point.title} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-marine-500/10 text-marine-600">
                <point.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-charcoal-800">{point.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-charcoal-600">{point.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <Link
          to="/ubicacion"
          className="mt-8 inline-flex text-sm font-semibold text-terracotta-700 underline underline-offset-4 hover:text-terracotta-600"
        >
          {t('locationAdvantage.cta')}
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <img
          src={HERO_IMAGE}
          alt="Vista de la playa y el pueblo de Lloret de Mar"
          className="col-span-2 h-64 w-full rounded-3xl object-cover shadow-card"
          loading="lazy"
        />
        <img
          src={BEACH_IMAGES.mainStreet}
          alt="Carrer de Sant Pere, la calle principal de Lloret de Mar"
          className="h-48 w-full rounded-3xl object-cover shadow-card"
          loading="lazy"
        />
        <img
          src={BEACH_IMAGES.homeNightlife}
          alt="Ambiente nocturno en el centro de Lloret de Mar"
          className="h-48 w-full rounded-3xl object-cover shadow-card"
          loading="lazy"
        />
      </div>
    </section>
  )
}

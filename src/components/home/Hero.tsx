import { useTranslation } from 'react-i18next'
import { HERO_IMAGE } from '../../data/images'
import { BookingWidget } from './BookingWidget'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative flex min-h-[92vh] w-full items-end overflow-hidden">
      <img
        src={HERO_IMAGE}
        alt="Atardecer sobre la playa y bahía de Lloret de Mar"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/85 via-charcoal-900/35 to-charcoal-900/20" />

      <div className="container-hotel relative z-10 flex w-full flex-col gap-10 pb-16 pt-40 md:pb-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-terracotta-300">
            {t('hero.eyebrow')}
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl leading-[1.1] text-warmwhite sm:text-5xl md:text-6xl">
            Hotel Casa Mas
          </h1>
          <p className="mt-5 max-w-xl text-balance text-base leading-relaxed text-sand-100/90 md:text-lg">
            {t('hero.tagline')}
          </p>
        </div>

        <BookingWidget />
      </div>
    </section>
  )
}

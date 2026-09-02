import { useTranslation } from 'react-i18next'
import { ROOM_BALCONY_IMAGE } from '../../data/images'

export function Intro() {
  const { t } = useTranslation()

  return (
    <section className="container-hotel grid gap-12 py-24 md:grid-cols-2 md:items-center md:gap-16">
      <div className="overflow-hidden rounded-3xl shadow-card">
        <img
          src={ROOM_BALCONY_IMAGE}
          alt="Habitación Doble con balcón de Hotel Casa Mas"
          className="h-[420px] w-full object-cover md:h-[520px]"
          loading="lazy"
        />
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-600">{t('intro.eyebrow')}</p>
        <h2 className="mt-3 text-balance font-display text-3xl text-charcoal-800 md:text-4xl">
          {t('intro.heading')}
        </h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-charcoal-600">{t('intro.body')}</p>
      </div>
    </section>
  )
}

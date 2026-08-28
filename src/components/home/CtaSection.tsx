import { useTranslation } from 'react-i18next'
import { ROOM_BALCONY_IMAGE } from '../../data/images'
import { buildDirectBookUrl } from '../../utils/directBook'

export function CtaSection() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden py-28">
      <img
        src={ROOM_BALCONY_IMAGE}
        alt="Habitación con balcón de Hotel Casa Mas"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-charcoal-900/70" />
      <div className="container-hotel relative z-10 flex flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-300">{t('cta.eyebrow')}</p>
        <h2 className="mt-3 max-w-xl text-balance font-display text-3xl text-warmwhite md:text-4xl">
          {t('cta.heading')}
        </h2>
        <a
          href={buildDirectBookUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-terracotta-600 px-8 py-4 text-sm font-semibold tracking-wide text-warmwhite transition-colors hover:bg-terracotta-500"
        >
          {t('cta.button')}
        </a>
      </div>
    </section>
  )
}

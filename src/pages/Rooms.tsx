import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import { ROOMS } from '../data/rooms'
import { RoomCard } from '../components/rooms/RoomCard'
import { ROOM_WIDE_IMAGE } from '../data/images'
import { PageSeo } from '../components/shared/PageSeo'

const ROOM_AMENITY_KEYS = ['bathroom', 'ac', 'wifi', 'wardrobe', 'toiletries'] as const

export function Rooms() {
  const { t } = useTranslation()

  return (
    <div className="pt-20">
      <PageSeo title={t('seo.roomsTitle')} description={t('seo.roomsDescription')} />
      <section className="relative flex h-72 items-center justify-center overflow-hidden md:h-80">
        <img
          src={ROOM_WIDE_IMAGE}
          alt={t('rooms.heroAlt')}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal-900/60" />
        <div className="relative z-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-300">{t('rooms.eyebrow')}</p>
          <h1 className="mt-3 font-display text-4xl text-warmwhite md:text-5xl">{t('rooms.heading')}</h1>
        </div>
      </section>

      <section className="container-hotel py-20">
        <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-charcoal-600">
          {t('rooms.intro')}
        </p>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-sand-50 p-6 sm:p-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-terracotta-600">
            {t('rooms.includedTitle')}
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {ROOM_AMENITY_KEYS.map((key) => (
              <li key={key} className="flex items-start gap-2 text-sm text-charcoal-600">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-marine-600" aria-hidden="true" />
                {t(`roomAmenities.${key}`)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}

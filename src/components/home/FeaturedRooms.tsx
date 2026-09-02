import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROOMS } from '../../data/rooms'
import { RoomCard } from '../rooms/RoomCard'
import { localizedPath } from '../../utils/localizedPath'

export function FeaturedRooms() {
  const { t, i18n } = useTranslation()
  const roomsHref = localizedPath('/habitaciones', (i18n.resolvedLanguage ?? 'es') as Parameters<typeof localizedPath>[1])

  return (
    <section className="bg-sand-50 py-24">
      <div className="container-hotel">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-600">{t('featuredRooms.eyebrow')}</p>
            <h2 className="mt-3 text-balance font-display text-3xl text-charcoal-800 md:text-4xl">
              {t('featuredRooms.heading')}
            </h2>
          </div>
          <Link
            to={roomsHref}
            className="text-sm font-semibold text-terracotta-700 underline underline-offset-4 hover:text-terracotta-600"
          >
            {t('featuredRooms.viewAll')}
          </Link>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.slice(0, 3).map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useActiveServices } from '../../hooks/useHotelData'
import { RoomCard } from '../rooms/RoomCard'
import { Spinner, ErrorMessage, EmptyState } from '../ui/Feedback'

export function FeaturedRooms() {
  const { t } = useTranslation()
  const { data: services, loading, error, reload } = useActiveServices()

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
            to="/habitaciones"
            className="text-sm font-semibold text-terracotta-700 underline underline-offset-4 hover:text-terracotta-600"
          >
            {t('featuredRooms.viewAll')}
          </Link>
        </div>

        <div className="mt-12">
          {loading && <Spinner label={t('featuredRooms.loading')} />}
          {error && <ErrorMessage message={error} onRetry={reload} />}
          {!loading && !error && services && services.length === 0 && (
            <EmptyState
              title={t('featuredRooms.emptyTitle')}
              description={t('featuredRooms.emptyDescription')}
            />
          )}
          {!loading && !error && services && services.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 3).map((service, index) => (
                <RoomCard key={service.id} service={service} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

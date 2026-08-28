import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import type { ServiceRow } from '../../types/database'
import { roomGalleryForService } from '../../data/images'
import { translateRoom } from '../../data/roomTranslations'
import { formatCurrency } from '../../utils/format'
import { buildDirectBookUrl } from '../../utils/directBook'
import { RoomGallery } from './RoomGallery'

export function RoomCard({ service, index }: { service: ServiceRow; index: number }) {
  const { t, i18n } = useTranslation()
  const { name, description } = translateRoom(service, i18n.resolvedLanguage ?? 'es')

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-warmwhite shadow-card ring-1 ring-sand-200/80 transition-transform duration-300 hover:-translate-y-1">
      <RoomGallery images={roomGalleryForService(service.name, index)} alt={t('roomCard.interiorAlt', { name })} />

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl text-charcoal-800">{name}</h3>
        {description && (
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-charcoal-600">
            {description}
          </p>
        )}

        <div className="mt-5 flex items-end justify-between border-t border-sand-200 pt-5">
          <div className="font-display text-2xl text-charcoal-800">
            {service.price === null ? (
              <span className="text-lg text-charcoal-500">{t('roomCard.priceOnRequest')}</span>
            ) : (
              <>
                {formatCurrency(service.price)}
                <span className="ml-1 text-xs text-charcoal-400">{t('roomCard.perNight')}</span>
              </>
            )}
          </div>
          <a
            href={buildDirectBookUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-charcoal-800 px-5 py-2.5 text-sm font-medium text-warmwhite transition-colors hover:bg-terracotta-600"
          >
            {t('roomCard.book')}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  )
}

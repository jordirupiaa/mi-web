import { useTranslation } from 'react-i18next'
import type { BusinessHoursRow } from '../../types/database'
import { formatTime } from '../../utils/format'

const WEEKDAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const

export function BusinessHoursList({ hours }: { hours: BusinessHoursRow[] }) {
  const { t } = useTranslation()
  const sorted = [...hours].sort((a, b) => a.weekday - b.weekday)

  return (
    <ul className="divide-y divide-sand-200">
      {sorted.map((row) => (
        <li key={row.id} className="flex items-center justify-between py-3 text-sm">
          <span className="font-medium text-charcoal-700">
            {WEEKDAY_KEYS[row.weekday] ? t(`businessHours.${WEEKDAY_KEYS[row.weekday]}`) : `Día ${row.weekday}`}
          </span>
          <span className={row.is_open ? 'text-charcoal-600' : 'text-charcoal-400'}>
            {row.is_open ? `${formatTime(row.start_time)} – ${formatTime(row.end_time)}` : t('businessHours.closed')}
          </span>
        </li>
      ))}
    </ul>
  )
}

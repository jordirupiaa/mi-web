import { useTranslation } from 'react-i18next'
import { CreditCard, DoorOpen, DoorClosed, PawPrint, Ban, Car } from 'lucide-react'
import { POLICIES } from '../../data/hotelFacts'

export function PoliciesTable() {
  const { t } = useTranslation()

  const ROWS = [
    { icon: DoorOpen, label: t('policies.checkIn'), value: t('policies.checkInHours') },
    { icon: DoorClosed, label: t('policies.checkOut'), value: t('policies.checkOutHours') },
    { icon: PawPrint, label: t('policies.pets'), value: t('policies.petsValue') },
    { icon: Ban, label: t('policies.smoking'), value: t('policies.smokingValue') },
    { icon: CreditCard, label: t('policies.cards'), value: POLICIES.cards.join(', ') },
    { icon: Car, label: t('policies.parking'), value: t('hotelFacts.noParking') },
  ]

  return (
    <dl className="divide-y divide-sand-200 rounded-2xl border border-sand-200 bg-warmwhite">
      {ROWS.map((row) => (
        <div key={row.label} className="flex items-center gap-4 px-5 py-4">
          <row.icon className="h-5 w-5 shrink-0 text-terracotta-600" aria-hidden="true" />
          <dt className="w-40 shrink-0 text-sm font-medium text-charcoal-700">{row.label}</dt>
          <dd className="text-sm text-charcoal-600">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

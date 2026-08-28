import { useTranslation } from 'react-i18next'
import { ArrowUpDown, Info, Luggage, Sprout, Sun, Car, Wifi, Coffee } from 'lucide-react'

// One icon per facility, matched by position to the hotelFacilities.* translation keys.
const FACILITY_KEYS = ['garden', 'terrace', 'wifi', 'elevator', 'reception', 'luggage', 'transfer', 'vending'] as const
const FACILITY_ICONS: (typeof Sun)[] = [Sprout, Sun, Wifi, ArrowUpDown, Info, Luggage, Car, Coffee]

export function Amenities() {
  const { t } = useTranslation()

  return (
    <section className="bg-marine-700 py-24 text-sand-100">
      <div className="container-hotel">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-300">{t('amenities.eyebrow')}</p>
          <h2 className="mt-3 text-balance font-display text-3xl text-warmwhite md:text-4xl">
            {t('amenities.heading')}
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITY_KEYS.map((key, index) => {
            const Icon = FACILITY_ICONS[index % FACILITY_ICONS.length]
            const label = t(`hotelFacilities.${key}`)
            return (
              <div key={key} className="flex items-center gap-4 rounded-2xl border border-warmwhite/15 bg-warmwhite/5 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-warmwhite/10 text-terracotta-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="text-sm font-medium text-warmwhite">{label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

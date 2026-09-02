import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { CalendarDays, Search, Users } from 'lucide-react'
import { addDaysISO, isBeforeISO, todayISO } from '../../utils/date'
import { buildDirectBookUrl } from '../../utils/directBook'

export function BookingWidget({ variant = 'floating' }: { variant?: 'floating' | 'inline' }) {
  const { t } = useTranslation()
  const today = todayISO()
  const [checkIn, setCheckIn] = useState(today)
  const [checkOut, setCheckOut] = useState(addDaysISO(today, 2))
  const [guests, setGuests] = useState(2)
  const [error, setError] = useState<string | null>(null)

  const handleCheckIn = (value: string) => {
    setCheckIn(value)
    if (!isBeforeISO(value, checkOut)) {
      setCheckOut(addDaysISO(value, 1))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!checkIn || !checkOut) {
      setError(t('bookingWidget.errorDates'))
      return
    }
    if (!isBeforeISO(checkIn, checkOut)) {
      setError(t('bookingWidget.errorOrder'))
      return
    }
    setError(null)
    const url = buildDirectBookUrl({ checkIn, checkOut, adults: guests })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const wrapperClasses =
    variant === 'floating'
      ? 'rounded-3xl bg-warmwhite/95 p-5 shadow-lifted backdrop-blur md:p-7'
      : 'rounded-3xl bg-sand-50 p-5 md:p-7 ring-1 ring-sand-200'

  return (
    <form onSubmit={handleSubmit} className={wrapperClasses} aria-label={t('bookingWidget.checkIn')}>
      <div className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal-400">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> {t('bookingWidget.checkIn')}
          </span>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => handleCheckIn(e.target.value)}
            required
            className="w-full rounded-xl border border-sand-300 bg-warmwhite px-3.5 py-3 text-base text-charcoal-800 outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal-400">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> {t('bookingWidget.checkOut')}
          </span>
          <input
            type="date"
            value={checkOut}
            min={addDaysISO(checkIn, 1)}
            onChange={(e) => setCheckOut(e.target.value)}
            required
            className="w-full rounded-xl border border-sand-300 bg-warmwhite px-3.5 py-3 text-base text-charcoal-800 outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal-400">
            <Users className="h-3.5 w-3.5" aria-hidden="true" /> {t('bookingWidget.guests')}
          </span>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full rounded-xl border border-sand-300 bg-warmwhite px-3.5 py-3 text-base text-charcoal-800 outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? t('bookingWidget.guestSingular') : t('bookingWidget.guestPlural')}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-terracotta-600 px-6 py-3.5 text-sm font-semibold tracking-wide text-warmwhite transition-colors hover:bg-terracotta-700"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          {t('bookingWidget.submit')}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-terracotta-700">
          {error}
        </p>
      )}
    </form>
  )
}

/** Date helpers used across the booking flow. All dates are plain YYYY-MM-DD strings (no timezone math). */

export function toISODate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function fromISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function todayISO(): string {
  return toISODate(new Date())
}

export function addDaysISO(iso: string, days: number): string {
  const date = fromISODate(iso)
  date.setDate(date.getDate() + days)
  return toISODate(date)
}

export function nightsBetween(checkInISO: string, checkOutISO: string): number {
  const oneDay = 24 * 60 * 60 * 1000
  const diff = fromISODate(checkOutISO).getTime() - fromISODate(checkInISO).getTime()
  return Math.max(0, Math.round(diff / oneDay))
}

export function isBeforeISO(a: string, b: string): boolean {
  return a < b
}

const LONG_DATE: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
const SHORT_DATE: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }

export function formatDateLong(iso: string, locale = 'es-ES'): string {
  return fromISODate(iso).toLocaleDateString(locale, LONG_DATE)
}

export function formatDateShort(iso: string, locale = 'es-ES'): string {
  return fromISODate(iso).toLocaleDateString(locale, SHORT_DATE)
}

/** Earliest allowed check-in date given the required advance-booking notice. */
export function earliestBookableDateISO(noticeHours: number | null | undefined): string {
  const notice = noticeHours ?? 0
  const cutoff = new Date()
  cutoff.setHours(cutoff.getHours() + notice)
  return toISODate(cutoff)
}

export function weekdayOf(iso: string): number {
  return fromISODate(iso).getDay()
}

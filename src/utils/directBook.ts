/**
 * Reservations are handled entirely by the hotel's SiteMinder-connected
 * booking engine (direct-book.com) — this app no longer creates bookings
 * itself. Every "Reservar" call to action builds a link into that engine,
 * carrying over whatever dates/guests the visitor already picked.
 */

const DIRECT_BOOK_BASE_URL = 'https://direct-book.com/properties/hotelcasamasdirect'

export interface DirectBookParams {
  checkIn?: string
  checkOut?: string
  adults?: number
  children?: number
}

export function buildDirectBookUrl(params: DirectBookParams = {}): string {
  const url = new URL(DIRECT_BOOK_BASE_URL)
  url.searchParams.set('locale', 'es')
  url.searchParams.set('referrer', 'canvas')
  url.searchParams.set('items[0][adults]', String(params.adults ?? 2))
  url.searchParams.set('items[0][children]', String(params.children ?? 0))
  url.searchParams.set('items[0][infants]', '0')
  url.searchParams.set('currency', 'EUR')
  if (params.checkIn) url.searchParams.set('checkInDate', params.checkIn)
  if (params.checkOut) url.searchParams.set('checkOutDate', params.checkOut)
  url.searchParams.set('trackPage', 'yes')
  return url.toString()
}

/**
 * The hotel's real room types, hard-coded here now that the site no longer
 * reads them from Supabase's `services` table. There are exactly six real
 * room types at Hotel Casa Mas (confirmed by the hotel) — this list is the
 * single source of truth for them, in the order they're presented
 * throughout the site.
 *
 * `slug` ties a room to its photo folder (src/assets/rooms/<slug>/, see
 * src/data/images.ts) and to its per-language name/description
 * (src/data/roomTranslations.ts) — both keyed by the same slug.
 *
 * `price` is intentionally `null` for every room: the direct-book.com
 * booking engine (see src/utils/directBook.ts) is the live, authoritative
 * source for real-time pricing and availability, so the room cards on this
 * site show "Precio a consultar" and send guests there rather than
 * duplicating a price that could drift out of date.
 */

export type RoomSlug = 'individual' | 'twin-ventana' | 'twin-balcon' | 'triple' | 'cuadruple' | 'atico'

export interface Room {
  id: string
  slug: RoomSlug
  price: number | null
}

export const ROOMS: Room[] = [
  { id: 'individual', slug: 'individual', price: null },
  { id: 'twin-ventana', slug: 'twin-ventana', price: null },
  { id: 'twin-balcon', slug: 'twin-balcon', price: null },
  { id: 'triple', slug: 'triple', price: null },
  { id: 'cuadruple', slug: 'cuadruple', price: null },
  { id: 'atico', slug: 'atico', price: null },
]

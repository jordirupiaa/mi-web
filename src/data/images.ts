/**
 * Frontend-only image configuration layer.
 *
 * The `services` table has no image column, so photos can't be loaded from
 * Supabase. Real Hotel Casa Mas room photos live in `src/assets/rooms/<tipo>/`
 * — one subfolder per room type, and EVERY image file dropped into a
 * subfolder is picked up automatically at build time (via Vite's
 * `import.meta.glob`), no code changes needed. Add `02.jpg`, `03.jpg`, a
 * differently-named file, whatever — it just needs to be an image file
 * directly inside the right subfolder. See ROOM_SLUG_MATCHERS below for
 * which subfolder maps to which room.
 *
 * Rooms are matched to their gallery by name (not by list position/index) —
 * this way the right photos always follow the right room even if the admin
 * reorders, renames slightly, or changes prices (which changes sort order).
 * Any room name that doesn't match a known folder falls back to another
 * room's real photo (never a stock/external image) so a brand-new room type
 * never shows a broken image.
 *
 * Every image referenced in this file — rooms and location alike — is a
 * real photo supplied by the hotel. There is no stock/internet photography
 * anywhere in this project.
 */

// Eagerly import every image under src/assets/rooms/<slug>/*, whatever its
// name — Vite resolves this at build time. Keys look like
// "/src/assets/rooms/individual/01.jpg".
const roomImageModules = import.meta.glob<string>(
  '/src/assets/rooms/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, import: 'default' }
)

const ROOM_GALLERIES: Record<string, string[]> = {}
for (const path in roomImageModules) {
  const match = path.match(/\/rooms\/([^/]+)\//)
  if (!match) continue
  const slug = match[1]
  ;(ROOM_GALLERIES[slug] ??= []).push(roomImageModules[path])
}
// Sort each room's photos by filename so 01.jpg, 02.jpg... show in order.
for (const slug in ROOM_GALLERIES) ROOM_GALLERIES[slug].sort()

/**
 * Which folder under src/assets/rooms/ belongs to which room. Each pattern
 * accepts both the original English service name and the Spanish name it
 * may be renamed to in Supabase, so matching survives either.
 */
const ROOM_SLUG_MATCHERS: Array<{ pattern: RegExp; slug: string }> = [
  { pattern: /twin.*window|twin.*ventana/i, slug: 'twin-ventana' },
  { pattern: /twin.*balcony|twin.*balc[oó]n/i, slug: 'twin-balcon' },
  { pattern: /single|individual/i, slug: 'individual' },
  { pattern: /triple/i, slug: 'triple' },
  { pattern: /quadruple|cu[aá]druple/i, slug: 'cuadruple' },
  { pattern: /penthouse|[aá]tico/i, slug: 'atico' },
]

/** Every real room photo, flattened — used only as a last-resort fallback below. */
const ALL_ROOM_IMAGES: string[] = Object.values(ROOM_GALLERIES).flat()

/**
 * All real photos for a room, in order. Always returns at least one image —
 * for a room name that doesn't match a known folder (e.g. a brand-new room
 * type added in Supabase before its own photos are uploaded), it falls back
 * to another room's real photo rather than a stock image.
 */
export function roomGalleryForService(name: string, index: number): string[] {
  const match = ROOM_SLUG_MATCHERS.find((m) => m.pattern.test(name))
  const gallery = match ? ROOM_GALLERIES[match.slug] : undefined
  if (gallery && gallery.length > 0) return gallery
  if (ALL_ROOM_IMAGES.length > 0) return [ALL_ROOM_IMAGES[index % ALL_ROOM_IMAGES.length]]
  return []
}

/**
 * The hotel doesn't have (or like) any exterior/facade/common-area photos, so
 * rather than fabricate what a "lobby" or "patio" photo should look like,
 * these editorial slots reuse real room interior photos. Names describe what
 * the photo actually is (a room), not an invented space — captions in the
 * components that use these should do the same.
 */
export const ROOM_BALCONY_IMAGE = ROOM_GALLERIES['twin-balcon']?.[0] ?? ALL_ROOM_IMAGES[0]
export const ROOM_WIDE_IMAGE = ROOM_GALLERIES['atico']?.[0] ?? ALL_ROOM_IMAGES[0]
/**
 * Used by the About page's 3-photo mosaic. The quadruple room's only two
 * bedroom-angle photos didn't look good enough to feature (the other two
 * files in that folder are bathroom shots), so this mosaic shows the
 * hotel's two real double-room variants instead — balcony and window — plus
 * the triple, rather than force a weak quadruple shot in just to tick a box.
 */
export const ROOM_GALLERY_IMAGES = [
  ROOM_GALLERIES['twin-balcon']?.[0] ?? ALL_ROOM_IMAGES[0],
  ROOM_GALLERIES['triple']?.[0] ?? ALL_ROOM_IMAGES[0],
  ROOM_GALLERIES['twin-ventana']?.[0] ?? ALL_ROOM_IMAGES[0],
]

/**
 * Real Lloret de Mar location photos, supplied directly by the hotel
 * (public/images/location/). This folder holds more real photos than there
 * are slots below — e.g. the Ajuntament, the Dona Marinera statue, the
 * Camí de Ronda coastal path, and several more nightlife shots are
 * currently unused. Feel free to swap any assignment below for one of
 * those if a different shot fits better.
 */
export const HERO_IMAGE = '/images/location/vista_lloret.jpeg'

export const BEACH_IMAGES = {
  /** Home page — the "en la calle principal" bullet; also the hotel's own street. */
  mainStreet: '/images/location/carrer_stpere.jpeg',
  /** Home page — third mosaic photo, the "I ❤ Lloret" nightlife-district mural. */
  homeNightlife: '/images/location/ilovelloret.JPG',
  /** Ubicación page thumbnail — the Sant Romà church. */
  church: '/images/location/esglesia_lloret.jpeg',
  /** Ubicación page thumbnail — the Castell de Lloret. */
  castle: '/images/location/castell_lloret.jpeg',
}

/** The nightlife district — used on the Ubicación page's "ambiente y vida nocturna" card. */
export const NIGHTLIFE_IMAGE = '/images/location/magik_park.JPG'

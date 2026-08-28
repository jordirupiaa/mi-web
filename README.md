# Hotel Casa Mas

Production frontend for Hotel Casa Mas (Lloret de Mar, Girona), built with React, TypeScript, Vite and Tailwind CSS. It is a fully static site — there is no backend, database or admin panel. All content (rooms, contact details, policies, FAQ) is hard-coded in `src/data/`.

## Stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite`, configured in `src/index.css`)
- React Router (client-side routing)
- Lucide React icons

## Getting started

```bash
npm install
npm run dev
```

No environment variables or backend setup are required — the site works fully out of the box.

## Why no backend

Reservations are handled entirely by the hotel's SiteMinder-connected booking engine ([direct-book.com](https://direct-book.com/properties/hotelcasamasdirect)) — every "Reservar" call to action opens that engine directly (see `src/utils/directBook.ts`), carrying over whatever dates/guests the visitor already picked. Live availability and pricing live there, not on this site.

Any other enquiry is answered directly by phone or email (`src/data/businessInfo.ts`), or by the on-site chat widget, which matches common questions against a fixed FAQ (`src/data/faq.ts`) — no server round-trip needed.

Since nothing on the site needs to be read or written from a database, there is no Supabase project, no admin panel, and no environment configuration to manage. Room types, prices-on-request, contact details and hotel policies are plain data files that get edited directly in the codebase and redeployed — see "Updating content" below.

## Project structure

```
src/
  data/
    rooms.ts            # the 6 real room types (id, slug, price)
    roomTranslations.ts  # per-language name/description for each room, keyed by slug
    businessInfo.ts       # phone, email, address
    images.ts             # room photo galleries (from src/assets/rooms/<slug>/)
    faq.ts                 # chat widget FAQ content, per language
    hotelFacts.ts          # small standalone facts (room count, accepted cards)
  utils/directBook.ts    # builds direct-book.com booking-engine URLs
  components/            # ui/, layout/, home/, rooms/, chat/, shared/
  pages/                 # one per route
```

## Updating content

- **Rooms**: edit `src/data/rooms.ts` (add/remove a room) and `src/data/roomTranslations.ts` (its name/description in all 6 languages). Photos are picked up automatically from `src/assets/rooms/<slug>/` — drop any image file in the matching folder, no code change needed.
- **Contact details**: edit `src/data/businessInfo.ts`.
- **FAQ / chat widget answers**: edit `src/data/faq.ts`.
- **Hotel policies (check-in/out hours, pets, smoking, parking)**: these are translated UI copy — edit `src/i18n/locales/*.json` under the `policies` key.

## Images

Real Hotel Casa Mas room photos live in `src/assets/rooms/<slug>/`, one subfolder per room type. Location photos live in `public/images/location/`. There is no stock/internet photography anywhere in this project.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check (`tsc -b`) then production build
- `npm run lint` — oxlint
- `npm run preview` — preview the production build locally

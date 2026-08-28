# Hotel Casa Mas

Production frontend for Hotel Casa Mas (Lloret de Mar, Girona), built with React, TypeScript, Vite, Tailwind CSS and the Supabase JS client. It connects to an **existing** Supabase backend — this project does not create, replace, or migrate any database.

## Stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite`, configured in `src/index.css`)
- React Router (client-side routing)
- `@supabase/supabase-js` (public/anon key only)
- Lucide React icons

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the two values below
npm run dev
```

### Required environment variables

| Variable | Where to find it |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase Dashboard → Project Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API → anon / publishable key |

Never put the `service_role` key in this project — it is a frontend app and the key would be public.

## Existing backend, not a new one

This app reads and writes to six tables that already exist in the Supabase project: `services`, `appointments`, `business_hours`, `blocked_dates`, `business_settings`, `admin_users`. No migrations, new tables, or schema changes are made by this codebase. See `src/types/database.ts` for the exact shape this app expects — it should always mirror the real schema, not the other way around.

- `services` rows are presented as bookable room/accommodation types. `price` is nullable in the real data — the UI shows "Precio a consultar" (price on request) instead of a fake number when it's unset.
- Public users can INSERT into `appointments` (new reservation requests) but cannot SELECT existing rows — enforced by the database's own RLS policies, not by this app. The public booking form deliberately does a plain `.insert()` (never `.insert().select()`), so it never attempts to read back what it just wrote.
- Admin authorization is `admin_users.user_id = auth.uid()`, checked fresh against the database on every session — never by email, never hardcoded, never via `localStorage`.

## Known schema limitation: multi-night stays

`appointments` has a single `appointment_date` (date) plus `start_time`/`end_time` (time-of-day) — the shape of a same-day appointment slot, not a date range. It has no `guests` column and no per-room inventory/rate-plan table.

This app works within that schema rather than inventing new columns:

- `appointment_date` is used as the **check-in date**.
- `start_time` / `end_time` represent the **arrival window on that day** (sourced from `business_hours` for that weekday when available, otherwise a default arrival window) — they are not a checkout timestamp.
- Checkout date, number of nights, and guest counts (adults/children) are written into the existing `notes` text field as a clearly formatted summary, e.g.:
  ```
  Reserva de alojamiento: Twin Room with Balcony
  Fecha de salida: 2026-08-22 (3 noches)
  Huéspedes: 2 adulto(s), 1 niño(s)
  Solicitudes especiales: llegada tardía
  ```
- The booking UI still shows guests a proper check-in/check-out date range and a nights count — that logic lives entirely in the frontend (`src/utils/date.ts`), computed from the two dates the guest picks.

**If true structured multi-night bookings are wanted** (queryable checkout date, guest counts as real columns, per-night rate history), the migration that would be required is additive and non-destructive:

```sql
alter table appointments
  add column check_out_date date,
  add column adults integer,
  add column children integer default 0;
```

This project does **not** run that migration automatically — it's listed here so you can decide if/when to apply it. Nothing in the current app depends on it existing.

## Project structure

```
src/
  lib/
    supabase.ts         # Supabase client (anon key only)
    queries/             # one file per table, all reads/writes go through here
  types/database.ts      # hand-written types mirroring the real schema
  context/AuthContext.tsx# Supabase Auth session + admin_users check
  hooks/                 # data-fetching hooks with loading/error state
  components/            # ui/, layout/, home/, rooms/, booking/, admin/
  pages/                 # one per route, plus pages/admin/* for the dashboard
  data/images.ts          # placeholder image config layer (see below)
```

## Images

`services` has no image column, so `src/data/images.ts` is a small frontend-only mapping from room position to a placeholder photo. Swap the URLs in that one file once real Hotel Casa Mas photography is available — no other file needs to change.

## A note on `src/lib/supabase.ts`

The client is created via `new SupabaseClient(...)` directly (not the `createClient` factory) and **without** the `Database` generic wired through it. The installed `@supabase/supabase-js` version has a generic-inference defect where passing the `Database` type collapses every `insert()`/`update()` payload type to `never`, verified in isolation against this exact version and confirmed to affect the factory function, direct class instantiation, and every combination of explicit type arguments tried. Type safety is preserved at the boundary instead: every function in `src/lib/queries/*.ts` has an explicit, hand-verified parameter and return type built from `src/types/database.ts`. If a future `supabase-js` patch fixes this, reintroducing `createClient<Database>(...)` is a one-line change.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check (`tsc -b`) then production build
- `npm run lint` — oxlint
- `npm run preview` — preview the production build locally

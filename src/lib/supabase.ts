import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured) {
  // Surfaced in the console during development. The UI also shows a friendly
  // banner via <ConfigWarning /> so this is never a silent failure.
  console.error(
    '[Hotel Casa Mas] Missing Supabase environment variables. ' +
      'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in a .env.local file. ' +
      'See .env.example.'
  )
}

// Intentionally created WITHOUT the `Database` generic. The installed
// supabase-js version (2.112.x) has a generic-inference defect where wiring
// the Database type through createClient/SupabaseClient collapses every
// insert()/update() payload type to `never`, even with schema type args
// supplied explicitly (verified in isolation against this exact version).
// Type safety is preserved at the boundary instead: every function in
// src/lib/queries/*.ts declares explicit parameter and return types built
// from src/types/database.ts, which mirrors the real schema exactly. Once a
// supabase-js patch fixes the generic chain, re-adding `createClient<Database>`
// here is a one-line change.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
)

import { supabase } from '../supabase'
import type { ServiceRow } from '../../types/database'

/** Active offerings, presented in the UI as bookable room / accommodation types. */
export async function fetchActiveServices(): Promise<ServiceRow[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('price', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function fetchServiceById(id: string): Promise<ServiceRow | null> {
  const { data, error } = await supabase.from('services').select('*').eq('id', id).maybeSingle()

  if (error) throw error
  return data
}

/** Admin-only: all services regardless of active state. Relies on existing RLS. */
export async function fetchAllServices(): Promise<ServiceRow[]> {
  const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function updateService(id: string, patch: Partial<ServiceRow>) {
  const { error } = await supabase.from('services').update(patch).eq('id', id)
  if (error) throw error
}

export async function createService(input: Omit<ServiceRow, 'id' | 'created_at'>) {
  const { error } = await supabase.from('services').insert(input)
  if (error) throw error
}

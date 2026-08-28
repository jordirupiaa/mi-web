import { supabase } from '../supabase'
import type { BusinessHoursRow } from '../../types/database'

export async function fetchBusinessHours(): Promise<BusinessHoursRow[]> {
  const { data, error } = await supabase.from('business_hours').select('*').order('weekday', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function updateBusinessHours(id: string, patch: Partial<BusinessHoursRow>) {
  const { error } = await supabase.from('business_hours').update(patch).eq('id', id)
  if (error) throw error
}

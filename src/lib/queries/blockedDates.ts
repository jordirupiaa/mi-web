import { supabase } from '../supabase'
import type { BlockedDateRow } from '../../types/database'

export async function fetchBlockedDates(): Promise<BlockedDateRow[]> {
  const { data, error } = await supabase
    .from('blocked_dates')
    .select('*')
    .order('blocked_date', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function createBlockedDate(input: { blocked_date: string; reason: string | null }) {
  const { error } = await supabase.from('blocked_dates').insert(input)
  if (error) throw error
}

export async function deleteBlockedDate(id: string) {
  const { error } = await supabase.from('blocked_dates').delete().eq('id', id)
  if (error) throw error
}

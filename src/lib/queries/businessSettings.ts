import { supabase } from '../supabase'
import type { BusinessSettingsRow } from '../../types/database'

/** There is exactly one settings row in practice; read the first available. */
export async function fetchBusinessSettings(): Promise<BusinessSettingsRow | null> {
  const { data, error } = await supabase
    .from('business_settings')
    .select('*')
    .limit(1)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function updateBusinessSettings(id: string, patch: Partial<BusinessSettingsRow>) {
  const { error } = await supabase.from('business_settings').update(patch).eq('id', id)
  if (error) throw error
}

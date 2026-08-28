import { supabase } from '../supabase'

/** Authorization is based solely on admin_users.user_id = auth.uid(), never on email. */
export async function isUserAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('admin_users')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw error
  return Boolean(data)
}

import { useCallback } from 'react'
import { useAsync } from './useAsync'
import { fetchAllServices } from '../lib/queries/services'

export function useAdminServices() {
  const loader = useCallback(() => fetchAllServices(), [])
  return useAsync(loader)
}

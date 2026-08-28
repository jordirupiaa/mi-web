import { useCallback } from 'react'
import { useAsync } from './useAsync'
import { fetchActiveServices } from '../lib/queries/services'
import { fetchBusinessSettings } from '../lib/queries/businessSettings'
import { fetchBusinessHours } from '../lib/queries/businessHours'
import { fetchBlockedDates } from '../lib/queries/blockedDates'

export function useActiveServices() {
  const loader = useCallback(() => fetchActiveServices(), [])
  return useAsync(loader)
}

export function useBusinessSettings() {
  const loader = useCallback(() => fetchBusinessSettings(), [])
  return useAsync(loader)
}

export function useBusinessHours() {
  const loader = useCallback(() => fetchBusinessHours(), [])
  return useAsync(loader)
}

export function useBlockedDates() {
  const loader = useCallback(() => fetchBlockedDates(), [])
  return useAsync(loader)
}

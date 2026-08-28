import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isSupabaseConfigured } from '../lib/supabase'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

/** Runs a Supabase-backed loader and exposes friendly loading/error state. */
export function useAsync<T>(loader: () => Promise<T>, deps: unknown[] = []) {
  const { t } = useTranslation()
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: true, error: null })
  const [reloadKey, setReloadKey] = useState(0)

  const reload = useCallback(() => setReloadKey((k) => k + 1), [])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setState({ data: null, loading: false, error: t('feedback.configWarning') })
      return
    }

    let active = true
    setState((prev) => ({ ...prev, loading: true, error: null }))

    loader()
      .then((data) => {
        if (active) setState({ data, loading: false, error: null })
      })
      .catch((err) => {
        console.error(err)
        if (active) setState({ data: null, loading: false, error: t('feedback.loadError') })
      })

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadKey, t, ...deps])

  return { ...state, reload }
}

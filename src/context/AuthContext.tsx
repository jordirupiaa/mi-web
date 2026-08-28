import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { isUserAdmin } from '../lib/queries/adminAuth'

type AdminStatus = 'checking' | 'admin' | 'not-admin'

interface AuthContextValue {
  session: Session | null
  user: User | null
  adminStatus: AdminStatus
  /** true once the initial Supabase session restore has completed */
  ready: boolean
  authError: string | null
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [ready, setReady] = useState(false)
  const [adminStatus, setAdminStatus] = useState<AdminStatus>('checking')
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setReady(true)
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setReady(true)
    })

    return () => {
      active = false
      subscription.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    let active = true

    if (!session?.user) {
      setAdminStatus(session === null && ready ? 'not-admin' : 'checking')
      return
    }

    setAdminStatus('checking')
    isUserAdmin(session.user.id)
      .then((isAdmin) => {
        if (!active) return
        setAdminStatus(isAdmin ? 'admin' : 'not-admin')
      })
      .catch(() => {
        if (!active) return
        setAdminStatus('not-admin')
      })

    return () => {
      active = false
    }
  }, [session, ready])

  const signIn = async (email: string, password: string) => {
    setAuthError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      const message = error.message === 'Invalid login credentials'
        ? 'Correo o contraseña incorrectos.'
        : 'No se pudo iniciar sesión. Inténtelo de nuevo.'
      setAuthError(message)
      return { error: message }
    }
    return { error: null }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setAdminStatus('not-admin')
  }

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      adminStatus,
      ready,
      authError,
      signIn,
      signOut,
    }),
    [session, adminStatus, ready, authError]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}

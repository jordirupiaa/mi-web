import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/Button'
import { Spinner } from '../components/ui/Feedback'

export function AdminLogin() {
  const { session, adminStatus, ready, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (ready && session && adminStatus === 'admin') {
    return <Navigate to="/admin" replace />
  }

  if (ready && session && adminStatus === 'not-admin') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-sand-50 px-6 text-center">
        <h1 className="font-display text-2xl text-charcoal-800">Acceso restringido</h1>
        <p className="max-w-sm text-sm text-charcoal-500">
          Esta cuenta no tiene permisos de administrador de Hotel Casa Mas.
        </p>
      </div>
    )
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const { error: signInError } = await signIn(email.trim(), password)
    setSubmitting(false)
    if (signInError) setError(signInError)
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sand-50">
        <Spinner label="Cargando…" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand-50 px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl bg-warmwhite p-8 shadow-card ring-1 ring-sand-200">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-charcoal-800 text-warmwhite">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </span>
          <h1 className="mt-4 font-display text-2xl text-charcoal-800">Acceso administrador</h1>
          <p className="mt-1 text-sm text-charcoal-500">Hotel Casa Mas</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
          <div>
            <label htmlFor="admin-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal-400">
              Correo electrónico
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-sand-300 bg-warmwhite px-4 py-3 text-sm text-charcoal-800 outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal-400">
              Contraseña
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-sand-300 bg-warmwhite px-4 py-3 text-sm text-charcoal-800 outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm font-medium text-terracotta-700">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" loading={submitting}>
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  )
}

import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Spinner } from '../ui/Feedback'
import { Button } from '../ui/Button'

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { ready, session, adminStatus, signOut } = useAuth()

  if (!ready || (session && adminStatus === 'checking')) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sand-50">
        <Spinner label="Comprobando sesión…" />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  if (adminStatus !== 'admin') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-sand-50 px-6 text-center">
        <ShieldAlert className="h-10 w-10 text-terracotta-600" aria-hidden="true" />
        <h1 className="font-display text-2xl text-charcoal-800">Acceso restringido</h1>
        <p className="max-w-sm text-sm text-charcoal-500">
          Su cuenta ha iniciado sesión correctamente, pero no tiene permisos de administrador para acceder a
          este panel.
        </p>
        <Button variant="secondary" onClick={() => signOut()}>
          Cerrar sesión
        </Button>
      </div>
    )
  }

  return <>{children}</>
}

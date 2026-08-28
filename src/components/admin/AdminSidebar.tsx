import { NavLink } from 'react-router-dom'
import { CalendarClock, CalendarX2, LayoutDashboard, LogOut, Settings, BedDouble } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const LINKS = [
  { to: '/admin', label: 'Resumen', icon: LayoutDashboard, end: true },
  { to: '/admin/alojamientos', label: 'Alojamientos', icon: BedDouble, end: false },
  { to: '/admin/horario', label: 'Horario', icon: CalendarClock, end: false },
  { to: '/admin/fechas-bloqueadas', label: 'Fechas bloqueadas', icon: CalendarX2, end: false },
  { to: '/admin/configuracion', label: 'Configuración', icon: Settings, end: false },
]

export function AdminSidebar() {
  const { user, signOut } = useAuth()

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-sand-200 bg-warmwhite">
      <div className="px-6 py-8">
        <span className="font-display text-xl text-charcoal-800">Casa Mas</span>
        <p className="text-xs uppercase tracking-[0.25em] text-terracotta-600">Panel admin</p>
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label="Navegación de administración">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-terracotta-50 text-terracotta-700' : 'text-charcoal-600 hover:bg-sand-100'
              }`
            }
          >
            <link.icon className="h-4.5 w-4.5" aria-hidden="true" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-sand-200 px-6 py-5">
        {user?.email && <p className="truncate text-xs text-charcoal-400">{user.email}</p>}
        <button
          type="button"
          onClick={() => signOut()}
          className="mt-2 flex items-center gap-2 text-sm font-medium text-charcoal-600 hover:text-terracotta-700"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

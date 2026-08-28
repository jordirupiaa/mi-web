import { NavLink, Outlet } from 'react-router-dom'
import { AdminSidebar } from '../../components/admin/AdminSidebar'

const MOBILE_LINKS = [
  { to: '/admin', label: 'Resumen', end: true },
  { to: '/admin/alojamientos', label: 'Alojamientos', end: false },
  { to: '/admin/horario', label: 'Horario', end: false },
  { to: '/admin/fechas-bloqueadas', label: 'Bloqueos', end: false },
  { to: '/admin/configuracion', label: 'Ajustes', end: false },
]

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-sand-50">
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      <div className="min-w-0 flex-1">
        <div className="border-b border-sand-200 bg-warmwhite md:hidden">
          <div className="flex gap-1 overflow-x-auto px-3 py-3">
            {MOBILE_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
                    isActive ? 'bg-terracotta-600 text-warmwhite' : 'bg-sand-100 text-charcoal-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <main className="mx-auto max-w-6xl px-4 py-8 md:px-10 md:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

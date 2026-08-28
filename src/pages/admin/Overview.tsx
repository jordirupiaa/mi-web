import { Link } from 'react-router-dom'
import { BedDouble, CalendarX2, ExternalLink, Settings } from 'lucide-react'
import { useAdminServices } from '../../hooks/useAdminData'
import { useBlockedDates } from '../../hooks/useHotelData'
import { Spinner, ErrorMessage } from '../../components/ui/Feedback'

export function Overview() {
  const { data: services, loading: loadingServices, error: errorServices, reload } = useAdminServices()
  const { data: blockedDates, loading: loadingBlocked } = useBlockedDates()

  const activeServices = services?.filter((s) => s.is_active).length ?? 0
  const totalServices = services?.length ?? 0

  const stats = [
    { label: 'Alojamientos activos', value: loadingServices ? '—' : activeServices, icon: BedDouble },
    { label: 'Alojamientos totales', value: loadingServices ? '—' : totalServices, icon: BedDouble },
    { label: 'Fechas bloqueadas', value: loadingBlocked ? '—' : (blockedDates?.length ?? 0), icon: CalendarX2 },
  ]

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal-800">Resumen</h1>
      <p className="mt-1 text-sm text-charcoal-500">Estado general de Hotel Casa Mas.</p>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-marine-500/20 bg-marine-500/5 p-5">
        <ExternalLink className="mt-0.5 h-5 w-5 shrink-0 text-marine-600" aria-hidden="true" />
        <p className="text-sm text-charcoal-700">
          Las reservas se gestionan directamente en el motor de reservas (SiteMinder / direct-book.com), no en
          este panel. Aquí se administra el contenido publicado en la web: alojamientos, horario, fechas
          bloqueadas y datos de contacto.
        </p>
      </div>

      {errorServices && <div className="mt-6"><ErrorMessage message={errorServices} onRetry={reload} /></div>}

      {loadingServices ? (
        <div className="mt-8"><Spinner label="Cargando resumen…" /></div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-warmwhite p-6 shadow-soft ring-1 ring-sand-200">
              <stat.icon className="h-5 w-5 text-terracotta-600" aria-hidden="true" />
              <p className="mt-4 font-display text-3xl text-charcoal-800">{stat.value}</p>
              <p className="mt-1 text-sm text-charcoal-500">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/admin/alojamientos"
          className="inline-flex items-center gap-2 rounded-full bg-charcoal-800 px-5 py-2.5 text-sm font-medium text-warmwhite hover:bg-terracotta-600"
        >
          <BedDouble className="h-4 w-4" aria-hidden="true" />
          Gestionar alojamientos
        </Link>
        <Link
          to="/admin/configuracion"
          className="inline-flex items-center gap-2 rounded-full border border-sand-300 px-5 py-2.5 text-sm font-medium text-charcoal-700 hover:border-terracotta-500 hover:text-terracotta-600"
        >
          <Settings className="h-4 w-4" aria-hidden="true" />
          Configuración
        </Link>
      </div>
    </div>
  )
}

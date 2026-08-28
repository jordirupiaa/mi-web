import { useState } from 'react'
import { Pencil, Plus } from 'lucide-react'
import { useAdminServices } from '../../hooks/useAdminData'
import { createService, updateService } from '../../lib/queries/services'
import { ServiceForm, type ServiceFormValues } from '../../components/admin/ServiceForm'
import { Spinner, ErrorMessage, EmptyState } from '../../components/ui/Feedback'
import { Button } from '../../components/ui/Button'
import { formatPriceOrEnquire } from '../../utils/format'

export function ServicesTab() {
  const { data: services, loading, error, reload } = useAdminServices()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)

  const handleUpdate = async (id: string, values: ServiceFormValues) => {
    await updateService(id, values)
    setEditingId(null)
    reload()
  }

  const handleCreate = async (values: ServiceFormValues) => {
    await createService(values)
    setCreating(false)
    reload()
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-charcoal-800">Alojamientos</h1>
          <p className="mt-1 text-sm text-charcoal-500">Gestione los tipos de habitación publicados en el sitio.</p>
        </div>
        {!creating && (
          <Button size="sm" onClick={() => setCreating(true)}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Nuevo alojamiento
          </Button>
        )}
      </div>

      {creating && (
        <div className="mt-6">
          <ServiceForm submitLabel="Crear" onSubmit={handleCreate} onCancel={() => setCreating(false)} />
        </div>
      )}

      <div className="mt-6">
        {loading && <Spinner label="Cargando alojamientos…" />}
        {error && <ErrorMessage message={error} onRetry={reload} />}
        {!loading && !error && services && services.length === 0 && (
          <EmptyState title="Sin alojamientos" description="Cree su primer tipo de habitación." />
        )}

        {!loading && !error && services && services.length > 0 && (
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="rounded-2xl bg-warmwhite p-5 shadow-soft ring-1 ring-sand-200">
                {editingId === service.id ? (
                  <ServiceForm
                    initial={service}
                    submitLabel="Guardar cambios"
                    onSubmit={(values) => handleUpdate(service.id, values)}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-display text-lg text-charcoal-800">{service.name}</p>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${
                            service.is_active ? 'bg-marine-500/10 text-marine-700' : 'bg-charcoal-50 text-charcoal-400'
                          }`}
                        >
                          {service.is_active ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                      {service.description && (
                        <p className="mt-1 max-w-lg text-sm text-charcoal-500">{service.description}</p>
                      )}
                      <p className="mt-2 text-sm font-medium text-charcoal-700">
                        {formatPriceOrEnquire(service.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingId(service.id)}
                      className="flex shrink-0 items-center gap-1.5 rounded-full border border-sand-300 px-4 py-2 text-xs font-semibold text-charcoal-700 hover:border-terracotta-500 hover:text-terracotta-600"
                    >
                      <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                      Editar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

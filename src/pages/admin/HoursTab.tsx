import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import { useBusinessHours } from '../../hooks/useHotelData'
import { updateBusinessHours } from '../../lib/queries/businessHours'
import { Spinner, ErrorMessage, EmptyState } from '../../components/ui/Feedback'
import type { BusinessHoursRow } from '../../types/database'

const WEEKDAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export function HoursTab() {
  const { data: hours, loading, error, reload } = useBusinessHours()
  const [draft, setDraft] = useState<BusinessHoursRow[]>([])
  const [savingId, setSavingId] = useState<string | null>(null)
  const [savedId, setSavedId] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  useEffect(() => {
    if (hours) setDraft([...hours].sort((a, b) => a.weekday - b.weekday))
  }, [hours])

  const patchRow = (id: string, patch: Partial<BusinessHoursRow>) => {
    setDraft((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  const handleSave = async (row: BusinessHoursRow) => {
    setSavingId(row.id)
    setActionError(null)
    try {
      await updateBusinessHours(row.id, {
        is_open: row.is_open,
        start_time: row.start_time,
        end_time: row.end_time,
      })
      setSavedId(row.id)
      reload()
      setTimeout(() => setSavedId(null), 2000)
    } catch (err) {
      console.error(err)
      setActionError('No se pudo guardar el horario. Inténtelo de nuevo.')
    } finally {
      setSavingId(null)
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal-800">Horario</h1>
      <p className="mt-1 text-sm text-charcoal-500">Defina el horario de recepción / entrada por día de la semana.</p>

      {actionError && (
        <div className="mt-4">
          <ErrorMessage message={actionError} />
        </div>
      )}

      <div className="mt-6">
        {loading && <Spinner label="Cargando horario…" />}
        {error && <ErrorMessage message={error} onRetry={reload} />}
        {!loading && !error && draft.length === 0 && (
          <EmptyState title="Sin horario configurado" description="No se encontraron filas en business_hours." />
        )}

        {!loading && !error && draft.length > 0 && (
          <div className="space-y-3">
            {draft.map((row) => (
              <div
                key={row.id}
                className="flex flex-col gap-3 rounded-2xl bg-warmwhite p-4 shadow-soft ring-1 ring-sand-200 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3 sm:w-40">
                  <span className="font-medium text-charcoal-800">{WEEKDAY_NAMES[row.weekday] ?? `Día ${row.weekday}`}</span>
                </div>

                <label className="flex items-center gap-2 text-sm text-charcoal-600">
                  <input
                    type="checkbox"
                    checked={row.is_open}
                    onChange={(e) => patchRow(row.id, { is_open: e.target.checked })}
                    className="h-4 w-4 rounded border-sand-300 text-terracotta-600 focus:ring-terracotta-500"
                  />
                  Abierto
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={row.start_time?.slice(0, 5) ?? ''}
                    disabled={!row.is_open}
                    onChange={(e) => patchRow(row.id, { start_time: e.target.value ? `${e.target.value}:00` : null })}
                    className="rounded-lg border border-sand-300 bg-warmwhite px-2.5 py-1.5 text-sm outline-none focus:border-terracotta-500 disabled:opacity-50"
                  />
                  <span className="text-charcoal-400">–</span>
                  <input
                    type="time"
                    value={row.end_time?.slice(0, 5) ?? ''}
                    disabled={!row.is_open}
                    onChange={(e) => patchRow(row.id, { end_time: e.target.value ? `${e.target.value}:00` : null })}
                    className="rounded-lg border border-sand-300 bg-warmwhite px-2.5 py-1.5 text-sm outline-none focus:border-terracotta-500 disabled:opacity-50"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleSave(row)}
                  disabled={savingId === row.id}
                  className="inline-flex items-center gap-1.5 self-start rounded-full bg-charcoal-800 px-4 py-2 text-xs font-semibold text-warmwhite transition-colors hover:bg-terracotta-600 disabled:opacity-60 sm:self-auto"
                >
                  <Save className="h-3.5 w-3.5" aria-hidden="true" />
                  {savedId === row.id ? 'Guardado' : 'Guardar'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

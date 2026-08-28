import { useState, type FormEvent } from 'react'
import { Trash2 } from 'lucide-react'
import { useBlockedDates } from '../../hooks/useHotelData'
import { createBlockedDate, deleteBlockedDate } from '../../lib/queries/blockedDates'
import { Spinner, ErrorMessage, EmptyState } from '../../components/ui/Feedback'
import { Button } from '../../components/ui/Button'
import { formatDateLong, todayISO } from '../../utils/date'

export function BlockedDatesTab() {
  const { data: blockedDates, loading, error, reload } = useBlockedDates()
  const [date, setDate] = useState(todayISO())
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setActionError(null)
    try {
      await createBlockedDate({ blocked_date: date, reason: reason.trim() || null })
      setReason('')
      reload()
    } catch (err) {
      console.error(err)
      setActionError('No se pudo bloquear la fecha. Puede que ya exista.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    setActionError(null)
    try {
      await deleteBlockedDate(id)
      reload()
    } catch (err) {
      console.error(err)
      setActionError('No se pudo eliminar la fecha bloqueada.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal-800">Fechas bloqueadas</h1>
      <p className="mt-1 text-sm text-charcoal-500">Impida nuevas reservas en fechas concretas.</p>

      <form onSubmit={handleAdd} className="mt-6 flex flex-col gap-3 rounded-2xl bg-sand-50 p-5 sm:flex-row sm:items-end">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal-400">Fecha</label>
          <input
            type="date"
            value={date}
            min={todayISO()}
            onChange={(e) => setDate(e.target.value)}
            required
            className="rounded-xl border border-sand-300 bg-warmwhite px-3.5 py-2.5 text-sm outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal-400">Motivo (opcional)</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Ej. mantenimiento, cierre temporal…"
            className="w-full rounded-xl border border-sand-300 bg-warmwhite px-3.5 py-2.5 text-sm outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
          />
        </div>
        <Button type="submit" size="sm" loading={submitting}>
          Bloquear fecha
        </Button>
      </form>

      {actionError && (
        <div className="mt-4">
          <ErrorMessage message={actionError} />
        </div>
      )}

      <div className="mt-6">
        {loading && <Spinner label="Cargando fechas bloqueadas…" />}
        {error && <ErrorMessage message={error} onRetry={reload} />}
        {!loading && !error && blockedDates && blockedDates.length === 0 && (
          <EmptyState title="Sin fechas bloqueadas" description="Todas las fechas están abiertas a reservas." />
        )}
        {!loading && !error && blockedDates && blockedDates.length > 0 && (
          <ul className="divide-y divide-sand-200 rounded-2xl bg-warmwhite shadow-soft ring-1 ring-sand-200">
            {blockedDates.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <div>
                  <p className="text-sm font-medium text-charcoal-800">{formatDateLong(b.blocked_date)}</p>
                  {b.reason && <p className="text-xs text-charcoal-400">{b.reason}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(b.id)}
                  disabled={deletingId === b.id}
                  aria-label={`Eliminar bloqueo del ${b.blocked_date}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal-400 transition-colors hover:bg-terracotta-50 hover:text-terracotta-600 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

import { useState, type FormEvent } from 'react'
import type { ServiceRow } from '../../types/database'
import { Button } from '../ui/Button'

export interface ServiceFormValues {
  name: string
  description: string
  duration_minutes: number
  price: number | null
  is_active: boolean
}

interface Props {
  initial?: ServiceRow
  onSubmit: (values: ServiceFormValues) => Promise<void>
  onCancel: () => void
  submitLabel: string
}

export function ServiceForm({ initial, onSubmit, onCancel, submitLabel }: Props) {
  const [values, setValues] = useState<ServiceFormValues>({
    name: initial?.name ?? '',
    description: initial?.description ?? '',
    duration_minutes: initial?.duration_minutes ?? 1440,
    price: initial?.price ?? null,
    is_active: initial?.is_active ?? true,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!values.name.trim()) {
      setError('El nombre es obligatorio.')
      return
    }
    if (values.price !== null && values.price < 0) {
      setError('El precio no puede ser negativo.')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit(values)
    } catch (err) {
      console.error(err)
      setError('No se pudo guardar el alojamiento. Inténtelo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-sand-50 p-5" noValidate>
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal-400">Nombre</label>
        <input
          type="text"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          className="w-full rounded-xl border border-sand-300 bg-warmwhite px-3.5 py-2.5 text-sm outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal-400">Descripción</label>
        <textarea
          rows={3}
          value={values.description}
          onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
          className="w-full resize-none rounded-xl border border-sand-300 bg-warmwhite px-3.5 py-2.5 text-sm outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal-400">
            Precio (€ / noche)
          </label>
          <input
            type="number"
            min={0}
            step="0.01"
            placeholder="A consultar"
            value={values.price ?? ''}
            onChange={(e) => setValues((v) => ({ ...v, price: e.target.value === '' ? null : Number(e.target.value) }))}
            className="w-full rounded-xl border border-sand-300 bg-warmwhite px-3.5 py-2.5 text-sm outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
          />
          <p className="mt-1 text-xs text-charcoal-400">Déjelo vacío para mostrar "Precio a consultar".</p>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal-400">
            Duración (minutos)
          </label>
          <input
            type="number"
            min={0}
            value={values.duration_minutes}
            onChange={(e) => setValues((v) => ({ ...v, duration_minutes: Number(e.target.value) }))}
            className="w-full rounded-xl border border-sand-300 bg-warmwhite px-3.5 py-2.5 text-sm outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
          />
        </div>
      </div>
      <p className="-mt-2 text-xs text-charcoal-400">
        La duración es un campo heredado del sistema de reservas compartido y no se muestra a los huéspedes.
      </p>

      <label className="flex items-center gap-2 text-sm text-charcoal-700">
        <input
          type="checkbox"
          checked={values.is_active}
          onChange={(e) => setValues((v) => ({ ...v, is_active: e.target.checked }))}
          className="h-4 w-4 rounded border-sand-300 text-terracotta-600 focus:ring-terracotta-500"
        />
        Activo (visible en el sitio público)
      </label>

      {error && <p role="alert" className="text-sm font-medium text-terracotta-700">{error}</p>}

      <div className="flex justify-end gap-3 pt-1">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} disabled={submitting}>
          Cancelar
        </Button>
        <Button type="submit" size="sm" loading={submitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

import { useEffect, useState, type FormEvent } from 'react'
import { useBusinessSettings } from '../../hooks/useHotelData'
import { updateBusinessSettings } from '../../lib/queries/businessSettings'
import { Spinner, ErrorMessage } from '../../components/ui/Feedback'
import { Button } from '../../components/ui/Button'
import type { BusinessSettingsRow } from '../../types/database'

export function SettingsTab() {
  const { data: settings, loading, error, reload } = useBusinessSettings()
  const [form, setForm] = useState<BusinessSettingsRow | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  useEffect(() => {
    if (settings) setForm(settings)
  }, [settings])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form) return
    setSubmitting(true)
    setActionError(null)
    setSaved(false)
    try {
      await updateBusinessSettings(form.id, {
        business_name: form.business_name,
        business_email: form.business_email,
        business_phone: form.business_phone,
        business_address: form.business_address,
        slot_interval_minutes: form.slot_interval_minutes,
        booking_notice_hours: form.booking_notice_hours,
      })
      setSaved(true)
      reload()
    } catch (err) {
      console.error(err)
      setActionError('No se pudo guardar la configuración. Inténtelo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal-800">Configuración</h1>
      <p className="mt-1 text-sm text-charcoal-500">Datos generales del hotel usados en todo el sitio.</p>

      {loading && <div className="mt-8"><Spinner label="Cargando configuración…" /></div>}
      {error && <div className="mt-8"><ErrorMessage message={error} onRetry={reload} /></div>}

      {!loading && !error && form && (
        <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-5 rounded-2xl bg-warmwhite p-6 shadow-soft ring-1 ring-sand-200">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal-400">Nombre del hotel</label>
            <input
              type="text"
              value={form.business_name ?? ''}
              onChange={(e) => setForm({ ...form, business_name: e.target.value })}
              className="w-full rounded-xl border border-sand-300 bg-warmwhite px-3.5 py-2.5 text-sm outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal-400">Dirección</label>
            <input
              type="text"
              value={form.business_address ?? ''}
              onChange={(e) => setForm({ ...form, business_address: e.target.value })}
              className="w-full rounded-xl border border-sand-300 bg-warmwhite px-3.5 py-2.5 text-sm outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal-400">Teléfono</label>
              <input
                type="tel"
                value={form.business_phone ?? ''}
                onChange={(e) => setForm({ ...form, business_phone: e.target.value })}
                className="w-full rounded-xl border border-sand-300 bg-warmwhite px-3.5 py-2.5 text-sm outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal-400">Correo electrónico</label>
              <input
                type="email"
                value={form.business_email ?? ''}
                onChange={(e) => setForm({ ...form, business_email: e.target.value })}
                className="w-full rounded-xl border border-sand-300 bg-warmwhite px-3.5 py-2.5 text-sm outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal-400">
                Antelación mínima (horas)
              </label>
              <input
                type="number"
                min={0}
                value={form.booking_notice_hours ?? 0}
                onChange={(e) => setForm({ ...form, booking_notice_hours: Number(e.target.value) })}
                className="w-full rounded-xl border border-sand-300 bg-warmwhite px-3.5 py-2.5 text-sm outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal-400">
                Intervalo de franja (min)
              </label>
              <input
                type="number"
                min={0}
                value={form.slot_interval_minutes ?? 0}
                onChange={(e) => setForm({ ...form, slot_interval_minutes: Number(e.target.value) })}
                className="w-full rounded-xl border border-sand-300 bg-warmwhite px-3.5 py-2.5 text-sm outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
              />
            </div>
          </div>

          {actionError && <p role="alert" className="text-sm font-medium text-terracotta-700">{actionError}</p>}
          {saved && <p className="text-sm font-medium text-marine-600">Cambios guardados.</p>}

          <div className="flex justify-end">
            <Button type="submit" loading={submitting}>
              Guardar cambios
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

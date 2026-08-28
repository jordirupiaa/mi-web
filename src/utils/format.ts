export function formatCurrency(amount: number, currency = 'EUR', locale = 'es-ES'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)
}

/** Some rooms don't have a price loaded yet — never render "€0" or "NaN" for those. */
export function formatPriceOrEnquire(amount: number | null): string {
  return amount === null ? 'Precio a consultar' : `${formatCurrency(amount)} / noche`
}

export function formatTime(hms: string | null): string {
  if (!hms) return ''
  return hms.slice(0, 5)
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmada',
  cancelled: 'Cancelada',
  completed: 'Completada',
}

export function statusLabel(status: string): string {
  return STATUS_LABELS[status] ?? status
}

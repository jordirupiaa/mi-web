import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { AlertTriangle, Inbox, Loader2 } from 'lucide-react'

export function Spinner({ label }: { label?: string }) {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-charcoal-400" role="status">
      <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
      <span className="text-sm">{label ?? t('feedback.loading')}</span>
    </div>
  )
}

export function ErrorMessage({ message, onRetry }: { message: string; onRetry?: () => void }) {
  const { t } = useTranslation()
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-2xl border border-terracotta-300/60 bg-terracotta-50 px-6 py-10 text-center"
    >
      <AlertTriangle className="h-6 w-6 text-terracotta-600" aria-hidden="true" />
      <p className="max-w-md text-sm text-charcoal-700">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="text-sm font-semibold text-terracotta-700 underline underline-offset-4 hover:text-terracotta-600"
        >
          {t('feedback.retry')}
        </button>
      )}
    </div>
  )
}

export function EmptyState({ title, description, icon }: { title: string; description?: string; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-sand-300 bg-sand-50 px-6 py-14 text-center">
      {icon ?? <Inbox className="h-6 w-6 text-charcoal-400" aria-hidden="true" />}
      <p className="font-display text-lg text-charcoal-700">{title}</p>
      {description && <p className="max-w-md text-sm text-charcoal-400">{description}</p>}
    </div>
  )
}

export function ConfigWarningBanner() {
  const { t } = useTranslation()
  return (
    <div role="alert" className="bg-terracotta-600 px-4 py-3 text-center text-sm text-warmwhite">
      {t('feedback.configWarning')}
    </div>
  )
}

import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

/** Last-resort safety net so a single broken component never blanks the whole site. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Hotel Casa Mas] Unhandled UI error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-sand-50 px-6 text-center">
          <AlertTriangle className="h-8 w-8 text-terracotta-600" aria-hidden="true" />
          <h1 className="font-display text-2xl text-charcoal-800">Algo no ha ido bien</h1>
          <p className="max-w-sm text-sm text-charcoal-500">
            Ha ocurrido un error inesperado. Recargue la página o inténtelo de nuevo en unos instantes.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full bg-charcoal-800 px-6 py-3 text-sm font-medium text-warmwhite hover:bg-terracotta-600"
          >
            Recargar página
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

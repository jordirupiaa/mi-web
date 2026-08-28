import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../components/ui/Button'

export function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-20 text-center">
      <p className="font-display text-6xl text-terracotta-500">404</p>
      <h1 className="mt-4 font-display text-2xl text-charcoal-800">{t('notFound.heading')}</h1>
      <p className="mt-2 max-w-sm text-sm text-charcoal-500">
        {t('notFound.body')}
      </p>
      <Link to="/" className="mt-6">
        <Button variant="secondary">{t('notFound.cta')}</Button>
      </Link>
    </div>
  )
}

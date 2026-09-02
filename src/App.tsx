import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppRoutes } from './AppRoutes'

function DocumentLanguageSync() {
  const { i18n } = useTranslation()
  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? 'es'
  }, [i18n.resolvedLanguage])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <DocumentLanguageSync />
      <AppRoutes />
    </BrowserRouter>
  )
}

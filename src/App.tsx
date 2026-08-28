import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Rooms } from './pages/Rooms'
import { About } from './pages/About'
import { Location } from './pages/Location'
import { Contact } from './pages/Contact'
import { Legal } from './pages/Legal'
import { NotFound } from './pages/NotFound'

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
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/habitaciones" element={<Rooms />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/ubicacion" element={<Location />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

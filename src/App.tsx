import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AuthProvider } from './context/AuthContext'
import { Layout } from './components/layout/Layout'
import { RequireAdmin } from './components/admin/RequireAdmin'
import { Spinner } from './components/ui/Feedback'
import { Home } from './pages/Home'
import { Rooms } from './pages/Rooms'
import { About } from './pages/About'
import { Location } from './pages/Location'
import { Contact } from './pages/Contact'
import { Legal } from './pages/Legal'
import { AdminLogin } from './pages/AdminLogin'
import { NotFound } from './pages/NotFound'

// The admin area (dashboard + forms for services/hours/blocked dates/
// settings) is only ever visited by hotel staff, never by a regular
// website visitor — so it's lazy-loaded, keeping it out of the JS bundle
// every public visitor has to download.
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })))
const Overview = lazy(() => import('./pages/admin/Overview').then((m) => ({ default: m.Overview })))
const ServicesTab = lazy(() => import('./pages/admin/ServicesTab').then((m) => ({ default: m.ServicesTab })))
const HoursTab = lazy(() => import('./pages/admin/HoursTab').then((m) => ({ default: m.HoursTab })))
const BlockedDatesTab = lazy(() => import('./pages/admin/BlockedDatesTab').then((m) => ({ default: m.BlockedDatesTab })))
const SettingsTab = lazy(() => import('./pages/admin/SettingsTab').then((m) => ({ default: m.SettingsTab })))

function AdminFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner label="Cargando…" />
    </div>
  )
}

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
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/habitaciones" element={<Rooms />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/ubicacion" element={<Location />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <Suspense fallback={<AdminFallback />}>
                  <AdminLayout />
                </Suspense>
              </RequireAdmin>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<AdminFallback />}>
                  <Overview />
                </Suspense>
              }
            />
            <Route
              path="alojamientos"
              element={
                <Suspense fallback={<AdminFallback />}>
                  <ServicesTab />
                </Suspense>
              }
            />
            <Route
              path="horario"
              element={
                <Suspense fallback={<AdminFallback />}>
                  <HoursTab />
                </Suspense>
              }
            />
            <Route
              path="fechas-bloqueadas"
              element={
                <Suspense fallback={<AdminFallback />}>
                  <BlockedDatesTab />
                </Suspense>
              }
            />
            <Route
              path="configuracion"
              element={
                <Suspense fallback={<AdminFallback />}>
                  <SettingsTab />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { LangRoute } from './components/layout/LangRoute'
import { Home } from './pages/Home'
import { Rooms } from './pages/Rooms'
import { About } from './pages/About'
import { Location } from './pages/Location'
import { Contact } from './pages/Contact'
import { Legal } from './pages/Legal'
import { NotFound } from './pages/NotFound'

/**
 * The other 5 supported languages, each mounted under its own path prefix
 * (/en, /fr, /ca, /de, /it) — Spanish stays unprefixed at the paths that
 * already existed before multi-language routing (see localizedPath.ts).
 * Kept as a plain array (not derived from SUPPORTED_LANGUAGES in
 * src/i18n/index.ts) so this route tree is easy to read top-to-bottom
 * without chasing an import; if a new language is ever added to
 * SUPPORTED_LANGUAGES, add its code here too.
 */
const EXTRA_LANGUAGE_PREFIXES = ['en', 'fr', 'ca', 'de', 'it'] as const

/**
 * The full route tree, extracted from App.tsx so it can be rendered two
 * ways: client-side inside a <BrowserRouter> (see App.tsx), and at build
 * time inside a <StaticRouter> once per page/language to produce the
 * prerendered static HTML search engines and link-preview bots see (see
 * scripts/prerender.tsx). Keeping one definition avoids the two ever
 * silently drifting apart.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<LangRoute lang="es" />}>
          <Route path="/" element={<Home />} />
          <Route path="/habitaciones" element={<Rooms />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/ubicacion" element={<Location />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
        </Route>

        {EXTRA_LANGUAGE_PREFIXES.map((lang) => (
          <Route key={lang} path={lang} element={<LangRoute lang={lang} />}>
            <Route index element={<Home />} />
            <Route path="habitaciones" element={<Rooms />} />
            <Route path="nosotros" element={<About />} />
            <Route path="ubicacion" element={<Location />} />
            <Route path="contacto" element={<Contact />} />
            <Route path="legal" element={<Legal />} />
          </Route>
        ))}

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

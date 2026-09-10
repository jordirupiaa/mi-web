import { useTranslation } from 'react-i18next'
import { PageSeo } from '../components/shared/PageSeo'
import { LegalLanguageNote } from '../components/shared/LegalLanguageNote'
import { useCookieConsent } from '../context/CookieConsentContext'

export function CookiePolicy() {
  const { t } = useTranslation()
  const { openPreferences } = useCookieConsent()

  return (
    <div className="pt-20">
      <PageSeo title={t('seo.cookiesTitle')} description={t('seo.cookiesDescription')} />
      <section className="container-hotel py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-600">Legal</p>
          <h1 className="mt-3 text-balance font-display text-4xl text-charcoal-800 md:text-5xl">
            Política de cookies
          </h1>
          <LegalLanguageNote />

          <div className="prose-legal mt-12 space-y-8 text-base leading-relaxed text-charcoal-600">
            <section>
              <h2 className="font-display text-2xl text-charcoal-800">¿Qué son las cookies?</h2>
              <p className="mt-4">
                Las cookies son pequeños archivos de texto que un sitio web puede guardar en su navegador, con
                el fin de recabar información sobre su navegación y, en su caso, reconocerle en visitas
                sucesivas. El almacenamiento local del navegador ("local storage") cumple una función similar
                y está sujeto a las mismas normas de consentimiento; en esta política nos referimos a ambos
                como "cookies" en sentido amplio, salvo que se indique lo contrario.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal-800">Cookies que utiliza este sitio web</h2>
              <p className="mt-4">
                A día de hoy, Hotel Casa Mas <strong className="text-charcoal-700">no utiliza cookies propias
                de analítica, publicidad o seguimiento</strong>. No hay Google Analytics, Meta/Facebook Pixel
                ni ninguna otra herramienta de medición o publicidad instalada en este sitio.
              </p>
              <div className="mt-6 overflow-x-auto rounded-2xl border border-sand-200">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="bg-sand-50 text-charcoal-700">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Nombre / clave</th>
                      <th className="px-4 py-3 font-semibold">Tipo</th>
                      <th className="px-4 py-3 font-semibold">Finalidad</th>
                      <th className="px-4 py-3 font-semibold">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-200">
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">casamas-lang</td>
                      <td className="px-4 py-3">Técnica / necesaria (local storage)</td>
                      <td className="px-4 py-3">Recordar el idioma que ha elegido para el sitio web.</td>
                      <td className="px-4 py-3">Hasta que la borre desde su navegador.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">casamas-cookie-consent</td>
                      <td className="px-4 py-3">Técnica / necesaria (local storage)</td>
                      <td className="px-4 py-3">Recordar la decisión que usted tomó sobre este mismo banner de cookies.</td>
                      <td className="px-4 py-3">12 meses.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                Ninguna de estas dos entradas identifica a una persona ni se comparte con terceros: ambas
                permanecen únicamente en su propio navegador.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal-800">Cookies de terceros</h2>
              <p className="mt-4">
                La página de ubicación incluye un mapa incrustado de Google Maps. Al cargar ese mapa, Google
                Ireland Limited puede instalar sus propias cookies conforme a su propia política, ajena a
                Hotel Casa Mas. Puede consultarla en{' '}
                <a
                  href="https://policies.google.com/technologies/cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terracotta-700 hover:underline"
                >
                  policies.google.com/technologies/cookies
                </a>.
              </p>
              <p className="mt-4">
                Si en el futuro se incorpora alguna herramienta de analítica o publicidad, esta página se
                actualizará para reflejarlo antes de activarla, y dicha activación quedará sujeta a su
                consentimiento a través del panel de preferencias.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal-800">Cómo cambiar su decisión</h2>
              <p className="mt-4">
                Puede revisar o cambiar en cualquier momento la decisión que tomó en el banner de cookies:
              </p>
              <button
                type="button"
                onClick={openPreferences}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-terracotta-600 px-6 py-3 text-sm font-semibold text-warmwhite transition-colors hover:bg-terracotta-700"
              >
                Abrir mis preferencias de cookies
              </button>
              <p className="mt-4">
                También puede bloquear o eliminar las cookies en cualquier momento desde la configuración de
                su propio navegador. Tenga en cuenta que bloquear todas las cookies puede afectar al
                funcionamiento de algunos elementos incrustados de terceros, como el mapa de Google Maps.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}

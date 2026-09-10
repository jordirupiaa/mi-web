import { useTranslation } from 'react-i18next'
import { PageSeo } from '../components/shared/PageSeo'
import { LegalLanguageNote } from '../components/shared/LegalLanguageNote'

/**
 * LSSI-CE (Ley 34/2002, art. 10) requires this exact set of identifying
 * information to be easily, directly and permanently accessible on the
 * site. Real data already used elsewhere on the site (src/data/businessInfo.ts)
 * plus the company's own tax/registry details, already published on the
 * former combined /legal page, and cross-checked directly against the
 * hotel's own live legal notice at hotelcasamaslloret.com/es/aviso-legal.html
 * (same CIF, same address, same mercantile registry data — consistent).
 * TOURISM_REGISTRY_NUMBER is the one piece of real information this
 * project has never had — and, checked directly, the hotel's own official
 * site doesn't publish it either (its own legal notice has no HUT/RTC
 * number at all). Fill it in with the actual Registre de Turisme de
 * Catalunya number before this page goes live; every other field here is
 * real, not a placeholder.
 */
const TOURISM_REGISTRY_NUMBER = '[Nº de inscripción en el Registro de Turismo de Cataluña — pendiente de completar]'

export function AvisoLegal() {
  const { t } = useTranslation()
  return (
    <div className="pt-20">
      <PageSeo title={t('seo.avisoLegalTitle')} description={t('seo.avisoLegalDescription')} />
      <section className="container-hotel py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-600">Legal</p>
          <h1 className="mt-3 text-balance font-display text-4xl text-charcoal-800 md:text-5xl">
            Aviso legal
          </h1>
          <LegalLanguageNote />

          <div className="prose-legal mt-12 space-y-10 text-base leading-relaxed text-charcoal-600">
            <section>
              <h2 className="font-display text-2xl text-charcoal-800">1. Datos identificativos</h2>
              <p className="mt-4">
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad
                de la Información y de Comercio Electrónico (LSSI-CE), se informa de los siguientes datos: el
                presente sitio web es titularidad de:
              </p>
              <dl className="mt-4 space-y-1.5 rounded-2xl bg-sand-50 p-6">
                <div className="flex gap-2"><dt className="font-semibold text-charcoal-700">Razón social:</dt><dd>ALBANTA HOSPITALITY S.L.</dd></div>
                <div className="flex gap-2"><dt className="font-semibold text-charcoal-700">CIF:</dt><dd>B44970762</dd></div>
                <div className="flex gap-2"><dt className="font-semibold text-charcoal-700">Domicilio social:</dt><dd>Carrer Hortes 7, planta baixa, 17001 Girona</dd></div>
                <div className="flex gap-2"><dt className="font-semibold text-charcoal-700">Establecimiento:</dt><dd>Hotel Casa Mas — Carrer de Sant Pere 50, 17310 Lloret de Mar, Girona</dd></div>
                <div className="flex gap-2"><dt className="font-semibold text-charcoal-700">Email:</dt><dd><a href="mailto:dpd@octalia.es" className="text-terracotta-700 hover:underline">dpd@octalia.es</a></dd></div>
                <div className="flex gap-2"><dt className="font-semibold text-charcoal-700">Teléfono:</dt><dd><a href="tel:936606000" className="text-terracotta-700 hover:underline">936 606 000</a></dd></div>
                <div className="flex gap-2"><dt className="font-semibold text-charcoal-700">Registro Mercantil:</dt><dd>Barcelona, tomo 49258, folio 35, hoja 614573, inscripción 1</dd></div>
                <div className="flex gap-2"><dt className="font-semibold text-charcoal-700">Registro de turismo:</dt><dd>{TOURISM_REGISTRY_NUMBER}</dd></div>
              </dl>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal-800">2. Objeto y ámbito de aplicación</h2>
              <p className="mt-4">
                El presente aviso legal regula el uso del sitio web hotelcasamas.com (en adelante, "el sitio
                web"), que ALBANTA HOSPITALITY S.L. pone a disposición de los usuarios de Internet con la
                finalidad de informar sobre el Hotel Casa Mas, sus habitaciones, servicios y ubicación.
              </p>
              <p className="mt-4">
                Este sitio web es meramente informativo: no permite realizar reservas ni transacciones
                directamente. Toda reserva se gestiona a través del motor de reservas directo del hotel
                (direct-book.com), operado por SiteMinder, al que el sitio web redirige al usuario; ese motor
                de reservas tiene sus propias condiciones y su propia política de privacidad, ajenas a este
                sitio web.
              </p>
              <p className="mt-4">
                El acceso y/o uso de este sitio web atribuye la condición de usuario y supone la aceptación,
                desde dicho acceso y/o uso, del presente aviso legal.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal-800">3. Condiciones de uso</h2>
              <p className="mt-4">
                El usuario se compromete a hacer un uso adecuado y lícito del sitio web, de conformidad con la
                legislación aplicable, el presente aviso legal, la moral y el orden público. Queda prohibido
                cualquier uso que pueda dañar, sobrecargar, deteriorar o impedir la normal utilización del
                sitio web, así como introducir o difundir virus informáticos u otros sistemas susceptibles de
                provocar daños.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal-800">4. Condiciones de contratación y cancelación</h2>
              <p className="mt-4">
                Las reservas se formalizan exclusivamente a través del motor de reservas directo (direct-book.com),
                bajo sus propias condiciones de contratación. El cliente acepta expresamente las condiciones de
                cancelación aplicables a la tarifa contratada:
              </p>
              <ul className="mt-4 list-disc space-y-3 pl-5">
                <li>
                  <strong className="text-charcoal-700">Tarifa no reembolsable:</strong> la reserva no podrá
                  ser cancelada. En caso de cancelación o no presentación, el importe total será retenido.
                </li>
                <li>
                  <strong className="text-charcoal-700">Tarifa con cancelación gratuita:</strong> la
                  cancelación es gratuita si se realiza con un mínimo de 24 horas de antelación a la fecha de
                  llegada. En caso de cancelación posterior a dicho plazo, o de no presentación, se facturará
                  el importe total de la reserva.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal-800">5. Propiedad intelectual e industrial</h2>
              <p className="mt-4">
                Todos los contenidos del sitio web (textos, fotografías, gráficos, imágenes, diseño y código
                fuente), salvo indicación expresa en contrario, son propiedad de ALBANTA HOSPITALITY S.L. o de
                terceros que han autorizado su uso, y están protegidos por la normativa de propiedad
                intelectual e industrial. Las fotografías del hotel y sus habitaciones son fotografías reales,
                propiedad de ALBANTA HOSPITALITY S.L. o cedidas por su autora (ver crédito en el pie de
                página).
              </p>
              <p className="mt-4">
                Queda prohibida su reproducción, distribución, comunicación pública o transformación total o
                parcial sin autorización expresa de su titular.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal-800">6. Enlaces a terceros</h2>
              <p className="mt-4">
                Este sitio web enlaza con servicios de terceros ajenos a ALBANTA HOSPITALITY S.L., entre
                ellos el motor de reservas direct-book.com y un mapa incrustado de Google Maps. ALBANTA
                HOSPITALITY S.L. no se hace responsable del contenido, disponibilidad ni políticas de
                privacidad de dichos sitios de terceros.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal-800">7. Exclusión de responsabilidad</h2>
              <p className="mt-4">
                ALBANTA HOSPITALITY S.L. no garantiza la disponibilidad, continuidad ni infalibilidad del
                funcionamiento del sitio web, y no se hace responsable de los daños y perjuicios que puedan
                derivarse de interrupciones, errores de conexión, o de la presencia de virus u otros elementos
                dañinos ajenos a su control.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal-800">8. Legislación aplicable y jurisdicción</h2>
              <p className="mt-4">
                El presente aviso legal se rige por la legislación española. Para la resolución de cualquier
                controversia derivada del acceso o uso de este sitio web, las partes se someten a los Juzgados
                y Tribunales de Girona, con renuncia expresa a cualquier otro fuero que pudiera corresponderles,
                salvo que la normativa de protección de consumidores y usuarios disponga otra cosa.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}

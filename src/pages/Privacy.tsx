import { useTranslation } from 'react-i18next'
import { PageSeo } from '../components/shared/PageSeo'
import { LegalLanguageNote } from '../components/shared/LegalLanguageNote'
import { localizedPath } from '../utils/localizedPath'
import { Link } from 'react-router-dom'

export function Privacy() {
  const { t, i18n } = useTranslation()
  const cookiesHref = localizedPath('/cookies', (i18n.resolvedLanguage ?? 'es') as Parameters<typeof localizedPath>[1])

  return (
    <div className="pt-20">
      <PageSeo title={t('seo.privacidadTitle')} description={t('seo.privacidadDescription')} />
      <section className="container-hotel py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-600">Legal</p>
          <h1 className="mt-3 text-balance font-display text-4xl text-charcoal-800 md:text-5xl">
            Política de privacidad
          </h1>
          <LegalLanguageNote />

          <div className="prose-legal mt-12 space-y-10 text-base leading-relaxed text-charcoal-600">
            <section>
              <p>
                Esta política de privacidad puede actualizarse o adaptarse a los cambios que se produzcan en
                la normativa o en el propio sitio web. Le rogamos que la lea detenidamente cada vez que se
                ponga en contacto con nosotros facilitándonos sus datos personales.
              </p>
              <p className="mt-4">
                Este sitio web es meramente informativo: no incorpora ningún formulario de contacto,
                suscripción ni registro. La única forma de facilitarnos datos personales a través de él es
                iniciando usted mismo, voluntariamente, una llamada telefónica o un correo electrónico a los
                datos de contacto publicados, o utilizando el asistente virtual del chat (que no envía
                ninguna conversación a ningún servidor: funciona enteramente en su propio navegador, ver
                apartado 8).
              </p>
              <p className="mt-4">
                El consentimiento expreso que usted otorga al contactarnos, facilitándonos sus datos
                personales, nos da la base legal para su tratamiento. De acuerdo con el Reglamento General de
                Protección de Datos (RGPD) y demás normativa vigente, y basándonos en los principios de
                transparencia, lealtad y legalidad, detallamos a continuación el tratamiento que se realizará
                de sus datos personales.
              </p>

              <h2 className="mt-8 font-display text-2xl text-charcoal-800">1. Responsable del tratamiento</h2>
              <p className="mt-4">
                Sus datos personales formarán parte de un fichero denominado Usuarios web, cuyo responsable y
                encargado del tratamiento es:
              </p>
              <dl className="mt-4 space-y-1.5 rounded-2xl bg-sand-50 p-6">
                <div className="flex gap-2"><dt className="font-semibold text-charcoal-700">Razón social:</dt><dd>ALBANTA HOSPITALITY S.L.</dd></div>
                <div className="flex gap-2"><dt className="font-semibold text-charcoal-700">CIF:</dt><dd>B44970762</dd></div>
                <div className="flex gap-2"><dt className="font-semibold text-charcoal-700">Domicilio social:</dt><dd>Carrer Hortes 7, planta baixa, 17001 Girona</dd></div>
                <div className="flex gap-2"><dt className="font-semibold text-charcoal-700">Email:</dt><dd><a href="mailto:dpd@octalia.es" className="text-terracotta-700 hover:underline">dpd@octalia.es</a></dd></div>
                <div className="flex gap-2"><dt className="font-semibold text-charcoal-700">Teléfono:</dt><dd><a href="tel:936606000" className="text-terracotta-700 hover:underline">936 606 000</a></dd></div>
              </dl>

              <h2 className="mt-8 font-display text-2xl text-charcoal-800">2. Finalidad, legitimación y conservación de los datos</h2>

              <h3 className="mt-6 font-semibold text-charcoal-800">2.1. Consultas recibidas por teléfono o correo electrónico</h3>
              <p className="mt-3"><strong className="text-charcoal-700">Finalidad:</strong></p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>Atender y responder las consultas que usted nos dirija por teléfono o correo electrónico.</li>
                <li>Gestionar el envío de la información solicitada y, en su caso, facilitar ofertas de servicios de ALBANTA HOSPITALITY S.L. sobre los que usted haya mostrado interés expreso.</li>
                <li>ALBANTA HOSPITALITY S.L. no toma decisiones automatizadas basadas en perfiles.</li>
              </ul>
              <p className="mt-3">
                <strong className="text-charcoal-700">Legitimación:</strong> el consentimiento del interesado,
                prestado al iniciar voluntariamente el contacto y facilitarnos sus datos.
              </p>
              <p className="mt-3">
                <strong className="text-charcoal-700">Conservación:</strong> durante un plazo de 5 años desde
                la última manifestación de interés del usuario sobre nuestros servicios, salvo que solicite su
                supresión antes.
              </p>

              <h3 className="mt-6 font-semibold text-charcoal-800">2.2. Datos de clientes y proveedores</h3>
              <p className="mt-3">
                <strong className="text-charcoal-700">Finalidad:</strong> gestionar la relación comercial
                existente (incluidas las reservas realizadas a través del motor de reservas direct-book.com,
                que dispone de su propia política de privacidad) y efectuar las gestiones contables, fiscales
                y administrativas de la empresa.
              </p>
              <p className="mt-3">
                <strong className="text-charcoal-700">Legitimación:</strong> la existencia y ejecución de la
                relación contractual (reserva/estancia) o de prestación de servicios.
              </p>
              <p className="mt-3">
                <strong className="text-charcoal-700">Conservación:</strong> mientras se mantenga la relación
                comercial y durante los años necesarios para cumplir las obligaciones legales y fiscales
                derivadas.
              </p>

              <h3 className="mt-6 font-semibold text-charcoal-800">2.3. Menores de edad</h3>
              <p className="mt-3">
                Según el Reglamento (UE) 2016/679 y la LOPDGDD 3/2018, cuando el interesado sea menor de 16
                años, no podrá prestar su consentimiento para el tratamiento de sus datos personales sin la
                autorización de sus padres o tutores legales.
              </p>

              <h2 className="mt-8 font-display text-2xl text-charcoal-800">3. Cesión de los datos</h2>
              <p className="mt-4">
                Sus datos no serán comunicados a terceros, salvo obligación legal o cuando sea estrictamente
                necesario para la prestación del servicio solicitado (por ejemplo, el motor de reservas
                direct-book.com para gestionar una reserva).
              </p>

              <h2 className="mt-8 font-display text-2xl text-charcoal-800">4. Derechos del usuario sobre sus datos personales</h2>
              <p className="mt-4">Al facilitarnos sus datos, usted dispone de los siguientes derechos:</p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li><strong className="text-charcoal-700">Derecho de acceso:</strong> obtener información sobre sus datos personales y el tratamiento realizado.</li>
                <li><strong className="text-charcoal-700">Derecho de rectificación:</strong> modificar datos inexactos o incompletos.</li>
                <li><strong className="text-charcoal-700">Derecho a la limitación del tratamiento:</strong> restringir el uso de sus datos para ciertas finalidades.</li>
                <li><strong className="text-charcoal-700">Derecho de supresión:</strong> eliminar sus datos personales, salvo obligación legal de conservación.</li>
                <li><strong className="text-charcoal-700">Derecho de portabilidad:</strong> recibir sus datos en formato estructurado y transmitirlos a otro responsable.</li>
                <li><strong className="text-charcoal-700">Derecho de oposición:</strong> oponerse al tratamiento de sus datos personales.</li>
              </ul>
              <p className="mt-4">
                Puede ejercer cualquiera de estos derechos por escrito a nuestro domicilio social o mediante
                correo electrónico a{' '}
                <a href="mailto:dpd@octalia.es" className="text-terracotta-700 hover:underline">dpd@octalia.es</a>,
                adjuntando copia de un documento que acredite su identidad.
              </p>
              <p className="mt-4">
                Si considera que no ha obtenido satisfacción en el ejercicio de sus derechos, puede presentar
                una reclamación ante la Agencia Española de Protección de Datos (
                <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-terracotta-700 hover:underline">
                  www.aepd.es
                </a>).
              </p>

              <h2 className="mt-8 font-display text-2xl text-charcoal-800">5. Redes sociales</h2>
              <p className="mt-4">
                La visita a los perfiles públicos de Hotel Casa Mas / ALBANTA HOSPITALITY S.L. en redes
                sociales no supone la captación de datos personales salvo autorización expresa del usuario. Si
                usted decide seguir o unirse a dicho perfil, nos otorga su consentimiento para tratar los
                datos personales públicos de su propio perfil (por ejemplo, su nombre de usuario), únicamente
                con el fin de interactuar con usted en esa red social; no incorporamos estos datos a ningún
                fichero propio. Usted puede modificar su configuración de privacidad en la red social en
                cualquier momento.
              </p>

              <h2 className="mt-8 font-display text-2xl text-charcoal-800">6. Protección y confidencialidad de sus datos</h2>
              <p className="mt-4">
                Adoptamos medidas técnicas y organizativas razonables para garantizar la seguridad y
                confidencialidad de sus datos personales, evitando su pérdida, alteración o acceso no
                autorizado.
              </p>

              <h2 className="mt-8 font-display text-2xl text-charcoal-800">7. Servicios de terceros incrustados</h2>
              <p className="mt-4">
                La página de ubicación de este sitio incluye un mapa incrustado de Google Maps. Al cargarse,
                este servicio de Google Ireland Limited puede instalar sus propias cookies técnicas conforme a
                su propia política de privacidad, ajena a ALBANTA HOSPITALITY S.L. Puede consultarla en{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terracotta-700 hover:underline"
                >
                  policies.google.com/privacy
                </a>.
              </p>

              <h2 className="mt-8 font-display text-2xl text-charcoal-800">8. Cookies</h2>
              <p className="mt-4">
                Para saber qué cookies y tecnologías similares utiliza este sitio web, con qué finalidad, y
                cómo puede aceptarlas, rechazarlas o cambiar su decisión en cualquier momento, consulte
                nuestra{' '}
                <Link to={cookiesHref} className="text-terracotta-700 hover:underline">
                  Política de Cookies
                </Link>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}

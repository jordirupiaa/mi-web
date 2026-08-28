import { useTranslation } from 'react-i18next'
import { PageSeo } from '../components/shared/PageSeo'

export function Legal() {
  const { t } = useTranslation()
  return (
    <div className="pt-20">
      <PageSeo title={t('seo.legalTitle')} description={t('seo.legalDescription')} />
      <section className="container-hotel py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-600">Legal</p>
          <h1 className="mt-3 text-balance font-display text-4xl text-charcoal-800 md:text-5xl">
            Términos, condiciones y política de privacidad
          </h1>

          <div className="prose-legal mt-12 space-y-10 text-base leading-relaxed text-charcoal-600">
            <section>
              <h2 className="font-display text-2xl text-charcoal-800">Condiciones de cancelación</h2>
              <p className="mt-4">
                El cliente acepta expresamente las condiciones de cancelación aplicables a la tarifa
                contratada:
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
              <h2 className="font-display text-2xl text-charcoal-800">Política de privacidad</h2>

              <p className="mt-4">
                Esta política de privacidad puede actualizarse o adaptarse a los cambios que se produzcan en
                la normativa o en la propia página web. Le rogamos que la lea detenidamente cada vez que nos
                facilite sus datos personales.
              </p>
              <p className="mt-4">
                La visita a este sitio web no implica que el usuario esté obligado a facilitar ninguna
                información personal. No obstante, durante la visita, es posible que se solicite información
                personal a través de formularios, la cual el usuario podrá proporcionar voluntariamente.
              </p>
              <p className="mt-4">
                Los datos que se solicitan en esta página web son adecuados, pertinentes y estrictamente
                necesarios para poder prestar los servicios ofrecidos. En ningún caso está obligado a
                proporcionarlos, aunque debe saber que la falta de comunicación puede afectar o imposibilitar
                la prestación del servicio.
              </p>
              <p className="mt-4">
                El consentimiento expreso que proporciona al aceptar esta política de privacidad antes de
                facilitar información personal nos da la base legal para su tratamiento. De acuerdo con el
                Reglamento General de Protección de Datos y demás normativa vigente, y basándonos en los
                principios de transparencia, lealtad y legalidad, detallamos el tratamiento que se realizará
                de sus datos personales:
              </p>

              <h3 className="mt-8 font-display text-xl text-charcoal-800">1. Responsable del tratamiento</h3>
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

              <h3 className="mt-8 font-display text-xl text-charcoal-800">2. Finalidad, legitimación y conservación de los datos</h3>

              <h4 className="mt-6 font-semibold text-charcoal-800">2.1. Tratamiento de los datos de los usuarios del formulario de contacto</h4>
              <p className="mt-3"><strong className="text-charcoal-700">Finalidad:</strong></p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>Gestionar y atender las solicitudes de información y/o consultas que los usuarios del formulario de contacto de la web nos envíen.</li>
                <li>Gestionar el envío de la información solicitada y, en los casos procedentes, facilitar ofertas de productos y/o servicios de ALBANTA HOSPITALITY S.L. en los que el usuario haya mostrado interés.</li>
                <li>ALBANTA HOSPITALITY S.L. no tomará decisiones automatizadas basadas en perfiles.</li>
              </ul>
              <p className="mt-3">
                <strong className="text-charcoal-700">Legitimación:</strong> el tratamiento de los datos se
                basa en el consentimiento del interesado, prestado al rellenar y enviarnos el formulario de
                contacto.
              </p>
              <p className="mt-3">
                <strong className="text-charcoal-700">Conservación:</strong> conservaremos los datos durante
                un plazo de 5 años desde la última manifestación de interés del usuario sobre nuestros
                productos o servicios, salvo que solicite su supresión.
              </p>

              <h4 className="mt-6 font-semibold text-charcoal-800">2.2. Tratamiento de los datos de clientes y proveedores</h4>
              <p className="mt-3">
                <strong className="text-charcoal-700">Finalidad:</strong> gestionar la relación comercial
                existente, realizar y/o subcontratar los servicios contratados por nuestros clientes y
                efectuar las gestiones contables, fiscales y administrativas de la empresa.
              </p>
              <p className="mt-3">
                <strong className="text-charcoal-700">Legitimación:</strong> la base legal es la existencia y
                ejecución de contratos de prestación de servicios y/o compraventa.
              </p>
              <p className="mt-3">
                <strong className="text-charcoal-700">Conservación:</strong> se conservarán los datos mientras
                se mantengan las relaciones comerciales y durante los años necesarios para cumplir las
                obligaciones legales y/o fiscales derivadas.
              </p>

              <h4 className="mt-6 font-semibold text-charcoal-800">2.3. Tratamiento de los datos de los destinatarios de la newsletter y comunicaciones comerciales</h4>
              <p className="mt-3">
                <strong className="text-charcoal-700">Finalidad:</strong> gestionar la suscripción y el envío
                de la newsletter y otras comunicaciones comerciales de ALBANTA HOSPITALITY S.L.
              </p>
              <p className="mt-3">
                <strong className="text-charcoal-700">Legitimación:</strong> el tratamiento se basa en el
                consentimiento del interesado, otorgado mediante la suscripción. En el caso de los clientes de
                ALBANTA HOSPITALITY S.L., la base legal es el interés legítimo de la empresa, salvo que se
                solicite la baja mediante un correo a{' '}
                <a href="mailto:dpd@octalia.es" className="text-terracotta-700 hover:underline">dpd@octalia.es</a>.
              </p>
              <p className="mt-3">
                <strong className="text-charcoal-700">Conservación:</strong> los datos se conservarán de forma
                indefinida mientras no se solicite la baja por escrito a{' '}
                <a href="mailto:dpd@octalia.es" className="text-terracotta-700 hover:underline">dpd@octalia.es</a>,
                adjuntando copia del DNI.
              </p>

              <h4 className="mt-6 font-semibold text-charcoal-800">2.4. Tratamiento de datos de menores de edad</h4>
              <p className="mt-3">
                Según el Reglamento (UE) 2016/679 y la LOPD 3/2018, cuando el interesado sea menor de 16 años,
                no podrá prestar su consentimiento para que se recojan sus datos personales sin la
                autorización de sus padres o tutores legales. El tratamiento solo se considerará lícito si
                dicho consentimiento ha sido otorgado por ellos.
              </p>

              <h4 className="mt-6 font-semibold text-charcoal-800">2.5. Base jurídica para el tratamiento de datos</h4>
              <p className="mt-3">
                En cumplimiento del Reglamento (UE) 2016/679 y la LOPD, sus datos pueden ser objeto de los
                siguientes tratamientos (campañas publicitarias, gestión fiscal, laboral, contable, selección
                de personal, etc.) conforme a las bases legales detalladas en cada caso.
              </p>
              <p className="mt-3">
                Usted puede retirar su consentimiento para cualquier finalidad en cualquier momento sin que
                ello afecte a la licitud del tratamiento previo.
              </p>

              <h3 className="mt-8 font-display text-xl text-charcoal-800">3. Cesión de los datos</h3>
              <p className="mt-4">
                Sus datos no serán comunicados a terceros, salvo a socios de negocio cuando dicha cesión
                implique una mejora del servicio, exista obligación legal o se haya informado expresamente.
              </p>

              <h3 className="mt-8 font-display text-xl text-charcoal-800">4. Derechos del usuario sobre sus datos personales</h3>
              <p className="mt-4">Al facilitarnos sus datos, usted dispone de los siguientes derechos:</p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li><strong className="text-charcoal-700">Derecho de acceso:</strong> obtener información sobre sus datos personales y el tratamiento realizado.</li>
                <li><strong className="text-charcoal-700">Derecho de rectificación:</strong> modificar datos inexactos o incompletos.</li>
                <li><strong className="text-charcoal-700">Derecho a la limitación del tratamiento:</strong> restringir el uso de sus datos para ciertas finalidades.</li>
                <li><strong className="text-charcoal-700">Derecho de supresión:</strong> eliminar sus datos personales salvo obligación legal de conservación.</li>
                <li><strong className="text-charcoal-700">Derecho de portabilidad:</strong> recibir sus datos en formato estructurado y transmitirlos a otro responsable.</li>
                <li><strong className="text-charcoal-700">Derecho de oposición:</strong> oponerse al tratamiento de sus datos personales.</li>
              </ul>
              <p className="mt-4">
                Puede ejercer cualquiera de estos derechos por escrito a nuestro domicilio o mediante correo
                electrónico a{' '}
                <a href="mailto:dpd@octalia.es" className="text-terracotta-700 hover:underline">dpd@octalia.es</a>.
              </p>
              <p className="mt-4">
                Más información en la web de la Agencia Española de Protección de Datos:{' '}
                <a href="https://www.aepd.es" target="_blank" rel="noreferrer" className="text-terracotta-700 hover:underline">
                  www.aepd.es
                </a>.
              </p>

              <h3 className="mt-8 font-display text-xl text-charcoal-800">5. Redes sociales</h3>
              <p className="mt-4">
                La visita a los perfiles públicos de ALBANTA HOSPITALITY S.L. en redes sociales no supone la
                captación de datos personales salvo autorización expresa.
              </p>
              <p className="mt-4">
                Si el usuario tiene un perfil en la red social y decide unirse a la página de ALBANTA
                HOSPITALITY S.L., nos otorga su consentimiento para tratar los datos personales publicados en
                su perfil.
              </p>
              <p className="mt-4">
                ALBANTA HOSPITALITY S.L. solo accede a la información pública del usuario (como su nombre de
                contacto) y no incorpora estos datos a ningún fichero.
              </p>
              <p className="mt-4">Las acciones que podrá realizar la empresa incluyen:</p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>Acceder a la información pública del perfil.</li>
                <li>Publicar información en el perfil del usuario.</li>
                <li>Enviar mensajes personales o individuales a través de la red social.</li>
                <li>Publicar actualizaciones en la página que puedan mostrarse en el perfil del usuario.</li>
              </ul>
              <p className="mt-4">El usuario puede modificar su configuración de privacidad en cualquier momento.</p>

              <h3 className="mt-8 font-display text-xl text-charcoal-800">6. Protección y confidencialidad de sus datos</h3>
              <p className="mt-4">
                Adoptamos medidas técnicas y organizativas para garantizar la seguridad y confidencialidad de
                sus datos personales, evitando su pérdida, alteración o acceso no autorizado. Nuestro personal
                ha sido formado y ha asumido un compromiso de confidencialidad.
              </p>

              <h3 className="mt-8 font-display text-xl text-charcoal-800">7. Envío de comunicaciones</h3>
              <p className="mt-4">
                Los datos utilizados en las comunicaciones informativas o promocionales son tratados por
                ALBANTA HOSPITALITY S.L. con la finalidad de enviar electrónicamente información sobre
                servicios, actividades, publicaciones y eventos de la empresa o de terceros relacionados, así
                como para el seguimiento y optimización de campañas y la elaboración de perfiles comerciales.
              </p>
              <p className="mt-4">
                La base legal es el consentimiento expreso del usuario, que podrá revocarse en cualquier
                momento mediante el enlace de baja incluido en cada comunicación.
              </p>
              <p className="mt-4">
                Los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad pueden
                ejercerse escribiendo a{' '}
                <a href="mailto:dpd@octalia.es" className="text-terracotta-700 hover:underline">dpd@octalia.es</a>.
              </p>
              <p className="mt-4">
                Si no obtiene respuesta satisfactoria, puede presentar una reclamación ante la Agencia
                Española de Protección de Datos a través de su sede electrónica.
              </p>

              <h3 className="mt-8 font-display text-xl text-charcoal-800">8. Cookies y servicios de terceros</h3>
              <p className="mt-4">
                Este sitio web no utiliza cookies propias de analítica ni de publicidad, y no incorpora
                sistemas de seguimiento de terceros. Únicamente almacena en su navegador (mediante la
                tecnología local storage, no cookies) su preferencia de idioma, con el único fin de recordarla
                en su próxima visita.
              </p>
              <p className="mt-4">
                La página de ubicación incluye un mapa incrustado de Google Maps. Al cargarse, este servicio de
                Google Ireland Limited puede instalar sus propias cookies técnicas conforme a su propia
                política de privacidad, ajena a ALBANTA HOSPITALITY S.L. Puede consultar dicha política en{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terracotta-700 hover:underline"
                >
                  policies.google.com/privacy
                </a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}

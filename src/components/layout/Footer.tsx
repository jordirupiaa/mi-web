import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { BUSINESS_INFO } from '../../data/businessInfo'
import { buildDirectBookUrl } from '../../utils/directBook'
import { formatPhoneDisplay } from '../../utils/formatPhone'

// The Lloret de Mar location photos (Castell de Lloret, the church, the
// nightlife district, etc.) were taken by Leidy Giraldo, who asked for a
// discreet photo credit somewhere on the site — this small footer line is
// it, kept low-key since this is still a hotel's website first.
const PHOTOGRAPHER_NAME = 'Leidy Giraldo'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-sand-200 bg-charcoal-900 text-sand-100">
      <div className="container-hotel grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="font-display text-2xl text-warmwhite">Hotel Casa Mas</span>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand-200/80">{t('footer.tagline')}</p>
        </div>

        <div>
          <h3 className="font-display text-lg text-warmwhite">{t('footer.explore')}</h3>
          <ul className="mt-4 space-y-2 text-sm text-sand-200/80">
            <li><Link to="/habitaciones" className="hover:text-terracotta-300">{t('nav.rooms')}</Link></li>
            <li>
              <a href={buildDirectBookUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-terracotta-300">
                {t('footer.book')}
              </a>
            </li>
            <li><Link to="/nosotros" className="hover:text-terracotta-300">{t('nav.about')}</Link></li>
            <li><Link to="/ubicacion" className="hover:text-terracotta-300">{t('nav.location')}</Link></li>
            <li><Link to="/contacto" className="hover:text-terracotta-300">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-warmwhite">{t('footer.contact')}</h3>
          <ul className="mt-4 space-y-3 text-sm text-sand-200/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-300" aria-hidden="true" />
              <span>{BUSINESS_INFO.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-terracotta-300" aria-hidden="true" />
              <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-terracotta-300">{formatPhoneDisplay(BUSINESS_INFO.phone)}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-terracotta-300" aria-hidden="true" />
              <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-terracotta-300">{BUSINESS_INFO.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-warmwhite/10">
        <div className="container-hotel flex flex-col items-center justify-between gap-3 py-6 text-xs text-sand-200/60 md:flex-row">
          <p>
            © {year} Hotel Casa Mas. {t('footer.rights')}{' '}
            <span className="text-sand-200/40">· {t('footer.photoCredit', { name: PHOTOGRAPHER_NAME })}</span>
          </p>
          <div className="flex items-center gap-5">
            <Link to="/legal" className="hover:text-terracotta-300">
              {t('footer.legal')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

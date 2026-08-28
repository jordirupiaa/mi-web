import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { buildDirectBookUrl } from '../../utils/directBook'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const transparent = isHome && !scrolled && !open

  const LINKS = [
    { to: '/', label: t('nav.home') },
    { to: '/habitaciones', label: t('nav.rooms') },
    { to: '/nosotros', label: t('nav.about') },
    { to: '/ubicacion', label: t('nav.location') },
    { to: '/contacto', label: t('nav.contact') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        transparent ? 'bg-transparent' : 'bg-warmwhite/95 shadow-soft backdrop-blur'
      }`}
    >
      <nav className="container-hotel flex h-20 items-center justify-between" aria-label="Principal">
        <Link to="/" className="flex flex-col leading-tight" aria-label={t('nav.homeAria')}>
          <span
            className={`font-display text-2xl tracking-wide ${transparent ? 'text-warmwhite' : 'text-charcoal-800'}`}
          >
            Casa Mas
          </span>
          <span
            className={`text-[0.65rem] uppercase tracking-[0.3em] ${
              transparent ? 'text-warmwhite/80' : 'text-terracotta-600'
            }`}
          >
            Lloret de Mar
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors ${
                  transparent
                    ? isActive
                      ? 'text-warmwhite'
                      : 'text-warmwhite/80 hover:text-warmwhite'
                    : isActive
                      ? 'text-terracotta-600'
                      : 'text-charcoal-700 hover:text-terracotta-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <LanguageSwitcher transparent={transparent} />
          <a
            href={buildDirectBookUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-2 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium tracking-wide transition-colors duration-200 ${
              transparent
                ? 'border border-warmwhite/70 text-warmwhite hover:bg-warmwhite/10'
                : 'bg-terracotta-600 text-warmwhite hover:bg-terracotta-700'
            }`}
          >
            {t('nav.bookNow')}
          </a>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <LanguageSwitcher transparent={transparent} />
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${
              transparent ? 'text-warmwhite' : 'text-charcoal-800'
            }`}
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-sand-200 bg-warmwhite md:hidden">
          <div className="container-hotel flex flex-col gap-1 py-4">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-base font-medium ${
                    isActive ? 'bg-sand-100 text-terracotta-600' : 'text-charcoal-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href={buildDirectBookUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-terracotta-600 px-6 py-3 text-center text-sm font-semibold text-warmwhite"
            >
              {t('nav.bookNow')}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

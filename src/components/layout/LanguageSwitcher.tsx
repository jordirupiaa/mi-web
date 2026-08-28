import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { SUPPORTED_LANGUAGES } from '../../i18n'

export function LanguageSwitcher({ transparent }: { transparent: boolean }) {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = SUPPORTED_LANGUAGES.find((l) => l.code === i18n.resolvedLanguage) ?? SUPPORTED_LANGUAGES[0]

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('languageSwitcher.label')}
        className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
          transparent ? 'text-warmwhite/90 hover:text-warmwhite' : 'text-charcoal-700 hover:text-terracotta-600'
        }`}
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="uppercase">{current.code}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-2xl bg-warmwhite py-1.5 shadow-lifted ring-1 ring-sand-200"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                role="option"
                aria-selected={lang.code === current.code}
                onClick={() => handleSelect(lang.code)}
                className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm ${
                  lang.code === current.code ? 'text-terracotta-600' : 'text-charcoal-700 hover:bg-sand-50'
                }`}
              >
                {lang.label}
                <span className="text-xs uppercase text-charcoal-400">{lang.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

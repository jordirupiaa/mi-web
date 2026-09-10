import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export interface ConsentValue {
  /** Strictly necessary storage (this consent choice itself, the language preference) — never optional, always on. */
  necessary: true
  analytics: boolean
  marketing: boolean
}

interface StoredConsent extends ConsentValue {
  consentedAt: string
  version: number
}

const STORAGE_KEY = 'casamas-cookie-consent'
/**
 * Bump this if the cookie policy changes in a way that should invalidate
 * everyone's previous choice and show the banner again (e.g. a new category
 * of cookie is introduced) — a stored consent with an old version number is
 * treated as if it didn't exist.
 */
const CONSENT_VERSION = 1

function readStoredConsent(): ConsentValue | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<StoredConsent>
    if (parsed.version !== CONSENT_VERSION) return null
    return { necessary: true, analytics: !!parsed.analytics, marketing: !!parsed.marketing }
  } catch {
    return null
  }
}

function writeStoredConsent(value: Omit<ConsentValue, 'necessary'>): void {
  try {
    const record: StoredConsent = {
      necessary: true,
      analytics: value.analytics,
      marketing: value.marketing,
      consentedAt: new Date().toISOString(),
      version: CONSENT_VERSION,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch {
    // Private browsing / storage disabled — the choice just won't persist
    // across visits; the banner will show again next time, which is the
    // safe default (never assume consent that was never actually recorded).
  }
}

interface CookieConsentContextValue {
  /** null until the first-visit choice has actually been made (or the earlier stored one loaded). */
  consent: ConsentValue | null
  /** True once client-side localStorage has been checked — avoids flashing the banner for returning visitors before we know their choice. */
  hydrated: boolean
  preferencesOpen: boolean
  /**
   * The cookie banner's own measured height in pixels, reported by
   * CookieBanner itself (via a ResizeObserver — its text wraps to a
   * different number of lines per language and per viewport width, so a
   * fixed guess isn't reliable). Other fixed-position UI that would
   * otherwise sit underneath the banner — the chat toggle in
   * ChatWidget.tsx — reads this to move itself clear instead of
   * overlapping it.
   */
  bannerHeight: number
  setBannerHeight: (height: number) => void
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: (choice: { analytics: boolean; marketing: boolean }) => void
  openPreferences: () => void
  closePreferences: () => void
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null)

/**
 * Cookie/local-storage consent, per RGPD + LSSI/AEPD guidance: nothing
 * beyond strictly necessary storage runs until the visitor has actively
 * chosen "Aceptar todas" (or ticked a category in "Configurar") — never
 * pre-ticked, never assumed from continued browsing. As of this file,
 * there are no analytics or marketing scripts anywhere in this codebase to
 * actually gate; this context and src/utils/cookieConsent.ts's
 * `hasConsent()` are the mechanism a *future* script (Google Analytics,
 * Meta Pixel...) MUST check before injecting itself — see the comment
 * there. Today, "analytics"/"marketing" toggles genuinely do nothing
 * observable yet, which is honest: there's nothing to turn on or off.
 */
export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentValue | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [preferencesOpen, setPreferencesOpen] = useState(false)
  const [bannerHeight, setBannerHeight] = useState(0)

  useEffect(() => {
    setConsent(readStoredConsent())
    setHydrated(true)
  }, [])

  const acceptAll = useCallback(() => {
    const value: ConsentValue = { necessary: true, analytics: true, marketing: true }
    writeStoredConsent(value)
    setConsent(value)
    setPreferencesOpen(false)
  }, [])

  const rejectAll = useCallback(() => {
    const value: ConsentValue = { necessary: true, analytics: false, marketing: false }
    writeStoredConsent(value)
    setConsent(value)
    setPreferencesOpen(false)
  }, [])

  const savePreferences = useCallback((choice: { analytics: boolean; marketing: boolean }) => {
    const value: ConsentValue = { necessary: true, analytics: choice.analytics, marketing: choice.marketing }
    writeStoredConsent(value)
    setConsent(value)
    setPreferencesOpen(false)
  }, [])

  const openPreferences = useCallback(() => setPreferencesOpen(true), [])
  const closePreferences = useCallback(() => setPreferencesOpen(false), [])

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      hydrated,
      preferencesOpen,
      bannerHeight,
      setBannerHeight,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences,
      closePreferences,
    }),
    [
      consent,
      hydrated,
      preferencesOpen,
      bannerHeight,
      setBannerHeight,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences,
      closePreferences,
    ]
  )

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) throw new Error('useCookieConsent must be used within a CookieConsentProvider')
  return ctx
}

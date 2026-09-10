/**
 * Reads the visitor's stored cookie consent choice directly (outside
 * React, no hook) — for a *future* analytics/marketing script loader to
 * check before injecting a <script> tag, e.g.:
 *
 *   if (hasConsent('analytics')) loadGoogleAnalytics()
 *
 * There is no such loader anywhere in this codebase today — no Google
 * Analytics, no Meta/Facebook Pixel, nothing. This function exists so that
 * if/when one is ever added, it has an established, correct place to check
 * consent from day one, instead of that check being invented ad hoc (or
 * skipped) later. Mirrors the storage format in
 * src/context/CookieConsentContext.tsx — keep both in sync if that ever
 * changes.
 */
export function hasConsent(category: 'analytics' | 'marketing'): boolean {
  try {
    const raw = localStorage.getItem('casamas-cookie-consent')
    if (!raw) return false
    const parsed = JSON.parse(raw) as { version?: number; analytics?: boolean; marketing?: boolean }
    if (parsed.version !== 1) return false
    return !!parsed[category]
  } catch {
    return false
  }
}

import { useEffect } from 'react'

interface PageSeoProps {
  title: string
  description: string
}

/**
 * The very first load of any page already has the right <title>/<meta
 * description> baked in statically — scripts/prerender.mjs generates a real
 * index.html per page × language at build time specifically so crawlers and
 * link-preview bots see correct, page-specific tags without running any
 * JavaScript. This component is what keeps that correct on *client-side*
 * navigation afterwards: react-router swaps pages without a full reload, so
 * without this every route visited after the first would keep showing
 * whatever title/description happened to be in the document already — bad
 * for browser tabs/bookmarks, irrelevant to crawlers (they load each URL
 * fresh, getting the prerendered tags directly). Each page component
 * renders <PageSeo> once with its own translated title/description; this
 * hook swaps document.title and the <meta name="description"> tag on
 * mount/route change and restores the previous values on unmount, so
 * navigating between pages never leaves a stale title behind.
 */
export function PageSeo({ title, description }: PageSeoProps) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousDescription = meta?.getAttribute('content') ?? ''
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)

    return () => {
      document.title = previousTitle
      meta?.setAttribute('content', previousDescription)
    }
  }, [title, description])

  return null
}

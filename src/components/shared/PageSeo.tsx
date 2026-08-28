import { useEffect } from 'react'

interface PageSeoProps {
  title: string
  description: string
}

/**
 * This is a single-page app served from one static index.html, so without
 * this component every route shares the exact same <title> and meta
 * description — bad for browser tabs/bookmarks and for how each page would
 * appear in search results. Each page component renders <PageSeo> once with
 * its own translated title/description; this hook swaps document.title and
 * the <meta name="description"> tag on mount/route change and restores the
 * previous values on unmount, so navigating between pages never leaves a
 * stale title behind.
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

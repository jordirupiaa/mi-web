import { useEffect, useRef, useState, type TouchEvent } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'

interface RoomGalleryProps {
  images: string[]
  alt: string
}

/**
 * Photo carousel for a room card: arrows + dots to browse when there's more
 * than one photo, and a click-to-expand full-screen lightbox for a closer
 * look. Every image in the room's src/assets/rooms/<tipo>/ folder shows up
 * here automatically (see src/data/images.ts).
 *
 * The lightbox is rendered through a portal straight into <body>, not nested
 * inside the card. This matters: the room card animates on hover with a CSS
 * transform, and a `position: fixed` element nested inside a transformed
 * ancestor stops being fixed to the viewport — it gets boxed into that
 * ancestor instead, which is what caused the "opens tiny/glitches while
 * hovering" bug. Portaling to <body> sidesteps that entirely.
 */
/** Minimum horizontal drag, in pixels, before a touch gesture counts as a swipe. */
const SWIPE_THRESHOLD_PX = 40

export function RoomGallery({ images, alt }: RoomGalleryProps) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const hasMultiple = images.length > 1
  const touchStartX = useRef<number | null>(null)

  const goTo = (next: number) => setIndex((next + images.length) % images.length)

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (!hasMultiple || Math.abs(delta) < SWIPE_THRESHOLD_PX) return
    goTo(delta < 0 ? index + 1 : index - 1)
  }

  useEffect(() => {
    if (!lightboxOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') goTo(index + 1)
      if (e.key === 'ArrowLeft') goTo(index - 1)
    }
    window.addEventListener('keydown', onKeyDown)

    // Freeze background scroll while the lightbox is open.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, index])

  return (
    <>
      <div
        className="group/gallery relative aspect-[4/3] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="block h-full w-full cursor-zoom-in"
          aria-label={alt}
        >
          <img
            src={images[index]}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover/gallery:scale-105"
            loading="lazy"
          />
        </button>

        <span className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-charcoal-900/50 text-warmwhite opacity-100 transition-opacity md:opacity-0 md:group-hover/gallery:opacity-100">
          <Expand className="h-4 w-4" aria-hidden="true" />
        </span>

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                goTo(index - 1)
              }}
              aria-label={t('roomGallery.prevPhoto')}
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal-900/50 text-warmwhite opacity-100 transition-opacity md:opacity-0 md:group-hover/gallery:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                goTo(index + 1)
              }}
              aria-label={t('roomGallery.nextPhoto')}
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal-900/50 text-warmwhite opacity-100 transition-opacity md:opacity-0 md:group-hover/gallery:opacity-100"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIndex(i)
                  }}
                  aria-label={t('roomGallery.photoNumber', { n: i + 1 })}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-4 bg-warmwhite' : 'w-1.5 bg-warmwhite/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {lightboxOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-900/95 p-4 backdrop-blur-sm"
            onClick={(e) => {
              // Only close when the backdrop itself is clicked, never a child —
              // more robust than relying on every child to stopPropagation.
              if (e.target === e.currentTarget) setLightboxOpen(false)
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label={t('roomGallery.close')}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-warmwhite/10 text-warmwhite transition-colors hover:bg-warmwhite/20"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <img
              src={images[index]}
              alt={alt}
              className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-lifted"
            />

            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  aria-label={t('roomGallery.prevPhoto')}
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-warmwhite/10 text-warmwhite transition-colors hover:bg-warmwhite/20 sm:left-6"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  aria-label={t('roomGallery.nextPhoto')}
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-warmwhite/10 text-warmwhite transition-colors hover:bg-warmwhite/20 sm:right-6"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>
                <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-warmwhite/10 px-3 py-1 text-sm text-warmwhite">
                  {index + 1} / {images.length}
                </p>
              </>
            )}
          </div>,
          document.body
        )}
    </>
  )
}

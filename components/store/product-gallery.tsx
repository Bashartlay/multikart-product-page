'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export function ProductGallery({
  images,
  alt,
  activeIndex,
  onChange,
}: {
  images: string[]
  alt: string
  activeIndex: number
  onChange: (index: number) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbsRef = useRef<HTMLUListElement>(null)
  const visibleIndexRef = useRef(activeIndex)
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dragState = useRef<{ x: number; left: number } | null>(null)
  const [dragging, setDragging] = useState(false)
  const hasMany = images.length > 1

  const showAdjacentImage = (direction: 1 | -1) => {
    onChange((activeIndex + direction + images.length) % images.length)
  }

  // Keep the swipe track in sync when the index changes from arrows, thumbnails, or a colour switch.
  useEffect(() => {
    const track = trackRef.current
    if (!track || visibleIndexRef.current === activeIndex) return
    visibleIndexRef.current = activeIndex
    track.scrollTo({ left: activeIndex * track.clientWidth, behavior: 'smooth' })
  }, [activeIndex])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    visibleIndexRef.current = 0
    track.scrollTo({ left: 0 })
  }, [images])

  useEffect(() => {
    const list = thumbsRef.current
    const thumb = list?.children[activeIndex] as HTMLElement | undefined
    if (list && thumb) list.scrollTo({ left: thumb.offsetLeft - list.offsetLeft, behavior: 'smooth' })
  }, [activeIndex])

  useEffect(() => () => {
    if (scrollTimer.current) clearTimeout(scrollTimer.current)
  }, [])

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    if (scrollTimer.current) clearTimeout(scrollTimer.current)
    scrollTimer.current = setTimeout(() => {
      const index = Math.round(track.scrollLeft / track.clientWidth)
      if (index !== visibleIndexRef.current) {
        visibleIndexRef.current = index
        onChange(index)
      }
    }, 80)
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !hasMany || !trackRef.current) return
    dragState.current = { x: e.clientX, left: trackRef.current.scrollLeft }
    setDragging(true)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!dragState.current || !track) return
    const delta = e.clientX - dragState.current.x
    track.scrollLeft = dragState.current.left - delta
  }

  const endDrag = () => {
    const track = trackRef.current
    if (!dragState.current || !track) return
    const delta = track.scrollLeft - dragState.current.left
    const width = track.clientWidth
    let index = Math.round(dragState.current.left / width)
    if (Math.abs(delta) > width * 0.15) index += delta > 0 ? 1 : -1
    index = Math.max(0, Math.min(images.length - 1, index))
    dragState.current = null
    setDragging(false)
    track.scrollTo({ left: index * width, behavior: 'smooth' })
  }

  return (
    <div className="flex min-w-0 flex-col gap-4 md:gap-6">
      <div className="group relative aspect-[6/7] overflow-hidden bg-muted">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault()
              showAdjacentImage(-1)
            }
            if (event.key === 'ArrowRight') {
              event.preventDefault()
              showAdjacentImage(1)
            }
          }}
          tabIndex={0}
          className={cn(
            'no-scrollbar flex size-full overflow-x-auto overscroll-x-contain',
            dragging ? 'cursor-grabbing select-none' : 'snap-x snap-mandatory',
            hasMany && !dragging && 'cursor-grab',
          )}
          role="region"
          aria-roledescription="carousel"
          aria-label="Product images"
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="relative size-full shrink-0 snap-center snap-always"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${images.length}`}
            >
              <Image
                src={src}
                alt={`${alt} - view ${i + 1}`}
                fill
                priority={i === 0}
                draggable={false}
                sizes="(min-width: 992px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="pointer-events-none object-cover"
              />
            </div>
          ))}
        </div>

        <span className="pointer-events-none absolute top-4 left-4 bg-background px-2.5 py-1 text-xs font-semibold tracking-[0.15em] text-primary uppercase">
          Featured
        </span>

        {hasMany && (
          <>
            <button
              type="button"
              onClick={() => showAdjacentImage(-1)}
              aria-label="Previous image"
              className="absolute top-1/2 left-3 flex size-8 -translate-y-1/2 items-center justify-center bg-background/90 text-foreground shadow-sm transition-all hover:bg-primary hover:text-primary-foreground md:size-7"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => showAdjacentImage(1)}
              aria-label="Next image"
              className="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 items-center justify-center bg-background/90 text-foreground shadow-sm transition-all hover:bg-primary hover:text-primary-foreground md:size-7"
            >
              <ChevronRight className="size-4" />
            </button>
            <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden" aria-hidden="true">
              {images.map((src, i) => (
                <span
                  key={src}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    i === activeIndex ? 'w-5 bg-primary' : 'w-1.5 bg-foreground/30',
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {hasMany && (
        <ul ref={thumbsRef} className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto md:gap-4" aria-label="Product thumbnails">
          {images.map((src, i) => (
            <li key={src} className="shrink-0 basis-[calc(33.333%-8px)] snap-start sm:basis-[calc(50%-8px)]">
              <button
                type="button"
                onClick={() => onChange(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === activeIndex}
                className={cn(
                  'relative block aspect-[17/19] w-full overflow-hidden border bg-muted transition-all duration-300',
                  i === activeIndex ? 'border-primary' : 'border-border opacity-70 hover:opacity-100',
                )}
              >
                <Image src={src} alt="" fill sizes="180px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

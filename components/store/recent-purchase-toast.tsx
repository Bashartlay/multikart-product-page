'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const recentPurchases = [
  { name: 'Minimal Long Board', image: '/images/long-board.jpg', time: '52 Minutes Ago' },
  { name: 'Grey Sport Set', image: '/products/related-1.jpg', time: '12 Minutes Ago' },
  { name: 'Athleisure Set', image: '/products/related-3.jpg', time: '1 Hour Ago' },
  { name: 'Fitted Coords Set (Grey)', image: '/products/related-2.jpg', time: '24 Minutes Ago' },
]

export function RecentPurchaseToast() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) return

    let hideTimer: number | undefined
    let advanceTimer: number | undefined

    const show = () => {
      setVisible(true)
      hideTimer = window.setTimeout(() => {
        setVisible(false)
        advanceTimer = window.setTimeout(
          () => setIndex((currentIndex) => (currentIndex + 1) % recentPurchases.length),
          600,
        )
      }, 6000)
    }

    const firstTimer = window.setTimeout(show, 4000)
    const cycleTimer = window.setInterval(show, 14000)

    return () => {
      window.clearTimeout(firstTimer)
      window.clearTimeout(hideTimer)
      window.clearTimeout(advanceTimer)
      window.clearInterval(cycleTimer)
    }
  }, [dismissed])

  const item = recentPurchases[index]

  return (
    <div
      role="status"
      aria-live="polite"
      inert={!visible || dismissed}
      className={cn(
        'fixed bottom-20 left-3 z-40 w-[min(calc(100vw-24px),390px)] transition-all duration-500 md:bottom-5 md:left-5',
        visible && !dismissed ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[130%] opacity-0',
      )}
    >
      <div className="relative flex items-center gap-4 border border-border bg-background p-3 pr-9 shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
        <div className="relative h-[72px] w-16 shrink-0 overflow-hidden">
          <Image src={item.image} alt="" fill sizes="64px" className="object-contain" />
        </div>
        <div className="min-w-0 text-sm">
          <p className="font-medium text-foreground">Someone recently purchase this item</p>
          <p className="truncate text-primary">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.time}</p>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss notification"
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

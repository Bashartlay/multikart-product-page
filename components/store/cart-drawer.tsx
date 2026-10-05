'use client'

import Image from 'next/image'
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { formatPrice } from '@/lib/product-data'
import { cn } from '@/lib/utils'
import { FREE_SHIPPING_THRESHOLD, useCart } from './cart-context'

const confettiColors = ['var(--primary)', 'var(--ink)', '#f5c542', '#3fa7d6', '#59cd90', '#ee6352']

function Confetti() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 36 }).map((_, i) => {
        const left = (i * 37) % 100
        const delay = ((i * 13) % 20) / 10
        const duration = 2.2 + ((i * 7) % 10) / 10
        const drift = ((i % 2 ? 1 : -1) * ((i * 11) % 40)) + 'px'
        return (
          <span
            key={i}
            className="absolute block"
            style={
              {
                left: `${left}%`,
                width: i % 3 ? 6 : 8,
                height: i % 3 ? 12 : 8,
                borderRadius: i % 3 ? 1 : 999,
                background: confettiColors[i % confettiColors.length],
                animation: `confetti-drop ${duration}s ${delay}s ease-in infinite`,
                '--drift': drift,
                '--spin': `${360 + ((i * 47) % 360)}deg`,
              } as React.CSSProperties
            }
          />
        )
      })}
    </div>
  )
}

export function CartDrawer() {
  const { items, count, subtotal, drawerOpen, setDrawerOpen, updateQuantity, removeItem } = useCart()
  const closeRef = useRef<HTMLButtonElement>(null)

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  const unlocked = remaining === 0 && items.length > 0

  useEffect(() => {
    if (!drawerOpen) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    closeRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [drawerOpen, setDrawerOpen])

  return (
    <div inert={!drawerOpen} className={cn('fixed inset-0 z-[75]', !drawerOpen && 'pointer-events-none')}>
      <div
        aria-hidden="true"
        onClick={() => setDrawerOpen(false)}
        className={cn(
          'absolute inset-0 bg-ink/50 transition-opacity duration-300',
          drawerOpen ? 'opacity-100' : 'opacity-0',
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={cn(
          'absolute inset-y-0 right-0 flex w-[min(92vw,410px)] flex-col bg-background shadow-2xl transition-transform duration-500 ease-out',
          drawerOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id="cart-title" className="text-lg font-semibold text-foreground">
            My Cart ({count})
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close cart"
            className="text-foreground transition-transform duration-300 hover:rotate-90 hover:text-primary"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="relative overflow-hidden border-b border-border px-5 py-5">
          {unlocked && drawerOpen && <Confetti />}
          <p className="relative text-sm text-foreground">
            {unlocked ? (
              <>
                <span className="font-semibold text-primary">Congratulations!</span> You&apos;ve got free shipping.
              </>
            ) : (
              <>
                Spend <span className="font-semibold text-primary">{formatPrice(remaining)}</span> more and enjoy{' '}
                <span className="font-semibold">FREE SHIPPING!</span>
              </>
            )}
          </p>
          <div className="relative mt-5 h-2.5 bg-muted">
            <div
              className="h-full animate-stripes bg-primary bg-[length:1rem_1rem] bg-[linear-gradient(45deg,rgba(255,255,255,0.25)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.25)_50%,rgba(255,255,255,0.25)_75%,transparent_75%,transparent)] transition-[width] duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
            <span
              className="absolute top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary bg-background text-primary transition-[left] duration-700 ease-out"
              style={{ left: `${Math.max(progress, 6)}%` }}
              aria-hidden="true"
            >
              <Truck className="size-4" />
            </span>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="size-14 text-muted-foreground" aria-hidden="true" />
            <p className="text-lg font-semibold text-foreground">Your cart is empty</p>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="mt-2 bg-primary px-6 py-3 text-sm font-semibold tracking-wide text-primary-foreground uppercase hover:bg-ink"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto px-5">
            {items.map((item) => (
              <li key={item.id} className="flex animate-in gap-4 border-b border-border py-4 fade-in slide-in-from-right-4">
                <div className="relative size-20 shrink-0 overflow-hidden bg-muted">
                  <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <p className="truncate font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} x <span className="text-primary">{formatPrice(item.price)}</span>
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-center border border-border">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name}`}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex size-7 items-center justify-center hover:text-primary"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-7 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name}`}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex size-7 items-center justify-center hover:text-primary"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-border px-5 py-5">
            <p className="flex items-center justify-between text-base font-semibold text-foreground">
              Subtotal:
              <span className="text-primary">{formatPrice(subtotal)}</span>
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="h-12 border border-primary text-sm font-semibold tracking-wide text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                View Cart
              </button>
              <button
                type="button"
                className="h-12 bg-primary text-sm font-semibold tracking-wide text-primary-foreground uppercase transition-colors hover:bg-ink"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}

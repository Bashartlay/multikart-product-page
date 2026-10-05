'use client'

import { Heart, House, Search, ShoppingBag, User, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useCart } from './cart-context'

type MobileNavItem = {
  label: string
  Icon: LucideIcon
  onClick: () => void
  badge?: number
}

export function MobileBottomNav() {
  const { count, wishlist, setDrawerOpen, setSearchOpen } = useCart()
  const [active, setActive] = useState('Home')

  const items: MobileNavItem[] = [
    { label: 'Home', Icon: House, onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'Search', Icon: Search, onClick: () => setSearchOpen(true) },
    { label: 'Cart', Icon: ShoppingBag, onClick: () => setDrawerOpen(true), badge: count },
    { label: 'Wishlist', Icon: Heart, onClick: () => undefined, badge: wishlist.size },
    { label: 'User', Icon: User, onClick: () => undefined },
  ]

  return (
    <nav
      aria-label="Mobile quick links"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background shadow-[0_-4px_16px_rgba(0,0,0,0.06)] md:hidden"
    >
      <ul className="grid grid-cols-5">
        {items.map(({ label, Icon, onClick, badge }) => {
          const isActive = active === label

          return (
            <li key={label}>
              <button
                type="button"
                onClick={() => {
                  setActive(label)
                  onClick()
                }}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative flex w-full flex-col items-center gap-1 pt-3 pb-4 text-sm transition-colors',
                  isActive ? 'font-semibold text-foreground' : 'text-muted-foreground',
                )}
              >
                <span className="relative">
                  <Icon className={cn('size-5 transition-transform', isActive && '-translate-y-0.5')} aria-hidden="true" />
                  {!!badge && (
                    <span className="absolute -top-2 -right-2.5 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-primary-foreground">
                      {badge}
                    </span>
                  )}
                </span>
                {label}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute bottom-0 size-2 translate-y-1/2 rounded-full bg-primary transition-transform duration-300',
                    isActive ? 'scale-100' : 'scale-0',
                  )}
                />
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

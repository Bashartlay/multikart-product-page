'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

export type CartItem = {
  id: string
  name: string
  image: string
  price: number
  quantity: number
}

export const FREE_SHIPPING_THRESHOLD = 50

const initialItems: CartItem[] = [
  { id: 'grey-sport-set', name: 'Grey Sport Set', image: '/products/related-1.jpg', price: 12.6, quantity: 1 },
  { id: 'athleisure-set', name: 'Athleisure Set', image: '/products/related-3.jpg', price: 17.1, quantity: 1 },
  { id: 'sport-set-green', name: 'Sport Set (Green/S)', image: '/products/related-4.jpg', price: 9, quantity: 1 },
]

type CartContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  wishlist: Set<string>
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  toggleWishlist: (id: string) => void
  notify: (message: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(initialItems)
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const noticeTimerRef = useRef<number | undefined>(undefined)

  const notify = useCallback((message: string) => {
    window.clearTimeout(noticeTimerRef.current)
    setNotice(message)
    noticeTimerRef.current = window.setTimeout(() => setNotice(null), 2400)
  }, [])

  useEffect(() => () => window.clearTimeout(noticeTimerRef.current), [])

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i))
      }
      return [...prev, { ...item, quantity }]
    })
    setDrawerOpen(true)
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)))
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const toggleWishlist = useCallback(
    (id: string) => {
      setWishlist((prev) => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
          notify('Removed from wishlist')
        } else {
          next.add(id)
          notify('Added to wishlist')
        }
        return next
      })
    },
    [notify],
  )

  const value = useMemo(() => {
    const count = items.reduce((sum, i) => sum + i.quantity, 0)
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return {
      items,
      count,
      subtotal,
      wishlist,
      drawerOpen,
      setDrawerOpen,
      searchOpen,
      setSearchOpen,
      addToCart,
      updateQuantity,
      removeItem,
      toggleWishlist,
      notify,
    }
  }, [items, wishlist, drawerOpen, searchOpen, addToCart, updateQuantity, removeItem, toggleWishlist, notify])

  return (
    <CartContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed top-6 left-1/2 z-[80] -translate-x-1/2"
      >
        {notice && (
          <p className="animate-in fade-in slide-in-from-top-2 bg-ink px-5 py-3 text-sm whitespace-nowrap text-ink-foreground shadow-lg">
            {notice}
          </p>
        )}
      </div>
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }

  return context
}

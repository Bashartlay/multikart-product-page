'use client'

import { ChevronDown, ChevronRight, Heart, Menu, Phone, Search, ShoppingCart, User, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Logo } from './brand'
import { useCart } from './cart-context'

const navItems = [
  { label: 'Home', links: [] },
  { label: 'Collection', links: ['Collection Left Sidebar', 'Collection Right Sidebar', 'Collection No Sidebar', 'Collection List View'] },
  { label: 'Product', links: ['Product Thumbnail', 'Product 4 Image', 'Product Sticky', 'Product Accordion'] },
  { label: 'Mega Menu', links: ['Fashion', 'Electronics', 'Furniture', 'Vegetables', 'Bags', 'Shoes'] },
  { label: 'Blogs', links: ['Blog Left Sidebar', 'Blog Right Sidebar', 'Blog Details'] },
  { label: 'Pages', links: ['About Us', 'Cart', 'Wishlist', 'Compare', 'FAQ', 'Contact'] },
  { label: 'Seller', links: ['Become a Seller', 'Seller Dashboard', 'Seller Store'] },
]

function TopBarDropdown({ label, options, flag }: { label: string; options: string[]; flag?: boolean }) {
  return (
    <div className="group relative">
      <button
        type="button"
        aria-haspopup="true"
        className="flex h-10 items-center gap-2 uppercase transition-colors hover:text-primary"
      >
        {flag && (
          <span
            aria-hidden="true"
            className="inline-block h-3 w-5 rounded-[1px] bg-[repeating-linear-gradient(180deg,#b22234_0_2px,#fff_2px_4px)]"
          />
        )}
        {label}
        <ChevronDown className="size-3.5 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" aria-hidden="true" />
      </button>
      <ul className="invisible absolute top-full right-0 z-[60] min-w-32 translate-y-2 bg-background py-2 text-foreground opacity-0 shadow-lg transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {options.map((opt) => (
          <li key={opt}>
            <button type="button" className="w-full px-4 py-1.5 text-left text-sm font-normal normal-case hover:text-primary">
              {opt}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return

    const frame = window.requestAnimationFrame(() => inputRef.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [open])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
      inert={!open}
      className={cn(
        'fixed inset-0 z-[70] flex items-start justify-center bg-ink/90 px-4 pt-[20vh] transition-opacity duration-300',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close search"
        className="absolute top-6 right-6 text-ink-foreground transition-transform hover:rotate-90"
      >
        <X className="size-8" />
      </button>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={cn(
          'flex w-full max-w-2xl items-center border-b-2 border-ink-foreground/60 transition-transform duration-500',
          open ? 'translate-y-0' : '-translate-y-6',
        )}
      >
        <label htmlFor="site-search" className="sr-only">
          Search
        </label>
        <input
          ref={inputRef}
          id="site-search"
          type="search"
          placeholder="Search a Product"
          className="h-16 flex-1 bg-transparent text-xl text-ink-foreground outline-none placeholder:text-ink-foreground/60 md:text-2xl"
        />
        <button type="submit" aria-label="Submit search" className="text-ink-foreground hover:text-primary">
          <Search className="size-6" />
        </button>
      </form>
    </div>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div inert={!open} className={cn('fixed inset-0 z-[70] xl:hidden', !open && 'pointer-events-none')}>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn('absolute inset-0 bg-ink/50 transition-opacity duration-300', open ? 'opacity-100' : 'opacity-0')}
      />
      <nav
        aria-label="Mobile"
        className={cn(
          'absolute inset-y-0 left-0 flex w-[min(85vw,320px)] flex-col bg-background shadow-xl transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="text-lg font-semibold text-foreground">Menu</span>
          <button type="button" onClick={onClose} aria-label="Close menu" className="text-foreground hover:text-primary">
            <X className="size-5" />
          </button>
        </div>
        <ul className="flex-1 overflow-y-auto px-5 py-2">
          {navItems.map((item) => {
            const isOpen = expanded === item.label
            return (
              <li key={item.label} className="border-b border-border last:border-0">
                {item.links.length ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      className="flex w-full items-center justify-between py-3.5 font-medium text-foreground hover:text-primary"
                    >
                      {item.label}
                      <ChevronRight className={cn('size-4 transition-transform', isOpen && 'rotate-90')} aria-hidden="true" />
                    </button>
                    <ul
                      className={cn(
                        'grid overflow-hidden transition-all duration-300',
                        isOpen ? 'grid-rows-[1fr] pb-3' : 'grid-rows-[0fr]',
                      )}
                    >
                      <li className="min-h-0">
                        <ul className="flex flex-col gap-2.5 pl-3">
                          {item.links.map((link) => (
                            <li key={link}>
                              <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </>
                ) : (
                  <a href="#" className="block py-3.5 font-medium text-foreground hover:text-primary">
                    {item.label}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export function SiteHeader() {
  const { count, wishlist, setDrawerOpen, searchOpen, setSearchOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen && !searchOpen) return

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setSearchOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen, searchOpen, setSearchOpen])

  return (
    <>
      <div className="bg-ink text-ink-foreground/80">
        <div className="container-store flex h-10 items-center justify-end text-sm sm:justify-between">
          <p className="hidden items-center gap-2 sm:flex">
            <Phone className="size-3.5 text-primary" aria-hidden="true" />
            Call Us: 123 - 456 - 7890
          </p>
          <div className="flex items-center gap-3 text-sm font-medium text-ink-foreground">
            <TopBarDropdown label="English" options={['English', 'Français', 'Español', 'Deutsch']} flag />
            <span className="h-5 w-px bg-ink-foreground/20" aria-hidden="true" />
            <TopBarDropdown label="USD" options={['USD', 'EUR', 'GBP', 'INR']} />
          </div>
        </div>
      </div>

      <header
        className={cn(
          'sticky top-0 z-50 bg-background transition-shadow',
          scrolled && 'animate-header-down shadow-[0_2px_12px_rgba(0,0,0,0.08)]',
        )}
      >
        <div className="container-store flex h-[62px] items-center justify-between gap-4 md:h-[84px]">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="text-primary xl:hidden"
          >
            <Menu className="size-6" />
          </button>

          <a href="#" aria-label="Multikart home" className="max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2">
            <Logo className="text-2xl md:text-[32px]" />
          </a>

          <div className="flex items-center gap-6 md:ml-auto xl:ml-0">
            <nav aria-label="Main" className="hidden xl:block">
              <ul className="flex items-center gap-4">
                {navItems.map((item) => (
                  <li key={item.label} className="group relative">
                    <a
                      href="#"
                      className="flex items-center gap-1.5 py-8 text-[17px] tracking-wide text-foreground transition-colors group-hover:text-primary"
                    >
                      {item.label}
                      {item.links.length > 0 && (
                        <ChevronDown
                          className="size-3.5 transition-transform duration-300 group-hover:rotate-180"
                          aria-hidden="true"
                        />
                      )}
                    </a>
                    {item.links.length > 0 && (
                      <ul className="invisible absolute top-full left-0 z-[60] min-w-56 translate-y-4 border-t-2 border-primary bg-background py-4 opacity-0 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        {item.links.map((link) => (
                          <li key={link}>
                            <a
                              href="#"
                              className="block px-6 py-1.5 text-[15px] text-muted-foreground transition-all hover:translate-x-1 hover:text-primary"
                            >
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4 text-foreground md:gap-5">
              <button
                type="button"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                className="hidden transition-colors hover:text-primary md:block"
              >
                <Search className="size-[22px]" />
              </button>
              <button
                type="button"
                aria-label={`Wishlist, ${wishlist.size} items`}
                className="relative hidden transition-colors hover:text-primary md:block"
              >
                <Heart className="size-[22px]" />
                {wishlist.size > 0 && (
                  <span className="absolute -top-2.5 -right-2 flex size-[18px] items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {wishlist.size}
                  </span>
                )}
              </button>
              <button
                type="button"
                aria-label={`Cart, ${count} items`}
                onClick={() => setDrawerOpen(true)}
                className="relative transition-colors hover:text-primary"
              >
                <ShoppingCart className="size-[22px]" />
                <span
                  key={count}
                  className="absolute -top-2.5 -right-2 flex size-[18px] animate-in zoom-in items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground"
                >
                  {count}
                </span>
              </button>
              <button type="button" aria-label="Account" className="transition-colors hover:text-primary">
                <User className="size-[22px]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

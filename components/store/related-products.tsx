'use client'

import Image from 'next/image'
import { BadgePercent, Eye, Heart, RefreshCw, ShoppingCart, Star, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { formatPrice, relatedProducts, type RelatedProduct } from '@/lib/product-data'
import { cn } from '@/lib/utils'
import { useCart } from './cart-context'

type Swatch = { label: string; image: string }

const swatchesById: Record<string, Swatch[]> = {
  'fitted-coords-set-grey': [
    { label: 'Grey', image: '/products/related-2.jpg' },
    { label: 'Blue', image: '/products/blue-1.jpg' },
    { label: 'Green', image: '/products/green-1.jpg' },
  ],
  'sport-set-green': [
    { label: 'Lilac', image: '/products/related-1.jpg' },
    { label: 'Mint', image: '/products/related-2.jpg' },
    { label: 'Green', image: '/products/related-4.jpg' },
  ],
}

function QuickView({ item, onClose }: { item: RelatedProduct | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    if (item) ref.current?.showModal()
    else ref.current?.close()
  }, [item])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-label={item ? `${item.brand} ${item.name} quick view` : 'Quick view'}
      className="m-auto w-[min(94vw,820px)] bg-background p-0 text-foreground backdrop:bg-ink/60 open:animate-in open:fade-in open:zoom-in-95"
    >
      {item && (
        <div className="relative grid md:grid-cols-2">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick view"
            className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center bg-background text-foreground transition-transform hover:rotate-90"
          >
            <X className="size-5" />
          </button>
          <div className="relative aspect-[4/5] bg-muted">
            <Image src={item.image} alt={item.name} fill sizes="410px" className="object-cover" />
          </div>
          <div className="flex flex-col gap-3 p-6 md:p-8">
            <p className="text-sm tracking-wide text-muted-foreground uppercase">{item.brand}</p>
            <h2 className="text-2xl font-bold text-balance">{item.name}</h2>
            <p className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-primary">{formatPrice(item.price)}</span>
              <del className="text-muted-foreground">{formatPrice(item.originalPrice)}</del>
              <span className="text-sm text-primary">{item.discount}% Off</span>
            </p>
            <p className="border-t border-dashed border-border pt-3 text-[15px] leading-relaxed text-muted-foreground">
              Lightweight, breathable stretch fabric engineered for training and everyday wear. Sculpting fit with
              moisture-wicking comfort.
            </p>
            <button
              type="button"
              onClick={() => {
                addToCart({ id: item.id, name: item.name, image: item.image, price: item.price }, 1)
                onClose()
              }}
              className="mt-auto flex h-12 items-center justify-center gap-2 bg-primary text-sm font-semibold tracking-wider text-primary-foreground uppercase transition-colors hover:bg-ink"
            >
              <ShoppingCart className="size-4" aria-hidden="true" />
              Add to cart
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}

function ProductCard({ item, onQuickView }: { item: RelatedProduct; onQuickView: () => void }) {
  const { wishlist, toggleWishlist, addToCart, notify } = useCart()
  const saved = wishlist.has(item.id)
  const swatches = swatchesById[item.id]
  const [swatch, setSwatch] = useState(0)
  const image = swatches ? swatches[swatch].image : item.image
  const name = swatches ? item.name.replace(/\((.*?)\)/, `(${swatches[swatch].label})`) : item.name

  const actions = [
    {
      label: `Add ${item.name} to cart`,
      Icon: ShoppingCart,
      onClick: () => addToCart({ id: item.id, name, image, price: item.price }, 1),
    },
    { label: `Quick view ${item.name}`, Icon: Eye, onClick: onQuickView },
    { label: `Compare ${item.name}`, Icon: RefreshCw, onClick: () => notify('Added to compare') },
  ]

  return (
    <article className="group flex flex-col border border-border p-2.5 transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-[24/31] overflow-hidden bg-muted">
        <Image
          key={image}
          src={image}
          alt={`${item.brand} ${name}`}
          fill
          sizes="(min-width: 992px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="animate-in fade-in object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="pointer-events-none absolute top-0 left-0 size-[70px] overflow-hidden sm:size-20">
          <span className="absolute top-3.5 -left-8 w-28 -rotate-45 bg-primary py-1 text-center text-[11px] font-medium text-primary-foreground sm:top-4 sm:-left-7">
            {item.badge}
          </span>
        </div>
        <button
          type="button"
          onClick={() => toggleWishlist(item.id)}
          aria-label={saved ? `Remove ${item.name} from wishlist` : `Add ${item.name} to wishlist`}
          aria-pressed={saved}
          className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-background text-primary shadow-sm transition-transform hover:scale-110"
        >
          <Heart className={cn('size-4 transition-all', saved && 'fill-primary')} />
        </button>

        <ul className="absolute top-14 right-3 flex flex-col gap-2">
          {actions.map(({ label, Icon, onClick }, i) => (
            <li
              key={label}
              className="translate-x-14 opacity-0 transition-all duration-300 group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 [@media(hover:none)]:hidden"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <button
                type="button"
                onClick={onClick}
                aria-label={label}
                className="flex size-8 items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="size-4" />
              </button>
            </li>
          ))}
        </ul>

        <span className="absolute bottom-3 left-2.5 flex items-center gap-1.5 bg-background px-2.5 py-1 text-sm text-foreground">
          <Star className="size-3 fill-primary text-primary" aria-hidden="true" />
          0<span className="sr-only"> reviews</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="min-w-0 truncate text-base font-medium tracking-wide text-foreground sm:text-[17px]">
            <a href="#" className="transition-colors hover:text-primary">
              {item.brand}
            </a>
          </h3>
          {swatches && (
            <ul className="hidden shrink-0 gap-1.5 sm:flex" aria-label="Colors">
              {swatches.map((s, i) => (
                <li key={s.label}>
                  <button
                    type="button"
                    onClick={() => setSwatch(i)}
                    aria-label={s.label}
                    aria-pressed={i === swatch}
                    className={cn(
                      'relative block size-[30px] overflow-hidden border bg-muted transition-colors',
                      i === swatch ? 'border-primary' : 'border-border hover:border-primary/60',
                    )}
                  >
                    <Image src={s.image} alt="" fill sizes="30px" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="mt-1 truncate text-sm text-muted-foreground">{name}</p>
        <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
          <span className="text-base font-medium text-foreground sm:text-[17px]">{formatPrice(item.price)}</span>
          <del className="text-sm text-muted-foreground">{formatPrice(item.originalPrice)}</del>
          <span className="text-sm font-medium text-primary">{item.discount}% Off</span>
        </p>
        <p className="mt-auto flex items-center gap-1.5 border-t border-border pt-3 text-sm text-foreground sm:text-[15px] [&:not(:first-child)]:mt-4">
          <BadgePercent className="size-4 shrink-0 animate-spin-slow text-primary" aria-hidden="true" />
          <span className="truncate">Limited Time Offer: {item.discount}% off</span>
        </p>
      </div>
    </article>
  )
}

export function RelatedProducts() {
  const [quickView, setQuickView] = useState<RelatedProduct | null>(null)

  return (
    <section aria-labelledby="related-heading" className="container-store pt-12 pb-16 md:pt-20 md:pb-20">
      <h2
        id="related-heading"
        className="border-b border-border pb-4 text-center text-xl font-bold text-foreground md:text-left md:text-2xl"
      >
        Related Products
      </h2>
      <div className="mt-5 grid grid-cols-2 items-start gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {relatedProducts.map((item) => (
          <ProductCard key={item.id} item={item} onQuickView={() => setQuickView(item)} />
        ))}
      </div>
      <QuickView item={quickView} onClose={() => setQuickView(null)} />
    </section>
  )
}

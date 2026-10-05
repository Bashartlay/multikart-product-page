'use client'

import Image from 'next/image'
import { Heart, Link2, RefreshCw, Share2, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { product, type ProductVariant } from '@/lib/product-data'
import { cn } from '@/lib/utils'
import { FacebookIcon, PinterestIcon, TwitterIcon } from './brand'
import { useCart } from './cart-context'
import { QuantityStepper } from './quantity-stepper'

export function PurchasePanel({
  variants,
  variant,
  onSelect,
  quantity,
  maxQuantity,
  onQuantityChange,
}: {
  variants: ProductVariant[]
  variant: ProductVariant
  onSelect: (id: string) => void
  quantity: number
  maxQuantity: number
  onQuantityChange: (value: number) => void
}) {
  const { addToCart, toggleWishlist, wishlist, notify } = useCart()
  const [shareOpen, setShareOpen] = useState(false)
  const inWishlist = wishlist.has('gym-coords-set')

  const add = () =>
    addToCart(
      {
        id: `gym-coords-${variant.id}`,
        name: `${product.name} (${variant.color})`,
        image: variant.images[0],
        price: product.price,
      },
      quantity,
    )

  return (
    <div className="flex flex-col items-center gap-4 border border-border px-4 py-6 sm:px-5">
      <fieldset className="flex flex-col items-center">
        <legend className="mb-3 w-full text-center text-base font-semibold text-foreground">Colour:</legend>
        <div className="flex gap-2.5">
          {variants.map((v) => (
            <label
              key={v.id}
              className={cn(
                'relative size-[74px] cursor-pointer overflow-hidden border bg-muted p-0.5 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring',
                v.id === variant.id ? 'border-primary' : 'border-border hover:border-primary/60',
              )}
            >
              <input
                type="radio"
                name="colour"
                value={v.id}
                checked={v.id === variant.id}
                onChange={() => onSelect(v.id)}
                className="sr-only"
              />
              <span className="sr-only">{v.color}</span>
              <span className="relative block size-full">
                <Image src={v.images[0]} alt="" fill sizes="74px" className="object-cover" />
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <QuantityStepper value={quantity} max={maxQuantity} onChange={onQuantityChange} />

      <div className="flex w-full gap-3 sm:justify-center">
        <button
          type="button"
          onClick={add}
          className="flex h-12 flex-1 items-center justify-center gap-2 bg-primary px-4 text-[15px] font-semibold text-primary-foreground transition-colors duration-300 hover:bg-ink sm:flex-none sm:px-7"
        >
          <ShoppingCart className="size-[18px]" aria-hidden="true" />
          Add To Cart
        </button>
        <button
          type="button"
          onClick={add}
          className="h-12 flex-1 animate-buttons-shake bg-primary px-4 text-[15px] font-semibold text-primary-foreground transition-colors duration-300 [animation-delay:2s] [animation-iteration-count:infinite] [animation-duration:3s] hover:bg-ink sm:flex-none sm:px-7"
        >
          Buy Now
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 text-[15px] text-foreground">
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <button
            type="button"
            onClick={() => toggleWishlist('gym-coords-set')}
            aria-pressed={inWishlist}
            className="flex items-center gap-2 transition-colors hover:text-primary"
          >
            <Heart
              className={cn('size-4 transition-transform', inWishlist && 'scale-110 fill-primary text-primary')}
              aria-hidden="true"
            />
            Add To Wishlist
          </button>
          <button
            type="button"
            onClick={() => notify('Added to compare')}
            className="group flex items-center gap-2 transition-colors hover:text-primary"
          >
            <RefreshCw className="size-4 transition-transform duration-500 group-hover:rotate-180" aria-hidden="true" />
            Add To Compare
          </button>
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShareOpen((o) => !o)}
            aria-expanded={shareOpen}
            className="flex items-center gap-2 transition-colors hover:text-primary"
          >
            <Share2 className="size-4" aria-hidden="true" />
            share
          </button>
          <div
            className={cn(
              'absolute top-full left-1/2 z-20 mt-3 flex -translate-x-1/2 gap-2 border border-border bg-background p-2 shadow-lg transition-all duration-300',
              shareOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
            )}
          >
            {[
              { label: 'Share on Facebook', Icon: FacebookIcon },
              { label: 'Share on Twitter', Icon: TwitterIcon },
              { label: 'Share on Pinterest', Icon: PinterestIcon },
            ].map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex size-8 items-center justify-center bg-muted text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="size-3.5" />
              </a>
            ))}
            <button
              type="button"
              aria-label="Copy link"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href)
                notify('Link copied')
                setShareOpen(false)
              }}
              className="flex size-8 items-center justify-center bg-muted text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Link2 className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

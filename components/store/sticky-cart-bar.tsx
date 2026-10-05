'use client'

import Image from 'next/image'
import { ChevronDown, ShoppingCart } from 'lucide-react'
import { useEffect, useState, type RefObject } from 'react'
import { formatPrice, product, type ProductVariant } from '@/lib/product-data'
import { cn } from '@/lib/utils'
import { useCart } from './cart-context'
import { QuantityStepper } from './quantity-stepper'

export function StickyCartBar({
  watchRef,
  variants,
  variant,
  onSelect,
  quantity,
  maxQuantity,
  onQuantityChange,
}: {
  watchRef: RefObject<HTMLDivElement | null>
  variants: ProductVariant[]
  variant: ProductVariant
  onSelect: (id: string) => void
  quantity: number
  maxQuantity: number
  onQuantityChange: (value: number) => void
}) {
  const { addToCart } = useCart()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = watchRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [watchRef])

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        'fixed inset-x-0 bottom-5 z-30 hidden transition-all duration-500 md:block',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[150%] opacity-0',
      )}
    >
      <div className="container-store">
        <div className="flex items-center justify-between gap-4 bg-background py-2.5 pr-2.5 pl-2.5 shadow-[0_0_30px_rgba(0,0,0,0.12)]">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative h-[70px] w-[70px] shrink-0 overflow-hidden bg-muted">
              <Image src={variant.images[0]} alt="" fill sizes="70px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg text-foreground">
                {product.name} ({variant.color})
              </p>
              <p className="text-sm text-foreground">{formatPrice(product.price)}</p>
            </div>
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            <label className="flex items-center gap-3 text-lg font-medium text-foreground">
              Variants:
              <span className="relative">
                <select
                  value={variant.id}
                  onChange={(e) => onSelect(e.target.value)}
                  className="h-9 w-[104px] appearance-none border border-border bg-muted pr-8 pl-3 text-[15px] font-normal outline-none focus:border-primary"
                >
                  {variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.color}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2"
                  aria-hidden="true"
                />
              </span>
            </label>
            <QuantityStepper
              value={quantity}
              max={maxQuantity}
              onChange={onQuantityChange}
              className="bg-background p-0 [&_button]:size-9 [&_button]:bg-muted"
            />
          </div>

          <button
            type="button"
            onClick={() =>
              addToCart(
                {
                  id: `gym-coords-${variant.id}`,
                  name: `${product.name} (${variant.color})`,
                  image: variant.images[0],
                  price: product.price,
                },
                quantity,
              )
            }
            className="flex h-12 shrink-0 items-center gap-2 bg-primary px-7 text-sm font-semibold tracking-wider text-primary-foreground uppercase transition-colors hover:bg-ink"
          >
            <ShoppingCart className="size-4" aria-hidden="true" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

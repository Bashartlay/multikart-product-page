'use client'

import { useRef, useState } from 'react'
import { product } from '@/lib/product-data'
import { ProductDetails } from './product-details'
import { ProductGallery } from './product-gallery'
import { PurchasePanel } from './purchase-panel'
import { StickyCartBar } from './sticky-cart-bar'

export function ProductView() {
  const [variantId, setVariantId] = useState(product.variants[0].id)
  const [imageIndex, setImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const panelRef = useRef<HTMLDivElement>(null)

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]

  const selectVariant = (id: string) => {
    setVariantId(id)
    setImageIndex(0)
  }

  return (
    <>
      <section
        aria-label="Product"
        className="container-store grid gap-6 pt-6 pb-10 md:grid-cols-2 md:pt-[70px] lg:grid-cols-3"
      >
        <ProductGallery
          images={variant.images}
          alt={`${product.name} in ${variant.color}`}
          activeIndex={imageIndex}
          onChange={setImageIndex}
        />
        <ProductDetails color={variant.color} />
        <div ref={panelRef} className="min-w-0 md:col-span-2 lg:col-span-1">
          <div className="lg:sticky lg:top-28">
            <PurchasePanel
              variants={product.variants}
              variant={variant}
              onSelect={selectVariant}
              quantity={quantity}
              maxQuantity={product.quantityLeft}
              onQuantityChange={setQuantity}
            />
          </div>
        </div>
      </section>

      <StickyCartBar
        watchRef={panelRef}
        variants={product.variants}
        variant={variant}
        onSelect={selectVariant}
        quantity={quantity}
        maxQuantity={product.quantityLeft}
        onQuantityChange={setQuantity}
      />
    </>
  )
}

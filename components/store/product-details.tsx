import Image from 'next/image'
import { ArrowLeftRight, Flame, MessageSquareText, Star, Truck } from 'lucide-react'
import { formatPrice, product } from '@/lib/product-data'

export function ProductDetails({ color }: { color: string }) {
  return (
    <div className="flex min-w-0 flex-col text-center md:text-left">
      <p className="flex items-start justify-center gap-3 text-base leading-relaxed text-foreground md:justify-start">
        <span className="relative mt-0.5 flex size-6 shrink-0 items-center justify-center" aria-hidden="true">
          <Flame className="size-6 origin-bottom animate-flame fill-primary/30 text-primary" />
        </span>
        <span>
          Selling fast! {product.cartWatchers} people have this in their carts.
        </span>
      </p>

      <h1 className="mt-3 text-2xl font-bold text-balance text-foreground md:text-3xl">
        {product.name} ({color})
      </h1>

      <div className="mt-3 flex items-center justify-center gap-3 md:justify-start">
        <div className="flex gap-0.5" role="img" aria-label="Rated 0 out of 5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-4 text-primary" aria-hidden="true" />
          ))}
        </div>
        <span className="h-4 w-px bg-border" aria-hidden="true" />
        <a href="#product-tabs" className="text-sm text-primary underline underline-offset-2 hover:text-foreground">
          0 Review
        </a>
      </div>

      <p className="mt-4 text-2xl text-foreground">
        MRP: <span className="font-semibold text-primary">{formatPrice(product.price)}</span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">Inclusive all the text</p>

      <div className="mt-4 flex flex-wrap justify-center gap-5 border-y border-dashed border-border py-4 text-[15px] text-muted-foreground md:justify-start">
        <button type="button" className="flex items-center gap-2 transition-colors hover:text-primary">
          <Truck className="size-4" aria-hidden="true" />
          {'Delivery & Return'}
        </button>
        <button type="button" className="flex items-center gap-2 transition-colors hover:text-primary">
          <MessageSquareText className="size-4" aria-hidden="true" />
          Ask A Question
        </button>
      </div>

      <section className="border-b border-dashed border-border py-5">
        <h2 className="text-base font-semibold text-foreground">Product Info</h2>
        <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-left text-[15px] text-muted-foreground marker:text-foreground">
          <li>SKU: {product.sku}</li>
          <li>Unit: {product.unit}</li>
          <li>Weight: {product.weight}</li>
          <li>Stock Status: {product.stockStatus}</li>
          <li>Quantity: {product.quantityLeft} Items Left</li>
        </ul>
      </section>

      <section className="py-5">
        <h2 className="text-base font-semibold text-foreground">Delivery Details</h2>
        <ul className="mt-4 flex flex-col items-center gap-3 text-[15px] text-muted-foreground md:items-start">
          <li className="flex items-start gap-3 text-left">
            <Truck className="mt-0.5 size-5 shrink-0 text-foreground" aria-hidden="true" />
            Your order is likely to reach you within 7 days.
          </li>
          <li className="flex items-start gap-3 text-left">
            <ArrowLeftRight className="mt-0.5 size-5 shrink-0 text-foreground" aria-hidden="true" />
            Hassle free returns within 7 Days.
          </li>
        </ul>
      </section>

      <fieldset className="border border-dashed border-border px-4 pt-1 pb-5 md:px-5">
        <legend className="mx-auto px-2 text-base font-semibold text-foreground md:mx-0">Guaranteed Safe Checkout</legend>
        <div className="mt-3 flex justify-center md:justify-start">
          <Image
            src="/images/payments.png"
            alt="Accepted payments: Visa, Mastercard, American Express, PayPal, Discover"
            width={872}
            height={96}
            className="h-auto w-full max-w-[290px]"
          />
        </div>
      </fieldset>

      <fieldset className="mt-6 border border-dashed border-border px-4 pt-1 pb-5 md:px-5">
        <legend className="mx-auto px-2 text-base font-semibold text-foreground md:mx-0">Secure Checkout</legend>
        <div className="mt-3 flex justify-center md:justify-start">
          <Image
            src="/images/secure_payments.png"
            alt="Secured by BBB Accredited Business, McAfee Secure, TRUSTe Certified Privacy, Authorize.Net Verified Merchant and Norton Secured"
            width={1356}
            height={96}
            className="h-auto w-full max-w-[340px]"
          />
        </div>
      </fieldset>
    </div>
  )
}

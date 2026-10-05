import { CartDrawer } from '@/components/store/cart-drawer'
import { CartProvider } from '@/components/store/cart-context'
import { BackToTop } from '@/components/store/back-to-top'
import { MobileBottomNav } from '@/components/store/mobile-bottom-nav'
import { NewsletterModal } from '@/components/store/newsletter-modal'
import { PageLoader } from '@/components/store/page-loader'
import { ProductTabs } from '@/components/store/product-tabs'
import { ProductView } from '@/components/store/product-view'
import { RelatedProducts } from '@/components/store/related-products'
import { SiteFooter } from '@/components/store/site-footer'
import { SiteHeader } from '@/components/store/site-header'
import { RecentPurchaseToast } from '@/components/store/recent-purchase-toast'
import { ThemeCustomizer } from '@/components/store/theme-customizer'

export default function ProductPage() {
  return (
    <CartProvider>
      <PageLoader />
      <SiteHeader />
      <main>
        <div className="bg-muted py-7 text-center md:py-8">
          <p className="text-2xl font-medium tracking-wide text-foreground md:text-3xl">Gym Coords Set</p>
          <nav aria-label="Breadcrumb" className="mt-2 md:mt-3">
            <ol className="flex flex-wrap items-center justify-center gap-2 px-4 text-sm font-semibold text-foreground uppercase">
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Home
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Product
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Gym Coords Set</li>
            </ol>
          </nav>
        </div>
        <ProductView />
        <ProductTabs />
        <RelatedProducts />
      </main>
      <SiteFooter />
      <NewsletterModal />
      <CartDrawer />
      <RecentPurchaseToast />
      <ThemeCustomizer />
      <BackToTop />
      <MobileBottomNav />
    </CartProvider>
  )
}

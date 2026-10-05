'use client'

import { ChevronDown, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { FacebookIcon, InstagramIcon, Logo, PaymentMarks, PinterestIcon, TwitterIcon } from './brand'
import { NewsletterForm } from './newsletter-form'

const columns = [
  {
    title: 'Categories',
    links: ['Baby Essentials', 'Bag Emporium', 'Books', 'Christmas', 'Classic Furnishings', 'Crystal Clarity Optics'],
  },
  {
    title: 'Useful Links',
    links: ['Home', 'Collections', 'About Us', 'Blogs', 'Offers', 'Search'],
  },
  {
    title: 'Help Center',
    links: ['My Account', 'My Orders', 'Wishlist', "Faq's", 'Contact Us'],
  },
]

const socials = [
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'Twitter', Icon: TwitterIcon },
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'Pinterest', Icon: PinterestIcon },
]

function FooterColumn({
  title,
  open,
  onToggle,
  children,
}: {
  title: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-ink-foreground/10 md:border-0">
      <h2>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex w-full items-center justify-between py-4 text-left text-lg font-semibold tracking-wide uppercase md:pointer-events-none md:py-0"
        >
          {title}
          <ChevronDown
            className={cn('size-4 transition-transform duration-300 md:hidden', open && 'rotate-180')}
            aria-hidden="true"
          />
        </button>
      </h2>
      <div
        className={cn(
          'grid transition-all duration-300 md:grid-rows-[1fr] md:pt-5',
          open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  )
}

export function SiteFooter() {
  const [openCol, setOpenCol] = useState<string | null>(null)
  const toggle = (title: string) => setOpenCol((c) => (c === title ? null : title))

  return (
    <footer className="bg-ink-deep text-ink-foreground">
      <div className="container-store grid gap-x-8 pt-12 pb-8 md:grid-cols-2 md:gap-y-10 md:py-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.3fr]">
        <div className="flex flex-col gap-5 pb-6 md:col-span-2 md:pb-0 lg:col-span-1">
          <Logo inverted />
          <p className="max-w-xs text-[15px] leading-relaxed tracking-wide text-ink-foreground/80">
            Discover the latest trends and enjoy seamless shopping with our exclusive collections.
          </p>
          <ul className="flex flex-col gap-4 text-[15px] text-ink-foreground/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span className="leading-relaxed">Multikart Demo Store, Demo Store India 345-659</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              Call Us: 123-456-7898
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              Email Us: Support@Multikart.Com
            </li>
          </ul>
        </div>

        {columns.map((col) => (
          <FooterColumn key={col.title} title={col.title} open={openCol === col.title} onToggle={() => toggle(col.title)}>
            <ul className="flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="inline-block text-[15px] tracking-wide text-ink-foreground/80 transition-all duration-300 hover:translate-x-1.5 hover:text-primary"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>
        ))}

        <FooterColumn title="Follow Us" open={openCol === 'Follow Us'} onToggle={() => toggle('Follow Us')}>
          <div className="flex flex-col gap-5">
            <p className="text-[15px] leading-relaxed tracking-wide text-ink-foreground/80">
              Never Miss Anything From Store By Signing Up To Our Newsletter.
            </p>
            <NewsletterForm variant="footer" />
            <ul className="flex gap-4">
              {socials.map(({ label, Icon }) => (
                <li key={label}>
                  <a
                    href="#"
                    aria-label={label}
                    className="flex size-9 items-center justify-center bg-ink-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:bg-primary"
                  >
                    <Icon className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </FooterColumn>
      </div>

      <div className="bg-ink-foreground/5 pb-16 md:pb-0">
        <div className="container-store flex flex-col items-center justify-between gap-4 py-4 sm:flex-row">
          <p className="text-[15px] tracking-wide text-ink-foreground/70">2026 themeforest powered by pixelstrap</p>
          <PaymentMarks tone="light" />
        </div>
      </div>
    </footer>
  )
}

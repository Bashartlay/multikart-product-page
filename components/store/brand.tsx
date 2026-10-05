import { cn } from '@/lib/utils'

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center text-3xl font-medium tracking-tight',
        inverted ? 'text-ink-foreground' : 'text-foreground',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="relative mr-0.5 inline-flex size-[1.15em] items-center justify-center rounded-[0.22em] bg-primary text-[0.8em] leading-none font-bold text-primary-foreground"
      >
        <span className="absolute -top-[0.14em] left-1/2 h-[0.22em] w-[0.42em] -translate-x-1/2 rounded-t-full border-[0.07em] border-b-0 border-primary" />
        M
      </span>
      <span aria-hidden="true">
        ult
        <span className="relative">
          {'\u0131'}
          <span className="absolute top-[0.12em] left-1/2 size-[0.17em] -translate-x-1/2 rounded-full bg-primary" />
        </span>
        kart
      </span>
      <span className="sr-only">Multikart</span>
    </span>
  )
}

type IconProps = { className?: string }

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
    </svg>
  )
}

export function TwitterIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.391 4.49A13.94 13.94 0 0 1 1.671 3.149a4.93 4.93 0 0 0 1.523 6.574 4.903 4.903 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224.084 4.928 4.928 0 0 0 4.6 3.419A9.9 9.9 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0 0 24 4.557z" />
    </svg>
  )
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function PinterestIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  )
}

const paymentMarks = [
  { label: 'Visa', text: 'VISA', className: 'italic font-extrabold tracking-tighter' },
  { label: 'PayPal', text: 'P', className: 'italic font-extrabold text-base' },
  { label: 'Mastercard', text: '●●', className: 'tracking-[-0.35em] text-lg pr-1' },
  { label: 'Stripe', text: 'stripe', className: 'font-bold tracking-tight' },
  { label: 'American Express', text: 'AMEX', className: 'font-extrabold italic tracking-tighter' },
]

export function PaymentMarks({ tone = 'muted' }: { tone?: 'muted' | 'light' }) {
  return (
    <ul className="flex flex-wrap items-center gap-3" aria-label="Accepted payment methods">
      {paymentMarks.map((mark) => (
        <li
          key={mark.label}
          title={mark.label}
          className={cn(
            'flex h-8 min-w-12 items-center justify-center rounded px-2 text-xs',
            tone === 'muted'
              ? 'bg-muted text-muted-foreground'
              : 'bg-ink-foreground text-ink-deep',
          )}
        >
          <span aria-hidden="true" className={mark.className}>
            {mark.text}
          </span>
          <span className="sr-only">{mark.label}</span>
        </li>
      ))}
    </ul>
  )
}

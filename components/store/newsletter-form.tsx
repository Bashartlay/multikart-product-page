'use client'

import { useId, useState } from 'react'
import { cn } from '@/lib/utils'

export function NewsletterForm({
  variant,
  onSubscribed,
}: {
  variant: 'footer' | 'modal'
  onSubscribed?: () => void
}) {
  const id = useId()
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <p
        role="status"
        className={cn(
          'text-sm font-medium',
          variant === 'footer' ? 'text-primary' : 'text-center text-primary',
        )}
      >
        Thanks for subscribing! Check your inbox for a welcome offer.
      </p>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setDone(true)
        onSubscribed?.()
      }}
      className={cn('flex flex-col gap-4', variant === 'modal' && 'items-center')}
    >
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        type="email"
        required
        autoComplete="email"
        placeholder="Enter Email Address"
        className={cn(
          'w-full border px-3 outline-none placeholder:text-muted-foreground focus:border-primary',
          variant === 'footer'
            ? 'h-10 max-w-64 border-transparent bg-background text-sm text-foreground'
            : 'h-12 border-border bg-background text-base text-foreground',
        )}
      />
      <button
        type="submit"
        className={cn(
          'bg-primary font-semibold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90',
          variant === 'footer' ? 'h-10 w-fit px-8 text-sm' : 'h-12 px-8 text-sm',
        )}
      >
        Subscribe
      </button>
    </form>
  )
}

'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { NewsletterForm } from './newsletter-form'

export function NewsletterModal() {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => dialogRef.current?.showModal(), 1500)
    return () => window.clearTimeout(timer)
  }, [])

  const close = () => dialogRef.current?.close()

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="newsletter-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
      className="m-auto w-[min(92vw,1140px)] bg-background p-0 text-foreground backdrop:bg-ink/60 open:animate-in open:fade-in open:slide-in-from-top-8 open:duration-500"
    >
      <div className="relative grid md:grid-cols-2">
        <button
          type="button"
          onClick={close}
          aria-label="Close newsletter"
          className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center bg-background/80 text-foreground transition-transform duration-300 hover:rotate-90"
        >
          <X className="size-5" />
        </button>
        <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center sm:px-16 md:py-20">
          <h2 id="newsletter-title" className="text-3xl font-bold tracking-wide uppercase md:text-4xl">
            Newsletter
          </h2>
          <p className="text-[15px] text-muted-foreground">
            plus, early access to new arrivals, exclusive sales, &amp; lots more?
          </p>
          <div className="mt-4 w-full max-w-md">
            <NewsletterForm variant="modal" onSubscribed={() => window.setTimeout(close, 1800)} />
          </div>
        </div>
        <div className="relative hidden min-h-[380px] md:block">
          <Image
            src="/images/newsletter.jpg"
            alt="Shopper with bags beside a clothing rack"
            fill
            sizes="570px"
            className="object-cover grayscale"
          />
        </div>
      </div>
    </dialog>
  )
}

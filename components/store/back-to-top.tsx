'use client'

import { ChevronsUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed right-3 bottom-20 z-40 flex size-10 items-center justify-center bg-primary text-primary-foreground shadow-md transition-all duration-500 hover:bg-ink md:right-[30px] md:bottom-[30px]',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0',
      )}
    >
      <ChevronsUp className="size-5 animate-bounce" aria-hidden="true" />
    </button>
  )
}

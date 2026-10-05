'use client'

import { useEffect, useState } from 'react'
import { Logo } from './brand'

export function PageLoader() {
  const [phase, setPhase] = useState<'loading' | 'leaving' | 'done'>('loading')

  useEffect(() => {
    let leaveTimer: ReturnType<typeof setTimeout>
    let doneTimer: ReturnType<typeof setTimeout>
    const start = performance.now()
    const finish = () => {
      const wait = Math.max(0, 900 - (performance.now() - start))
      leaveTimer = setTimeout(() => setPhase('leaving'), wait)
      doneTimer = setTimeout(() => setPhase('done'), wait + 500)
    }
    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })
    return () => {
      window.removeEventListener('load', finish)
      clearTimeout(leaveTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = phase === 'done' ? '' : 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [phase])

  if (phase === 'done') return null

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-background transition-opacity duration-500 ${
        phase === 'leaving' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-[3px] overflow-hidden bg-primary/15">
        <div className="h-full animate-[loader-bar_1.4s_ease-in-out_infinite] bg-primary" />
      </div>
      <div className="animate-[loader-pulse_1.6s_ease-in-out_infinite]">
        <Logo className="h-10 w-auto md:h-12" />
      </div>
      <div className="flex items-center gap-2" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-2.5 animate-[loader-dot_1s_ease-in-out_infinite] rounded-full bg-primary"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <span className="sr-only">Loading Multikart</span>
    </div>
  )
}

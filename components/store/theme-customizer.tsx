'use client'

import { SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const themeColors = [
  { name: 'Orange', value: '#ec8951' },
  { name: 'Red', value: '#e4604a' },
  { name: 'Teal', value: '#0e9f8f' },
  { name: 'Blue', value: '#3e65de' },
  { name: 'Pink', value: '#d64f85' },
  { name: 'Dark', value: '#4a4a4a' },
]

const defaultColor = themeColors[0].value

export function ThemeCustomizer() {
  const [open, setOpen] = useState(false)
  const [color, setColor] = useState(defaultColor)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    closeButtonRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [open])

  const applyColor = (value: string) => {
    setColor(value)
    document.documentElement.style.setProperty('--primary', value)
    document.documentElement.style.setProperty('--ring', value)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="theme-customizer"
        className="fixed top-1/2 right-0 z-40 flex -translate-y-1/2 flex-col items-center gap-2 bg-ink px-2 py-3 text-xs font-medium tracking-wider text-ink-foreground uppercase shadow-md transition-colors hover:bg-primary"
      >
        <SlidersHorizontal className="size-3.5 rotate-90" aria-hidden="true" />
        <span className="[writing-mode:vertical-rl]">Customize</span>
      </button>

      <div inert={!open} className={cn('fixed inset-0 z-[75]', !open && 'pointer-events-none')}>
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className={cn('absolute inset-0 bg-ink/40 transition-opacity duration-300', open ? 'opacity-100' : 'opacity-0')}
        />
        <aside
          id="theme-customizer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="customizer-title"
          className={cn(
            'absolute inset-y-0 right-0 flex w-[min(88vw,320px)] flex-col gap-6 bg-background p-6 shadow-2xl transition-transform duration-500',
            open ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex items-center justify-between">
            <h2 id="customizer-title" className="text-lg font-semibold text-foreground">
              Theme Settings
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close settings"
              className="text-foreground transition-transform hover:rotate-90 hover:text-primary"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <fieldset>
            <legend className="mb-3 text-sm font-semibold tracking-wide text-foreground uppercase">Theme Color</legend>
            <div className="flex flex-wrap gap-3">
              {themeColors.map((themeColor) => (
                <button
                  key={themeColor.value}
                  type="button"
                  onClick={() => applyColor(themeColor.value)}
                  aria-label={themeColor.name}
                  aria-pressed={color === themeColor.value}
                  className={cn(
                    'size-10 rounded-full border-4 transition-transform hover:scale-110',
                    color === themeColor.value ? 'border-foreground/20 ring-2 ring-foreground' : 'border-background',
                  )}
                  style={{ backgroundColor: themeColor.value }}
                />
              ))}
            </div>
          </fieldset>
          <button
            type="button"
            onClick={() => applyColor(defaultColor)}
            className="h-11 border border-primary text-sm font-semibold tracking-wide text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Reset
          </button>
        </aside>
      </div>
    </>
  )
}

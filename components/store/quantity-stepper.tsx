'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function QuantityStepper({
  value,
  max,
  onChange,
  className,
}: {
  value: number
  max: number
  onChange: (value: number) => void
  className?: string
}) {
  const set = (next: number) => onChange(Math.min(max, Math.max(1, next)))

  return (
    <div className={cn('inline-flex items-center border border-border bg-muted p-1', className)}>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => set(value - 1)}
        disabled={value <= 1}
        className="flex size-9 items-center justify-center bg-background text-foreground disabled:opacity-50"
      >
        <ChevronLeft className="size-4" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        aria-label="Quantity"
        min={1}
        max={max}
        value={value}
        onChange={(e) => set(Number(e.target.value) || 1)}
        className="h-9 w-16 bg-transparent text-center text-base text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => set(value + 1)}
        disabled={value >= max}
        className="flex size-9 items-center justify-center bg-background text-foreground disabled:opacity-50"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  )
}

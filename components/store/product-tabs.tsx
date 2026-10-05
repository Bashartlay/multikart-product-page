'use client'

import { Star } from 'lucide-react'
import { useId, useState } from 'react'
import { product } from '@/lib/product-data'
import { cn } from '@/lib/utils'

const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'review', label: 'Review' },
  { id: 'questions', label: 'Q&A' },
] as const

type TabId = (typeof tabs)[number]['id']

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('description')
  const baseId = useId()

  return (
    <section id="product-tabs" className="container-store scroll-mt-28">
      <div className="border border-border">
        <div
          role="tablist"
          aria-label="Product information"
          className="flex gap-3 bg-muted p-3 sm:gap-5 sm:p-4"
        >
          {tabs.map((tab) => {
            const selected = tab.id === activeTab
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`${baseId}-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'border px-4 py-2 text-[15px] transition-colors duration-300 sm:px-6 sm:py-2.5 sm:text-[17px]',
                  selected
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-border bg-background text-foreground hover:text-primary',
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel-${activeTab}`}
          aria-labelledby={`${baseId}-tab-${activeTab}`}
          key={activeTab}
          className="animate-in border-t border-border p-4 fade-in slide-in-from-bottom-2 duration-500"
        >
          {activeTab === 'description' && (
            <div className="flex flex-col gap-4">
              {product.description.map((para) => (
                <p key={para.slice(0, 24)} className="text-[15px] leading-relaxed tracking-wide text-muted-foreground">
                  {para}
                </p>
              ))}
            </div>
          )}

          {activeTab === 'review' && (
            <div className="grid gap-8 py-2 md:grid-cols-[280px_1fr]">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-foreground">Customer Reviews</h3>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">0 out of 5</span>
                </div>
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="w-12">{stars} Star</span>
                    <span className="h-2 flex-1 bg-muted" aria-hidden="true" />
                    <span className="w-8 text-right">0%</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start gap-3">
                <h3 className="text-lg font-semibold text-foreground">Review this product</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  There are no reviews yet. Share your thoughts with other customers.
                </p>
                <button
                  type="button"
                  className="bg-primary px-6 py-3 text-sm font-semibold tracking-wider text-primary-foreground uppercase hover:opacity-90"
                >
                  Write a review
                </button>
              </div>
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="flex flex-col items-start gap-3 py-2">
              <h3 className="text-lg font-semibold text-foreground">Questions &amp; Answers</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                No questions have been asked yet. Have a question about sizing or fabric? Ask away.
              </p>
              <button
                type="button"
                className="bg-primary px-6 py-3 text-sm font-semibold tracking-wider text-primary-foreground uppercase hover:opacity-90"
              >
                Ask a question
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

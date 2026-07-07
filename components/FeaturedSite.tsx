'use client'

import { useState, useEffect } from 'react'
import { Student } from '@/types/students'
import { ChevronLeft, ChevronRight, Shuffle, ExternalLink } from 'lucide-react'

interface FeaturedSiteProps {
  students: Student[]
}

export function FeaturedSite({ students }: FeaturedSiteProps) {
  const withSites = students.filter(s => s.website)
  const [index, setIndex] = useState<number | null>(null)

  useEffect(() => {
    if (withSites.length === 0) return
    setIndex(Math.floor(Math.random() * withSites.length))
  }, [withSites.length])

  if (index === null || withSites.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mb-16">
        <div className="aspect-[16/10] border rule bg-paper dark:bg-coal" />
      </div>
    )
  }

  const current = withSites[index]
  const next = () => setIndex(i => ((i ?? 0) + 1) % withSites.length)
  const prev = () => setIndex(i => ((i ?? 0) - 1 + withSites.length) % withSites.length)
  const random = () => {
    if (withSites.length <= 1) return
    let n = Math.floor(Math.random() * withSites.length)
    if (n === index) n = (n + 1) % withSites.length
    setIndex(n)
  }

  return (
    <div className="max-w-4xl mx-auto mb-20">
      <div className="flex items-center justify-between mb-2 px-1 font-mono">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full bg-rust opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 bg-rust"></span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-500">
            live · featured · {current.name}
          </span>
        </div>
        <a
          href={current.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-500 hover:text-rust dark:hover:text-rust transition-colors"
        >
          open in tab
          <ExternalLink size={11} />
        </a>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden border-2 border-ink dark:border-paper bg-paper dark:bg-coal">
        {/* Fake browser chrome */}
        <div className="absolute top-0 inset-x-0 h-8 bg-paper dark:bg-coal border-b-2 border-ink dark:border-paper z-20 flex items-center px-3 gap-1.5">
          <span className="w-2.5 h-2.5 bg-red-400"></span>
          <span className="w-2.5 h-2.5 bg-yellow-400"></span>
          <span className="w-2.5 h-2.5 bg-green-400"></span>
          <span className="ml-3 text-[10px] font-mono text-neutral-600 dark:text-neutral-400 truncate">
            {current.website}
          </span>
        </div>

        {/* Fallback shown if iframe blocks embedding */}
        <div className="absolute inset-0 pt-8 flex items-center justify-center text-center px-6 z-0">
          <div className="max-w-sm">
            <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-600 mb-2 uppercase tracking-widest">
              {'// preview loading — or site blocks embedding'}
            </p>
            <a
              href={current.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-rust dark:text-rust hover:underline font-mono"
            >
              open {current.website.replace(/^https?:\/\//, '')} →
            </a>
          </div>
        </div>

        <iframe
          key={current.website}
          src={current.website}
          className="absolute inset-0 w-full h-full pt-8 z-10 bg-white dark:bg-coal"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          title={`${current.name}'s site`}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="grid grid-cols-3 mt-3 border-2 border-t-0 border-ink dark:border-paper font-mono">
        <button
          onClick={prev}
          className="group flex items-center justify-center gap-2 py-3 border-r-2 border-ink dark:border-paper hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-colors text-xs uppercase tracking-[0.2em]"
          aria-label="Previous site"
        >
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          prev
        </button>
        <button
          onClick={random}
          className="group flex items-center justify-center gap-2 py-3 bg-rust text-paper hover:bg-rust/90 transition-colors text-xs uppercase tracking-[0.2em] font-bold"
          aria-label="Random site"
        >
          <Shuffle size={14} className="group-hover:rotate-180 transition-transform duration-500" />
          random
        </button>
        <button
          onClick={next}
          className="group flex items-center justify-center gap-2 py-3 border-l-2 border-ink dark:border-paper hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-colors text-xs uppercase tracking-[0.2em]"
          aria-label="Next site"
        >
          next
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}

'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import { Student } from '@/types/students'
import { StudentCard } from './StudentCard'
import { SearchFilters } from './SearchFilters'
import { ThemeToggle } from './ThemeToggle'
import { FeaturedSite } from './FeaturedSite'

interface WebRingProps {
  students: Student[]
  availableYears: string[]
}

export function WebRing({ students, availableYears }: WebRingProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const badge = [
      'color: #F5F1E8',
      'background: #B84E22',
      'padding: 4px 8px',
      'border-radius: 2px',
      'font-family: monospace',
      'font-weight: bold',
    ].join(';')

    console.log('%c〽️  MICHIGAN.WEBRING', badge)
    console.log(
      `%cpssst — here's the thing about webrings:

every site on this page links back here, and this page links to every site.
that's a cluster of mutual do-follow backlinks between .edu-adjacent
portfolios. google eats that up. cheat code for a personal site with
basically no other authority.

add yours:  https://github.com/AlexCSalinas/michigan-webring

hail to the victors.`,
      'color: #9ca3af; font-family: monospace; line-height: 1.5;'
    )
  }, [])

  const filteredStudents = useMemo(() => {
    const sorted = [...students].sort((a, b) =>
      (a.website || '').localeCompare(b.website || '')
    )
    const q = searchTerm.trim().toLowerCase()
    if (!q) return sorted
    return sorted.filter(s =>
      (s.website && s.website.toLowerCase().includes(q)) ||
      s.graduationYear.includes(q) ||
      s.name.toLowerCase().includes(q)
    )
  }, [students, searchTerm])

  return (
    <div className="min-h-screen bg-paper dark:bg-coal text-ink dark:text-neutral-100 transition-colors duration-300 relative">
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      <ThemeToggle />

      <div className="container mx-auto px-4 py-10 md:py-16 relative z-10">
        {/* Header */}
        <header className="mb-14 md:mb-20">
          <div className="flex items-baseline justify-between border-b rule pb-6 mb-8">
            <div className="flex items-center gap-3">
              <Image
                src={isDark ? '/images/michigan-logo-white.svg' : '/images/michigan-logo-black.svg'}
                alt=""
                width={28}
                height={28}
                className="opacity-90 flex-shrink-0"
              />
              <span className="font-mono text-sm md:text-base uppercase tracking-[0.3em] text-neutral-900 dark:text-neutral-100">
                michigan<span className="text-rust">.</span>webring
              </span>
            </div>
            <span className="hidden sm:block font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
              v1 · est. 2024
            </span>
          </div>

          <h1 className="font-mono text-4xl md:text-6xl leading-[1.05] tracking-tight text-neutral-900 dark:text-neutral-50 max-w-4xl">
            a ring of{' '}
            <span className="text-rust dark:text-rust">personal sites</span>{' '}
            built by{' '}
            <span className="underline decoration-rust decoration-4 underline-offset-[6px]">
              umich
            </span>{' '}
            students.
          </h1>
        </header>

        {/*
          ✦ psst — you found the comment.
          every student site here links back to this page, and this page links to
          all of them. a shared cluster of mutual do-follow backlinks between
          .edu-adjacent portfolio sites is basically SEO catnip for google.
          if you're a UMich student with a personal site and no backlinks:
          add yours. → github.com/AlexCSalinas/michigan-webring
        */}
        <div
          aria-hidden="true"
          style={{ display: 'none' }}
          dangerouslySetInnerHTML={{
            __html:
              '<!-- ✦ psst — every site here links back, and this page links to all of them. mutual do-follow backlinks between .edu-adjacent portfolios = SEO catnip. add yours → github.com/AlexCSalinas/michigan-webring -->',
          }}
        />

        {/* Search */}
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          availableYears={availableYears}
        />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-16">
          {filteredStudents.map((student, index) => (
            <StudentCard key={`${student.name}-${index}`} student={student} index={index} />
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="py-16 text-center font-mono text-sm text-neutral-500 dark:text-neutral-500 mb-16">
            <span className="text-rust">grep:</span> no matches
          </div>
        )}

        {/* Add Your Site */}
        <div className="mb-16 max-w-xl mx-auto text-center">
          <a
            href="https://github.com/AlexCSalinas/michigan-webring"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-3 border-2 border-ink dark:border-paper text-ink dark:text-paper hover:bg-ink dark:hover:bg-paper hover:text-paper dark:hover:text-ink transition-colors duration-150 font-mono text-sm"
          >
            <span className="text-rust group-hover:text-rust">+</span>
            <span>add your site</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <p className="mt-4 text-[11px] font-mono text-neutral-400 dark:text-neutral-600 leading-relaxed">
            <span className="text-neutral-500 dark:text-neutral-500">{'// '}</span>
            joining means mutual do-follow backlinks with every other portfolio in the ring.{' '}
            <span className="text-rust dark:text-rust font-medium">good for SEO.</span>{' '}
            <span className="opacity-70">don&apos;t tell google.</span>
          </p>
        </div>

        {/* Featured site */}
        <FeaturedSite students={students} />

        {/* Footer */}
        <footer className="border-t rule pt-6 font-mono text-[11px] text-neutral-400 dark:text-neutral-600 flex flex-col md:flex-row justify-between gap-2">
          <span>
            <span className="text-neutral-500 dark:text-neutral-500">{'// '}</span>
            inspired by{' '}
            <a href="https://se-webring.xyz" className="underline decoration-dotted hover:text-rust dark:hover:text-rust transition-colors">
              se-webring.xyz
            </a>{' '}
            &amp;{' '}
            <a href="https://github.com/MichaelFromOrg/ubc-webring" className="underline decoration-dotted hover:text-rust dark:hover:text-rust transition-colors">
              ubc-webring
            </a>
          </span>
          <span className="opacity-70">hail to the victors</span>
        </footer>
      </div>
    </div>
  )
}

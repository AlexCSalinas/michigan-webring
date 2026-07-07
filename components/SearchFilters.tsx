'use client'

interface SearchFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedYear: string
  setSelectedYear: (year: string) => void
  availableYears: string[]
}

export function SearchFilters({
  searchTerm,
  setSearchTerm,
}: SearchFiltersProps) {
  return (
    <div className="mb-8 max-w-xl mx-auto">
      <label className="flex items-center gap-2 font-mono text-sm border-t border-b rule py-3 px-1">
        <span className="text-rust select-none">$</span>
        <span className="text-neutral-500 dark:text-neutral-500 select-none">grep</span>
        <input
          type="text"
          placeholder="domain or year..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent outline-none text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 caret-rust"
          spellCheck={false}
          autoComplete="off"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-xs text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300 select-none"
            aria-label="Clear search"
          >
            [x]
          </button>
        )}
      </label>
    </div>
  )
}

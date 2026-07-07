


'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (theme === 'dark' || (!theme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 md:top-6 md:right-6 z-50 p-2.5 border border-ink/10 dark:border-paper/20 bg-paper dark:bg-coal hover:border-rust dark:hover:border-rust transition-colors duration-150"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={16} className="text-rust" />
      ) : (
        <Moon size={16} className="text-neutral-700" />
      )}
    </button>
  )
}
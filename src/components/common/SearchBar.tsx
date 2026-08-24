'use client'

import * as React from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (value: string) => void
}

export function SearchBar({ placeholder = 'Search...', onSearch }: SearchBarProps) {
  const [query, setQuery] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleClear = () => {
    setQuery('')
    onSearch?.('')
    inputRef.current?.focus()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    onSearch?.(val)
  }

  return (
    <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl ">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-font-blue">
        <Search className="h-4 w-4 sm:h-5 sm:w-5 transition-all" />
      </div>

      <Input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="
            w-full
           h-8 sm:h-10
           pl-10 sm:pl-12
          pr-10 sm:pr-12
            rounded-full

            border-2
            border-font-blue
            bg-transparent

            text-app-primary
            placeholder:text-font-blue      

            shadow-none
            outline-none

            focus-visible:border-font-blue
            focus-visible:ring-0
            focus-visible:ring-offset-0

            transition-colors
            "
      />

      {/* Clear Button */}
      <div className="absolute inset-y-0 right-3 flex items-center">
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="
                h-7
                w-7
                rounded-full
                text-font-blue
                hover:text-font-blue
                hover:bg-transparent
                "
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </div>
  )
}

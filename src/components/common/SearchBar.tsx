'use client'

import * as React from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  onFilterClick?: () => void
}

export function SearchBar({
  placeholder = 'Search anything...',
  value,
  onChange,
  onSearch,
}: SearchBarProps) {
  const isControlled = value !== undefined
  const [internalQuery, setInternalQuery] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)
  const query = isControlled ? value : internalQuery

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
    const nextValue = ''
    if (!isControlled) {
      setInternalQuery(nextValue)
    }
    onChange?.(nextValue)
    onSearch?.(nextValue)
    inputRef.current?.focus()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (!isControlled) {
      setInternalQuery(val)
    }
    onChange?.(val)
    onSearch?.(val)
  }

  return (
    <div className="relative flex items-center w-full  bg-white rounded-full shadow-sm  border border-slate-100 hover:border-font-blue">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-font-blue">
        <Search className="h-4 w-4 sm:h-4 sm:w-4 transition-all" />
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
        pl-10 sm:pl-11
        pr-16
        rounded-full

        border-none
        bg-transparent

        text-gray-900
        placeholder:text-gray-400

        shadow-none
        outline-none

        focus-visible:ring-0
        focus-visible:ring-offset-0
        transition-colors
        text-sm        
      "
      />

      <div className="absolute inset-y-0 right-1 flex items-center gap-1">
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 mr-1"
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

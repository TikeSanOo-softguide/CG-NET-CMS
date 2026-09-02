import { Filter } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface FilterOption {
  label: string
  value: string
}

interface CommonFilterProps {
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  ariaLabel?: string
}

export function CommonFilter({
  options,
  value,
  onChange,
  ariaLabel = 'Filter',
}: CommonFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={ariaLabel}
          className="
            group
            h-11 w-11
            rounded-full
            border-0
            bg-transparent
            p-0
            shadow-none
            outline-none
            ring-0
            hover:bg-transparent
            focus:bg-transparent
            focus:outline-none
            focus:ring-0
            focus-visible:outline-none
            focus-visible:ring-0
            data-[state=open]:outline-none
            data-[state=open]:ring-0
          "
        >
          <div
            className="
              flex h-9 w-9 sm:h-11 sm:w-11
              items-center justify-center
              rounded-full
              bg-icon-cbg
              text-app-primary
              transition-all duration-300
              group-hover:scale-110
              group-hover:bg-app-primary
              group-hover:text-icon-clock-hover
              group-hover:shadow-[0_0_18px_currentColor]
            "
            aria-hidden="true"
          >
            <Filter className="h-5 w-5 transition-colors duration-300" />
          </div>

          <span className="sr-only">{ariaLabel}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="bottom"
        className="
          z-50
          w-40
          rounded-xl
          border
          border-border
          bg-background
          p-2
          shadow-lg
          outline-none
          ring-0
          focus:outline-none
          focus:ring-0
          sm:w-48
        "
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => onChange(option.value)}
            className={`
              cursor-pointer
              rounded-md
              border-0
              px-2 py-1.5
              text-xs
              outline-none
              ring-0
              focus:outline-none
              focus:ring-0
              focus-visible:outline-none
              focus-visible:ring-0
              sm:px-3
              sm:py-2
              sm:text-sm
              ${
                option.value === value
                  ? 'bg-app-primary/10 font-semibold text-app-primary'
                  : 'font-medium'
              }
            `}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

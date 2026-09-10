import { t } from 'i18next'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

type DropdownOption = {
  label: string
  value: string
}

type CommonDropdownProps = {
  value: string
  options: DropdownOption[]
  placeholder?: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
}

export default function CommonDropdown({
  value,
  options,
  placeholder = '',
  onChange,
  disabled = false,
  className = '',
}: CommonDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedOption = options.find((option) => option.value === value)

  function handleSelect(optionValue: string) {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div className={`relative w-full ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          flex w-full items-center justify-between
          rounded-xl border border-gray-200
          bg-white px-4 py-3
          text-sm font-medium text-gray-700
          shadow-sm transition
          hover:border-gray-300
          focus:outline-none
          focus:ring-2 focus:ring-app-primary
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <span className={!selectedOption ? 'text-gray-400' : ''}>
          {selectedOption?.label ?? placeholder}
        </span>

        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && !disabled && (
        <>
          <button
            type="button"
            aria-label="Close dropdown"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />

          <div
            className="
              absolute left-0 right-0 top-full z-50 mt-2
              overflow-hidden rounded-xl
              border border-gray-200
              bg-white
              shadow-lg
            "
          >
            <div className="max-h-60 overflow-y-auto p-1">
              {options.length > 0 ? (
                options.map((option) => {
                  const isSelected = option.value === value

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      className={`
                        flex w-full items-center
                        rounded-lg px-3 py-2.5
                        text-left text-sm
                        transition
                        ${
                          isSelected
                            ? 'font-medium text-font-blue'
                            : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  )
                })
              ) : (
                <div className="px-3 py-4 text-center text-sm text-gray-400">
                  {t('location.noOption')}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { SupportedLanguage } from '@/lib/i18n'

const LANGUAGES: { code: SupportedLanguage; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'my', label: 'Myanmar', nativeLabel: 'မြန်မာ' },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language as SupportedLanguage

  // Sync <html lang> attribute for Myanmar font CSS rule
  useEffect(() => {
    document.documentElement.lang = currentLang
    // Only language preference is stored — never PII or tokens
    localStorage.setItem('cgnet_language', currentLang)
  }, [currentLang])

  function handleChange(lang: SupportedLanguage) {
    void i18n.changeLanguage(lang)
  }

  const active = LANGUAGES.find((l) => l.code === currentLang) ?? LANGUAGES[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5"
          aria-label={`Language: ${active.nativeLabel}. Click to switch language`}
        >
          <Globe className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">{active.nativeLabel}</span>
          <span className="sm:hidden">{active.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            className={currentLang === lang.code ? 'bg-accent font-medium' : ''}
          >
            <span className="mr-2">{lang.code === 'my' ? '🇲🇲' : '🇬🇧'}</span>
            {lang.nativeLabel}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

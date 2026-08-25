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
import { normalizeLanguage, type SupportedLanguage } from '@/lib/i18n/languages'

const LANGUAGES: {
  code: SupportedLanguage
  label: string
  nativeLabel: string
  flag: string
}[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'my', label: 'Myanmar', nativeLabel: 'မြန်မာ', flag: '🇲🇲' },
  { code: 'zh', label: 'Chinese', nativeLabel: '中文', flag: '🇨🇳' },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const currentLang = normalizeLanguage(i18n.language)

  // Sync <html lang> attribute for Myanmar / Chinese font CSS rules
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
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="
            gap-1.5 
            shrink-0
            focus:ring-0
            focus:ring-offset-0
            focus-visible:outline-none
            focus-visible:ring-0
            focus-visible:ring-offset-0
            data-[state=open]:bg-accent"
          aria-label={`Language: ${active.nativeLabel}. Click to switch language`}
          aria-haspopup="menu"
        >
          <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">{active.nativeLabel}</span>
          <span className="sm:hidden">{active.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        side="bottom" 
        className="
          w-44
          outline-none
          ring-0
          focus:outline-none
          focus:ring-0
          focus:ring-offset-0"
        >
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleChange(lang.code)}
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
              focus:ring-offset-0
              focus-visible:outline-none
              focus-visible:ring-0
              focus-visible:ring-offset-0
              sm:px-3
              sm:py-2
              sm:text-sm
              ${
                currentLang === lang.code
                  ? 'text-transparent bg-clip-text bg-gradient-font font-semibold'
                  : 'font-medium'
              }
            `}
          >
            <span className="mr-2 w-5 text-center" aria-hidden="true">{lang.flag}</span>
            {lang.nativeLabel}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

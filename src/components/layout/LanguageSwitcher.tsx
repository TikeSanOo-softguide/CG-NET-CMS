import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { normalizeLanguage, type SupportedLanguage } from '@/lib/i18n/languages'
import { cn } from '@/lib/utils'

const LANGUAGES: {
  code: SupportedLanguage
  label: string
  nativeLabel: string
  flag: string
}[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: 'us.svg' },
  { code: 'my', label: 'Myanmar', nativeLabel: 'မြန်မာ', flag: 'mm.svg' },
  { code: 'zh', label: 'Chinese', nativeLabel: '中文', flag: 'cn.svg' },
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
          className="h-auto gap-1.5 shrink-0 px-2 py-2 font-heading text-[15px] font-medium text-font-black hover:bg-accent hover:text-accent-foreground focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:bg-accent lg:px-2 lg:text-base xl:px-3"
          aria-label={`Language: ${active.nativeLabel}. Click to switch language`}
          aria-haspopup="menu"
        >
          <span className="flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-xl">
            <img
              src={`/assets/flags/${active.flag}`}
              alt=""
              className="size-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </span>
          <span className="text-inherit">{active.nativeLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-44 outline-none ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0"
      >
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            className="flex cursor-pointer items-center gap-2 rounded-md border-0 px-3 py-2 text-base font-heading font-medium text-font-black outline-none ring-0 transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <span className="flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-xl">
              <img
                src={`/assets/flags/${lang.flag}`}
                alt=""
                className="size-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </span>
            <span
              className={cn(
                'truncate',
                lang.code === 'my' ? 'leading-[1.8]' : 'leading-[1.4]',
                currentLang === lang.code &&
                  'bg-gradient-font bg-clip-text text-transparent'
              )}
            >
              {lang.nativeLabel}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

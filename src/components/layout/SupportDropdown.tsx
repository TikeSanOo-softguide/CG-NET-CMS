import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown, MapPin, MessageCircle, ShieldCheck, Smartphone } from 'lucide-react'
import { cn } from '@/lib/utils'

export const SUPPORT_CATEGORIES = [
  { key: 'app-guide', labelKey: 'nav.appGuide', icon: Smartphone, to: '/app-guide' },
  { key: 'available-location', labelKey: 'footer.availableLocation', icon: MapPin, to: '/available-location' },
  { key: 'contact-us', labelKey: 'nav.contact', icon: MessageCircle, to: '/contact-us' },
  { key: 'privacy-policy', labelKey: 'footer.privacyPolicy', icon: ShieldCheck, to: '/privacy-policy' },
] as const

interface SupportDropdownProps {
  onClose?: () => void
}

export function SupportDropdown({ onClose }: SupportDropdownProps) {
  const { t } = useTranslation()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="
            gap-1
            font-heading text-base font-medium
            data-[state=open]:bg-accent
            focus:ring-0
            focus:ring-offset-0
            focus-visible:outline-none
            focus-visible:ring-0
            focus-visible:ring-offset-0
          "
          aria-label={t('nav.support')}
          aria-haspopup="menu"
        >
          {t('nav.support')}
          <ChevronDown className="h-3.5 w-3.5 opacity-60 shrink-0" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="bottom"
        className="w-56 outline-none ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0"
      >
        <DropdownMenuLabel className="font-heading text-base font-medium text-font-black">
          {t('nav.support')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {SUPPORT_CATEGORIES.map(({ key, labelKey, icon: Icon, to }) => (
          <DropdownMenuItem key={key} asChild>
            <NavLink
              to={to}
              onClick={onClose}
              className="flex cursor-pointer items-center gap-2 rounded-md border-0 px-3 py-2 text-base font-heading font-medium outline-none ring-0 transition-colors hover:bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className="h-4 w-4 shrink-0 text-font-blue"
                    aria-hidden="true"
                  />

                  <span
                    className={cn(
                      'transition-colors',
                      isActive
                        ? 'bg-gradient-font bg-clip-text text-transparent'
                        : 'text-font-black'
                    )}
                  >
                    {t(labelKey)}
                  </span>
                </>
              )}
            </NavLink>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { SupportDropdown as PackageDropdown }

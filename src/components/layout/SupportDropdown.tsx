import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
  const location = useLocation()
  const isSupportRoute = SUPPORT_CATEGORIES.some(({ to }) => location.pathname === to)
    

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <span
            className={cn(
              "relative inline-flex cursor-pointer items-center gap-1",
              "font-heading text-base font-medium",
              "focus-visible:outline-none",
              isSupportRoute && "text-transparent bg-clip-text bg-gradient-font"
            )}
            role="button"
            tabIndex={0}
          >
          <span
            className={cn(
              isSupportRoute && "text-transparent bg-clip-text bg-gradient-font"
            )}
          >
            {t("nav.support")}
          </span>

          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 shrink-0 opacity-60",
              isSupportRoute ? "text-font-blue" : "text-current"
            )}
            aria-hidden="true"
          />
          
          <span
            className={cn(
              'absolute inset-x-0 -bottom-[6px] h-0.5 rounded-full bg-gradient-font transition-all duration-300 transform origin-left',
              isSupportRoute ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            )}
          />
        </span>
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
              className={({ isActive }) =>
                cn(
                  'flex cursor-pointer items-center gap-2 rounded-md border-0 px-3 py-2 text-base font-heading font-medium outline-none ring-0 transition-colors hover:bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
                  isActive ? 'bg-gradient-font bg-clip-text text-transparent' : 'text-font-black'
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0 text-font-blue" aria-hidden="true" />
              {t(labelKey)}
            </NavLink>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { SupportDropdown as PackageDropdown }

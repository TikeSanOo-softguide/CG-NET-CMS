import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, Building2, Wifi, Building } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

const PACKAGE_CATEGORIES = [
  { key: 'home', labelKey: 'nav.homeBroadband', icon: Home, href: '/packages?category=home' },
  { key: 'business', labelKey: 'nav.business', icon: Building2, href: '/packages?category=business' },
  { key: 'enterprise', labelKey: 'nav.enterprise', icon: Building, href: '/packages?category=enterprise' },
  { key: 'wireless', labelKey: 'nav.fiber', icon: Wifi, href: '/packages?category=wireless' },
]

interface PackageDropdownProps {
  onClose?: () => void
}

export function PackageDropdown({ onClose }: PackageDropdownProps) {
  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1"
          aria-label={t('nav.packagesMenu')}
        >
          {t('nav.packages')}
          <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52">
        <DropdownMenuLabel>{t('nav.packages')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {PACKAGE_CATEGORIES.map(({ key, labelKey, icon: Icon, href }) => (
          <DropdownMenuItem key={key} asChild>
            <Link
              to={href}
              onClick={onClose}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              {t(labelKey)}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/packages" onClick={onClose} className="font-medium text-primary cursor-pointer">
            {t('nav.viewAllPackages')} →
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

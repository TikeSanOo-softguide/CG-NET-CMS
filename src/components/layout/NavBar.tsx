import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { PackageDropdown } from './PackageDropdown'
import { LanguageSwitcher } from './LanguageSwitcher'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { to: '/', labelKey: 'nav.home', exact: true },
  { to: '/services', labelKey: 'nav.services' },
  { to: '/news', labelKey: 'nav.news' },
  { to: '/career', labelKey: 'nav.career' },
  { to: '/app-guide', labelKey: 'nav.appGuide' },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/contact', labelKey: 'nav.contact' },
]

const MOBILE_PACKAGE_LINKS = [
  { to: '/packages?category=home', labelKey: 'nav.homeBroadband' },
  { to: '/packages?category=business', labelKey: 'nav.business' },
  { to: '/packages?category=enterprise', labelKey: 'nav.enterprise' },
  { to: '/packages', labelKey: 'nav.viewAllPackages' },
]

export function NavBar() {
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav role="navigation" aria-label="Main navigation">
      {/* Desktop nav links */}
      <div className="hidden md:flex items-center gap-1">
        {NAV_LINKS.slice(0, 1).map(({ to, labelKey }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                isActive && 'bg-accent text-accent-foreground'
              )
            }
          >
            {t(labelKey)}
          </NavLink>
        ))}

        <NavLink
          to="/services"
          className={({ isActive }) =>
            cn(
              'px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
              isActive && 'bg-accent text-accent-foreground'
            )
          }
        >
          {t('nav.services')}
        </NavLink>

        {/* Packages dropdown */}
        <PackageDropdown />

        {NAV_LINKS.slice(2).map(({ to, labelKey }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                isActive && 'bg-accent text-accent-foreground'
              )
            }
          >
            {t(labelKey)}
          </NavLink>
        ))}
      </div>

      {/* Mobile nav — slide-out sheet */}
      <div className="md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={t('nav.toggleMenu')}
              aria-expanded={mobileOpen}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 overflow-y-auto">
            <SheetHeader className="mb-4">
              <SheetTitle>
                <Link to="/" onClick={() => setMobileOpen(false)} className="text-xl font-bold text-primary">
                  CG-NET
                </Link>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-1">
              {/* Home link */}
              <NavLink
                to="/"
                end
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2.5 rounded-md text-sm font-medium transition-colors hover:bg-accent',
                    isActive && 'bg-accent'
                  )
                }
              >
                {t('nav.home')}
              </NavLink>

              <NavLink
                to="/services"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2.5 rounded-md text-sm font-medium transition-colors hover:bg-accent',
                    isActive && 'bg-accent'
                  )
                }
              >
                {t('nav.services')}
              </NavLink>

              {/* Packages expandable accordion */}
              <Accordion type="single" collapsible>
                <AccordionItem value="packages" className="border-none">
                  <AccordionTrigger className="px-3 py-2.5 text-sm font-medium hover:no-underline">
                    {t('nav.packages')}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 flex flex-col gap-1">
                      {MOBILE_PACKAGE_LINKS.map(({ to, labelKey }) => (
                        <NavLink
                          key={to}
                          to={to}
                          onClick={() => setMobileOpen(false)}
                          className={({ isActive }) =>
                            cn(
                              'px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent',
                              isActive && 'bg-accent'
                            )
                          }
                        >
                          {t(labelKey)}
                        </NavLink>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {NAV_LINKS.slice(2).map(({ to, labelKey }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'px-3 py-2.5 rounded-md text-sm font-medium transition-colors hover:bg-accent',
                      isActive && 'bg-accent'
                    )
                  }
                >
                  {t(labelKey)}
                </NavLink>
              ))}

              <div className="mt-4 pt-4 border-t">
                <LanguageSwitcher />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

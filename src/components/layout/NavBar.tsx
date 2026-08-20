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
  const isPackageRouteActive = MOBILE_PACKAGE_LINKS.some(({ to }) =>
  location.pathname === to || location.pathname.startsWith(`${to}/`)
)

  return (
    <nav role="navigation" aria-label="Main navigation" className="flex items-center">
      {/* Desktop nav links */}
      <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
        {NAV_LINKS.slice(0, 1).map(({ to, labelKey }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              cn(
                'px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                isActive && 'text-transparent bg-gradient-to-r bg-clip-text from-primary via-blue-600 to-purple-600'
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
              'px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
              isActive && 'text-transparent bg-gradient-to-r bg-clip-text from-primary via-blue-600 to-purple-600'
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
                'px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                isActive && 'text-transparent bg-gradient-to-r bg-clip-text from-primary via-blue-600 to-purple-600'
              )
            }
          >
            {t(labelKey)}
          </NavLink>
        ))}
      </div>

      {/* Mobile nav — slide-out sheet */}
      <div className="lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11"
              aria-label={t('nav.toggleMenu')}
              aria-expanded={mobileOpen}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[min(20rem,88vw)] overflow-y-auto p-5">
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
                    'px-3 py-3 rounded-md text-sm font-medium transition-colors hover:bg-accent min-h-11 flex items-center',
                    isActive && 'text-transparent bg-gradient-to-r bg-clip-text from-primary via-blue-600 to-purple-600'
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
                    'px-3 py-3 rounded-md text-sm font-medium transition-colors hover:bg-accent min-h-11 flex items-center',
                    isActive && 'text-transparent bg-gradient-to-r bg-clip-text from-primary via-blue-600 to-purple-600'
                  )
                }
              >
                {t('nav.services')}
              </NavLink>

              {/* Packages expandable accordion */}
              {/* <Accordion type="single" collapsible>
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
                              isActive && 'text-transparent bg-gradient-to-r bg-clip-text from-primary via-blue-600 to-purple-600'
                            )
                          }
                        >
                          {t(labelKey)}
                        </NavLink>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion> */}


              <Accordion type="single" collapsible>
    <AccordionItem value="packages" className="border-none">
      <AccordionTrigger
        className={cn(
          'group px-3 py-2.5 text-sm font-medium hover:no-underline',

          // Give the trigger a group so the text can react to
          // hover and data-state.
          'group'
        )}
      >
        <span
          className={cn(
            'transition-all',

            // Hover
            'group-hover:bg-gradient-to-r',
            'group-hover:from-primary',
            'group-hover:via-blue-600',
            'group-hover:to-purple-600',
            'group-hover:bg-clip-text',
            'group-hover:text-transparent',

            // Accordion open
            'group-data-[state=open]:bg-gradient-to-r',
            'group-data-[state=open]:from-primary',
            'group-data-[state=open]:via-blue-600',
            'group-data-[state=open]:to-purple-600',
            'group-data-[state=open]:bg-clip-text',
            'group-data-[state=open]:text-transparent',

            // Child route active
            isPackageRouteActive &&
              'bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent'
          )}
        >
          {t('nav.packages')}
        </span>
      </AccordionTrigger>

      <AccordionContent>
        <div className="pl-4 flex flex-col gap-1">
          {MOBILE_PACKAGE_LINKS.map(({ to, labelKey }) => (
            <NavLink
              key={to}
              to={to}
              end
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  'px-3 py-2 rounded-md text-sm transition-colors',

                  // Normal hover background
                  'hover:bg-accent',

                  // Hover gradient text
                  'hover:bg-gradient-to-r',
                  'hover:from-primary',
                  'hover:via-blue-600',
                  'hover:to-purple-600',
                  'hover:bg-clip-text',
                  'hover:text-transparent',

                  // Active route gradient text
                  isActive &&
                    'bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent'
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
                      'px-3 py-3 rounded-md text-sm font-medium transition-colors hover:bg-accent min-h-11 flex items-center',
                      isActive && 'text-transparent bg-gradient-to-r bg-clip-text from-primary via-blue-600 to-purple-600'
                    )
                  }
                >
                  {t(labelKey)}
                </NavLink>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

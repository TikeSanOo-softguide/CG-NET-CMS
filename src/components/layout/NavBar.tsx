import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { to: '/', labelKey: 'nav.home', exact: true },
  { to: '/services', labelKey: 'nav.services' },
  { to: '/news', labelKey: 'nav.news' },
  { to: '/promotion', labelKey: 'nav.promotion' },
  { to: '/app-guide', labelKey: 'nav.appGuide' },
  { to: '/about', labelKey: 'nav.about' },
]

const MOBILE_PACKAGE_LINKS = [
  { to: '/packages?category=mm-broadband', labelKey: 'services.mmBroadband.title' },
  { to: '/packages?category=cg-broadband', labelKey: 'services.cgBroadband.title' },
  { to: '/packages?category=cg-net-broadband', labelKey: 'services.cgNetBroadband.title' },
  { to: '/packages?category=other-service', labelKey: 'services.iptv.title' },
]

export function NavBar() {
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav role="navigation" aria-label="Main navigation" className="flex items-center font-heading">
      {/* Desktop nav links */}

      <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
        {/* Home */}
        <NavLink
          to="/"
          end
          className="px-2 xl:px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
        >
          {({ isActive }) => (
            <span className="relative inline-block">
              {/* Normal text - always exists */}
              <span className="text-font-muted">{t('nav.home')}</span>

              <span
                className={cn(
                  'absolute inset-0 bg-gradient-font bg-clip-text text-transparent transition-opacity duration-150',
                  isActive ? 'opacity-100' : 'opacity-0'
                )}
                aria-hidden="true"
              >
                {t('nav.home')}
              </span>
              <span
                className={cn(
                  'absolute inset-x-0 -bottom-[6px] h-0.5 rounded-full bg-gradient-font transition-all duration-300 transform origin-left',
                  isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                )}
              />
            </span>
          )}
        </NavLink>

        {/* Services */}
        <NavLink
          to="/services"
          className="px-2 xl:px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
        >
          {({ isActive }) => (
            <span className="relative inline-block">
              <span className="text-font-muted">{t('nav.services')}</span>

              <span
                className={cn(
                  'absolute inset-0 bg-gradient-font bg-clip-text text-transparent transition-opacity duration-150',
                  isActive ? 'opacity-100' : 'opacity-0'
                )}
                aria-hidden="true"
              >
                {t('nav.services')}
              </span>
              <span
                className={cn(
                  'absolute inset-x-0 -bottom-[6px] h-0.5 rounded-full bg-gradient-font transition-all duration-300 transform origin-left',
                  isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                )}
              />
            </span>
          )}
        </NavLink>

        {/* Packages */}
        <NavLink
          to="/packages?category=mm-broadband"
          className="px-2 xl:px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
        >
          {({ isActive }) => (
            <span className="relative inline-block">
              <span className="text-font-muted">{t('nav.packages')}</span>

              <span
                className={cn(
                  'absolute inset-0 bg-gradient-font bg-clip-text text-transparent transition-opacity duration-150',
                  isActive ? 'opacity-100' : 'opacity-0'
                )}
                aria-hidden="true"
              >
                {t('nav.packages')}
              </span>
              <span
                className={cn(
                  'absolute inset-x-0 -bottom-[6px] h-0.5 rounded-full bg-gradient-font transition-all duration-300 transform origin-left',
                  isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                )}
              />
            </span>
          )}
        </NavLink>

        {/* News, Promotion, App Guide, About */}
        {NAV_LINKS.slice(2).map(({ to, labelKey }) => (
          <NavLink
            key={to}
            to={to}
            className="px-2 xl:px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
          >
            {({ isActive }) => (
              <span className="relative inline-block">
                {/* Normal text */}
                <span className="text-font-muted">{t(labelKey)}</span>

                {/* Gradient text */}
                <span
                  className={cn(
                    'absolute inset-0 bg-gradient-font bg-clip-text text-transparent transition-opacity duration-150',
                    isActive ? 'opacity-100' : 'opacity-0'
                  )}
                  aria-hidden="true"
                >
                  {t(labelKey)}
                </span>
                <span
                  className={cn(
                    'absolute inset-x-0 -bottom-[6px] h-0.5 rounded-full bg-gradient-font transition-all duration-300 transform origin-left',
                    isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  )}
                />
              </span>
            )}
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
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-bold text-primary"
                >
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
                    isActive && 'text-transparent bg-clip-text bg-gradient-font'
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
                    isActive && 'text-transparent bg-clip-text bg-gradient-font'
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
                              isActive && 'text-transparent bg-clip-text bg-gradient-font'
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
                      isActive && 'text-transparent bg-clip-text bg-gradient-font'
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

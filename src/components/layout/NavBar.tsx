import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronDown, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { LanguageSwitcher } from './LanguageSwitcher'
import { NEWS_CATEGORIES, SERVICE_CATEGORIES, SUPPORT_CATEGORIES } from '@/lib/content/navbar'
import { CommonDropdown } from './CommonDropdown'

function DesktopNavItem({ to, labelKey }: { to: string; labelKey: string }) {
  const { t } = useTranslation()

  return (
    <NavLink
      key={to}
      to={to}
      end={to === '/'}
      className="px-2 xl:px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
    >
      {({ isActive }) => (
        <span className="relative inline-block">
          <span className="text-font-black">{t(labelKey)}</span>

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
  )
}

function MobileNavLink({
  to,
  labelKey,
  onNavigate,
}: {
  to: string
  labelKey: string
  onNavigate: () => void
}) {
  const { t } = useTranslation()

  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'flex min-h-12 items-center rounded-md px-3 py-2.5 text-[15px] font-medium text-font-black transition-colors hover:bg-accent/60',
          isActive && 'text-transparent bg-clip-text bg-gradient-font'
        )
      }
    >
      {t(labelKey)}
    </NavLink>
  )
}

export function NavBar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isSupportRoute = SUPPORT_CATEGORIES.some(({ to }) =>
    location.pathname.startsWith(to.split('?')[0])
  )

  const isServiceRoute = SERVICE_CATEGORIES.some(({ to }) =>
    location.pathname.startsWith(to.split('?')[0])
  )

  const isNewRoute = NEWS_CATEGORIES.some(({ to }) =>
    location.pathname.startsWith(to.split('?')[0])
  )

  const closeMobileMenu = () => setMobileOpen(false)

  return (
    <nav aria-label="Main navigation" className="flex items-center font-heading">
      <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 collapsible">
        {/* Home */}
        <DesktopNavItem key="home" to="/" labelKey="nav.home" />
        {/* Service */}
        <CommonDropdown categories={SERVICE_CATEGORIES} labelKey="nav.services" />
        {/* News */}
        <CommonDropdown categories={NEWS_CATEGORIES} labelKey="nav.newsUpdate" />
        {/* About */}
        <DesktopNavItem key="about" to="/about" labelKey="nav.about" />
        {/* Support */}
        <CommonDropdown categories={SUPPORT_CATEGORIES} labelKey="nav.support" />
      </div>

      <div className="lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full"
              aria-label={t('nav.toggleMenu')}
              aria-expanded={mobileOpen}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-[min(20rem,82vw)] max-w-[20rem] overflow-y-auto border-r border-border bg-background p-0"
          >
            <SheetHeader className="border-b border-border px-4 pb-3 pt-1">
              <SheetTitle className="sr-only">{t('nav.toggleMenu')}</SheetTitle>
              <div className="flex items-center justify-center">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  aria-label="Yaung Ni Oo home"
                  className="flex h-12 items-center justify-center"
                >
                  <img
                    src="/assets/logo/logo.svg"
                    alt="Yaung Ni Oo logo"
                    className="block h-[30px] w-auto"
                    loading="lazy"
                  />
                </Link>
              </div>
            </SheetHeader>

            <div className="flex flex-col gap-1 px-3 py-3">
              {/* Home Mobile*/}
              <MobileNavLink key="home" to="/" labelKey="nav.home" onNavigate={closeMobileMenu} />
              {/* Service Mobile*/}
              <Accordion
                type="single"
                collapsible
                defaultValue={isServiceRoute ? 'services' : undefined}
              >
                <AccordionItem value="services" className="border-none">
                  <AccordionTrigger
                    className={cn(
                      'group flex min-h-12 w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-[15px] font-medium text-font-black transition-colors hover:no-underline hover:bg-accent/60',
                      isServiceRoute && 'text-transparent bg-clip-text bg-gradient-font'
                    )}
                  >
                    {t('nav.services')}
                    <ChevronDown className="size-4 shrink-0 text-font-black transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pt-1">
                    <div className="ml-3 border-l border-border/80 pl-3">
                      {SERVICE_CATEGORIES.map(({ key, labelKey, to }) => (
                        <NavLink
                          key={key}
                          to={to}
                          onClick={closeMobileMenu}
                          className={({ isActive }) =>
                            cn(
                              'flex min-h-11 items-center rounded-md px-3  text-[15px] font-medium transition-colors hover:bg-accent/60',
                              isActive && 'text-transparent bg-clip-text bg-gradient-font',
                              !isActive && 'text-font-black'
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
              {/* News Mobile*/}
              <Accordion type="single" collapsible defaultValue={isNewRoute ? 'news' : undefined}>
                <AccordionItem value="news" className="border-none">
                  <AccordionTrigger
                    className={cn(
                      'group flex min-h-12 w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-[15px] font-medium text-font-black transition-colors hover:no-underline hover:bg-accent/60',
                      isNewRoute && 'text-transparent bg-clip-text bg-gradient-font'
                    )}
                  >
                    {t('nav.newsUpdate')}
                    <ChevronDown className="size-4 shrink-0 text-font-black transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pt-1">
                    <div className="ml-3 border-l border-border/80 pl-3">
                      {NEWS_CATEGORIES.map(({ key, labelKey, to }) => (
                        <NavLink
                          key={key}
                          to={to}
                          onClick={closeMobileMenu}
                          className={({ isActive }) =>
                            cn(
                              'flex min-h-11 items-center rounded-md px-3  text-[15px] font-medium transition-colors hover:bg-accent/60',
                              isActive && 'text-transparent bg-clip-text bg-gradient-font',
                              !isActive && 'text-font-black'
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
              {/* About Mobile*/}
              <MobileNavLink
                key="about"
                to="/about"
                labelKey="nav.about"
                onNavigate={closeMobileMenu}
              />
              {/* Support Mobile*/}
              <Accordion
                type="single"
                collapsible
                defaultValue={isSupportRoute ? 'support' : undefined}
              >
                <AccordionItem value="support" className="border-none">
                  <AccordionTrigger
                    className={cn(
                      'group flex min-h-12 w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-[15px] font-medium text-font-black transition-colors hover:no-underline hover:bg-accent/60',
                      isSupportRoute && 'text-transparent bg-clip-text bg-gradient-font'
                    )}
                  >
                    {t('nav.support')}
                    <ChevronDown className="size-4 shrink-0 text-font-black transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pt-1">
                    <div className="ml-3 border-l border-border/80 pl-3">
                      {SUPPORT_CATEGORIES.map(({ key, labelKey, to }) => (
                        <NavLink
                          key={key}
                          to={to}
                          onClick={closeMobileMenu}
                          className={({ isActive }) =>
                            cn(
                              'flex min-h-11 items-center rounded-md px-3  text-[15px] font-medium transition-colors hover:bg-accent/60',
                              isActive && 'text-transparent bg-clip-text bg-gradient-font',
                              !isActive && 'text-font-black'
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
              {/* Language Mobile*/}
              <div className="mt-2 border-t border-border pt-3">
                <div className="px-3 pb-2 text-[13px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {t('common.language')}
                </div>
                <div className="px-1">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

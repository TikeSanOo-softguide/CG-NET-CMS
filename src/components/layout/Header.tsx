import { Link } from 'react-router-dom'
import { NavBar } from './NavBar'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  return (
    <div className="sticky top-0 z-50 pt-[env(safe-area-inset-top)]">
      <header className="w-full border-b border-border bg-background">
        <div className="container flex h-14 items-center justify-between gap-2 overflow-visible md:h-16 sm:gap-4">
          <Link to="/" className="flex h-full shrink-0 items-center" aria-label="Yaung Ni Oo Home">
            <img
              src="/assets/logo/logo.svg"
              alt="Yaung Ni Oo logo"
              className="block h-[38px] w-auto"
              loading="lazy"
            />
          </Link>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <NavBar />
            <div className="hidden lg:flex">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { NavBar } from './NavBar'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  return (
    <div className="sticky top-0 z-50 pt-[env(safe-area-inset-top)]">
      {/* <AnnouncementBar /> */}
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 md:h-16 items-center justify-between gap-2 sm:gap-4 overflow-visible">
          {/* Logo */}
          <Link
            to="/"
            className="flex h-full shrink-0 items-center"
            aria-label="CG-NET Home"
          >
            <img
              src="/assets/logo/logo.svg"
              alt="CG-NET logo"
              className="block h-[38px] w-auto object-cover"
              loading="lazy"
            />
          </Link>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <NavBar />
            <LanguageSwitcher />
          </div>
        </div>
      </header>
    </div>
  )
}

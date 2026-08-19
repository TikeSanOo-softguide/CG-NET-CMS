import { Link } from 'react-router-dom'
import { NavBar } from './NavBar'
import { LanguageSwitcher } from './LanguageSwitcher'
import { AnnouncementBar } from './AnnouncementBar'
import { Wifi } from 'lucide-react'

export function Header() {
  return (
    <div className="sticky top-0 z-50 pt-[env(safe-area-inset-top)]">
      <AnnouncementBar />
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 md:h-16 items-center justify-between gap-2 sm:gap-4 overflow-visible">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg sm:text-xl text-primary shrink-0 min-w-0"
            aria-label="CG-NET Home"
          >
            <Wifi className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            <span>CG-NET</span>
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

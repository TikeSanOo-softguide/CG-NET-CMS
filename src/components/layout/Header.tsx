import { Link } from 'react-router-dom'
import { NavBar } from './NavBar'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Wifi } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-primary shrink-0"
          aria-label="CG-NET Home"
        >
          <Wifi className="h-6 w-6" aria-hidden="true" />
          <span>CG-NET</span>
        </Link>

        {/* Desktop nav + language switcher */}
        <div className="flex items-center gap-2">
          <NavBar />
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}

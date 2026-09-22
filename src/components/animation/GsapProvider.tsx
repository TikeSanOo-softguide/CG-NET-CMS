import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { initGsap, refreshScrollTrigger } from '@/lib/gsap'

/**
 * Registers GSAP once and refreshes ScrollTrigger after route changes
 * so lazy-loaded pages and async content keep correct start positions.
 */
export function GsapProvider({ children }: { children: ReactNode }) {
  const { pathname, search } = useLocation()

  useEffect(() => {
    initGsap()
  }, [])

  useEffect(() => {
    const immediate = window.requestAnimationFrame(() => refreshScrollTrigger())
    const delayed = window.setTimeout(() => refreshScrollTrigger(), 350)

    return () => {
      window.cancelAnimationFrame(immediate)
      window.clearTimeout(delayed)
    }
  }, [pathname, search])

  return children
}

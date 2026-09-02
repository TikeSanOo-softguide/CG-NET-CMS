// src/hooks/useHashScroll.ts
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useHashScroll() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])
}

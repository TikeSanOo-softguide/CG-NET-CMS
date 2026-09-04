import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  useEffect(() => {
    const footer = document.querySelector('footer')

    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1,
      }
    )

    observer.observe(footer)

    return () => {
      observer.disconnect()
    }
  }, [pathname])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname])


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-6 right-5 z-50
        flex h-12 w-12 items-center justify-center
        rounded-full
        border
        shadow-lg
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
        active:scale-95
        ${
          isFooterVisible
            ? 'bg-app-primary text-font-white border-app-primary'
            : 'bg-text-white text-font-blue border-app-primary'
        }
      `}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
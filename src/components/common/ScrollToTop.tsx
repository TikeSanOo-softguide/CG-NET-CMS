import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

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
      className="
        fixed bottom-6 right-5 z-50
        flex h-12 w-12 items-center justify-center
        rounded-full
        bg-app-primary
        text-font-white
        shadow-lg
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
        active:scale-95
      "
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
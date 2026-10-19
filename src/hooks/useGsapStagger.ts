import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { GSAP_REVEAL, initGsap, prefersReducedMotion } from '@/lib/gsap'

interface UseGsapStaggerOptions {
  /** Stagger delay between children (seconds). */
  stagger?: number
  y?: number
  duration?: number
  disabled?: boolean
  /** Re-run when these change (e.g. loaded list length). */
  deps?: unknown[]
}

/**
 * Staggers direct children on scroll (rise + fade).
 */
export function useGsapStagger<T extends HTMLElement = HTMLDivElement>(
  options: UseGsapStaggerOptions = {}
) {
  const {
    stagger = 0.1,
    y = 24,
    duration = 0.55,
    disabled = false,
    deps = [],
  } = options
  const ref = useRef<T>(null)

  initGsap()

  useGSAP(
    () => {
      const el = ref.current
      if (!el || disabled || prefersReducedMotion()) return
      // Skip hidden breakpoint layouts so cards stay visible after resize.
      if (getComputedStyle(el).display === 'none') return

      const items = Array.from(el.children).filter(
        (node): node is HTMLElement => node instanceof HTMLElement
      )
      if (!items.length) return

      gsap.set(items, { autoAlpha: 0, y })

      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        duration,
        stagger,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: el,
          start: GSAP_REVEAL.start,
          once: true,
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: ref, dependencies: [stagger, y, duration, disabled, ...deps] }
  )

  return ref
}

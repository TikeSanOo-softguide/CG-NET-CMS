import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { GSAP_REVEAL, initGsap, prefersReducedMotion } from '@/lib/gsap'

export type GsapRevealMode = 'rise' | 'fade' | 'none'

interface UseGsapRevealOptions {
  mode?: GsapRevealMode
  disabled?: boolean
  /** Override default duration (seconds). */
  duration?: number
  /** Override ScrollTrigger start, e.g. 'top 95%'. */
  start?: string
}

/**
 * Reveals a whole block on scroll (one tween, one ScrollTrigger).
 * Does not animate nested elements individually.
 */
export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseGsapRevealOptions = {}
) {
  const {
    mode = 'rise',
    disabled = false,
    duration = GSAP_REVEAL.duration,
    start = GSAP_REVEAL.start,
  } = options
  const ref = useRef<T>(null)

  initGsap()

  useGSAP(
    () => {
      const el = ref.current
      if (!el || disabled || mode === 'none' || prefersReducedMotion()) return

      const tweenVars: gsap.TweenVars = {
        autoAlpha: 1,
        y: 0,
        duration,
        ease: 'power2.out',
        immediateRender: true,
        onComplete: () => {
          el.style.willChange = 'auto'
        },
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
          toggleActions: 'play none none none',
        },
      }

      if (mode === 'rise') {
        tweenVars.clearProps = 'transform'
      }

      const fromVars = mode === 'fade' ? { autoAlpha: 0 } : { autoAlpha: 0, y: GSAP_REVEAL.y }

      gsap.fromTo(el, fromVars, tweenVars)
    },
    { scope: ref, dependencies: [mode, disabled, duration, start] }
  )

  return ref
}

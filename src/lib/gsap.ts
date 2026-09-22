import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let initialized = false

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function initGsap() {
  if (initialized) return

  gsap.registerPlugin(useGSAP, ScrollTrigger)
  gsap.config({ nullTargetWarn: false })
  gsap.defaults({
    ease: 'power2.out',
    duration: 0.65,
  })

  initialized = true
}

export function refreshScrollTrigger() {
  if (typeof window === 'undefined') return
  ScrollTrigger.refresh()
}

export const GSAP_REVEAL = {
  y: 28,
  duration: 0.7,
  start: 'top 86%',
} as const

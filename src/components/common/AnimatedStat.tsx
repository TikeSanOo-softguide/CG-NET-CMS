import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { initGsap, prefersReducedMotion } from '@/lib/gsap'

interface AnimatedStatProps {
  value: string
}

export default function AnimatedStat({ value }: AnimatedStatProps) {
  const numberRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLSpanElement>(null)

  initGsap()

  useGSAP(
    () => {
      const numberEl = numberRef.current
      const containerEl = containerRef.current
      if (!numberEl || !containerEl) return

      const match = value.match(/^([\d,]+(?:\.\d+)?)(.*)$/)
      if (!match) {
        numberEl.textContent = value
        return
      }

      const numericValue = Number(match[1].replace(/,/g, ''))
      const suffix = match[2]
      const formattedTarget = match[1] + suffix

      if (prefersReducedMotion() || Number.isNaN(numericValue)) {
        numberEl.textContent = formattedTarget
        return
      }

      const counter = { value: 0 }
      numberEl.textContent = `0${suffix}`

      gsap.to(counter, {
        value: numericValue,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerEl,
          start: 'top 85%',
          once: true,
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (!numberRef.current) return
          const current = counter.value
          numberRef.current.textContent =
            numericValue % 1 !== 0
              ? current.toFixed(1) + suffix
              : Math.floor(current).toLocaleString() + suffix
        },
        onComplete: () => {
          if (numberRef.current) numberRef.current.textContent = formattedTarget
        },
      })
    },
    { scope: containerRef, dependencies: [value] }
  )

  return (
    <span ref={containerRef}>
      <span ref={numberRef}>0</span>
    </span>
  )
}

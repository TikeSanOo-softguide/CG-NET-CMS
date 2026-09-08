import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedStatProps {
    value: string
}

export default function AnimatedStat({ value }: AnimatedStatProps) {
    const numberRef = useRef<HTMLSpanElement>(null)
    const containerRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (!numberRef.current || !containerRef.current) return

        // Extract number and everything after it
        const match = value.match(/^([\d,]+(?:\.\d+)?)(.*)$/)

        if (!match) return

        const numericValue = Number(match[1].replace(/,/g, ''))
        const suffix = match[2]

        const counter = { value: 0 }

        const ctx = gsap.context(() => {
        gsap.to(counter, {
            value: numericValue,
            duration: 2,
            ease: 'power2.out',

            scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
            },

            onUpdate: () => {
            if (!numberRef.current) return

            const current = counter.value

            numberRef.current.textContent =
                numericValue % 1 !== 0
                ? current.toFixed(1) + suffix
                : Math.floor(current).toLocaleString() + suffix
            },
        })
        }, containerRef)

        return () => ctx.revert()
    }, [value])

    return (
        <span ref={containerRef}>
        <span ref={numberRef}>0</span>
        </span>
    )
}
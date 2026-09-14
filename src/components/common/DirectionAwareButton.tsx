import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'
import type { ComponentType } from 'react'

interface DirectionAwareButtonProps {
    label: string
    href?: string
    icon?: ComponentType<{ className?: string }>
    color?: string
    className?: string
    target?: '_blank' | '_self' | '_parent' | '_top'
}

export default function DirectionAwareButton({
    label,
    href = '#',
    icon: Icon,
    color = 'var(--color-primary, #0100ca)',
    className,
    target = '_blank',
}: DirectionAwareButtonProps) {
    const buttonRef = useRef<HTMLAnchorElement | null>(null)
    const flairRef = useRef<HTMLSpanElement | null>(null)
    const overlayRef = useRef<HTMLSpanElement | null>(null)

    useGSAP(
        () => {
            const button = buttonRef.current
            const flair = flairRef.current
            const overlay = overlayRef.current

            if (!button || !flair || !overlay) return

            const xSet = gsap.quickSetter(flair, 'xPercent')
            const ySet = gsap.quickSetter(flair, 'yPercent')

            const getXY = (e: MouseEvent) => {
                const { left, top, width, height } = button.getBoundingClientRect()

                const xTransformer = gsap.utils.pipe(
                    gsap.utils.mapRange(0, width, 0, 100),
                    gsap.utils.clamp(0, 100),
                )

                const yTransformer = gsap.utils.pipe(
                    gsap.utils.mapRange(0, height, 0, 100),
                    gsap.utils.clamp(0, 100),
                )

                return {
                    x: xTransformer(e.clientX - left),
                    y: yTransformer(e.clientY - top),
        }
            }

            const getClipPath = (x: number, y: number, radius: number) =>
                `circle(${radius}% at ${x}% ${y}%)`

            const handleMouseEnter = (e: MouseEvent) => {
                const { x, y } = getXY(e)
                xSet(x)
                ySet(y)

                gsap.killTweensOf([flair, overlay])
                gsap.set(overlay, { clipPath: getClipPath(x, y, 0) })

                gsap.to(flair, {
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                })
                gsap.to(overlay, {
                    clipPath: getClipPath(x, y, 85),
                    duration: 0.4,
                    ease: 'power2.out',
                })
            }

            const handleMouseMove = (e: MouseEvent) => {
                const { x, y } = getXY(e)

                gsap.to(flair, {
                    xPercent: x,
                    yPercent: y,
                    duration: 0.4,
                    ease: 'power2',
                    overwrite: true,
                })
                gsap.to(overlay, {
                    clipPath: getClipPath(x, y, 85),
                    duration: 0.4,
                    ease: 'power2',
                    overwrite: true,
                })
            }

            const handleMouseLeave = (e: MouseEvent) => {
                const { x, y } = getXY(e)
                const exitX = x > 90 ? x + 20 : x < 10 ? x - 20 : x
                const exitY = y > 90 ? y + 20 : y < 10 ? y - 20 : y

                gsap.killTweensOf([flair, overlay])

                gsap.to(flair, {
                    xPercent: exitX,
                    yPercent: exitY,
                    scale: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                })
                gsap.to(overlay, {
                    clipPath: getClipPath(exitX, exitY, 0),
                    duration: 0.3,
                    ease: 'power2.out',
                })
            }

            button.addEventListener('mouseenter', handleMouseEnter)
            button.addEventListener('mousemove', handleMouseMove)
            button.addEventListener('mouseleave', handleMouseLeave)

            return () => {
                button.removeEventListener('mouseenter', handleMouseEnter)
                button.removeEventListener('mousemove', handleMouseMove)
                button.removeEventListener('mouseleave', handleMouseLeave)
            }
        },
        { scope: buttonRef },
    )

    return (
        <a
            ref={buttonRef}
            href={href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            aria-label={label}
            className={cn(
                'relative isolate inline-flex items-center justify-center gap-2 overflow-hidden',
                'rounded-full border border-border bg-app-surface px-6 py-3',
                'text-sm font-semibold text-foreground no-underline',
                className,
            )}
        >
        <span
                    ref={flairRef}
                    aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-0 block rounded-full scale-0 will-change-transform"
        >
                    <span
                    className="absolute left-1/2 top-1/2 aspect-square w-[170%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-100"
            style={{ backgroundColor: color }}
                    />
        </span>

            <span className="relative z-10 flex items-center gap-2 text-foreground">
                {Icon && <Icon className="h-4 w-4" />}
                {label}
            </span>

            <span
                ref={overlayRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center gap-2"
                style={{ clipPath: 'circle(0% at 50% 50%)', backgroundColor: color }}
                >
                {Icon && <Icon className="h-4 w-4 text-white" />}
                <span className="text-white">{label}</span>
            </span>
        </a>
    )
}
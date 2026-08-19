import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/useInView'

export type AnimationVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'flip-up'
  | 'rise'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  /** Animation style */
  variant?: AnimationVariant
  /** Stagger delay in ms (0, 100, 200 …) */
  delay?: number
  /** Extra hover effect class override */
  hoverClass?: string
  as?: React.ElementType
}

const VARIANT_HIDDEN: Record<AnimationVariant, string> = {
  'fade-up':    'opacity-0 translate-y-8',
  'fade-down':  'opacity-0 -translate-y-8',
  'fade-left':  'opacity-0 translate-x-8',
  'fade-right': 'opacity-0 -translate-x-8',
  'zoom-in':    'opacity-0 scale-90',
  'flip-up':    'opacity-0 rotateX-12 translate-y-6',
  'rise':       'opacity-0 translate-y-10 scale-[0.96]',
}

const VARIANT_VISIBLE: Record<AnimationVariant, string> = {
  'fade-up':    'opacity-100 translate-y-0',
  'fade-down':  'opacity-100 translate-y-0',
  'fade-left':  'opacity-100 translate-x-0',
  'fade-right': 'opacity-100 translate-x-0',
  'zoom-in':    'opacity-100 scale-100',
  'flip-up':    'opacity-100 translate-y-0',
  'rise':       'opacity-100 translate-y-0 scale-100',
}

export function AnimatedCard({
  children,
  className,
  variant = 'fade-up',
  delay = 0,
  hoverClass,
  as: Tag = 'div',
}: AnimatedCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  const defaultHover =
    '[@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:shadow-xl [@media(hover:hover)]:hover:shadow-black/10 [@media(hover:hover)]:hover:border-primary/30'

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        // Base transition
        'transition-all duration-500 ease-out will-change-transform',
        // Animation state
        inView ? VARIANT_VISIBLE[variant] : VARIANT_HIDDEN[variant],
        // Hover lift
        hoverClass ?? defaultHover,
        className
      )}
    >
      {children}
    </Tag>
  )
}

/** Thin wrapper that staggers children automatically */
interface AnimatedGridProps {
  children: React.ReactNode[]
  className?: string
  variant?: AnimationVariant
  stagger?: number // ms between each card
}

export function AnimatedGrid({
  children,
  className,
  variant = 'fade-up',
  stagger = 80,
}: AnimatedGridProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <AnimatedCard key={i} variant={variant} delay={i * stagger}>
          {child}
        </AnimatedCard>
      ))}
    </div>
  )
}

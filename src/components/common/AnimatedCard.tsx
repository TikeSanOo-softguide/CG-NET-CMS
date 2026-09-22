import { cn } from '@/lib/utils'

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
  /** Kept for compatibility; entrance is handled at section level. */
  variant?: AnimationVariant
  /** Kept for compatibility; entrance is handled at section level. */
  delay?: number
  hoverClass?: string
  as?: React.ElementType
}

export function AnimatedCard({
  children,
  className,
  hoverClass,
  as: Tag = 'div',
}: AnimatedCardProps) {
  const defaultHover =
    '[@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:shadow-xl [@media(hover:hover)]:hover:shadow-black/10 [@media(hover:hover)]:hover:border-primary/30'

  return (
    <Tag
      className={cn(
        'transition-all duration-300 ease-out',
        hoverClass ?? defaultHover,
        className
      )}
    >
      {children}
    </Tag>
  )
}

interface AnimatedGridProps {
  children: React.ReactNode[]
  className?: string
  variant?: AnimationVariant
  stagger?: number
}

export function AnimatedGrid({ children, className }: AnimatedGridProps) {
  return <div className={className}>{children}</div>
}

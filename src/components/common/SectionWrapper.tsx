import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  return (
    <section id={id} className={cn('py-10 md:py-16', className)}>
      <div className="container">{children}</div>
    </section>
  )
}

interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
}

export function SectionHeading({ title, subtitle, centered = true }: SectionHeadingProps) {
  return (
    <div className={cn('mb-8 md:mb-12', centered && 'text-center')}>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3">{title}</h2>
      {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

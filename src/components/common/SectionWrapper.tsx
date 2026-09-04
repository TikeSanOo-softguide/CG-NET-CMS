import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  spacing?: 'default' | 'compact' | 'tight'
}

export function SectionWrapper({ children, className, id,  spacing = 'tight' }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        {
          'py-20 md:py-22': spacing === 'default',
          'py-15 md:py-19': spacing === 'compact',
          'py-10 md:py-14': spacing === 'tight',
        },
        className
      )}
    >
      <div className="container">
        {children}
      </div>
    </section>
  )
}

interface SectionHeadingProps {
  title: string
  eyebrow?: string
  subtitle?: string
  align?: "center" | "left"
}

export function SectionHeading({ 
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center mb-6 md:mb-10"
          : "max-w-2xl text-left"
      }
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-font-blue sm:text-sm">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl font-head">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

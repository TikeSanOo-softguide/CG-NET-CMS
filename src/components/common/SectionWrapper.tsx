import { cn } from '@/lib/utils'
import { useGsapReveal, type GsapRevealMode } from '@/hooks/useGsapReveal'
import { useTranslation } from 'react-i18next'
import { normalizeLanguage } from '@/lib/i18n'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  spacing?: 'default' | 'compact' | 'tight'
  /** Section-level reveal. Use `fade` when the section contains a map. */
  motion?: GsapRevealMode
}

export function SectionWrapper({
  children,
  className,
  id,
  spacing = 'tight',
  motion = 'rise',
}: SectionWrapperProps) {
  const contentRef = useGsapReveal<HTMLDivElement>({ mode: motion })

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
      <div ref={contentRef} className="container">
        {children}
      </div>
    </section>
  )
}

interface SectionHeadingProps {
  title: string
  eyebrow?: string
  subtitle?: string
  align?: 'center' | 'left'
}

export function SectionEyebrow({
  children,
  align = 'center',
  className,
}: {
  children: React.ReactNode
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-small font-semibold uppercase tracking-[0.18em] text-font-blue',
        align === 'center' && 'justify-center',
        className
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-current opacity-40" />
      {children}
      {align === 'center' && (
        <span aria-hidden="true" className="h-px w-6 bg-current opacity-40" />
      )}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  const { i18n } = useTranslation()
  const titleLeading = normalizeLanguage(i18n.language) === 'my' ? '!leading-[1.7]' : '!leading-tight'

  return (
    <div
      className={
        align === 'center'
          ? 'mx-auto mb-6 max-w-2xl text-center md:mb-8 lg:mb-10'
          : 'max-w-2xl text-left'
      }
    >
      {eyebrow ? <SectionEyebrow align={align}>{eyebrow}</SectionEyebrow> : null}
      <h2 className={cn('mt-3 text-h2 font-bold tracking-[-0.02em] text-foreground font-head', titleLeading)}>
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 text-body-lg leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

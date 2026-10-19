import { cn } from '@/lib/utils'
import { useGsapReveal, type GsapRevealMode } from '@/hooks/useGsapReveal'
import { useTranslation } from 'react-i18next'
import { normalizeLanguage } from '@/lib/i18n'
import {
  sectionDescClass,
  sectionTitleClass,
  typeEyebrow,
} from '@/lib/typography'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  spacing?: 'default' | 'compact' | 'tight'
  /** Section-level reveal. Use `fade` when the section contains a map. */
  motion?: GsapRevealMode
  /** Override reveal duration (seconds). */
  motionDuration?: number
  /** Override ScrollTrigger start. */
  motionStart?: string
}

export function SectionWrapper({
  children,
  className,
  id,
  spacing = 'tight',
  motion = 'rise',
  motionDuration,
  motionStart,
}: SectionWrapperProps) {
  const contentRef = useGsapReveal<HTMLDivElement>({
    mode: motion,
    duration: motionDuration,
    start: motionStart,
  })

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
        'flex items-center gap-3',
        typeEyebrow,
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
  const lang = normalizeLanguage(i18n.language)

  return (
    <div
      className={
        align === 'center'
          ? 'mx-auto mb-4 max-w-2xl text-center md:mb-5 lg:mb-6'
          : 'max-w-2xl text-left'
      }
    >
      {eyebrow ? <SectionEyebrow align={align}>{eyebrow}</SectionEyebrow> : null}
      <h2 className={cn('mt-3', sectionTitleClass(lang))}>{title}</h2>
      {subtitle ? <p className={cn('mt-2.5', sectionDescClass(lang))}>{subtitle}</p> : null}
    </div>
  )
}

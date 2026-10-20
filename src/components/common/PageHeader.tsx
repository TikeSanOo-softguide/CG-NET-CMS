import { useGsapReveal } from '@/hooks/useGsapReveal'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
  titleClassName?: string
  subtitleClassName?: string
}

export function PageHeader({
  title,
  subtitle,
  children,
  titleClassName,
  subtitleClassName,
}: PageHeaderProps) {
  const contentRef = useGsapReveal<HTMLDivElement>({ mode: 'fade' })

  return (
    <div className="bg-app-primary text-white py-10 sm:py-12 md:py-16">
      <div ref={contentRef} className="container">
        <h1
          className={cn(
            'mb-2 font-bold md:mb-3',
            titleClassName ?? 'text-[20px] md:text-[35px] lg:text-h1'
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              'max-w-5xl text-[15px] leading-[1.8] text-blue-100 md:text-[16px] lg:text-body-lg',
              subtitleClassName
            )}
          >
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}

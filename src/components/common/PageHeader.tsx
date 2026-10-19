import { useGsapReveal } from '@/hooks/useGsapReveal'

interface PageHeaderProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  const contentRef = useGsapReveal<HTMLDivElement>({ mode: 'fade' })

  return (
    <div className="bg-app-primary text-white py-10 sm:py-12 md:py-16">
      <div ref={contentRef} className="container">
        <h1 className="mb-2 text-[20px] font-bold md:mb-3 md:text-[35px] lg:text-h1">{title}</h1>
        {subtitle && (
          <p className="max-w-5xl text-[15px] leading-[1.8] text-blue-100 md:text-[16px] lg:text-body-lg">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}

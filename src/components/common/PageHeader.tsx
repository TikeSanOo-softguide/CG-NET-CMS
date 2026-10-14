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
        <h1 className="text-h1 font-bold mb-2 md:mb-3">{title}</h1>
        {subtitle && (
          <p className="text-body-lg text-blue-100 max-w-5xl leading-[1.8]">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}

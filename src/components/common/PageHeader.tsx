interface PageHeaderProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-brand-700 to-brand-500 text-white py-16 px-4">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
        {subtitle && <p className="text-lg text-blue-100 max-w-2xl">{subtitle}</p>}
        {children}
      </div>
    </div>
  )
}

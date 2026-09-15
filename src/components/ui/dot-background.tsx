import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface DotBackgroundDemoProps {
  className?: string
  children?: ReactNode
}

export default function DotBackgroundDemo({ className, children }: DotBackgroundDemoProps) {
  return (
    <div className={cn('relative min-h-screen w-full bg-background', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundColor: 'hsl(var(--background))',
          backgroundImage:
            'radial-gradient(circle at 1px 1px, var(--color-primary) 1.2px, transparent 0)',
          backgroundSize: '28px 28px',
          opacity: 0.45,
          maskImage: "radial-gradient(ellipse at center, black 0%, transparent 85%)", 
          WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 85%)",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
    </div>
  )
}
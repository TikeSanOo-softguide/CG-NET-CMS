import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface DotBackgroundDemoProps {
  className?: string
  children?: ReactNode
}

export default function DotBackgroundDemo({ className, children }: DotBackgroundDemoProps) {
  return (
    <div className={cn('relative min-h-screen w-full overflow-hidden bg-background', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundColor: 'hsl(var(--background))',
          backgroundImage:
            'radial-gradient(circle at 1px 1px, var(--color-primary) 1.2px, transparent 0)',
          backgroundSize: '28px 28px',
          backgroundRepeat: 'repeat',
          opacity: 0.45,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  )
}
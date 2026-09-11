import { cn } from '@/lib/utils';
import React from 'react';

interface DotBackgroundDemoProps {
    className?: string;
    children?: React.ReactNode;
}

export default function DotBackgroundDemo({
    className,
    children,
}: DotBackgroundDemoProps) {
    return (
        <div
            className={cn(
                'relative min-h-screen w-full overflow-hidden',
                className
            )}
        >

            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.45]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 1px 1px, var(--color-primary) 1.2px, transparent 0)',
                    backgroundSize: '28px 28px',
                    maskImage:
                        'radial-gradient(ellipse at center, black 0%, transparent 75%)',
                    WebkitMaskImage:
                        'radial-gradient(ellipse at center, black 0%, transparent 75%)',
                }}
            />

            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    background: `
                        'radial-gradient(circle at 1px 1px, var(--color-primary) 1.2px, transparent 0)',
                        ),
                        'radial-gradient(circle at 1px 1px, var(--color-primary) 1.2px, transparent 0)',
                        ),
                        'radial-gradient(circle at 1px 1px, var(--color-primary) 1.2px, transparent 0)',
                        )
                    `,
                }}
            />

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
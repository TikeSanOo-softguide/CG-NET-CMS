import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center -mt-10 px-4 mb-5 text-center',
        className
      )}
    >
      <img
        src="/assets/error/nodata.svg"
        className="mx-auto w-[320px] h-[320px] object-contain"
        alt="No Data Available"
        loading="eager"
      />

      <h3 className="-mt-10 text-lg font-semibold mb-2">
        {title ?? t('common.emptyState')}
      </h3>

      <p className="text-muted-foreground text-sm max-w-sm">
        {description ?? t('common.emptyStateDesc')}
      </p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
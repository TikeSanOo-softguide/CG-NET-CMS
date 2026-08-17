import { useTranslation } from 'react-i18next'
import { InboxIcon } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-4 text-muted-foreground">
        {icon ?? <InboxIcon className="h-12 w-12" aria-hidden="true" />}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title ?? t('common.emptyState')}</h3>
      <p className="text-muted-foreground text-sm max-w-sm">{description ?? t('common.emptyStateDesc')}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

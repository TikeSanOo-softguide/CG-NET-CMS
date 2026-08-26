import { useTranslation } from 'react-i18next'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center -mt-10 px-4 text-center">
      <img 
        src="/assets/error/nodata.svg" 
        className="mx-auto w-[350px] h-[350px] object-contain" 
        alt="No Data Avaliable" 
        loading="eager"
      />
      <h3 className="-mt-10 text-lg font-semibold mb-2">{title ?? t('common.emptyState')}</h3>
      <p className="text-muted-foreground text-sm max-w-sm">{description ?? t('common.emptyStateDesc')}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

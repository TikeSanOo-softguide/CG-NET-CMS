import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center -mt-10 px-4 text-center">
      <img 
        src="/assets/error/wrong.svg" 
        className="mx-auto w-[350px] h-[350px] object-contain"
        alt="Something Went Wrong" 
        loading="eager"
      />
      <h3 className="-mt-10 text-lg font-semibold text-red-600 mb-2">{t('common.error')}</h3>
      {message && import.meta.env.DEV && (
        <p className="text-sm text-muted-foreground mb-4 font-mono bg-muted p-2 rounded">{message}</p>
      )}
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          {t('common.tryagain')}
        </Button>
      )}
    </div>
  )
}

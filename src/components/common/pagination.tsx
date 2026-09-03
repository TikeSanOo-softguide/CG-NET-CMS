import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  page: number
  totalPages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  t: (key: string) => string
}

export default function Pagination({ page, totalPages, setPage, t }: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const handlePageChange = (newPage: number) => { 
    setPage(newPage) 
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth', 
    }) 
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 flex-wrap">
      {/* Previous */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label={t('common.previous')}
        className="text-font-blue"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />

        <span className="hidden sm:inline">{t('common.previous')}</span>
      </Button>

      {/* Current Page */}
      <span className="text-sm text-muted-foreground px-1">
        {t('common.page')} {page} {t('common.of')} {totalPages}
      </span>

      {/* Next */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label={t('common.next')}
        className="text-font-blue"
      >
        <span className="hidden sm:inline">{t('common.next')}</span>

        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </nav>
  )
}

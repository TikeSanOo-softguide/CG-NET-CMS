import { useQuery } from '@tanstack/react-query'
import { getServices } from '@/lib/api/services.api'
import { useTranslation } from 'react-i18next'

export function useServices(page = 1, limit = 6) {
  const { i18n } = useTranslation()
  const lang = i18n.language.split('-')[0]

  return useQuery({
    queryKey: ['services', page, limit, lang],
    queryFn: () => getServices(page, limit),
    placeholderData: (previousData) => previousData,
  })
}

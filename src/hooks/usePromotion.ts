import { useQuery } from '@tanstack/react-query'
import { getPromotions, getPromotionBySlug, getLatestPromotions } from '@/lib/api/promotion.api'
import { useTranslation } from 'react-i18next'

export function usePromotion(page = 1, limit = 5, search = '') {
  const { i18n } = useTranslation()
  const lang = i18n.language.split('-')[0]
  return useQuery({
    queryKey: ['promotions', page, limit, search, lang],
    queryFn: () => getPromotions(page, limit, search, lang),
    placeholderData: (previousData) => previousData,
  })
}

export function usePromotionBySlug(slug: string) {
  return useQuery({
    queryKey: ['promotion-detail', slug],
    queryFn: () => getPromotionBySlug(slug),
    enabled: Boolean(slug),
  })
}

export function useLatestPromotions(limit = 3) {
  return useQuery({
    queryKey: ['promotions', 'latest', limit],
    queryFn: () => getLatestPromotions(limit),
  })
}

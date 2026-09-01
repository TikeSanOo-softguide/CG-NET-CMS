import { useQuery } from '@tanstack/react-query'
import { getPromotions, getPromotionBySlug, getLatestPromotions } from '@/lib/api/promotion.api'

export function usePromotion(page = 1, limit = 5, search = '') {
  return useQuery({
    queryKey: ['promotions', page, limit, search],
    queryFn: () => getPromotions(page, limit, search),
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

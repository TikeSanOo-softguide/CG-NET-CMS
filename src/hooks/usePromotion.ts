import { useQuery } from '@tanstack/react-query'
import { getPromotions, getPromotionBySlug, getLatestPromotions } from '@/lib/api/promotion.api'

export function usePromotion(page = 1, limit = 5) {
  return useQuery({
    queryKey: ['promotions', page, limit],
    queryFn: () => getPromotions(page, limit),
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

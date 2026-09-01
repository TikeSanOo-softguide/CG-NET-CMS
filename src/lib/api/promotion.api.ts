import { apiClient } from './client'
import type { Promotion } from '@/types/promotion'

interface PromotionResponse {
  data: Promotion[]
  links: {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    from: number | null
    last_page: number
    per_page: number
    to: number | null
    total: number
  }
}

export async function getPromotions(page = 1, limit = 5, search = ''): Promise<PromotionResponse> {
  const { data } = await apiClient.get<PromotionResponse>('/web-app/promotions', {
    params: {
      page,
      per_page: limit,
      search,
    },
  })

  return data
}

export async function getPromotionBySlug(slug: string): Promise<Promotion> {
  const { data } = await apiClient.get<{ data: Promotion }>(`/web-app/promotions/${slug}`)

  return data.data
}

export async function getLatestPromotions(limit = 3): Promise<Promotion[]> {
  const { data } = await apiClient.get<PromotionResponse>('/web-app/promotions', {
    params: {
      page: 1,
      per_page: limit,
    },
  })

  return data.data
}

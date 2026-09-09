import { apiClient } from './client'
import type { Promotion } from '@/types/promotion'
import { parseApiResponse, promotionResponseSchema, promotionSchema } from './validation'

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

export async function getPromotions(
    page = 1, 
    limit = 5, 
    search = '', 
    lang = 'en'
  ): Promise<PromotionResponse> {
    const { data } = await apiClient.get<PromotionResponse>(
      '/web-app/promotions', 
      {
        params: {
          page,
          per_page: limit,
          lang,
          ...(search.trim() && {
              search: search.trim(),
            }),
        },
      }
    )

    return parseApiResponse<PromotionResponse>(
      promotionResponseSchema,
      data, 
      'promotions'
    )
}

export async function getPromotionBySlug(slug: string): Promise<Promotion> {
  const { data } = await apiClient.get<{ data: Promotion }>(
    `/web-app/promotions/${encodeURIComponent(slug)}`
  )

  return parseApiResponse<Promotion>(promotionSchema, data.data, 'promotion')
}

export async function getLatestPromotions(limit = 3): Promise<Promotion[]> {
  const { data } = await apiClient.get<PromotionResponse>('/web-app/promotions', {
    params: {
      page: 1,
      per_page: limit,
    },
  })

  return parseApiResponse<PromotionResponse>(promotionResponseSchema, data, 'latest promotions').data
}

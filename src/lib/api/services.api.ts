// services.api.ts
import { apiClient } from './client'
import type { Service } from '@/types/service'
import { parseApiResponse, serviceResponseSchema } from './validation'

export interface ServiceResponse {
  data: Service[]
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

export async function getServices(page = 1, limit = 6): Promise<ServiceResponse> {
  const { data } = await apiClient.get<ServiceResponse>('/web-app/services', {
    params: {
      page,
      per_page: limit,
    },
  })

  return parseApiResponse<ServiceResponse>(serviceResponseSchema, data, 'services')
}

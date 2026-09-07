import { apiClient } from './client'
import type { Banner } from '@/types'
import { bannerResponseSchema, parseApiResponse } from './validation'

interface BannerResponse {
  success: boolean
  data: Banner[]
}

export async function getBanners(): Promise<Banner[]> {
  const response = await apiClient.get<BannerResponse>('/web-app/banners')

  return parseApiResponse<BannerResponse>(bannerResponseSchema, response.data, 'banners').data
}
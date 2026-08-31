import { apiClient } from './client'
import type { Banner } from '@/types'

interface BannerResponse {
  success: boolean
  data: Banner[]
}

export async function getBanners(): Promise<Banner[]> {
  const response = await apiClient.get<BannerResponse>('/web-app/banners')

  return response.data.data
}
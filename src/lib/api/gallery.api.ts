import { apiClient } from './client'
import { GalleryResponse } from '@/types/gallery'
import { galleryResponseSchema, parseApiResponse } from './validation'

export async function getGalleries(): Promise<GalleryResponse> {
  const { data } = await apiClient.get<GalleryResponse>('/web-app/gallery')
  return parseApiResponse<GalleryResponse>(galleryResponseSchema, data, 'gallery')
}

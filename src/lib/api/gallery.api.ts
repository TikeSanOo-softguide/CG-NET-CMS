import { apiClient } from './client'
import { GalleryResponse } from '@/types/gallery'

export async function getGalleries(): Promise<GalleryResponse> {
  const { data } = await apiClient.get<GalleryResponse>('/web-app/gallery')
  return data
}

import { apiClient } from './client'

export interface Gallery {
  id: string
  label: {
    en: string
    my: string
    zh: string
  }
  imageUrl: string
}

export interface GalleryResponse {
  data: Gallery[]
}

export async function getGalleries(): Promise<GalleryResponse> {
  const { data } = await apiClient.get<GalleryResponse>('/web-app/gallery')
  return data
}

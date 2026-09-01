import { useQuery } from '@tanstack/react-query'
import { getGalleries } from '@/lib/api/gallery.api'

export function useGallery() {
  return useQuery({
    queryKey: ['galleries'],
    queryFn: () => getGalleries(),
  })
}

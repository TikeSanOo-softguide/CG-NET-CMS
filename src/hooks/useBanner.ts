import { useQuery } from '@tanstack/react-query'
import { getBanners } from '@/lib/api/banner.api'

export function useBanners() {
  return useQuery({
    queryKey: ['banners'],
    queryFn: getBanners,
  })
}
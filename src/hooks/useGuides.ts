import { useQuery } from '@tanstack/react-query'
import { getGuides } from '@/lib/api/guides.api'

export function useGuides() {
  return useQuery({
    queryKey: ['guides'],
    queryFn: getGuides,
  })
}

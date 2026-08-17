import { useQuery } from '@tanstack/react-query'
import { getCareers, getCareerBySlug } from '@/lib/api/careers.api'

export function useCareers() {
  return useQuery({
    queryKey: ['careers'],
    queryFn: getCareers,
  })
}

export function useCareerBySlug(slug: string) {
  return useQuery({
    queryKey: ['career', slug],
    queryFn: () => getCareerBySlug(slug),
    enabled: Boolean(slug),
  })
}

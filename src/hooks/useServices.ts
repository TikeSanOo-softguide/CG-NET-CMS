import { useQuery } from '@tanstack/react-query'
import { getServices, getServiceBySlug } from '@/lib/api/services.api'

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  })
}

export function useServiceBySlug(slug: string) {
  return useQuery({
    queryKey: ['service', slug],
    queryFn: () => getServiceBySlug(slug),
    enabled: Boolean(slug),
  })
}

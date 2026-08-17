import { useQuery } from '@tanstack/react-query'
import { getPackages, getPackageBySlug, getFeaturedPackages } from '@/lib/api/packages.api'

export function usePackages(category?: string) {
  return useQuery({
    queryKey: ['packages', category ?? 'all'],
    queryFn: () => getPackages(category),
  })
}

export function usePackageBySlug(slug: string) {
  return useQuery({
    queryKey: ['package', slug],
    queryFn: () => getPackageBySlug(slug),
    enabled: Boolean(slug),
  })
}

export function useFeaturedPackages() {
  return useQuery({
    queryKey: ['packages', 'featured'],
    queryFn: getFeaturedPackages,
  })
}

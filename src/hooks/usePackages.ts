import { useQuery } from '@tanstack/react-query'

import {
  getPackages,
  getOtherPackages,
  getNetworks,
  getRecommendPackage,
} from '@/lib/api/packages.api'

export function usePackages() {
  return useQuery({
    queryKey: ['packages'],
    queryFn: getPackages,
    staleTime: 30 * 60 * 1000,
  })
}

export function useOtherPackages() {
  return useQuery({
    queryKey: ['packages', 'addons'],
    queryFn: getOtherPackages,
    staleTime: 30 * 60 * 1000,
  })
}

export function useRecommendPackage() {
  return useQuery({
    queryKey: ['packages', 'recommended'],
    queryFn: getRecommendPackage,
    staleTime: 30 * 60 * 1000,
  })
}

export function useNetworks() {
  return useQuery({
    queryKey: ['packages', 'networks'],
    queryFn: getNetworks,
    staleTime: 30 * 60 * 1000,
  })
}
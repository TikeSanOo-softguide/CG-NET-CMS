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
  })
}

export function useOtherPackages() {
  return useQuery({
    queryKey: ['packages', 'addons'],
    queryFn: getOtherPackages,
  })
}

export function useRecommendPackage() {
  return useQuery({
    queryKey: ['packages', 'recommended'],
    queryFn: getRecommendPackage,
  })
}

export function useNetworks() {
  return useQuery({
    queryKey: ['packages', 'networks'],
    queryFn: getNetworks,
  })
}
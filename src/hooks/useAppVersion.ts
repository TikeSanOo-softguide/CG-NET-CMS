import { useQuery } from '@tanstack/react-query'
import { getAppVersions } from '@/lib/api/app-version.api'

export function useAppVersion() {
  return useQuery({
    queryKey: ['app-version'],
    queryFn: getAppVersions,
    staleTime: 5 * 60 * 1000,
  })
}

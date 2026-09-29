import { apiClient } from './client'
import type { AppVersionApiResponse } from '@/types/app-version'
import { parseApiResponse, appVersionResponseSchema } from './validation'

export async function getAppVersions(): Promise<AppVersionApiResponse> {
  const { data } = await apiClient.get<AppVersionApiResponse>('/app-version')
  return parseApiResponse<AppVersionApiResponse>(appVersionResponseSchema, data, 'app versions')
}

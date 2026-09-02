import type { Addon, Network, Package } from '@/types/package'
import { apiClient } from './client'

interface PackageResponse {
  data: Package[]
}

interface AddonResponse {
  data: Addon[]
}

interface NetworkResponse {
  data: Network[]
}

export async function getPackages(): Promise<Package[]> {
  const { data } = await apiClient.get<PackageResponse>('/web-app/packages')

  return data.data
}

export async function getOtherPackages(): Promise<Addon[]> {
  const { data } = await apiClient.get<AddonResponse>('/web-app/addons')

  return data.data
}
export async function getRecommendPackage(): Promise<any> {
  const { data } = await apiClient.get('/web-app/packages/recommended')
  return data.data
}

export async function getNetworks(): Promise<Network[]> {
  const { data } = await apiClient.get<NetworkResponse>('/web-app/networks')

  return data.data
}

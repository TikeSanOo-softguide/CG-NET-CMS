import type { Addon, Network, Package } from '@/types/package'
import { apiClient } from './client'
import {
  addonResponseSchema,
  networkResponseSchema,
  packageResponseSchema,
  parseApiResponse,
} from './validation'

export interface RecommendedPackage {
  id: string
  network: Network
  slug: string
  title: { en: string; my: string; zh: string }
  imageUrl: string | null
  isFeatured: boolean
}

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

  return parseApiResponse<PackageResponse>(packageResponseSchema, data, 'packages').data
}

export async function getOtherPackages(): Promise<Addon[]> {
  const { data } = await apiClient.get<AddonResponse>('/web-app/addons')

  return parseApiResponse<AddonResponse>(addonResponseSchema, data, 'addons').data
}

export async function getRecommendPackage(): Promise<RecommendedPackage[]> {
  const { data } = await apiClient.get<PackageResponse>('/web-app/packages/recommended')
  const packages = parseApiResponse<PackageResponse>(
    packageResponseSchema,
    data,
    'recommended packages',
  ).data

  return packages.map((pkg) => ({
    id: String(pkg.id),
    network: pkg.network,
    slug: `${pkg.network.id}-${pkg.speed.mbps}-${pkg.term.months}`,
    title: pkg.network.name,
    imageUrl: pkg.image_url,
    isFeatured: pkg.recommended,
  }))
}

export async function getNetworks(): Promise<Network[]> {
  const { data } = await apiClient.get<NetworkResponse>('/web-app/networks')

  return parseApiResponse<NetworkResponse>(networkResponseSchema, data, 'networks').data
}

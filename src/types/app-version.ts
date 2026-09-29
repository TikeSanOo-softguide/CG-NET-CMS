export type AppPlatform = 'android' | 'ios'

export interface AppVersionReleaseNotes {
  en: string
  zh: string
  my: string
}

export interface AppVersionItem {
  id: number
  platform: AppPlatform
  version: string
  minimum_version: string
  download_url: string
  release_notes: AppVersionReleaseNotes
  force_update: boolean
  status: string
  created_by: number | string | null
  updated_by: number | string | null
  created_at: string
  updated_at: string
}

export interface AppVersionApiResponse {
  data: AppVersionItem[]
}

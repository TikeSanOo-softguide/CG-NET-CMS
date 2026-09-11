export interface LocalizedString {
  en: string
  zh: string
  my: string
}

export interface Service {
  id: number
  slug: string
  title: LocalizedString
  description: LocalizedString
  image_url: string | null
  status: string
  created_at: string
  updated_at: string
}

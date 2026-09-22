export interface BilingualString {
  en: string | null
  my: string | null
  zh: string | null
}

export interface Gallery {
  id: string
  label: BilingualString
  imageUrl: string | null
}

export interface GalleryResponse {
  data: Gallery[]
}

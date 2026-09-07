import { BilingualString } from '.'

export interface Gallery {
  id: string
  label: BilingualString
  imageUrl: string | null
}

export interface GalleryResponse {
  data: Gallery[]
}

import { BilingualString } from '.'

export interface Gallery {
  id: string
  label: BilingualString
  imageUrl: string
}

export interface GalleryResponse {
  data: Gallery[]
}

import { BilingualString } from "."

export interface Network {
    id: number,
    name: BilingualString
    created_at?: string
    updated_at?: string
}

export interface Speed {
    id: number,
    mbps: number
    created_at?: string
    updated_at?: string
}

export interface Term {
    id: number,
    months: number
    created_at?: string
    updated_at?: string
}

export interface Addon {
  id: number
  name: BilingualString
  price: number
  image_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Package {
  id: number
  network: Network
  speed: Speed
  term: Term
  price: string
  installation_fee: string
  image_url: string | null
  includes_free_iptv: boolean
  is_active: boolean
  recommended: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface OtherPackage {
  id: number; 
  name: BilingualString; 
  price: string; 
  image_url: string | null; 
  is_active: boolean; 
  created_at: string; 
  updated_at: string; 
}
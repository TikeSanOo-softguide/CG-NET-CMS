export type Speed = 20 | 50 | 100 | 150

export type Package = {
  id: string
  speed: Speed
  duration: string
}

export type NetworkPackage = {
  name: string
  packages: Package[]
}

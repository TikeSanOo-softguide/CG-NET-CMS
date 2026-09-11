import { useEffect, useRef, useState } from 'react'
import {
  Marker,
  LatLng,
  Map as LeafletMap,
  TileLayer,
  Icon,
} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { useAreas, useRegions, useStates } from '@/hooks/uselocation'
import { t } from 'i18next'
import CommonDropdown from '@/components/common/CommonDropDown'
import { localizedName } from '@/lib/utils'
import type { CoverageArea } from '@/types/coverage'

type Props = {
  state: string | null
  area: string | null
}

const DEFAULT_CENTER = new LatLng(21.3, 98.0)
const DEFAULT_ZOOM = 6
const STATE_ZOOM = 10
const REGION_ZOOM = 10
const AREA_ZOOM = 14

type CoveragePoint = {
  id: number
  name: CoverageArea['name']
  latt: number | null
  long: number | null
  popupLabel: string
}

export default function AvailableLocationPage({ state, area }: Props) {
  const holder = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const markersRef = useRef<Marker[]>([])
  const [selectedState, setSelectedState] = useState(state ?? '')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedArea, setSelectedArea] = useState(area ?? '')
  const stateId = selectedState ? Number(selectedState) : null
  const regionId = selectedRegion ? Number(selectedRegion) : null
  const statesQuery = useStates()
  const regionsQuery = useRegions(stateId)
  const areasQuery = useAreas(regionId)
  const states = statesQuery.data ?? []
  const regions = regionsQuery.data ?? []
  const selectedStateData = states.find((item) => item.id === stateId)
  const selectedRegionData = regions.find((item) => item.id === regionId)

  useEffect(() => {
    if (!holder.current || mapRef.current) return

    const map = new LeafletMap(holder.current, {
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: true,
      scrollWheelZoom: false,
      dragging: true,
      doubleClickZoom: false,
      touchZoom: false,
      boxZoom: false,
      keyboard: false,
    })

    new TileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      },
    ).addTo(map)

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current = []
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current

    if (!map) return

    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []
    const mapPoints: CoveragePoint[] = selectedRegionData
      ? (areasQuery.data ?? [])
          .filter((item) => !selectedArea || item.id.toString() === selectedArea)
          .map((item) => ({
            id: item.id,
            name: item.name,
            latt: item.latitude,
            long: item.longitude,
            popupLabel: localizedName(selectedRegionData.name),
          }))
      : selectedStateData
        ? [
            {
              id: selectedStateData.id,
              name: selectedStateData.name,
              latt: selectedStateData.latitude,
              long: selectedStateData.longitude,
              popupLabel: localizedName(selectedStateData.name),
            },
          ]
        : []

    const points = mapPoints.filter(
      (point) => point.latt !== null && point.long !== null,
    )

    points.forEach((point) => {
      const marker = new Marker(
        new LatLng(point.latt!, point.long!),
        {
          icon: new Icon({
            iconUrl: '/assets/logo/map-pin.svg',
            iconSize: [35, 35],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          }),
        },
      )
        .bindPopup(
          `<strong>${localizedName(point.name)}</strong><br />${point.popupLabel}`,
        )
        .addTo(map)

      markersRef.current.push(marker)
    })

    if (points.length === 0) {
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM)
      return
    }

    if (points.length === 1) {
      const point = points[0]

      const zoom = selectedArea
        ? AREA_ZOOM
        : selectedRegion
          ? REGION_ZOOM
          : selectedState
            ? STATE_ZOOM
          : DEFAULT_ZOOM

      map.setView(
        new LatLng(point.latt!, point.long!),
        zoom,
      )

      return
    }

    const bounds = points.map(
      (point) =>
        [point.latt, point.long] as [number, number],
    )

    const maxZoom = selectedArea
      ? AREA_ZOOM
      : selectedRegion
        ? REGION_ZOOM
        : selectedState
          ? STATE_ZOOM
          : DEFAULT_ZOOM

    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom,
    })
  }, [areasQuery.data, selectedArea, selectedRegion, selectedRegionData, selectedState, selectedStateData])

  const stateOptions = states.map((item) => ({
    label: localizedName(item.name),
    value: item.id.toString(),
  }))

  const regionOptions = regions.map((item) => ({
    label: localizedName(item.name),
    value: item.id.toString(),
  }))

  const areaOptions = (areasQuery.data ?? []).map((item) => ({
    label: localizedName(item.name),
    value: item.id.toString(),
  }))

  function handleStateChange(value: string) {
    setSelectedState(value)
    setSelectedRegion('')
    setSelectedArea('')
  }

  function handleRegionChange(value: string) {
    setSelectedRegion(value)
    setSelectedArea('')
  }

  return (
    <main>
      <PageHeader title={t('location.title')} subtitle={t('location.subtitle')} />
      <SectionWrapper spacing="compact" className="bg-muted/40 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-5">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-foreground">
              {t('location.selectState')}<span className="text-destructive">*</span>
            </span>
            <CommonDropdown
              value={selectedState}
              options={stateOptions}
              placeholder={statesQuery.isLoading ? t('location.loading') : t('location.selectState')}
              onChange={handleStateChange}
              disabled={statesQuery.isLoading || statesQuery.isFetching}
              className="flex-1"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-foreground">
              {t('location.selectRegion')}<span className="text-destructive">*</span>
            </span>
            <CommonDropdown
              value={selectedRegion}
              options={regionOptions}
              placeholder={regionsQuery.isLoading ? t('location.loading') : t('location.selectRegion')}
              onChange={handleRegionChange}
              disabled={!selectedState || regionsQuery.isLoading || regionsQuery.isFetching}
              className="flex-1"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-foreground">
              {t('location.selectArea')}<span className="text-destructive">*</span>
            </span>
            <CommonDropdown
              value={selectedArea}
              options={areaOptions}
              placeholder={areasQuery.isLoading ? t('location.loading') : t('location.selectArea')}
              onChange={setSelectedArea}
              disabled={!selectedRegion || areasQuery.isLoading || areasQuery.isFetching}
              className="flex-1"
            />
          </label>
        </div>
        <div
          ref={holder}
          className="relative z-10 h-[500px] w-full overflow-hidden rounded-xl"
        />
      </SectionWrapper>
    </main>
  )
}
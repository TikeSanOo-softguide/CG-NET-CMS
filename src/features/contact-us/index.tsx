
import { useEffect, useRef } from 'react'
import {
  Icon,
  LatLng,
  Map as LeafletMap,
  Marker,
  TileLayer,
} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useTranslation } from 'react-i18next'
import { Headphones } from 'lucide-react'
import { useContact } from '@/hooks/useContact'
import DirectionAwareButton from '@/components/common/DirectionAwareButton'
import { SiFacebook, SiTelegram, SiViber } from 'react-icons/si'

const SOCIAL_LINKS = [
  {
    icon: SiFacebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/Chenguangnet/',
    color: '#1877F2',
  },
  {
    icon: SiTelegram,
    label: 'Telegram',
    href: 'https://t.me/mlchenguang',
    color: '#229ED9',
  },
  {
    icon: SiViber,
    label: 'Viber',
    href: 'https://invite.viber.com/?g2=AQBGl7W57yWMA1OpCYCHfNKUzmB%2FaVyeSWFlu8QAaPZRNt%2F8Ow%2FGrdAG7jfDY2D%2F&lang=en',
    color: '#7360F2',
  },
]

const COMPANY_LOCATION = {
  name: 'Yaung Ni Oo',
  lat: 20.450060,
  lng: 99.902774,
}


export default function ContactUsPage() {
  const { t } = useTranslation()
  const mapRef = useRef<HTMLDivElement | null>(null)
  const leafletMapRef = useRef<LeafletMap | null>(null)
  const { data: contacts } = useContact()

  usePageTitle(t('contact.pageTitle'))

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return

    const map = new LeafletMap(mapRef.current, {
      center: new LatLng(COMPANY_LOCATION.lat, COMPANY_LOCATION.lng),
      zoom: 14,
      zoomControl: true,
      scrollWheelZoom: false,
      dragging: true,
      doubleClickZoom: false,
      touchZoom: false,
      boxZoom: false,
      keyboard: false,
    })

    new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map)

    const marker = new Marker(new LatLng(COMPANY_LOCATION.lat, COMPANY_LOCATION.lng), {
      icon: new Icon({
        iconUrl: '/assets/logo/map-pin.svg',
        iconSize: [35, 35],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      }),
    })
      .bindPopup(`<strong>${COMPANY_LOCATION.name}</strong><br />Yangon, Myanmar`)
      .addTo(map)

    map.setView(new LatLng(COMPANY_LOCATION.lat, COMPANY_LOCATION.lng), 14)
    leafletMapRef.current = map

    return () => {
      marker.remove()
      map.remove()
      leafletMapRef.current = null
    }
  }, [])
  

  return (
    <>
      <PageHeader title={t('contact.title')} subtitle={t('contact.subtitle')} />
      <SectionWrapper spacing="compact" className="py-10 bg-muted/40">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h2 className="text-xl font-bold text-foreground">
                {t('contact.contactInfoTitle')}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('contact.contactInfoSubtitle')}
              </p>

              <ul className="mt-6 space-y-5">
                {contacts?.map((contact) => (
                  <p key={contact.id} className="mt-0.5 text-[15px] font-medium text-foreground">{contact.contact_point}</p>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="shrink-0">
                  <div className="overflow-hidden rounded-xl  flex items-center  justify-center border border-border bg-white p-2">
                    <img
                      src='assets/QR/wechat-QR.png'
                      alt="Complaint QR code"
                      width={160}
                      height={160}
                      className="h-36 w-36 object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
                    <Headphones className="h-5 w-5 text-font-blue" />
                    {t('contact.complaintQrTitle')}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    {t('contact.complaintQrDesc')}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h3 className="text-lg font-bold text-foreground">
                {t('contact.socialMediaTitle')}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('contact.socialMediaSubtitle')}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <div className="mt-5 flex flex-wrap gap-3"> 
                  {SOCIAL_LINKS.map(({ icon: Icon, label, href, color }) => (
                    <DirectionAwareButton
                      key={label}
                      icon={Icon}
                      label={label}
                      href={href}
                      color={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column: gradient map card */}
          <div className="flex flex-col gap-6">
            {/* Map Container */}
            <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-violet/10 to-primary/5 p-1.5 shadow-soft">
              <div className="flex h-full min-h-[575px] flex-col overflow-hidden rounded-2xl bg-card">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">
                      {t('contact.companyLocationTitle')}
                    </h2>
                  </div>
                </div>
                <div className="relative min-h-[350px] flex-1">
                    <div className="h-full min-h-[350px] w-full overflow-hidden rounded-xl border border-border/70 bg-background shadow-sm">
                      <div ref={mapRef} className="relative z-10 h-full min-h-[350px] w-full" />
                    </div>
                </div>
              </div>
            </div>

            {/* Bottom Card */}
            <div className="p-6 shadow-soft sm:p-8">
            </div>
          </div>
        </div>

      </SectionWrapper>
    </>
  )
}

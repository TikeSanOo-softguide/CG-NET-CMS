
import { useEffect, useRef, useState } from 'react'
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
import { Clock, Headphones, Mail, MapPin, Phone } from 'lucide-react'

const CONTACT_DETAILS = [
  {
    icon: MapPin,
    label: "Office Address",
    value: "No. 12, Kabar Aye Pagoda Road, Yangon, Myanmar",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "09 8872 88882 · 09 42 182 3339",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@cg-net.com.mm",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat: 9:00 AM – 6:00 PM",
  },
];

const SOCIAL_LINKS = [
  { icon: Phone, label: "Facebook", href: "#" },
  { icon: Phone, label: "Messenger", href: "#" },
  { icon: Phone, label: "Telegram", href: "#" },
  { icon: Phone, label: "Viber", href: "#" },
];

const COMPANY_LOCATION = {
  name: 'Yaung Ni Oo',
  lat: 16.8661,
  lng: 96.1951,
}

export default function ContactUsPage() {
  const { t } = useTranslation()
  const mapRef = useRef<HTMLDivElement | null>(null)
  const leafletMapRef = useRef<LeafletMap | null>(null)

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

  const [copied, setCopied] = useState(false);

  const copyPhone = () => {
    navigator.clipboard.writeText("0987288882").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <>
      <PageHeader title={t('contact.title')} subtitle={t('contact.subtitle')} />
      <SectionWrapper spacing="compact" className="py-10 bg-muted/40">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Left column: contact info, QR, social */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h2 className="text-xl font-bold text-foreground">
                Contact Information
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Reach us through any of the channels below.
              </p>

              <ul className="mt-6 space-y-5">
                {CONTACT_DETAILS.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent">
                      <Icon className="h-5 w-5 text-primary" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {label}
                      </p>
                      <p className="mt-0.5 text-[15px] font-medium text-foreground">
                        {value}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                onClick={copyPhone}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:brightness-110 active:scale-[0.98] sm:w-auto"
              >
                <Phone className="h-4 w-4" />
                {copied ? "Phone number copied" : "Copy support number"}
              </button>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
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
                    <Headphones className="h-5 w-5 text-primary" />
                    Complaint & Support QR
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    Scan this code with your phone camera to open our complaint
                    channel. Share your issue, account details, and contact
                    number — our support team will follow up within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h3 className="text-lg font-bold text-foreground">
                Follow Yaung Ni Oo on Social Media
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Stay updated with news, promotions, and service alerts.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:bg-accent hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: gradient map card */}
          <div className="relative flex flex-col">
            <div className="relative flex-1 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-violet/10 to-primary/5 p-1.5 shadow-soft">
              <div className="flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl bg-card">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">
                      Company Location
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      No. 12, Kabar Aye Pagoda Road, Yangon
                    </p>
                  </div>
                </div>
                <div className="relative flex-1">
                  {/* <ClientOnly fallback={<MapSkeleton />}> */}
                    {/* <Suspense fallback={<MapSkeleton />}> */}
                      <div className="overflow-hidden rounded-xl border border-border/70 bg-background shadow-sm">
                        <div ref={mapRef} className="h-[600px] w-full" />
                      </div>
                    {/* </Suspense> */}
                  {/* </ClientOnly> */}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h3 className="text-lg font-bold text-foreground">
                How to find us
              </h3>
              <ul className="mt-4 space-y-3 text-[15px] text-muted-foreground">
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Located on Kabar Aye Pagoda Road, near the junction with
                  Pyay Road.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Free customer parking is available in front of the building.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  For urgent technical issues, please call our 24/7 hotline
                  instead of visiting.
                </li>
              </ul>
            </div>
          </div>
        </div>

      </SectionWrapper>
    </>
  )
}

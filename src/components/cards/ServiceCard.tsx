import { Zap, Home, Wifi, Building2, Cloud, Tv } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { getLocalized, getLocalizedArray } from '@/lib/utils'
import type { Service } from '@/types'
import type { SupportedLanguage } from '@/lib/i18n/languages'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Home, Wifi, Building2, Cloud, Tv,
}

interface ServiceCardProps {
  service: Service
  lang: SupportedLanguage
  delay?: number
}

export function ServiceCard({ service, lang, delay = 0 }: ServiceCardProps) {
  const IconComp = ICON_MAP[service.icon] ?? Zap
  const features = getLocalizedArray(service.features, lang)

  return (
    <AnimatedCard delay={delay} variant="rise" className="rounded-xl h-full">
      <Card className="group flex flex-col h-full overflow-hidden border shadow-sm card-glow">
        <div className="card-media relative h-40">
          <img
            src={service.imageUrl}
            alt={getLocalized(service.title, lang)}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center">
            <IconComp className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
        </div>
        <CardHeader className="pb-2">
          <Badge variant="secondary" className="w-fit text-xs mb-1">
            {service.category}
          </Badge>
          <CardTitle className="text-lg">{getLocalized(service.title, lang)}</CardTitle>
          <CardDescription className="line-clamp-2">
            {getLocalized(service.description, lang)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pt-0">
          <ul className="space-y-2" aria-label={`${getLocalized(service.title, lang)} features`}>
            {features.map((feature) => (
              <li key={feature} className="text-sm flex items-start gap-2">
                <span className="text-green-500 font-bold mt-0.5 shrink-0" aria-hidden="true">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </AnimatedCard>
  )
}

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
  type TouchEvent,
} from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getLocalized } from '@/lib/utils'
import type { Package } from '@/types'
import type { SupportedLanguage } from '@/lib/i18n/languages'
import { t } from 'i18next'

const SWIPE_THRESHOLD = 40
const SCROLL_PX_PER_MS = 0.035

interface PackageCarouselProps {
  packages: Package[]
  lang: SupportedLanguage
}

function getCardsToShow(width: number) {
  if (width >= 1280) return 5
  if (width >= 768) return 3
  if (width >= 640) return 2
  return 1
}

function getCardWidth(width: number) {
  if (width >= 1280) return 'calc((100% - (4 * 1rem)) / 5)'
  if (width >= 768) return 'calc((100% - (2 * 1rem)) / 3)'
  if (width >= 640) return 'calc((100% - 1rem) / 2)'
  return '88%'
}

function PackageCarouselCard({ pkg, lang }: { pkg: Package; lang: SupportedLanguage }) {
  return (
    <Card
      className={[
        'group relative h-[320px] sm:h-[340px] xl:h-[350px] overflow-hidden rounded-[20px] border-0 bg-transparent shadow-none z-0',
        'transition-all duration-300 ease-out',
        'hover:z-10 hover:scale-[1.02]',
      ].join(' ')}
    >
      <div className="card-media relative h-full overflow-hidden rounded-[25px] border border-white/80 shadow-[0_18px_42px_-20px_rgba(15,23,42,0.42)]">
        <img
          src={typeof pkg.imageUrl === 'string' ? pkg.imageUrl : ''}
          alt={getLocalized(pkg.title, lang)}
          className="h-full w-full object-cover"
          loading="lazy"
        />

        <div className="absolute inset-x-0 bottom-[14%] flex justify-center px-4 sm:bottom-[12%]">
          <Button
            asChild
            className={[
              'w-[190px] gap-2 rounded-[6px] border border-white/10 bg-app-primary px-4 text-sm text-font-white shadow-[0_14px_30px_-16px_rgba(0,74,198,0.9)] backdrop-blur-sm',
              'hover:-translate-y-0.5 hover:bg-app-hover hover:text-font-hover hover:shadow-[0_18px_36px_-16px_rgba(0,74,198,0.95)]',
              'focus-visible:ring-[#004AC6]/60',
              'transition-all duration-300 ease-out',
              'opacity-100 translate-y-0',
              'sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0',
            ].join(' ')}
          >
            <Link to={`/packages?category=${pkg.slug}`}>
              {t('common.viewAll')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}

export function PackageCarousel({ packages, lang }: PackageCarouselProps) {
  const [paused, setPaused] = useState(false)
  const [cardsToShow, setCardsToShow] = useState(() =>
    typeof window === 'undefined' ? 5 : getCardsToShow(window.innerWidth)
  )
  const [cardWidth, setCardWidth] = useState(() =>
    typeof window === 'undefined' ? '20%' : getCardWidth(window.innerWidth)
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const touchStartX = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastFrameRef = useRef<number | null>(null)

  const orderedPackages = useMemo(() => {
    return [...packages].sort((a, b) => {
      const scoreA = Number(a.isFeatured) * 2 + Number(a.isPopular)
      const scoreB = Number(b.isFeatured) * 2 + Number(b.isPopular)
      return scoreB - scoreA
    })
  }, [packages])

  const repeatedPackages = useMemo(
    () => [...orderedPackages, ...orderedPackages, ...orderedPackages],
    [orderedPackages]
  )

  const dotCount = orderedPackages.length

  useEffect(() => {
    function onResize() {
      const width = window.innerWidth
      setCardsToShow(getCardsToShow(width))
      setCardWidth(getCardWidth(width))
    }

    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || !orderedPackages.length) return

    const segmentWidth = viewport.scrollWidth / 3
    viewport.scrollLeft = segmentWidth
  }, [orderedPackages.length, cardWidth])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || orderedPackages.length <= cardsToShow) return
    const viewportEl = viewport

    function step(timestamp: number) {
      if (lastFrameRef.current == null) lastFrameRef.current = timestamp
      const delta = timestamp - lastFrameRef.current
      lastFrameRef.current = timestamp

      if (!paused) {
        const segmentWidth = viewportEl.scrollWidth / 3
        viewportEl.scrollLeft += delta * SCROLL_PX_PER_MS

        if (viewportEl.scrollLeft >= segmentWidth * 2) {
          viewportEl.scrollLeft -= segmentWidth
        }
      }

      rafRef.current = window.requestAnimationFrame(step)
    }

    rafRef.current = window.requestAnimationFrame(step)

    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      lastFrameRef.current = null
    }
  }, [paused, orderedPackages.length, cardsToShow])

  function getCardStep() {
    const viewport = viewportRef.current
    const firstCard = viewport?.querySelector<HTMLElement>('[data-package-card]')
    if (!viewport || !firstCard) return 0

    const gap = 16
    return firstCard.offsetWidth + gap
  }

  const syncInfinitePosition = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport || !orderedPackages.length) return

    const segmentWidth = viewport.scrollWidth / 3
    if (viewport.scrollLeft <= 0) {
      viewport.scrollLeft += segmentWidth
    } else if (viewport.scrollLeft >= segmentWidth * 2) {
      viewport.scrollLeft -= segmentWidth
    }

    const cardStep = getCardStep()
    if (!cardStep) return

    const normalized = viewport.scrollLeft - segmentWidth
    const rawIndex = Math.round(normalized / cardStep)
    const index =
      ((rawIndex % orderedPackages.length) + orderedPackages.length) % orderedPackages.length
    setActiveIndex(index)
  }, [orderedPackages.length])

  function goTo(index: number) {
    const viewport = viewportRef.current
    if (!viewport || !orderedPackages.length) return

    const segmentWidth = viewport.scrollWidth / 3
    const cardStep = getCardStep()
    if (!cardStep) return

    viewport.scrollTo({
      left: segmentWidth + index * cardStep,
      behavior: 'smooth',
    })
    setActiveIndex(index)
  }

  function next() {
    goTo((activeIndex + 1) % orderedPackages.length)
  }

  function prev() {
    goTo((activeIndex - 1 + orderedPackages.length) % orderedPackages.length)
  }

  function onTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current == null) return
    const diff = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current
    touchStartX.current = null

    if (Math.abs(diff) < SWIPE_THRESHOLD) return
    if (diff < 0) next()
    else prev()
  }

  useEffect(() => {
    syncInfinitePosition()
  }, [cardWidth, cardsToShow, orderedPackages.length, syncInfinitePosition])

  const trackStyle = {
    '--card-width': cardWidth,
  } as CSSProperties

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={viewportRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-none overscroll-x-contain"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onScroll={syncInfinitePosition}
      >
        <div className="flex gap-4 will-change-transform" style={trackStyle}>
          {repeatedPackages.map((pkg, index) => (
            <div
              key={`${pkg.id}-${index}`}
              data-package-card
              className="shrink-0 py-2"
              style={{ flex: '0 0 var(--card-width)' }}
            >
              <PackageCarouselCard pkg={pkg} lang={lang} />
            </div>
          ))}
        </div>
      </div>

      {dotCount > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: dotCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to package slide ${index + 1}`}
              className={[
                'h-2.5 rounded-full transition-all duration-300',
                activeIndex === index
                  ? 'w-6 bg-app-primary'
                  : 'w-2.5 bg-border hover:bg-app-primary/40',
              ].join(' ')}
            />
          ))}
        </div>
      )}
    </div>
  )
}

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
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getLocalized } from '@/lib/utils'
import { RecommendedPackage } from '@/lib/api/packages.api'
import type { SupportedLanguage } from '@/lib/i18n/languages'
import { t } from 'i18next'

const SWIPE_THRESHOLD = 40
const SCROLL_PX_PER_MS = 0.035

interface PackageCarouselProps {
  packages: RecommendedPackage[]
  lang: SupportedLanguage
}
function getCardsToShow(width: number) {
  if (width >= 1536) return 6 // 2xl
  if (width >= 1280) return 5 // xl
  if (width >= 1024) return 4 // lg
  if (width >= 768) return 3 // md
  if (width >= 640) return 2 // sm
  return 1
}

function getCardWidth(width: number) {
  if (width >= 1280) {
    return 'calc((100% - (4 * 1rem)) / 5)'
  }

  if (width >= 768) {
    return 'calc((100% - (2 * 1rem)) / 3)'
  }

  if (width >= 640) {
    return 'calc((100% - 1rem) / 2)'
  }

  return '100%'
}
function PackageCarouselCard({
  pkg,
  lang,
  isActive,
  onClick,
}: {
  pkg: RecommendedPackage
  lang: SupportedLanguage
  isActive: boolean
  onClick: () => void
}) {
  return (
    <Card
      onClick={onClick}
      className={[
        'group relative h-[min(360px,calc(100svh_-_32px))] sm:h-[360px] overflow-hidden rounded-xl border-0 bg-transparent shadow-none z-0',
        'transition-all duration-300 ease-out cursor-pointer',
        'sm:hover:z-10',
        isActive ? 'z-10' : 'z-0',
      ].join(' ')}
    >
      <div className="card-media no-image-zoom relative h-full overflow-hidden rounded-xl border border-white/80 bg-muted/20 ">
        {pkg.imageUrl && typeof pkg.imageUrl === 'string' ? (
          <img
            src={pkg.imageUrl}
            alt={getLocalized(pkg.title, lang)}
            className="h-full w-full object-cover object-center"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full rounded-xl border border-white/80 bg-muted/40" />
        )}
        <div
          className={[
            'absolute inset-0 bg-black/60 pointer-events-none transition-opacity duration-300',
            'opacity-0',
            'sm:group-hover:opacity-100',
            isActive ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        />

        <div className="absolute inset-x-0 bottom-[25%] flex justify-center px-4 sm:bottom-[25%]">
          <Button
            asChild
            className={[
              'w-[190px] gap-2 rounded-xl border border-app-white bg-transparent px-4 text-sm text-font-white backdrop-blur-sm',
              'hover:-translate-y-0.5 hover:bg-white/10 hover:text-font-hover',
              'focus-visible:ring-[#004AC6]/60',
              'transition-all duration-300 ease-out',
              'opacity-100 translate-y-0',
              'sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0',
              isActive ? 'opacity-100 translate-y-0' : 'opacity-100 sm:opacity-0',
            ].join(' ')}
          >
            <Link
              to={`/packages?category=${pkg.network.id}&speed=${pkg.speed?.id ?? ''}&term=${pkg.term?.id ?? ''}`}
            >
              {t('common.knowMore')}
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
  const [activeCardKey, setActiveCardKey] = useState<string | null>(null)

  const viewportRef = useRef<HTMLDivElement | null>(null)
  const touchStartX = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastFrameRef = useRef<number | null>(null)
  const pausedRef = useRef(false)
  const isTouchInteractingRef = useRef(false)
  const settleTimerRef = useRef<number | null>(null)
  const isCorrectingLoopRef = useRef(false)

  const orderedPackages = useMemo(() => {
    return [...packages].sort((a, b) => {
      const scoreA = Number(a.isFeatured) * 2
      const scoreB = Number(b.isFeatured) * 2
      return scoreB - scoreA
    })
  }, [packages])

  const dotCount = orderedPackages.length

  const repeatedPackages = useMemo(() => {
    if (!orderedPackages.length) return []

    let base = [...orderedPackages]

    while (base.length < cardsToShow) {
      base = [...base, ...orderedPackages]
    }

    return [...base, ...base, ...base]
  }, [orderedPackages, cardsToShow])

  const setAutoScrollPaused = useCallback((nextPaused: boolean) => {
    pausedRef.current = nextPaused
    setPaused(nextPaused)
  }, [])

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

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

    const segmentWidth = (viewport.scrollWidth + 16) / 3
    viewport.scrollTo({ left: segmentWidth, behavior: 'auto' })
  }, [orderedPackages.length, cardWidth])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || !orderedPackages.length) return
    const viewportEl = viewport

    function step(timestamp: number) {
      if (lastFrameRef.current == null) lastFrameRef.current = timestamp
      const delta = timestamp - lastFrameRef.current
      lastFrameRef.current = timestamp

      if (!pausedRef.current) {
        const segmentWidth = (viewportEl.scrollWidth + 16) / 3
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
  }, [orderedPackages.length, cardsToShow])

  function getCardStep() {
    const viewport = viewportRef.current
    const firstCard = viewport?.querySelector<HTMLElement>('[data-package-card]')
    if (!viewport || !firstCard) return 0

    const gap = 16

    return firstCard.getBoundingClientRect().width + gap
  }

  const updateActiveIndex = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport || !orderedPackages.length) return

    const segmentWidth = (viewport.scrollWidth + 16) / 3
    const cardStep = getCardStep()
    if (!cardStep) return

    const normalized = viewport.scrollLeft - segmentWidth
    const rawIndex = Math.round(normalized / cardStep)
    const index = ((rawIndex % dotCount) + dotCount) % dotCount
    setActiveIndex(index)
  }, [dotCount, orderedPackages.length])

  const correctInfinitePosition = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport || !orderedPackages.length || isCorrectingLoopRef.current) return

    const segmentWidth = (viewport.scrollWidth + 16) / 3
    const currentLeft = viewport.scrollLeft
    let nextLeft = currentLeft

    if (currentLeft <= 0) {
      nextLeft = currentLeft + segmentWidth
    } else if (currentLeft >= segmentWidth * 2) {
      nextLeft = currentLeft - segmentWidth
    }

    if (Math.abs(nextLeft - currentLeft) > 0.5) {
      isCorrectingLoopRef.current = true
      viewport.scrollTo({
        left: nextLeft,
        behavior: 'auto',
      })
      window.requestAnimationFrame(() => {
        isCorrectingLoopRef.current = false
      })
    }

    updateActiveIndex()
  }, [orderedPackages.length, updateActiveIndex])

  const clearScrollSettledTimer = useCallback(() => {
    if (settleTimerRef.current != null) {
      window.clearTimeout(settleTimerRef.current)
      settleTimerRef.current = null
    }
  }, [])

  const handleScrollSettled = useCallback(() => {
    if (isTouchInteractingRef.current) return

    clearScrollSettledTimer()
    correctInfinitePosition()
    setAutoScrollPaused(false)
  }, [clearScrollSettledTimer, correctInfinitePosition, setAutoScrollPaused])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || !orderedPackages.length) return

    const handleScroll = () => {
      if (isTouchInteractingRef.current) return

      clearScrollSettledTimer()
      settleTimerRef.current = window.setTimeout(() => {
        handleScrollSettled()
      }, 140)
    }

    const handleScrollEnd = () => {
      handleScrollSettled()
    }

    viewport.addEventListener('scroll', handleScroll)
    viewport.addEventListener('scrollend', handleScrollEnd)

    return () => {
      viewport.removeEventListener('scroll', handleScroll)
      viewport.removeEventListener('scrollend', handleScrollEnd)
      clearScrollSettledTimer()
    }
  }, [clearScrollSettledTimer, handleScrollSettled, orderedPackages.length])

  function goTo(index: number) {
    const viewport = viewportRef.current
    if (!viewport || !orderedPackages.length) return

    const segmentWidth = (viewport.scrollWidth + 16) / 3
    const cardStep = getCardStep()
    if (!cardStep) return

    viewport.scrollTo({
      left: segmentWidth + index * cardStep,
      behavior: 'auto',
    })
    setActiveIndex(index)
  }

  function next() {
    goTo((activeIndex + 1) % dotCount)
  }

  function prev() {
    goTo((activeIndex - 1 + dotCount) % dotCount)
  }

  function onTouchStart(event: TouchEvent<HTMLDivElement>) {
    isTouchInteractingRef.current = true
    touchStartX.current = event.touches[0]?.clientX ?? null
    clearScrollSettledTimer()
    setAutoScrollPaused(true)
  }

  function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current == null) return

    const diff = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current
    touchStartX.current = null
    isTouchInteractingRef.current = false

    if (Math.abs(diff) >= SWIPE_THRESHOLD) {
      if (diff < 0) next()
      else prev()
    }

    const viewport = viewportRef.current
    if (!viewport) return

    clearScrollSettledTimer()
    settleTimerRef.current = window.setTimeout(() => {
      if (!isTouchInteractingRef.current) {
        handleScrollSettled()
      }
    }, 180)
  }

  function onTouchCancel() {
    isTouchInteractingRef.current = false
    clearScrollSettledTimer()
    if (!pausedRef.current) {
      window.setTimeout(() => {
        handleScrollSettled()
      }, 120)
    }
  }

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || !orderedPackages.length) return

    if (viewport.scrollLeft === 0) {
      const segmentWidth = (viewport.scrollWidth + 16) / 3
      viewport.scrollTo({ left: segmentWidth, behavior: 'auto' })
    }

    updateActiveIndex()
  }, [cardWidth, cardsToShow, orderedPackages.length, updateActiveIndex])

  const trackStyle = {
    '--card-width': cardWidth,
  } as CSSProperties

  return (
    <div
      className="relative"
      onMouseEnter={() => setAutoScrollPaused(true)}
      onMouseLeave={() => setAutoScrollPaused(false)}
    >
      <div
        ref={viewportRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-none overscroll-x-contain"
        style={{
          touchAction: 'pan-x',
          WebkitOverflowScrolling: 'touch',
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
      >
        <div className="flex gap-4 will-change-transform" style={trackStyle}>
          {repeatedPackages.map((pkg, index) => {
            const cardKey = `${pkg.id}-${index}`
            const isActive = activeCardKey === cardKey

            return (
              <div
                key={cardKey}
                data-package-card
                className="shrink-0 py-2"
                style={{
                  flex: '0 0 var(--card-width)',
                  maxWidth: '260px',
                }}
              >
                <PackageCarouselCard
                  pkg={pkg}
                  lang={lang}
                  isActive={isActive}
                  onClick={() =>
                    setActiveCardKey((current) => (current === cardKey ? null : cardKey))
                  }
                />
              </div>
            )
          })}
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

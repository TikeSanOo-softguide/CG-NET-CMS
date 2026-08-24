import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useHeroSlides } from '@/hooks/useAbout'
import { cn } from '@/lib/utils'
import type { SupportedLanguage } from '@/lib/i18n/languages'

const AUTOPLAY_MS = 5000

interface HeroBannerProps {
  lang: SupportedLanguage
}

export function HeroBanner({ lang }: HeroBannerProps) {
  const { data: slides, isLoading } = useHeroSlides()
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [, setLoaded] = useState<Record<string, boolean>>({})
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchStartX = useRef<number | null>(null)

  const total = slides?.length ?? 0

  const goTo = useCallback(
    (index: number) => setCurrent(((index % total) + total) % total),
    [total]
  )
  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    if (!total || paused) return
    timerRef.current = setTimeout(next, AUTOPLAY_MS)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current, paused, next, total])

  useEffect(() => {
    slides?.forEach((s) => {
      const img = new Image()
      img.src = s.imageUrl
      img.onload = () => setLoaded((prev) => ({ ...prev, [s.id]: true }))
    })
  }, [slides])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null
    setPaused(true)
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const start = touchStartX.current
    touchStartX.current = null
    setPaused(false)
    if (start == null) return
    const dx = (e.changedTouches[0]?.clientX ?? start) - start
    if (Math.abs(dx) < 40) return
    if (dx < 0) next()
    else prev()
  }

  const frameClass =
    'relative overflow-hidden text-white select-none h-[320px] sm:h-[375px]'

  if (isLoading) {
    return (
      <div className={cn(frameClass, 'bg-brand-900 flex items-center justify-center')}>
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900" />
        <div className="relative text-center space-y-3 sm:space-y-4 px-6 max-w-xl w-full">
          <div className="h-2.5 bg-white/10 rounded-full w-1/4 mx-auto" />
          <div className="h-8 sm:h-10 bg-white/10 rounded-lg w-4/5 mx-auto" />
          <div className="h-4 sm:h-5 bg-white/10 rounded w-full mx-auto" />
          <div className="h-4 sm:h-5 bg-white/10 rounded w-3/4 mx-auto" />
        </div>
      </div>
    )
  }

  if (!slides || slides.length === 0) return null

  return (
    <section
      aria-label="Hero banner"
      aria-roledescription="carousel"
      className={frameClass}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {slides.map((s, i) => {
        const isActive = i === current

        return (
          <div
            key={s.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${total}`}
            aria-hidden={!isActive}
            className={cn(
              'absolute inset-0 transition-opacity duration-700',
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            )}
          >
           <img
              src={s.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[82%_50%] sm:object-center transition-transform duration-[8000ms] ease-linear"
              style={{
                transform: isActive ? 'scale(1.06)' : 'scale(1)',
              }}
              aria-hidden="true"
            />

            <div
              className="absolute inset-0"
              aria-hidden="true"
            />

            <div
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent"
              aria-hidden="true"
            />
          </div>
        )
      })}

      {total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="hidden sm:flex absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 backdrop-blur-sm items-center justify-center transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="hidden sm:flex absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 backdrop-blur-sm items-center justify-center transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </>
      )}

      {total > 1 && (
        <div
          role="tablist"
          aria-label="Slide navigation"
          className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                'rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white min-h-3 min-w-3 sm:min-h-0 sm:min-w-0 flex items-center justify-center',
                i === current
                  ? 'w-7 h-2 bg-white shadow'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              )}
            />
          ))}
        </div>
      )}

      {total > 1 && (
        <div
          aria-hidden="true"
          key={`pb-${current}`}
          className="absolute bottom-0 left-0 h-[3px] bg-white/50 z-20 rounded-r"
          style={{ animation: `cgnet-progress ${AUTOPLAY_MS}ms linear ${paused ? 'paused' : 'running'}` }}
        />
      )}

      <style>{`
        @keyframes cgnet-progress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </section>
  )
}

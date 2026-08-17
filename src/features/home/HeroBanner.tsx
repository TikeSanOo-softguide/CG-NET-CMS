import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useHeroSlides } from '@/hooks/useAbout'
import { getLocalized } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { SupportedLanguage } from '@/lib/i18n'

const AUTOPLAY_MS = 5000
const BANNER_HEIGHT = 375 // px

interface HeroBannerProps {
  lang: SupportedLanguage
}

export function HeroBanner({ lang }: HeroBannerProps) {
  const { data: slides, isLoading } = useHeroSlides()
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [, setLoaded] = useState<Record<string, boolean>>({})
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const total = slides?.length ?? 0

  const goTo = useCallback(
    (index: number) => setCurrent(((index % total) + total) % total),
    [total]
  )
  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // Autoplay
  useEffect(() => {
    if (!total || paused) return
    timerRef.current = setTimeout(next, AUTOPLAY_MS)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current, paused, next, total])

  // Preload all slide images
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

  // Loading skeleton — ISP blue tinted
  if (isLoading) {
    return (
      <div
        style={{ height: BANNER_HEIGHT }}
        className="relative bg-brand-900 overflow-hidden flex items-center justify-center"
      >
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900" />
        <div className="relative text-center space-y-4 px-6 max-w-xl w-full">
          <div className="h-2.5 bg-white/10 rounded-full w-1/4 mx-auto" />
          <div className="h-10 bg-white/10 rounded-lg w-4/5 mx-auto" />
          <div className="h-5 bg-white/10 rounded w-full mx-auto" />
          <div className="h-5 bg-white/10 rounded w-3/4 mx-auto" />
          <div className="flex gap-3 justify-center pt-2">
            <div className="h-10 w-36 bg-white/10 rounded-md" />
            <div className="h-10 w-32 bg-white/10 rounded-md" />
          </div>
        </div>
      </div>
    )
  }

  if (!slides || slides.length === 0) return null

  return (
    <section
      aria-label="Hero banner"
      aria-roledescription="carousel"
      style={{ height: BANNER_HEIGHT }}
      className="relative overflow-hidden text-white select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* ── Slides ── */}
      {slides.map((s, i) => {
        const isActive = i === current
        const overlay = s.overlayColor ?? 'rgba(10,20,50,0.62)'

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
            {/* Background photo */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-linear"
              style={{
                backgroundImage: `url(${s.imageUrl})`,
                // Subtle Ken-Burns zoom on active slide
                transform: isActive ? 'scale(1.06)' : 'scale(1)',
                backgroundColor: '#0f172a', // fallback while loading
              }}
              aria-hidden="true"
            />

            {/* Dark gradient overlay for text readability */}
            <div
              className="absolute inset-0"
              style={{ background: overlay }}
              aria-hidden="true"
            />

            {/* Bottom vignette */}
            <div
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent"
              aria-hidden="true"
            />

            {/* Slide content */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="container text-center max-w-3xl">
                {/* Pill badge */}
                <div
                  className={cn(
                    'inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3.5 py-1 text-xs font-semibold tracking-widest uppercase mb-4 transition-all duration-500',
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  )}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  CG-NET · Slide {i + 1}/{total}
                </div>

                <h1
                  className={cn(
                    'text-3xl md:text-5xl font-black leading-tight mb-4 drop-shadow-lg transition-all duration-500 delay-75',
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                  )}
                >
                  {getLocalized(s.title, lang)}
                </h1>

                <p
                  className={cn(
                    'text-base md:text-lg text-white/85 mb-7 max-w-2xl mx-auto leading-relaxed drop-shadow transition-all duration-500 delay-150',
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                  )}
                >
                  {getLocalized(s.subtitle, lang)}
                </p>

                <div
                  className={cn(
                    'flex flex-col sm:flex-row gap-3 justify-center transition-all duration-500 delay-200',
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                  )}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    asChild
                    className="font-bold shadow-xl hover:scale-105 transition-transform"
                  >
                    <Link to={s.ctaLink}>{getLocalized(s.cta, lang)}</Link>
                  </Button>
                  <Button
                    size="default"
                    variant="outline"
                    asChild
                    className="text-white border-white/50 hover:bg-white/15 backdrop-blur-sm"
                  >
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* ── Prev / Next arrows ── */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </>
      )}

      {/* ── Dot indicators ── */}
      {total > 1 && (
        <div
          role="tablist"
          aria-label="Slide navigation"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                'rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white',
                i === current
                  ? 'w-7 h-2 bg-white shadow'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              )}
            />
          ))}
        </div>
      )}

      {/* ── Auto-play progress bar ── */}
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

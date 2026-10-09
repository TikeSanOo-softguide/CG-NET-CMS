import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useBanners } from '@/hooks/useBanner'
import { cn } from '@/lib/utils'
import type { SupportedLanguage } from '@/lib/i18n/languages'
import { Banner } from '@/types'

const AUTOPLAY_MS = 5000

interface HeroBannerProps {
  lang: SupportedLanguage
}

export function HeroBanner({ lang }: HeroBannerProps) {
  const { data: allBanners, isLoading } = useBanners()
  const slides = allBanners?.filter((banner) => banner.type === 'web_background')
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [, setLoaded] = useState<Record<string, boolean>>({})
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchStartX = useRef<number | null>(null)
  const STORAGE_URL = `${import.meta.env.VITE_APP_URL}/storage`

  const total = slides?.length ?? 0

  const goTo = useCallback(
    (index: number) => setCurrent(((index % total) + total) % total),
    [total]
  )
  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])
  const getImageUrl = useCallback(
    (slide: Banner) => {
      const imageMap = {
        en: slide.image_url_en,
        zh: slide.image_url_zh,
        my: slide.image_url_my,
      }
      const imagePath = imageMap[lang as keyof typeof imageMap] ?? slide.image_url_en
      return `${STORAGE_URL}/${imagePath}`
    },
    [lang, STORAGE_URL]
  )
  useEffect(() => {
    if (!total || paused) return
    timerRef.current = setTimeout(next, AUTOPLAY_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [current, paused, next, total])

  useEffect(() => {
    slides?.forEach((s) => {
      const img = new Image()
      img.src = getImageUrl(s)
      img.onload = () => setLoaded((prev) => ({ ...prev, [s.id]: true }))
    })
  }, [slides, getImageUrl])

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
    'relative aspect-[4/3] sm:aspect-[16/7] lg:aspect-[1920/550] w-full overflow-hidden text-white select-none'

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
      {/* Slides */}
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
              isActive ? 'z-10 opacity-100' : 'z-0 opacity-0'
            )}
          >
            {/* Banner image */}
            <img
              src={getImageUrl(s)}
              alt=""
              className="
              absolute inset-0
              h-full w-full
              object-cover object-right
              transition-transform
              duration-[8000ms]
              ease-linear
            "
              style={{
                transform: isActive ? 'scale(1.02)' : 'scale(1)',
              }}
              aria-hidden="true"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/5" aria-hidden="true" />

            {/* Bottom gradient */}
            <div
              className="
              absolute inset-x-0 bottom-0
              h-16
              sm:h-24
              bg-gradient-to-t
              from-black/40
              to-transparent
            "
              aria-hidden="true"
            />
          </div>
        )
      })}

      {/* Previous / Next buttons */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="
            hidden sm:flex
            absolute left-3 md:left-5
            top-1/2
            z-20
            -translate-y-1/2
            h-9 w-9
            items-center justify-center
            rounded-full
            border border-white/20
            bg-black/30
            backdrop-blur-sm
            transition-all
            hover:scale-110
            hover:bg-black/50
            focus-visible:ring-2
            focus-visible:ring-white
          "
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="
            hidden sm:flex
            absolute right-3 md:right-5
            top-1/2
            z-20
            -translate-y-1/2
            h-9 w-9
            items-center justify-center
            rounded-full
            border border-white/20
            bg-black/30
            backdrop-blur-sm
            transition-all
            hover:scale-110
            hover:bg-black/50
            focus-visible:ring-2
            focus-visible:ring-white
          "
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </>
      )}

      {/* Slide indicators */}

      {total > 1 && (
        <div
          role="tablist"
          aria-label="Slide navigation"
          className="
          absolute
          bottom-6      
          sm:bottom-12   
          left-1/2
          z-20
          flex
          -translate-x-1/2
          items-center
          gap-1           
          sm:gap-1.5     
        "
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                `
                flex
                items-center
                justify-center
                rounded-full
                transition-all
                duration-300
                focus-visible:ring-2
                focus-visible:ring-white
              `,
                // Mobile တွင် အရွယ်အစားကို အတင်းအကျယ်ကြီး မဖြစ်စေရန် min-h-3 / min-w-3 များကို ဖယ်ရှားလိုက်ပါသည်
                i === current
                  ? 'h-1.5 w-4 sm:h-2 sm:w-7 bg-white shadow' // Active: Mobile တွင် အနည်းငယ်တို/ပါးသွားမည် (w-4, h-1.5)
                  : 'h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white/40 hover:bg-white/70' // Inactive: Mobile တွင် အစက်ပိုသေးသွားမည်
              )}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      {total > 1 && (
        <div
          aria-hidden="true"
          key={`pb-${current}`}
          className="
          absolute
          bottom-0
          left-0
          z-20
          h-[3px]
          rounded-r
          bg-white/50
        "
          style={{
            animation: `cgnet-progress ${AUTOPLAY_MS}ms linear ${paused ? 'paused' : 'running'}`,
          }}
        />
      )}

      {/* Progress animation */}
      <style>{`
      @keyframes cgnet-progress {
        from {
          width: 0%;
        }

        to {
          width: 100%;
        }
      }
    `}</style>
    </section>
  )
}

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { initGsap, prefersReducedMotion } from '@/lib/gsap'

interface CardItem {
  id: string
  imageUrl: string
}

interface StackedCardsProps {
  items: CardItem[]
}

export function StackedCards({ items }: StackedCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set())

  useGSAP(
    () => {
      initGsap()
      if (!containerRef.current || !trackRef.current || prefersReducedMotion()) return

      const images = gsap.utils.toArray<HTMLElement>('.stacked-image', containerRef.current)

      if (images.length < 2) return

      gsap.set(images[0], { yPercent: 0 })
      gsap.set(images.slice(1), { yPercent: 100 })

      const tl = gsap.timeline({
        scrollTrigger: {
          scroller: containerRef.current,
          trigger: trackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      images.slice(1).forEach((image) => {
        tl.to(image, {
          yPercent: 0,
          duration: 1,
          ease: 'none',
        })
      })
    },
    {
      scope: containerRef,
      dependencies: [items],
    }
  )

  const scrollTrackHeight = `${items.length * 100}%`

  return (
    <div
      ref={containerRef}
      className="
        relative
        h-[250px]
        w-full
        sm:h-[300px]
        md:h-[340px]
        lg:h-[400px]
        overflow-y-auto
        overflow-x-hidden
        rounded-[28px]
        [scrollbar-width:none]
        [-ms-overflow-style:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      <div ref={trackRef} style={{ height: scrollTrackHeight }} className="relative w-full">
        <div className="sticky top-0 h-[250px] w-full overflow-hidden rounded-[28px] sm:h-[300px] md:h-[340px] lg:h-[390px]">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="stacked-image absolute inset-0 h-full w-full"
              style={{
                zIndex: index + 1,
              }}
            >
              {item.imageUrl && !failedImages.has(item.id) ? (
                <img
                  src={item.imageUrl}
                  alt={item.id}
                  className="h-full w-full object-cover"
                  draggable={false}
                  onError={() => setFailedImages((failed) => new Set(failed).add(item.id))}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <img
                    src="/assets/logo/logo-muted.png"
                    alt="No image available"
                    className="h-16 w-auto object-contain opacity-60"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

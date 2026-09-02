import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

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

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return

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
              <img
                src={item.imageUrl}
                alt={item.id}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

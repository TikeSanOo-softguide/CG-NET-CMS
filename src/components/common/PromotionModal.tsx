import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

export default function PromotionModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  if (!isOpen) return null

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
      "
      onClick={() => setIsOpen(false)}
    >
      {/* Promotion Card */}
      <div
        className="
          relative
         w-[90vw]            
          sm:w-[70vw]      
          md:w-[60vw]         
          max-w-[800px]
          overflow-hidden
          rounded-xl
          bg-white
          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close promotion"
          className="
            absolute
            right-3
            top-3
            z-10
            flex h-9 w-9
            items-center justify-center
            rounded-full
            bg-black/50
            text-white
            backdrop-blur-sm
            transition
            hover:bg-black/70
          "
        >
          <X size={18} />
        </button>

        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&fit=crop"
          alt="Promotion"
          className="
            block
            w-full
            aspect-[16/7]
            object-cover
          "
        />
      </div>
    </div>
  )
}

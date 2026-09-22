import { Share2 } from 'lucide-react'

interface ShareButtonProps {
  title: string
  text?: string
  url?: string
  buttonText: string
}

export function ShareButton({
  title,
  text = 'Check out this!',
  url = window.location.href,
  buttonText,
}: ShareButtonProps) {
  const handleShare = async () => {
    const shareData = { title, text, url }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {}
    }
  }

  return (
    <div className="mt-12 flex justify-center">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-xl bg-app-primary px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
      >
        <Share2 className="h-4 w-4" />
        {buttonText}
      </button>
    </div>
  )
}

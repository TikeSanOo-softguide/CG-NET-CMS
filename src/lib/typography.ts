import { cn } from '@/lib/utils'
import type { SupportedLanguage } from '@/lib/i18n/languages'

/** Shared luxury type styles — section + card titles/descriptions stay consistent. */

export const typeEyebrow =
  'text-[12px] font-semibold uppercase tracking-[0.1em] text-font-blue md:text-[13px] lg:text-[14px]'

export const typeSectionTitle =
  'font-head text-[18px] font-semibold tracking-[-0.025em] text-foreground md:text-[30px] lg:text-h2'

export const typeSectionDesc =
  'text-body-lg font-normal tracking-[0.012em] text-muted-foreground'

export const typeCardTitle =
  'font-head text-h4 font-semibold tracking-[-0.015em] text-foreground'

export const typeCardDesc =
  'text-body font-normal tracking-[0.012em] text-muted-foreground'

/** Editorial news card type — denser, clearer hierarchy than generic cards. */
export const typeNewsTitle =
  'font-head text-h3 font-semibold tracking-[-0.02em] text-font-black'

export const typeNewsDesc =
  'text-body font-normal tracking-[0.01em] text-muted-foreground'

export const typeNewsChip =
  'w-fit rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-app-primary'

export function titleLeading(lang: SupportedLanguage | string) {
  return lang === 'my' ? '!leading-[1.6]' : '!leading-[1.25]'
}

export function bodyLeading(lang: SupportedLanguage | string) {
  return lang === 'my' ? '!leading-[1.75]' : '!leading-[1.6]'
}

export function sectionTitleClass(lang: SupportedLanguage | string, className?: string) {
  return cn(typeSectionTitle, titleLeading(lang), className)
}

export function sectionDescClass(lang: SupportedLanguage | string, className?: string) {
  return cn(typeSectionDesc, bodyLeading(lang), className)
}

export function cardTitleClass(
  lang: SupportedLanguage | string,
  className?: string
) {
  return cn(typeCardTitle, titleLeading(lang), className)
}

export function cardDescClass(
  lang: SupportedLanguage | string,
  className?: string
) {
  return cn(typeCardDesc, bodyLeading(lang), className)
}

export function newsTitleClass(
  lang: SupportedLanguage | string,
  className?: string
) {
  return cn(
    typeNewsTitle,
    lang === 'my' ? '!leading-[1.55]' : '!leading-[1.3]',
    className
  )
}

export function newsDescClass(
  lang: SupportedLanguage | string,
  className?: string
) {
  return cn(
    typeNewsDesc,
    lang === 'my' ? '!leading-[1.7]' : '!leading-[1.55]',
    className
  )
}

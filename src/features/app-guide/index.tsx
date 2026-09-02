import { useTranslation } from 'react-i18next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { usePageTitle } from '@/hooks/usePageTitle'
import { appGuideContent } from '../../lib/content/guide'
import { useHashScroll } from '@/hooks/useHashScroll'

export default function AppGuidePage() {
  const { t } = useTranslation()
  usePageTitle(t('appGuide.pageTitle'))
  useHashScroll()

  return (
    <main>
      <PageHeader title={t('appGuide.title')} subtitle={t('appGuide.subtitle')} />

      <SectionWrapper>
        {/* App download links */}
        <div className="mb-10 flex flex-row flex-nowrap gap-3 justify-start sm:justify-center items-center overflow-x-auto px-4 sm:px-6 py-2 scrollbar-none">
          {appGuideContent.downloadLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="inline-flex items-center gap-2.5 bg-font-black text-font-white px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors shrink-0"
              aria-label={link.ariaLabel}
            >
              <svg
                viewBox={link.viewBox}
                fill="currentColor"
                className="w-6 h-6 shrink-0 text-app-yellow"
                aria-hidden="true"
              >
                <path d={link.iconPath} />
              </svg>
              <div className="text-left">
                <p className="text-[10px] text-font-muted leading-tight">{t(link.subtitleKey)}</p>
                <p className="text-sm font-semibold leading-tight">{t(link.titleKey)}</p>
              </div>
            </a>
          ))}
        </div>

        <>
          {/* Overview cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {appGuideContent.guides.map((guide, index) => {
              const IconComp = guide.icon
              return (
                <AnimatedCard
                  key={guide.id}
                  delay={index * 80}
                  variant="zoom-in"
                  className="rounded-2xl"
                >
                  <div className="h-full group relative overflow-hidden bg-app-card backdrop-blur-sm border border-border/40  rounded-2xl transition-all duration-700 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 cursor-pointer">
                    <div className="p-6 sm:p-8 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-8">
                        <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center transition-all duration-500 group-hover:bg-font-blue group-hover:shadow-lg group-hover:shadow-app-blue/20 group-hover:scale-105">
                          <IconComp
                            className="h-6 w-6 text-primary group-hover:text-font-white transition-colors duration-500"
                            aria-hidden="true"
                          />
                        </div>

                        <span className="text-xs font-bold tracking-widest uppercase text-font-muted group-hover:text-font-blue  transition-colors duration-500 mt-1 leading-[1.7]">
                          {t('appGuide.stepBy')} 0{index + 1}
                        </span>
                      </div>

                      <div className="mt-auto">
                        <h3 className="text-[1.15rem] font-semibold tracking-tight  mb-3 group-hover:text-font-blue  transition-colors duration-500">
                          {t(guide.titleKey)}
                        </h3>

                        <p className="text-sm text-font-muted  leading-[1.8]">
                          {t(guide.descriptionKey)}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              )
            })}
          </div>

          {/* Detailed steps accordion */}
          <h2
            className="text-xl sm:text-2xl font-bold tracking-tight mb-6 scroll-mt-24 leading-[1.7]"
            id="detail-step"
          >
            {t('appGuide.overview')}
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {appGuideContent.guides.map((guide, index) => {
              const stepsList = t(guide.stepsKey, { returnObjects: true }) as string[]
              return (
                <AccordionItem
                  key={guide.id}
                  value={guide.id}
                  className="bg-card border border-border/60 rounded-xl px-5 shadow-sm transition-all duration-300 data-[state=open]:border-font-blue data-[state=open]:shadow-md overflow-hidden relative"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-font-blue data-[state=open]:bg-border-font-blue transition-colors duration-300" />

                  <AccordionTrigger className="text-left hover:no-underline py-4 pl-2">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className="w-8 h-8 bg-font-blue text-font-white  rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      <span className="font-semibold text-sm sm:text-base min-w-0 text-font-black">
                        {t(guide.titleKey)}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pb-5 pt-1 pl-2">
                    <p className="text-sm text-font-muted mb-4 pl-0 sm:pl-11 leading-relaxed leading-[2.0]">
                      {t(guide.descriptionKey)}
                    </p>

                    <ol
                      className="pl-0 sm:pl-11 space-y-2.5 leading-[1.7]"
                      aria-label={`Steps for ${t(guide.titleKey)}`}
                    >
                      {stepsList.map((s, i) => (
                        <li
                          key={i}
                          className="text-sm flex items-start gap-2.5 text-font-black leading-[1.7]"
                        >
                          <span
                            className="text-app-black font-semibold shrink-0 mt-0.5"
                            aria-hidden="true"
                          >
                            {i + 1}.
                          </span>
                          <span className="leading-relaxed">{s}</span>
                        </li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>

          {/* Frequently Asked Questions (FAQ Section) */}
          <div className="mt-16 mb-12" id="faq">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6 ">
              {t('appGuide.faqTitle')}
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {appGuideContent.faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  value={`faq-${faq.id}`}
                  className="bg-card border border-border/60 rounded-xl px-5 shadow-sm transition-all duration-300 data-[state=open]:border-font-blue data-[state=open]:shadow-md overflow-hidden relative"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-font-blue transition-colors duration-300" />

                  <AccordionTrigger className="text-left hover:no-underline py-4 pl-2">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className="w-8 h-8 bg-font-blue text-font-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0 shadow-sm"
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      <span className="font-semibold text-sm sm:text-base min-w-0 leading-[1.8]">
                        {t(faq.questionKey)}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pb-5 pt-1 pl-2">
                    <p className="text-sm text-font-muted  pl-0 sm:pl-11 leading-relaxed leading-[1.8]">
                      {t(faq.answerKey)}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </>
      </SectionWrapper>
    </main>
  )
}

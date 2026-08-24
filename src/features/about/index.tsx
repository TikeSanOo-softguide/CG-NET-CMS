import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { useAboutContent } from '@/hooks/useAbout'
import { usePageTitle } from '@/hooks/usePageTitle'
import { motion } from 'framer-motion'
import { BorderBeam } from '@/components/magicui/border-beam'
import { aboutContent } from '@/lib/content/about'
import { StackedCards } from '@/components/common/StackedCards'

function AboutSkeleton() {
  return (
    <SectionWrapper>
      <div className="space-y-4 max-w-3xl mx-auto">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-5 w-full" />
        ))}
      </div>
    </SectionWrapper>
  )
}
export default function AboutPage() {
  const { t } = useTranslation()

  usePageTitle(t('about.pageTitle'))
  const { data: about, isLoading, isError, refetch } = useAboutContent()

  if (isLoading) return <AboutSkeleton />
  if (isError || !about) return <ErrorMessage onRetry={() => void refetch()} />

  return (
    <main>
      <PageHeader title={t('about.title')} subtitle={t('about.tagline')} />

      {/* Stats */}
      <section
        className="bg-app-bar text-font-white h-[60px] flex items-center"
        aria-label="Company statistics"
      >
        <div className="container">
          <dl className="grid grid-cols-5 gap-1 sm:gap-4 text-center items-center">
            {aboutContent.stats.map((stat, i) => (
              <div key={i} className="min-w-0 px-1">
                <dt className="text-[6px] xs:text-xs sm:text-xs text-font-white leading-tight truncate">
                  {t(stat.labelKey)}
                </dt>
                <dd className="text-[9px] xs:text-x sm:text-base font-bold leading-tight">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Our Story */}
      <SectionWrapper className="relative overflow-hidden !py-2 sm:!py-4 my-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-font  bg-clip-text text-transparent leading-normal pt-3 pb-3">
                {t('about.ourStory')}
              </h2>
              <div className="h-1.5 w-28 bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-full"></div>
            </div>

            <p className="text-font-muted text-base md:text-lg leading-relaxed">
              {t('about.storyText1')}
            </p>

            <p className="text-font-muted text-base md:text-lg leading-relaxed">
              {t('about.storyText2')}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative w-full h-[300px] sm:h-[540px] mx-auto  my-6"
          >
            {aboutContent.stats.map((stat, i) => {
              const IconComponent = stat.icon
              const angles = [0, 72, 144, 216, 288]
              const angle = angles[i]

              return (
                <div
                  key={i}
                  style={{
                    transform: `translate(-60%, -50%) rotate(${angle}deg) var(--orbit-translate) rotate(-${angle}deg)`,
                  }}
                  className={`absolute left-1/2 top-1/2  [--orbit-translate:translate(110px)] sm:[--orbit-translate:translate(170px)] w-24 h-24 sm:w-36 sm:h-36 bg-card border-2 border-border hover:border-app-primary rounded-full flex flex-col items-center justify-center text-center p-3 shadow-2xl transition-all duration-300 hover:scale-110 hover:z-20 cursor-pointer group`}
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-2xl ${stat.iconBg} ${stat.hoverBg} flex items-center justify-center ${stat.color} ${stat.hoverColor} mb-0.5 sm:mb-1 transition-all duration-300`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <p
                    className={`text-sm sm:text-base font-black tracking-tight text-foreground ${stat.color} leading-none`}
                  >
                    {stat.value}
                  </p>

                  <p className="text-[10px] sm:text-[10px] font-medium text-font-muted mt-0.5 sm:mt-1 px-1 text-center leading-tight">
                    {t(stat.labelKey)}
                  </p>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </SectionWrapper>

      <Separator />

      {/* Mission & Vision */}
      <SectionWrapper className="bg-muted/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedCard variant="fade-right" delay={0} className="rounded-lg">
            <Card className="h-full card-shine card-glow border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 via-blue-500/20 to-purple-500/20 border border-primary/30 flex items-center justify-center shadow-lg shadow-primary/10 transition-transform duration-300 group-hover:scale-105">
                    <span className="text-xl" aria-hidden="true">
                      🎯
                    </span>
                  </div>
                  <span className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-font text-font-muted  bg-clip-text text-transparent pt-3">
                    {t('about.ourMission')}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-font-muted leading-relaxed">{t('about.mission')}</p>
              </CardContent>
              <BorderBeam
                size={80}
                duration={6}
                delay={0}
                borderWidth={2}
                colorFrom="#004AC6"
                colorTo="#004AC6"
              />
              <BorderBeam
                size={80}
                duration={6}
                delay={4}
                reverse
                borderWidth={2}
                colorFrom="#004AC6"
                colorTo="#004AC6"
              />
            </Card>
          </AnimatedCard>
          <AnimatedCard variant="fade-left" delay={100} className="rounded-lg">
            <Card className="h-full card-shine card-glow border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 via-purple-500/25 to-pink-500/20 border border-blue-500/30 flex items-center justify-center shadow-lg shadow-blue-500/10 transition-transform duration-300 group-hover:scale-105">
                    <span className="text-xl" aria-hidden="true">
                      🔭
                    </span>
                  </div>
                  <span className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-font bg-clip-text text-transparent pt-3">
                    {t('about.ourVision')}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-font-muted leading-relaxed">{t('about.vision')}</p>
              </CardContent>
              <BorderBeam
                size={80}
                duration={6}
                delay={0}
                borderWidth={2}
                colorFrom="#004AC6"
                colorTo="#004AC6"
              />
              <BorderBeam
                size={80}
                duration={6}
                delay={4}
                reverse
                borderWidth={2}
                colorFrom="#004AC6"
                colorTo="#004AC6"
              />
            </Card>
          </AnimatedCard>
        </div>
      </SectionWrapper>

      {/* Team */}
      <SectionWrapper>
        <div className="text-center max-w-2xl mx-auto mb-5 space-y-3">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight bg-gradient-font bg-clip-text text-transparent pb-3 pt-3 ">
            {t('about.ourTeam')}
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-full mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {aboutContent.team.map((member, i) => {
            const IconComponent = member.icon

            return (
              <AnimatedCard
                key={member.id}
                delay={i * 100}
                variant="zoom-in"
                className="rounded-xl group"
              >
                <Card className="text-center h-full  border border-border/60 bg-gradient-to-b from-card via-card/50 to-muted/20 p-4 transition-all duration-300 hover:translate-y-0 hover:border-primary/50 hover:shadow-none">
                  <CardHeader className="space-y-4 pt-6 flex flex-col items-center">
                    <div className="relative flex items-center justify-center">
                      <div
                        className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${member.bg} ${member.hoverBg} ${member.color} ${member.hoverColor} group-hover:scale-110 group-hover:shadow-[0_0_20px_currentColor]`}
                        aria-hidden="true"
                      >
                        <IconComponent className="w-6 h-6 transition-colors duration-300" />
                      </div>
                    </div>

                    <CardTitle className="text-lg font-bold tracking-tight text-font-secondary group-hover:text-font-blue transition-colors duration-300">
                      {t(member.nameKey)}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </AnimatedCard>
            )
          })}
        </div>
      </SectionWrapper>

      {/* Activities Gallery*/}
      <SectionWrapper id="gallery">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto ">
          <div className="space-y-6 text-left relative">
            <div className="absolute -left-4 -top-4 w-32 h-32 bg-app-primary/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-app-primary/10 border border-app-primary/20 text-app-primary text-xs font-bold tracking-wider uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-app-primary animate-ping"></span>
              {t(aboutContent.culture.badgeKey)}
            </div>

            <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              <span className="bg-gradient-font bg-clip-text text-transparent">
                {t(aboutContent.culture.titleKey1)}
              </span>
              <br />
              <span className="text-font-black">{t(aboutContent.culture.titleKey2)}</span>
            </h3>
            <div className="border-l-4 border-primary/50 pl-4 py-1">
              <p className="text-font-muted leading-relaxed text-sm md:text-base font-medium">
                {t(aboutContent.culture.descriptionKey)}
              </p>
            </div>
          </div>

          <StackedCards items={aboutContent.galleryItems as any} />
        </div>
      </SectionWrapper>
    </main>
  )
}

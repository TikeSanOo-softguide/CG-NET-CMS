import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper, SectionHeading } from '@/components/common/SectionWrapper'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { useAboutContent } from '@/hooks/useAbout'
import { usePageTitle } from '@/hooks/usePageTitle'
import { getLocalized } from '@/lib/utils'
import { normalizeLanguage } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { Users, MapPin, Activity, Award, Calendar, Network, Wrench, Settings } from 'lucide-react'
import { BorderBeam } from '@/components/magicui/border-beam'

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
  const { t, i18n } = useTranslation()
  const lang = normalizeLanguage(i18n.language)

  usePageTitle(t('about.pageTitle'))

  const { data: about, isLoading, isError, refetch } = useAboutContent()

  if (isLoading) return <AboutSkeleton />
  if (isError || !about) return <ErrorMessage onRetry={() => void refetch()} />

  const STATS_CONFIG = [
    {
      value: '200,000+',
      labelKey: 'home.stat1Label',
      icon: Users,
      color: 'text-primary',
      hoverColor: 'group-hover:text-primary-foreground',
      iconBg: 'bg-primary/15',
      hoverBg: 'group-hover:bg-primary',
    },
    {
      value: '50+',
      labelKey: 'home.stat2Label',
      icon: MapPin,
      color: 'text-blue-500',
      hoverColor: 'group-hover:text-blue-300',
      iconBg: 'bg-blue-500/15',
      hoverBg: 'group-hover:bg-blue-600',
    },
    {
      value: '99.9%',
      labelKey: 'home.stat3Label',
      icon: Activity,
      color: 'text-green-500',
      hoverColor: 'group-hover:text-green-300',
      iconBg: 'bg-green-500/15',
      hoverBg: 'group-hover:bg-green-600',
    },
    {
      value: '10+',
      labelKey: 'home.stat4Label',
      icon: Award,
      color: 'text-purple-500',
      hoverColor: 'group-hover:text-purple-300',
      iconBg: 'bg-purple-500/15',
      hoverBg: 'group-hover:bg-purple-600',
    },
    {
      value: about.foundedYear,
      labelKey: 'home.stat5Label',
      icon: Calendar,
      color: 'text-orange-500',
      hoverColor: 'group-hover:text-orange-300',
      iconBg: 'bg-orange-500/15',
      hoverBg: 'group-hover:bg-orange-600',
    },
  ]

  return (
    <main>
      <PageHeader title={t('about.title')} subtitle={getLocalized(about.tagline, lang)} />

      {/* Stats */}
      <section
        className="bg-brand-800 text-white h-[60px] flex items-center"
        aria-label="Company statistics"
      >
        <div className="container">
          <dl className="grid grid-cols-5 gap-1 sm:gap-4 text-center items-center">
            {about.stats.map((stat, i) => (
              <div key={i} className="min-w-0 px-1">
                <dt className="text-[6px] xs:text-xs sm:text-xs text-blue-200 leading-tight truncate">
                  {getLocalized(stat.label, lang)}
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
      {/* <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent pb-1">
                {t('about.ourStory')}
              </h2>
              <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-blue-500 rounded-full mt-2"></div>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">{t('about.storyText1')}</p>
            <p className="text-muted-foreground leading-relaxed">{t('about.storyText2')}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/10 rounded-2xl p-4 sm:p-6 text-center">
              <p className="text-2xl sm:text-4xl font-bold text-primary">{about.foundedYear}</p>
              <p className="text-sm text-muted-foreground mt-1">Founded</p>
            </div>
            <div className="bg-primary/10 rounded-2xl p-4 sm:p-6 text-center">
              <p className="text-2xl sm:text-4xl font-bold text-primary">{about.employees}</p>
              <p className="text-sm text-muted-foreground mt-1">Employees</p>
            </div>
            <div className="bg-primary/10 rounded-2xl p-4 sm:p-6 text-center">
              <p className="text-2xl sm:text-4xl font-bold text-primary">{about.coverageAreas}+</p>
              <p className="text-sm text-muted-foreground mt-1">Cities</p>
            </div>
            <div className="bg-primary/10 rounded-2xl p-4 sm:p-6 text-center">
              <p className="text-2xl sm:text-4xl font-bold text-primary">99.9%</p>
              <p className="text-sm text-muted-foreground mt-1">Uptime</p>
            </div>
          </div>
        </div>
      </SectionWrapper> */}
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
              <h2 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent leading-normal pt-3 pb-3">
                {t('about.ourStory')}
              </h2>
              <div className="h-1.5 w-28 bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-full"></div>
            </div>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {t('about.storyText1')}
            </p>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
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
            {STATS_CONFIG.map((stat, i) => {
              const IconComponent = stat.icon
              const angles = [0, 72, 144, 216, 288]
              const angle = angles[i]

              return (
                <div
                  key={i}
                  style={{
                    transform: `translate(-60%, -50%) rotate(${angle}deg) var(--orbit-translate) rotate(-${angle}deg)`,
                  }}
                  className={`absolute left-1/2 top-1/2  [--orbit-translate:translate(110px)] sm:[--orbit-translate:translate(170px)] w-24 h-24 sm:w-36 sm:h-36 bg-card border-2 border-border hover:border-primary rounded-full flex flex-col items-center justify-center text-center p-3 shadow-2xl transition-all duration-300 hover:scale-110 hover:z-20 cursor-pointer group`}
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

                  <p className="text-[10px] sm:text-[10px] font-medium text-muted-foreground mt-0.5 sm:mt-1 px-1 text-center leading-tight">
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
                  <span className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent pt-3">
                    {t('about.ourMission')}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {getLocalized(about.mission, lang)}
                </p>
              </CardContent>
              <BorderBeam
                size={100}
                duration={4}
                delay={0}
                borderWidth={3}
                colorFrom="#004AC6"
                colorTo="#004AC6"
              />
              <BorderBeam
                size={100}
                duration={4}
                delay={4}
                reverse
                borderWidth={3}
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
                  <span className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-blue-600 to-purple-600 bg-clip-text text-transparent pt-3">
                    {t('about.ourVision')}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {getLocalized(about.vision, lang)}
                </p>
              </CardContent>
              <BorderBeam
                size={100}
                duration={4}
                delay={0}
                borderWidth={3}
                colorFrom="#004AC6"
                colorTo="#004AC6"
              />
              <BorderBeam
                size={100}
                duration={4}
                delay={4}
                reverse
                borderWidth={3}
                colorFrom="#004AC6"
                colorTo="#004AC6"
              />
            </Card>
          </AnimatedCard>
        </div>
      </SectionWrapper>

      {/* Team */}
      <SectionWrapper>
        {/* <SectionHeading title={t('about.ourTeam')} /> */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent pb-3 pt-3 ">
            {t('about.ourTeam')}
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-full mx-auto"></div>
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {about.team.map((member, i) => {
            const teamIcons = [Network, Wrench, Settings]
            const IconComponent = teamIcons[i % teamIcons.length]

            return (
              <AnimatedCard
                key={member.id}
                delay={i * 100}
                variant="zoom-in"
                className="rounded-lg"
              >
                <Card className="text-center h-full card-shine card-glow border">
                  <CardHeader>
                    <div
                      className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 text-primary transition-transform duration-300 hover:scale-110"
                      aria-hidden="true"
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-base">{getLocalized(member.name, lang)}</CardTitle>
                  </CardHeader>
                </Card>
              </AnimatedCard>
            )
          })}
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {about.team.map((member, i) => {
            const teamIcons = [Network, Wrench, Settings]
            const IconComponent = teamIcons[i % teamIcons.length]

            return (
              <AnimatedCard
                key={member.id}
                delay={i * 100}
                variant="zoom-in"
                className="rounded-xl group"
              >
                <Card className="text-center h-full card-shine card-glow border border-border/60 bg-gradient-to-b from-card via-card/50 to-muted/20 p-2 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl">
                  <CardHeader className="space-y-4 pt-6">
                    <div className="relative mx-auto">
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-blue-600 to-purple-600 opacity-30 blur-sm group-hover:opacity-75 transition duration-300"></div>
                      <div
                        className="relative w-16 h-16 bg-card rounded-2xl border border-border/80 flex items-center justify-center text-primary shadow-md transition-transform duration-300 group-hover:scale-110"
                        aria-hidden="true"
                      >
                        <IconComponent className="w-7 h-7" />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                      {getLocalized(member.name, lang)}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </AnimatedCard>
            )
          })}
        </div>
      </SectionWrapper>

      {/* Activities Gallery*/}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto my-12">
          <div className="space-y-6 text-left relative">
            <div className="absolute -left-4 -top-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              Team Culture & Events
            </div>

            <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Fostering Collaboration, Growth,
              </span>
              <br />
              <span className="text-foreground">and Team Member Activities</span>
            </h3>
            <div className="border-l-4 border-primary/50 pl-4 py-1">
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base font-medium">
                Beyond our technical duties, our team thrives on regular collaborative workshops,
                skill-sharing sessions, and engaging company events that build strong bonds and
                drive collective success.
              </p>
            </div>
          </div>

          <AnimatedCard variant="zoom-in" className="rounded-2xl">
            <Card className="relative overflow-hidden h-full card-shine card-glow border border-border/60 bg-card p-6 shadow-xl flex flex-col justify-center items-center">
              <div className="relative w-full h-[280px] sm:h-[340px] flex items-center justify-center my-2">
                <div className="absolute w-[75%] h-[80%] rounded-2xl overflow-hidden border-2 border-border/40 shadow-lg transform translate-x-8 translate-y-4 rotate-6 opacity-70 transition-transform duration-500 hover:rotate-3 hover:translate-x-6">
                  <img
                    src="/images/slide3.jpg"
                    alt="Team Activity 3"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
                <div className="absolute w-[80%] h-[85%] rounded-2xl overflow-hidden border-2 border-border/40 shadow-lg transform -translate-x-8 -translate-y-3 -rotate-6 opacity-85 transition-transform duration-500 hover:-rotate-3 hover:-translate-x-6">
                  <img
                    src="/images/slide2.jpg"
                    alt="Team Activity 2"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="relative w-[88%] h-[92%] rounded-2xl overflow-hidden border-4 border-card shadow-2xl z-10 group transition-transform duration-500 hover:scale-[1.02]">
                  <img
                    src="/images/slide1.jpg"
                    alt="Team Activity Main"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/80 text-[10px] font-bold uppercase tracking-wider text-white">
                      Team Culture
                    </span>
                    <h4 className="text-base sm:text-lg font-extrabold tracking-tight">
                      Collaborative Workshops & Events
                    </h4>
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedCard>
        </div>
      </SectionWrapper>
    </main>
  )
}

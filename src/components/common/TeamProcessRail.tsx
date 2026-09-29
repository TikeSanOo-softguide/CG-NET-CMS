'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TeamMember {
    id: string | number
    icon: React.ComponentType<{ className?: string }>
    nameKey: string
    bg: string
    hoverBg: string
    color: string
    hoverColor: string
}

interface AboutContent {
    team: readonly TeamMember[]
}

interface TeamProcessRailProps {
    aboutContent: AboutContent
    t: (key: string) => string
    SectionWrapper: React.ComponentType<{
        children: React.ReactNode
        className?: string
    }>
    Card: React.ComponentType<{
        children: React.ReactNode
        className?: string
    }>
    CardHeader: React.ComponentType<{
        children: React.ReactNode
        className?: string
    }>
    CardTitle: React.ComponentType<{
        children: React.ReactNode
        className?: string
    }>
}

export default function TeamProcessRail({
    aboutContent,
    t,
    SectionWrapper,
    Card,
    CardHeader,
    CardTitle,
    }: TeamProcessRailProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const beadRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (
        !containerRef.current ||
        !lineRef.current ||
        !beadRef.current
        ) {
        return
        }

        const ctx = gsap.context(() => {
        const container = containerRef.current
        const line = lineRef.current
        const bead = beadRef.current

        if (!container || !line || !bead) return

        // Animate progress rail
        gsap.to(line, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
            trigger: container,
            start: 'top center',
            end: 'bottom center',
            scrub: 0.6,
            },
        })

        // Move bead along the rail
        gsap.to(bead, {
            top: '100%',
            ease: 'none',
            scrollTrigger: {
            trigger: container,
            start: 'top center',
            end: 'bottom center',
            scrub: 0.6,
            },
        })

        // Animate each team node
        const steps = gsap.utils.toArray<HTMLElement>('.process-step')

        steps.forEach((step) => {
            gsap.fromTo(
            step,
            {
                opacity: 0.3,
                y: 30,
                scale: 0.95,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out',
                scrollTrigger: {
                trigger: step,
                start: 'top 65%',
                toggleActions: 'play none none reverse',
                },
            }
            )
        })
        }, containerRef)

        return () => {
        ctx.revert()
        }
    }, [])

    return (
        <SectionWrapper className="bg-muted/40 py-16">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
            <h2 className="bg-gradient-font bg-clip-text pb-3 pt-3 text-xl font-black leading-relaxed tracking-tight text-transparent sm:text-3xl md:text-4xl">
            {t('about.ourTeam')}
            </h2>

            <div className="mx-auto h-1.5 w-24 rounded-full bg-gradient-to-r from-primary via-blue-500 to-purple-500" />
        </div>

        {/* Process Rail */}
        <div
            ref={containerRef}
            className="relative mx-auto max-w-3xl px-4"
        >
            {/* Background Track */}
            <div className="absolute bottom-0 left-6 top-0 w-0.5 -translate-x-1/2 bg-border/40 md:left-1/2" />

            {/* Animated Progress Line */}
            <div
            ref={lineRef}
            className="absolute left-6 top-0 h-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-blue-500 to-purple-500 md:left-1/2"
            />

            {/* Rolling Bead */}
            <div
            ref={beadRef}
            className="absolute left-6 top-0 z-20 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-app-primary shadow-[0_0_12px_currentColor] md:left-1/2"
            />

            {/* Team Nodes */}
            <div className="relative z-10 space-y-12">
            {aboutContent.team.map((member, index) => {
                const IconComponent = member.icon
                const isEven = index % 2 === 0

                return (
                <div
                    key={member.id}
                    className={`process-step flex items-center gap-6 md:gap-0 ${
                    isEven
                        ? 'md:flex-row'
                        : 'md:flex-row-reverse'
                    }`}
                >
                    {/* Content */}
                    <div className={`w-full pl-12 md:w-1/2 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                        <Card className="bg-gradient-to-b from-card via-card/50 to-muted/20 p-6 text-center transition-all duration-300 hover:border-primary/50">
                            <CardHeader className="flex flex-col items-center space-y-4 p-0">
                                <div className="relative flex items-center justify-center">
                                    <div
                                        className={`flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 ${member.bg} ${member.hoverBg} ${member.color} ${member.hoverColor}`}
                                    >
                                    <IconComponent className="h-6 w-6" />
                                    </div>
                                </div>

                                <CardTitle className="text-base font-bold tracking-tight text-font-secondary">
                                    {t(member.nameKey)}
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                    {/* Rail Node */}
                    <div className="absolute left-6 flex -translate-x-1/2 items-center justify-center md:left-1/2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background text-[10px] font-bold text-primary">
                            {index + 1}
                        </div>
                    </div>

                    {/* Desktop Empty Half */}
                    <div className="hidden w-1/2 md:block" />
                </div>
                )
            })}
            </div>
        </div>
        </SectionWrapper>
    )
}
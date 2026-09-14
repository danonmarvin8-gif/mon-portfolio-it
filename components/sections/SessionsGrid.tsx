'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ProjectCard } from './SessionCard'
import { schoolProjects, personalProjects } from '@/lib/sessions'
import { useAccessibility } from '@/components/core/AccessibilityProvider'

// ─── Section Header ──────────────────────────────────────────────────────────
function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  reducedMotion,
}: {
  eyebrow: string
  title: string
  highlight: string
  description: string
  reducedMotion: boolean
}) {
  return (
    <motion.div
      className="text-center mb-12 max-w-2xl mx-auto"
      initial={reducedMotion ? {} : { opacity: 0, y: 40 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-4 font-semibold">
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold gradient-text-hero mb-4">
        {title}{' '}
        <span className="gradient-text-violet">{highlight}</span>
      </h2>
      <p className="text-base text-white/50 font-light leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function SessionsGrid() {
  const { reducedMotion } = useAccessibility()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const translateZ = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reducedMotion ? [0, 0, 0] : [60, 0, -30]
  )

  return (
    <section
      ref={sectionRef}
      id="projets"
      aria-label="Mes projets"
      className="relative z-10 flex flex-col items-center py-24 px-6"
    >
      {/* ── Projets Scolaires ── */}
      <div className="w-full max-w-7xl mx-auto mb-24">
        <SectionHeader
          eyebrow="BTS SIO — Évolution"
          title="Projets"
          highlight="Scolaires."
          description="De la première balise HTML aux scripts PowerShell en production. Une progression honnête, du plus simple au plus structuré."
          reducedMotion={reducedMotion}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          style={{ translateZ }}
        >
          {schoolProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>

      {/* Separator */}
      <motion.div
        className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-24"
        initial={reducedMotion ? {} : { scaleX: 0 }}
        whileInView={reducedMotion ? {} : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        aria-hidden="true"
      />

      {/* ── Projets Personnels ── */}
      <div className="w-full max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Hors cursus"
          title="Projets"
          highlight="Personnels."
          description="Des expériences menées en dehors du BTS — chacune avec un concept visuel fort et une tech qui me tenait à cœur."
          reducedMotion={reducedMotion}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {personalProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <motion.div
        className="mt-20 w-px h-20 bg-gradient-to-b from-white/20 to-transparent mx-auto"
        initial={reducedMotion ? {} : { scaleY: 0 }}
        whileInView={reducedMotion ? {} : { scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        aria-hidden="true"
      />
    </section>
  )
}


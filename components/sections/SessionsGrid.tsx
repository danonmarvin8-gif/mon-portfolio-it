'use client'

import { motion } from 'framer-motion'
import { ProjectCard } from './SessionCard'
import { schoolProjects, personalProjects } from '@/lib/sessions'
import { useAccessibility } from '@/components/core/AccessibilityProvider'

function SectionTitle({
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
      className="text-center mb-10"
      initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-3 font-semibold">{eyebrow}</p>
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        {title} <span className="gradient-text-violet">{highlight}</span>
      </h2>
      <p className="text-sm text-white/45 max-w-xl mx-auto leading-relaxed">{description}</p>
    </motion.div>
  )
}

export function SessionsGrid() {
  const { reducedMotion } = useAccessibility()

  return (
    <section
      id="projets"
      aria-label="Mes projets"
      className="relative z-10 py-24 px-4 sm:px-8"
    >
      {/* ── Projets Scolaires ── */}
      <div className="max-w-screen-2xl mx-auto mb-28">
        <SectionTitle
          eyebrow="BTS SIO — Progression"
          title="Projets"
          highlight="Scolaires."
          description="Du premier &lt;div&gt; aux scripts PowerShell en production. Cliquez sur une carte pour voir le projet en direct."
          reducedMotion={reducedMotion}
        />

        {/* Responsive masonry-style grid — 2 cols mobile, 3 tablet, 4 desktop, 5 xl */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {schoolProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <motion.div
        className="max-w-2xl mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-28"
        initial={reducedMotion ? {} : { scaleX: 0 }}
        whileInView={reducedMotion ? {} : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        aria-hidden="true"
      />

      {/* ── Projets Personnels ── */}
      <div className="max-w-screen-2xl mx-auto">
        <SectionTitle
          eyebrow="Hors cursus"
          title="Projets"
          highlight="Personnels."
          description="Des projets menés en dehors du BTS — chacun avec un concept visuel fort. Cliquez pour les explorer."
          reducedMotion={reducedMotion}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {personalProjects.map((project) => (
            <ProjectCard key={project.id} project={project} priority />
          ))}
        </div>
      </div>
    </section>
  )
}

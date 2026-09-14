'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useAccessibility } from '@/components/core/AccessibilityProvider'
import type { ProjectData } from '@/lib/sessions'

interface ProjectCardProps {
  project: ProjectData
}

function TechTag({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-pill"
      style={{
        background: `${color}18`,
        color: color,
        border: `1px solid ${color}33`,
      }}
    >
      {label}
    </span>
  )
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { reducedMotion } = useAccessibility()
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 200, damping: 26 })
  const springY = useSpring(rotateY, { stiffness: 200, damping: 26 })

  useEffect(() => {
    if (reducedMotion) return
    const card = cardRef.current
    if (!card) return

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      rotateX.set(((e.clientY - cy) / rect.height) * -10)
      rotateY.set(((e.clientX - cx) / rect.width) * 10)
    }
    const onLeave = () => { rotateX.set(0); rotateY.set(0) }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [reducedMotion, rotateX, rotateY])

  return (
    <motion.article
      ref={cardRef}
      aria-labelledby={`project-title-${project.id}`}
      initial={reducedMotion ? {} : { opacity: 0, y: 50 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        delay: project.index * 0.1,
        type: 'spring',
        stiffness: 140,
        damping: 20,
      }}
      whileHover={reducedMotion ? {} : { y: -10, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
      style={{
        rotateX: reducedMotion ? 0 : springX,
        rotateY: reducedMotion ? 0 : springY,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
      className={`glass ${project.glowClass} rounded-card p-6 sm:p-8 relative overflow-hidden group cursor-default h-full flex flex-col`}
    >
      {/* Bottom glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/3 rounded-full opacity-25 blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-45"
        style={{ background: project.accent }}
      />

      {/* Shimmer on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-card opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${project.accent}15 0%, transparent 60%)` }}
      />

      {/* Year badge */}
      <div
        aria-hidden="true"
        className="absolute top-5 right-5 text-xs font-bold tracking-widest"
        style={{ color: `${project.accent}70` }}
      >
        {project.year}
      </div>

      {/* Icon */}
      <motion.div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 text-xl flex-shrink-0"
        style={{ background: `${project.accent}20`, border: `1px solid ${project.accent}40` }}
        whileHover={reducedMotion ? {} : { rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
        aria-hidden="true"
      >
        {project.icon}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1">
        <h3
          id={`project-title-${project.id}`}
          className="text-lg sm:text-xl font-bold text-white leading-tight mb-1"
        >
          {project.title}
        </h3>

        <p className="text-xs font-semibold mb-4 uppercase tracking-wide" style={{ color: project.accent }}>
          {project.subtitle}
        </p>

        <p className="text-sm text-white/55 leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-auto" role="list" aria-label="Technologies utilisées">
          {project.tech.map(t => (
            <div role="listitem" key={t}>
              <TechTag label={t} color={project.accent} />
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  )
}


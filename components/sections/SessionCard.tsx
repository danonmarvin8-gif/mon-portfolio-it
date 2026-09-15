'use client'

import { motion } from 'framer-motion'
import { useAccessibility } from '@/components/core/AccessibilityProvider'
import { resolveProjectUrl, type ProjectData } from '@/lib/sessions'

interface ProjectCardProps {
  project: ProjectData
  priority?: boolean
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const { reducedMotion } = useAccessibility()
  const liveUrl = resolveProjectUrl(project.liveUrl)
  const codeUrl = resolveProjectUrl(project.codeUrl)

  const handleCardClick = (e: React.MouseEvent) => {
    // Si l'utilisateur clique directement sur un lien spécifique, ne pas intercepter
    const target = e.target as HTMLElement
    if (target.closest('a') || target.closest('button')) return

    if (liveUrl) {
      window.open(liveUrl, '_blank', 'noopener,noreferrer')
    } else if (codeUrl) {
      window.open(codeUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.article
      aria-labelledby={`project-title-${project.id}`}
      onClick={handleCardClick}
      role={liveUrl || codeUrl ? 'link' : undefined}
      tabIndex={liveUrl || codeUrl ? 0 : undefined}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          if (liveUrl) window.open(liveUrl, '_blank', 'noopener,noreferrer')
          else if (codeUrl) window.open(codeUrl, '_blank', 'noopener,noreferrer')
        }
      }}
      initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        delay: priority ? 0 : project.index * 0.05,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={reducedMotion ? {} : { y: -6, transition: { duration: 0.2 } }}
      className={`
        glass ${project.glowClass} rounded-2xl p-6 relative overflow-hidden
        flex flex-col gap-4 h-full select-none
        ${liveUrl || codeUrl ? 'cursor-pointer group' : 'cursor-default'}
      `}
    >
      {/* Hover shimmer */}
      {(liveUrl || codeUrl) && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${project.accent}18 0%, transparent 70%)` }}
        />
      )}

      {/* Bottom glow */}
      <div
        aria-hidden="true"
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-16 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"
        style={{ background: project.accent }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-2 relative z-10">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: `${project.accent}22`, border: `1px solid ${project.accent}44` }}
          aria-hidden="true"
        >
          {project.icon}
        </div>
        <span
          className="text-xs font-bold tracking-widest mt-1 flex-shrink-0"
          style={{ color: `${project.accent}80` }}
        >
          {project.year}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 gap-3">
        <div>
          <h3
            id={`project-title-${project.id}`}
            className="text-base font-bold text-white leading-snug group-hover:text-white transition-colors"
          >
            {project.title}
          </h3>
          <p className="text-xs font-semibold mt-0.5 uppercase tracking-wide" style={{ color: project.accent }}>
            {project.subtitle}
          </p>
        </div>

        <p className="text-sm text-white/50 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto" role="list" aria-label="Technologies">
          {project.tech.slice(0, 4).map(t => (
            <span
              key={t}
              role="listitem"
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: `${project.accent}18`, color: project.accent, border: `1px solid ${project.accent}33` }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-xs px-2 py-0.5 rounded-full text-white/30" style={{ background: 'rgba(255,255,255,0.05)' }}>
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Action buttons (Pas de liens imbriqués dans d'autres liens) */}
        {(liveUrl || codeUrl) && (
          <div className="flex items-center gap-3 mt-2 pt-2 border-t border-white/5">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold py-1 px-2.5 rounded-lg transition-all hover:brightness-125"
                style={{ background: `${project.accent}22`, color: project.accent, border: `1px solid ${project.accent}44` }}
                onClick={(e) => e.stopPropagation()}
                aria-label={`Voir la démo de ${project.title}`}
              >
                <span aria-hidden="true">↗</span> Démo
              </a>
            )}
            {codeUrl && (
              <a
                href={codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold py-1 px-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all border border-white/10"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Voir le code de ${project.title}`}
              >
                <span aria-hidden="true">⌥</span> Code
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
}

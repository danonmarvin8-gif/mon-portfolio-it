'use client'

import { motion } from 'framer-motion'
import { useAccessibility } from '@/components/core/AccessibilityProvider'

export function ContactFooter() {
  const { reducedMotion } = useAccessibility()

  return (
    <footer
      className="relative z-10 py-24 px-6 flex flex-col items-center text-center"
      role="contentinfo"
      aria-label="Contact et liens"
    >
      {/* Divider */}
      <div
        aria-hidden="true"
        className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-20"
      />

      <motion.div
        initial={reducedMotion ? {} : { opacity: 0, y: 40 }}
        whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-5">Restons en contact</p>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
          Un projet, une idée,
          <br />
          <span className="gradient-text-violet">une opportunité.</span>
        </h2>

        <p className="text-base text-white/50 mb-10 leading-relaxed">
          Disponible pour des stages, alternances et projets collaboratifs.
          N&apos;hésitez pas à me contacter.
        </p>

        {/* CTA primary */}
        <motion.a
          href="mailto:marvin.botti.danon@gmail.com"
          className="inline-flex items-center gap-3 glass rounded-pill px-8 py-4 text-base font-semibold text-white glow-violet hover:bg-white/10 transition-all mb-8"
          whileHover={reducedMotion ? {} : { scale: 1.04, y: -2 }}
          whileTap={reducedMotion ? {} : { scale: 0.97 }}
          aria-label="Envoyer un email à Marvin"
        >
          <span aria-hidden="true">✉</span>
          Me contacter
        </motion.a>

        {/* Secondary links */}
        <div
          className="flex items-center justify-center gap-6 mt-4"
          role="navigation"
          aria-label="Liens externes"
        >
          {[
            { href: 'https://www.linkedin.com/in/marvin-botti-danon-663324317/', label: 'LinkedIn', icon: 'in' },
            { href: 'https://github.com/bottimarvin-a11y', label: 'GitHub', icon: '⌥' },
            { href: '/CV_Marvin.pdf', label: 'CV PDF', icon: '↓' },
          ].map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/80 transition-colors"
              whileHover={reducedMotion ? {} : { y: -2 }}
              aria-label={link.label}
            >
              <span aria-hidden="true" className="text-accent-violet font-bold">{link.icon}</span>
              {link.label}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Footer meta */}
      <motion.div
        className="mt-20 text-xs text-white/20 space-y-1"
        initial={reducedMotion ? {} : { opacity: 0 }}
        whileInView={reducedMotion ? {} : { opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p>Conçu avec ❤ par Danon Marvin · BTS SIO 2025–2026</p>
        <p className="text-white/10">
          Construit avec Next.js · Framer Motion · Tailwind CSS
        </p>
      </motion.div>
    </footer>
  )
}


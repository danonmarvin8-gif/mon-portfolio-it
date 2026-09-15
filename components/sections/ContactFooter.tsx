'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/components/core/AccessibilityProvider'
import { resolveProjectUrl } from '@/lib/sessions'

export function ContactFooter() {
  const { reducedMotion } = useAccessibility()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setFeedbackMessage('')

    try {
      const response = await fetch('https://formsubmit.co/ajax/danonmarvin8@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio IT] Nouveau message de ${formData.name} : ${formData.subject}`,
          message: formData.message,
          _template: 'table',
          _captcha: 'false',
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFeedbackMessage('✓ Merci pour votre message ! Il a été transmis directement à Marvin (danonmarvin8@gmail.com).')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Erreur lors de l\'envoi')
      }
    } catch {
      setStatus('error')
      setFeedbackMessage('Une erreur est survenue lors de l\'envoi. Vous pouvez m\'écrire directement à danonmarvin8@gmail.com')
    }
  }

  const cvUrl = resolveProjectUrl('/CV_Marvin.pdf')

  return (
    <footer
      id="contact"
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
        className="max-w-2xl w-full"
      >
        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-5">Restons en contact</p>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
          Un projet, une idée,
          <br />
          <span className="gradient-text-violet">une opportunité.</span>
        </h2>

        <p className="text-base text-white/50 mb-10 leading-relaxed max-w-lg mx-auto">
          Disponible pour des alternances et opportunités professionnelles en systèmes, réseaux et support IT.
          Envoyez-moi un message direct ci-dessous.
        </p>

        {/* ── Formulaire de Contact Interactif ── */}
        <div className="glass rounded-2xl p-6 sm:p-8 text-left glow-violet mb-10 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                  Nom ou Entreprise *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="ex: Jean Dupont / Tech Corp"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-accent-violet focus:ring-1 focus:ring-accent-violet transition-all"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                  Votre Adresse Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="votre.email@domaine.com"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-accent-violet focus:ring-1 focus:ring-accent-violet transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                Objet / Sujet *
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="ex: Proposition d'alternance Technicien Support / Systèmes"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-accent-violet focus:ring-1 focus:ring-accent-violet transition-all"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                Votre Message *
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Décrivez votre besoin, votre projet ou votre opportunité..."
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-accent-violet focus:ring-1 focus:ring-accent-violet transition-all resize-y"
              />
            </div>

            {feedbackMessage && (
              <div
                className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  status === 'success'
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                }`}
                role="status"
              >
                {feedbackMessage}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-pill px-8 py-3.5 text-sm font-semibold text-white bg-accent-violet hover:bg-accent-violet/90 disabled:opacity-50 transition-all shadow-lg shadow-accent-violet/25"
                whileHover={reducedMotion || status === 'loading' ? {} : { scale: 1.02 }}
                whileTap={reducedMotion || status === 'loading' ? {} : { scale: 0.98 }}
              >
                {status === 'loading' ? (
                  <>
                    <span className="inline-block animate-spin">⏳</span>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <span aria-hidden="true">✉</span>
                    Envoyer directement à Marvin
                  </>
                )}
              </motion.button>

              <a
                href="mailto:danonmarvin8@gmail.com"
                className="text-xs text-white/40 hover:text-white/80 transition-colors inline-flex items-center gap-1.5"
              >
                Ou écrire à <span className="underline text-accent-violet">danonmarvin8@gmail.com</span> ↗
              </a>
            </div>
          </form>
        </div>

        {/* Secondary links */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-6"
          role="navigation"
          aria-label="Liens externes et CV"
        >
          <motion.a
            href="https://www.linkedin.com/in/marvin-botti-danon-663324317/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
            whileHover={reducedMotion ? {} : { y: -2 }}
            aria-label="Profil LinkedIn de Marvin Danon"
          >
            <span aria-hidden="true" className="text-accent-violet font-bold text-base">in</span>
            LinkedIn
          </motion.a>

          <motion.a
            href="https://github.com/danonmarvin8-gif"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
            whileHover={reducedMotion ? {} : { y: -2 }}
            aria-label="Profil GitHub de Danon Marvin"
          >
            <span aria-hidden="true" className="text-accent-violet font-bold text-base">⌥</span>
            GitHub
          </motion.a>

          {/* Bouton de téléchargement direct du CV PDF */}
          <motion.a
            href={cvUrl}
            download="CV_Marvin_Danon.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-accent-violet bg-accent-violet/10 border border-accent-violet/30 hover:bg-accent-violet/20 hover:border-accent-violet px-4 py-2 rounded-full transition-all"
            whileHover={reducedMotion ? {} : { y: -2, scale: 1.03 }}
            whileTap={reducedMotion ? {} : { scale: 0.98 }}
            aria-label="Télécharger mon CV au format PDF"
          >
            <span aria-hidden="true" className="font-bold text-base">↓</span>
            CV PDF
          </motion.a>
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

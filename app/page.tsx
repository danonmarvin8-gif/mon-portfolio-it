'use client'

import { useEffect, useRef, useCallback } from 'react'
import { StarField } from '@/components/core/StarField'
import { SpatialCursor } from '@/components/core/SpatialCursor'
import { AccessibilityMenu } from '@/components/core/AccessibilityMenu'
import { HeroHeader } from '@/components/sections/HeroHeader'
import { SessionsGrid } from '@/components/sections/SessionsGrid'
import { SkillsOrbit } from '@/components/sections/SkillsOrbit'
import { ContactFooter } from '@/components/sections/ContactFooter'

// ─── TikTok-style snap scroll ─────────────────────────────────────────────────
// Scrolle automatiquement jusqu'à la prochaine section lors d'un swipe/scroll.
// Utilise une logique debounce légère pour ne pas surcharger le rendu.

function useSnapScroll(containerRef: React.RefObject<HTMLElement | null>) {
  const isScrolling = useRef(false)
  const lastScrollY = useRef(0)

  const snapToNearest = useCallback(() => {
    const container = containerRef.current
    if (!container || isScrolling.current) return

    const sections = Array.from(container.querySelectorAll<HTMLElement>('[data-snap]'))
    if (!sections.length) return

    const scrollY = window.scrollY
    const windowH = window.innerHeight

    // Find the section closest to viewport center
    let closest: HTMLElement | null = null
    let minDist = Infinity

    for (const s of sections) {
      const rect = s.getBoundingClientRect()
      const dist = Math.abs(rect.top)
      if (dist < minDist) {
        minDist = dist
        closest = s
      }
    }

    if (!closest) return

    // Only snap if we moved enough (> 80px) and not already aligned
    if (Math.abs(scrollY - lastScrollY.current) < 80) return
    const targetY = window.scrollY + closest.getBoundingClientRect().top

    if (Math.abs(closest.getBoundingClientRect().top) < windowH * 0.08) return // already aligned

    isScrolling.current = true
    window.scrollTo({ top: targetY, behavior: 'smooth' })

    lastScrollY.current = scrollY
    setTimeout(() => { isScrolling.current = false }, 800)
  }, [containerRef])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const onScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(snapToNearest, 120)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [snapToNearest])
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)
  useSnapScroll(mainRef)

  return (
    <main
      ref={mainRef}
      id="main-content"
      className="relative min-h-screen overflow-x-hidden"
    >
      {/* Skip to content link (A11y) */}
      <a
        href="#projets"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent-violet focus:text-white focus:font-semibold"
      >
        Aller au contenu principal
      </a>

      {/* Background */}
      <StarField />

      {/* Custom cursor (desktop only) */}
      <SpatialCursor />

      {/* A11y floating menu */}
      <AccessibilityMenu />

      {/* Snap sections */}
      <div className="relative z-10">
        <section data-snap className="min-h-screen flex flex-col justify-center">
          <HeroHeader />
        </section>

        <section data-snap>
          <SessionsGrid />
        </section>

        <section data-snap className="min-h-screen flex flex-col justify-center">
          <SkillsOrbit />
          <ContactFooter />
        </section>
      </div>
    </main>
  )
}

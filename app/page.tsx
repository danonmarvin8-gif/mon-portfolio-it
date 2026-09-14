import { StarField } from '@/components/core/StarField'
import { SpatialCursor } from '@/components/core/SpatialCursor'
import { AccessibilityMenu } from '@/components/core/AccessibilityMenu'
import { HeroHeader } from '@/components/sections/HeroHeader'
import { SessionsGrid } from '@/components/sections/SessionsGrid'
import { SkillsOrbit } from '@/components/sections/SkillsOrbit'
import { ContactFooter } from '@/components/sections/ContactFooter'

export default function Home() {
  return (
    <main
      id="main-content"
      className="relative min-h-screen overflow-x-hidden"
    >
      {/* Skip to content (A11y) */}
      <a
        href="#projets"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent-violet focus:text-white focus:font-semibold"
      >
        Aller au contenu principal
      </a>

      <StarField />
      <SpatialCursor />
      <AccessibilityMenu />

      <div className="relative z-10">
        {/* snap-section = scroll-snap-align: start → le browser snape ici */}
        <div className="snap-section">
          <HeroHeader />
        </div>

        {/* Pas de snap-section → scroll libre dans la longue grille de projets */}
        <SessionsGrid />

        <div className="snap-section">
          <SkillsOrbit />
          <ContactFooter />
        </div>
      </div>
    </main>
  )
}

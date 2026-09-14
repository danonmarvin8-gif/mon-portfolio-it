import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AccessibilityProvider } from '@/components/core/AccessibilityProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Marvin Danon — Portfolio IT · BTS SIO',
  description:
    'Portfolio de Danon Marvin, étudiant en BTS SIO. Projets réseaux, cybersécurité, développement web et infra Windows Server.',
  keywords: ['BTS SIO', 'réseaux', 'cybersécurité', 'portfolio', 'développeur junior', 'PHP', 'PowerShell', 'Danon Marvin'],
  authors: [{ name: 'Danon Marvin' }],
  openGraph: {
    title: 'Marvin Danon — Portfolio IT · BTS SIO',
    description:
      'Projets scolaires et personnels d\'un étudiant BTS SIO passionné par les réseaux et le développement.',
    type: 'website',
    locale: 'fr_FR',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-void text-white antialiased noise-overlay`}>
        <AccessibilityProvider>
          {children}
        </AccessibilityProvider>
      </body>
    </html>
  )
}

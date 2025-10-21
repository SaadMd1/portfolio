import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Providers } from '@/components/providers'
import { defaultSEOConfig } from '@/lib/seo'
import { Analytics } from '@/components/analytics'
import { getSiteSettings, getProfileSettings } from '@/lib/settings'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  ...defaultSEOConfig,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteSettings = getSiteSettings()
  const profileSettings = getProfileSettings()
  
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col antialiased font-sans">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Providers>
          <Header siteName={siteSettings.siteName} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer 
            siteName={siteSettings.siteName} 
            description={siteSettings.description}
            socialLinks={profileSettings.social}
          />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}


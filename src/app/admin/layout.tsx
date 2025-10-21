import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AdminProvider } from '@/components/admin-provider'
import '../globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Admin Panel - Portfolio',
  description: 'Administration du portfolio',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-gray-50 antialiased">
        <AdminProvider>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </AdminProvider>
      </body>
    </html>
  )
}


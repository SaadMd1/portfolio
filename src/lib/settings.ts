import fs from 'fs'
import path from 'path'

const settingsDirectory = path.join(process.cwd(), 'content/settings')

export interface ProfileSettings {
  name: string
  title: string
  avatar: string
  heroImage: string
  bioShort: string
  bioLong: string
  email: string
  phone?: string
  location: string
  social: {
    linkedin?: string
    instagram?: string
    twitter?: string
    behance?: string
    dribbble?: string
  }
  stats: {
    yearsExperience: number
    clientsServed: number
    productsLaunched: number
    countries: number
  }
  skills: string[]
  awards?: Array<{
    name: string
    organization: string
    year: string
  }>
}

export interface SiteSettings {
  siteName: string
  tagline: string
  description: string
  siteUrl: string
  logo: string
  favicon: string
  ogImage: string
}

export function getProfileSettings(): ProfileSettings {
  const filePath = path.join(settingsDirectory, 'profile.json')
  
  if (!fs.existsSync(filePath)) {
    // Return defaults if file doesn't exist
    return {
      name: process.env.NEXT_PUBLIC_SITE_NAME || 'YourName Design Studio',
      title: 'Freelance Packaging Designer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop',
      bioShort: 'Award-winning freelance packaging designer',
      bioLong: 'Experienced packaging designer with expertise in FMCG, cosmetics, and sustainable design.',
      email: process.env.CONTACT_TO_EMAIL || 'hello@yourdesignstudio.com',
      phone: '',
      location: 'Europe',
      social: {
        linkedin: 'https://linkedin.com/in/yourprofile',
        instagram: 'https://instagram.com/yourhandle',
        twitter: 'https://twitter.com/yourhandle',
      },
      stats: {
        yearsExperience: 10,
        clientsServed: 50,
        productsLaunched: 100,
        countries: 15,
      },
      skills: ['Adobe Illustrator', 'Adobe Photoshop', 'KeyShot'],
      awards: [],
    }
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents) as ProfileSettings
}

export function getSiteSettings(): SiteSettings {
  const filePath = path.join(settingsDirectory, 'site.json')
  
  if (!fs.existsSync(filePath)) {
    // Return defaults if file doesn't exist
    return {
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'YourName Design Studio',
      tagline: 'Packaging Design Excellence',
      description: 'Award-winning freelance packaging designer',
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      logo: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=500&h=500&fit=crop',
      favicon: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=32&h=32&fit=crop',
      ogImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&fit=crop',
    }
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents) as SiteSettings
}



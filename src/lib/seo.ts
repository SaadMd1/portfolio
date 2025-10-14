import { Metadata } from 'next'
import { SITE_CONFIG } from './constants'

export const defaultSEOConfig: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | Freelance Packaging Designer`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'packaging designer',
    'packaging design freelance',
    'food packaging design',
    'cosmetic packaging design',
    'sustainable packaging design',
    'FMCG packaging',
    'brand identity packaging',
    'dielines',
    'packaging mockups',
    'Europe packaging designer',
    'remote packaging designer',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | Freelance Packaging Designer`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} | Freelance Packaging Designer`,
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`],
    creator: '@yourhandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
    },
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
}

export function generatePageMetadata({
  title,
  description,
  keywords,
  path = '',
  ogImage,
  noIndex = false,
}: {
  title: string
  description: string
  keywords?: string[]
  path?: string
  ogImage?: string
  noIndex?: boolean
}): Metadata {
  const url = `${SITE_CONFIG.url}${path}`
  const imageUrl = ogImage || `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`

  return {
    title,
    description,
    keywords: keywords || defaultSEOConfig.keywords,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      type: 'website',
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  }
}


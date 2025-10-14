import { SITE_CONFIG } from './constants'
import { Project, Post, Testimonial, Service } from '@/types'

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
    description: SITE_CONFIG.description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR',
      addressRegion: 'Europe',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      email: process.env.CONTACT_TO_EMAIL,
      areaServed: ['EU', 'FR', 'Worldwide'],
      availableLanguage: ['English', 'French'],
    },
    sameAs: Object.values(SITE_CONFIG.links),
    jobTitle: 'Freelance Packaging Designer',
    knowsAbout: [
      'Packaging Design',
      'Brand Identity',
      'Sustainable Packaging',
      'FMCG Design',
      'Food & Beverage Packaging',
      'Cosmetic Packaging',
    ],
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: SITE_CONFIG.locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  }
}

export function generateProjectSchema(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${SITE_CONFIG.url}/work/${project.slug}`,
    name: project.title,
    description: project.summary,
    image: project.heroImage,
    creator: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
    },
    datePublished: project.publishedAt,
    dateModified: project.updatedAt || project.publishedAt,
    keywords: project.keywords.join(', '),
    about: project.industry,
  }
}

export function generateArticleSchema(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_CONFIG.url}/blog/${post.slug}`,
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    keywords: post.keywords.join(', '),
  }
}

export function generateServiceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_CONFIG.url}/services#${service.slug}`,
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    priceRange: service.startingPrice,
    offers: {
      '@type': 'Offer',
      price: service.startingPrice,
      priceCurrency: 'EUR',
    },
  }
}

export function generateAggregateRatingSchema(testimonials: Testimonial[]) {
  const totalRating = testimonials.reduce((sum, t) => sum + t.rating, 0)
  const averageRating = totalRating / testimonials.length

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: averageRating.toFixed(1),
    reviewCount: testimonials.length,
    bestRating: 5,
    worstRating: 1,
  }
}

export function generateReviewSchema(testimonial: Testimonial) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: testimonial.clientName,
      jobTitle: testimonial.role,
      worksFor: {
        '@type': 'Organization',
        name: testimonial.company,
      },
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: testimonial.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: testimonial.quote,
    datePublished: testimonial.publishedAt,
    itemReviewed: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
    },
  }
}



export interface Project {
  slug: string
  title: string
  summary: string
  heroImage: string
  gallery: ImageAsset[]
  client: string
  industry: string
  services: string[]
  deliverables: string[]
  materials: string[]
  sustainabilityFlags: string[]
  timeline: string
  results: Result[]
  testimonial?: Testimonial
  keywords: string[]
  publishedAt: string
  updatedAt?: string
  featured?: boolean
}

export interface ImageAsset {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

export interface Result {
  metric: string
  value: string
  description?: string
}

export interface Post {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  content: string
  tags: string[]
  readingTime: string
  keywords: string[]
  publishedAt: string
  updatedAt?: string
  author: Author
  featured?: boolean
}

export interface Author {
  name: string
  avatar?: string
  bio?: string
}

export interface Testimonial {
  id: string
  clientName: string
  role: string
  company: string
  companyLogo?: string
  quote: string
  projectRef?: string
  rating: number
  publishedAt: string
  featured?: boolean
}

export interface Service {
  name: string
  slug: string
  shortDescription: string
  description: string
  startingPrice: string
  icon: string
  features: readonly string[]
  faqs?: readonly FAQ[]
}

export interface FAQ {
  question: string
  answer: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}


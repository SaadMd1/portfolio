export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'YourName Design Studio',
  description:
    'Award-winning freelance packaging designer specializing in FMCG, cosmetics, and sustainable packaging design. Transform your brand with innovative packaging solutions.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  locale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/yourhandle',
    linkedin: 'https://linkedin.com/in/yourprofile',
    instagram: 'https://instagram.com/yourhandle',
    behance: 'https://behance.net/yourprofile',
    dribbble: 'https://dribbble.com/yourhandle',
  },
} as const

export const NAV_ITEMS = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const

export const SERVICES = [
  {
    name: 'Packaging Design',
    slug: 'packaging-design',
    shortDescription: 'Complete packaging design from concept to production-ready files',
    description:
      'End-to-end packaging design solutions for FMCG, cosmetics, food & beverage, and consumer products. From initial concept sketches to final production files.',
    startingPrice: 'From €1,500',
    icon: 'package',
    features: [
      'Concept development & mood boards',
      'Label & carton design',
      'Brand guideline integration',
      'Material & finish recommendations',
      'Production-ready files',
    ],
  },
  {
    name: 'Brand Identity & Labels',
    slug: 'brand-identity-labels',
    shortDescription: 'Cohesive brand identity systems for packaging',
    description:
      'Create memorable brand identities that translate beautifully to packaging. Logo design, color systems, typography, and brand guidelines.',
    startingPrice: 'From €2,500',
    icon: 'palette',
    features: [
      'Logo & brand mark design',
      'Color palette development',
      'Typography systems',
      'Brand guidelines',
      'Label template systems',
    ],
  },
  {
    name: 'Dielines & Technical Design',
    slug: 'dielines-technical',
    shortDescription: 'Precise structural packaging design & dielines',
    description:
      'Technical packaging design, structural design, and production-ready dielines for all packaging types.',
    startingPrice: 'From €800',
    icon: 'ruler',
    features: [
      'Custom dieline creation',
      'Structural design optimization',
      'Die-cutting specifications',
      'Assembly instructions',
      'Multiple format exports',
    ],
  },
  {
    name: '3D Mockups & Visualization',
    slug: '3d-mockups',
    shortDescription: 'Photorealistic product visualization & mockups',
    description:
      'High-quality 3D mockups and product visualization to showcase your packaging before production.',
    startingPrice: 'From €500',
    icon: 'box',
    features: [
      'Photorealistic rendering',
      'Multiple angles & environments',
      'Material & lighting setup',
      'Marketing-ready visuals',
      'Animation options',
    ],
  },
  {
    name: 'Sustainability Consulting',
    slug: 'sustainability-consulting',
    shortDescription: 'Eco-friendly packaging solutions & consulting',
    description:
      'Guidance on sustainable packaging materials, design strategies, and eco-certifications to reduce environmental impact.',
    startingPrice: 'From €1,200',
    icon: 'leaf',
    features: [
      'Material analysis & recommendations',
      'Eco-certification guidance',
      'Circular design principles',
      'Waste reduction strategies',
      'Supplier connections',
    ],
  },
  {
    name: 'Packaging Audit & Redesign',
    slug: 'packaging-audit',
    shortDescription: 'Comprehensive packaging assessment & optimization',
    description:
      'Evaluate existing packaging for design, functionality, cost-efficiency, and sustainability improvements.',
    startingPrice: 'From €900',
    icon: 'clipboard',
    features: [
      'Comprehensive audit report',
      'Competitor analysis',
      'Cost optimization',
      'Sustainability assessment',
      'Redesign recommendations',
    ],
  },
] as const

export const INDUSTRIES = [
  'All',
  'FMCG',
  'Cosmetics & Beauty',
  'Food & Beverage',
  'Pharmaceuticals',
  'Consumer Electronics',
  'Luxury Goods',
  'Sustainable Products',
] as const

export const MATERIALS = [
  'All',
  'Cardboard',
  'Glass',
  'Plastic',
  'Metal',
  'Paper',
  'Biodegradable',
  'Composite',
] as const


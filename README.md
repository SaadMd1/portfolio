# Packaging Designer Portfolio

A production-ready, SEO-optimized portfolio website for a freelance packaging designer. Built with Next.js 14, TypeScript, Tailwind CSS, and optimized for Core Web Vitals.

## Features

- 🚀 **Next.js 14** with App Router and TypeScript
- 🎨 **Tailwind CSS** with shadcn/ui components
- 📝 **MDX** for blog posts and case studies
- 🔍 **SEO Optimized** with JSON-LD structured data
- 📊 **Analytics** ready (GA4 + Plausible)
- 📧 **Contact Form** with spam protection and email integration
- 🎯 **Accessibility** focused with WCAG AA compliance
- ⚡ **Performance** optimized for Core Web Vitals
- 🧪 **Testing** with Playwright for critical user flows
- 🔄 **CI/CD** with GitHub Actions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Content**: MDX for blog/projects
- **SEO**: next-sitemap, JSON-LD structured data
- **Images**: next/image with AVIF/WebP
- **Forms**: Server Actions + Resend
- **Analytics**: Google Analytics 4 + Plausible
- **Testing**: Playwright + Vitest
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- pnpm 8.0.0 or later

### Installation

1. Clone the repository:

\`\`\`bash
git clone <your-repo-url>
cd packaging-designer-portfolio
\`\`\`

2. Install dependencies:

\`\`\`bash
pnpm install
\`\`\`

3. Copy the environment variables:

\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update the environment variables in \`.env.local\`:

\`\`\`env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="YourName Design Studio"
CONTACT_TO_EMAIL=hello@yourdesignstudio.com
# Add your API keys as needed
\`\`\`

5. Run the development server:

\`\`\`bash
pnpm dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── content/              # MDX content
│   ├── projects/        # Project case studies
│   ├── posts/           # Blog posts
│   └── testimonials/    # Client testimonials (JSON)
├── public/              # Static assets
│   ├── projects/        # Project images
│   ├── blog/            # Blog images
│   └── ...
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── api/        # API routes
│   │   ├── blog/       # Blog pages
│   │   ├── work/       # Portfolio pages
│   │   └── ...
│   ├── components/     # React components
│   │   ├── ui/         # shadcn/ui components
│   │   └── layout/     # Layout components
│   ├── lib/            # Utility functions
│   │   ├── mdx.ts      # MDX loading utilities
│   │   ├── seo.ts      # SEO configuration
│   │   └── json-ld.ts  # Structured data helpers
│   ├── types/          # TypeScript types
│   └── hooks/          # Custom React hooks
├── tests/              # Playwright tests
└── ...
\`\`\`

## Content Management

### Adding Projects

1. Create a new MDX file in \`content/projects/[slug].mdx\`:

\`\`\`mdx
---
title: "Project Title"
summary: "Brief project description"
heroImage: "/projects/project-name/hero.jpg"
client: "Client Name"
industry: "FMCG"
services: ["Packaging Design", "Brand Identity"]
keywords: ["keyword1", "keyword2"]
publishedAt: "2024-01-15"
featured: true
---

## Project content goes here

Your case study content in Markdown...
\`\`\`

2. Add project images to \`public/projects/[project-name]/\`

### Adding Blog Posts

1. Create a new MDX file in \`content/posts/[slug].mdx\`:

\`\`\`mdx
---
title: "Post Title"
excerpt: "Brief excerpt for SEO and cards"
coverImage: "/blog/post-image.jpg"
tags: ["Design Tips", "Sustainability"]
keywords: ["keyword1", "keyword2"]
publishedAt: "2024-01-20"
author:
  name: "YourName Design Studio"
---

## Post content goes here
\`\`\`

### Adding Testimonials

1. Create a new JSON file in \`content/testimonials/[name].json\`:

\`\`\`json
{
  "id": "unique-id",
  "clientName": "Client Name",
  "role": "Position",
  "company": "Company Name",
  "quote": "The testimonial text...",
  "rating": 5,
  "publishedAt": "2024-01-15",
  "featured": true
}
\`\`\`

## Customization

### Brand Identity

Update the following files with your branding:

- \`src/lib/constants.ts\` - Site name, description, social links
- \`src/lib/seo.ts\` - Default SEO configuration
- \`public/\` - Add your logo, favicon, and og-image.jpg

### Colors and Styling

Customize the color scheme in \`tailwind.config.ts\` and \`src/app/globals.css\`.

### Services

Update the services array in \`src/lib/constants.ts\` to reflect your offerings.

## SEO Optimization

### Built-in SEO Features

- ✅ Semantic HTML and proper heading hierarchy
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph and Twitter Cards
- ✅ Canonical URLs
- ✅ JSON-LD structured data
- ✅ XML sitemap (auto-generated)
- ✅ robots.txt
- ✅ RSS feed for blog
- ✅ Image alt text enforcement

### SEO Checklist

Before deployment:

1. Update \`NEXT_PUBLIC_SITE_URL\` in environment variables
2. Add Google Search Console verification meta tag
3. Add Bing Webmaster verification meta tag
4. Update social media links in \`src/lib/constants.ts\`
5. Create high-quality OG images (1200x630px)
6. Review all meta titles and descriptions
7. Ensure all images have descriptive alt text

See \`SEO_PLAYBOOK.md\` for detailed SEO strategies.

## Analytics

### Google Analytics 4

1. Get your GA4 Measurement ID
2. Add to \`.env.local\`:

\`\`\`env
ANALYTICS_ENABLED=true
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
\`\`\`

### Plausible Analytics

1. Add your domain to Plausible
2. Add to \`.env.local\`:

\`\`\`env
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
\`\`\`

## Contact Form

The contact form uses Server Actions and Resend for email delivery.

### Setup Resend

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to \`.env.local\`:

\`\`\`env
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=hello@yourdomain.com
\`\`\`

## Testing

### Run Playwright Tests

\`\`\`bash
# Run all tests
pnpm test:e2e

# Run tests in headed mode
pnpm exec playwright test --headed

# Run specific test file
pnpm exec playwright test tests/smoke.spec.ts
\`\`\`

### Lighthouse Testing

\`\`\`bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
pnpm build
pnpm start
lighthouse http://localhost:3000 --view
\`\`\`

Target scores: **95+** for all metrics.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy!

### Environment Variables

Set these in your Vercel project settings:

\`\`\`
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=YourName Design Studio
CONTACT_TO_EMAIL=hello@yourdomain.com
RESEND_API_KEY=re_xxxxxxxxxxxx
ANALYTICS_ENABLED=true
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxxxxxxxxx
\`\`\`

### Post-Deployment

1. Submit sitemap to Google Search Console: \`https://yourdomain.com/sitemap.xml\`
2. Verify site in Bing Webmaster Tools
3. Test all forms and functionality
4. Monitor Core Web Vitals in Search Console
5. Set up Vercel Analytics for real-user monitoring

## Performance Optimization

### Image Optimization

- Use next/image for all images
- Provide appropriate sizes prop
- Use priority for above-the-fold images
- Optimize source images before upload

### Code Splitting

- Next.js automatically code-splits routes
- Use dynamic imports for heavy components
- Lazy load below-the-fold content

### Caching Strategy

- Static pages: ISR with 24-hour revalidation
- API routes: Cache-Control headers
- Images: Automatic optimization and caching

## Scripts

- \`pnpm dev\` - Start development server
- \`pnpm build\` - Build for production
- \`pnpm start\` - Start production server
- \`pnpm lint\` - Run ESLint
- \`pnpm typecheck\` - Run TypeScript compiler
- \`pnpm format\` - Format code with Prettier
- \`pnpm test:e2e\` - Run Playwright tests
- \`pnpm analyze\` - Analyze bundle size

## Troubleshooting

### Build Errors

- Ensure all environment variables are set
- Check that all image paths exist
- Verify MDX frontmatter is valid YAML

### Image Not Loading

- Check file exists in \`public/\` directory
- Verify path starts with \`/\`
- Ensure image formats are supported (jpg, png, webp, avif)

### Contact Form Not Working

- Verify RESEND_API_KEY is set
- Check CONTACT_TO_EMAIL is valid
- Review console for error messages

## Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use.

## License

MIT License - feel free to use this template for your portfolio.

## Support

For questions or issues:
- Email: hello@yourdesignstudio.com
- Create an issue on GitHub

---

**Built with ❤️ for packaging designers**


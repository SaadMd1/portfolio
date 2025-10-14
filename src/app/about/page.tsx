import Image from 'next/image'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/seo'
import { generateOrganizationSchema, generateBreadcrumbSchema } from '@/lib/json-ld'
import { getProfileSettings } from '@/lib/settings'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Button } from '@/components/ui/button'
import { Award, Briefcase, GraduationCap, Laptop } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'About | Freelance Packaging Designer Specializing in FMCG & Sustainable Design',
  description:
    'Meet your freelance packaging designer. Award-winning expertise in FMCG, cosmetics, and sustainable packaging. Based in Europe, serving clients worldwide.',
  keywords: [
    'about packaging designer',
    'freelance designer bio',
    'packaging design expert',
    'Europe packaging designer',
  ],
  path: '/about',
})

export default function AboutPage() {
  const profile = getProfileSettings()
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ]

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)) }}
      />

      <div className="container-narrow py-12">
        <Breadcrumbs items={[{ label: 'About' }]} className="mb-8" />

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transforming Brands Through Strategic Packaging Design
            </h1>
            <div 
              className="text-lg text-muted-foreground space-y-4"
              dangerouslySetInnerHTML={{ __html: profile.bioLong.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>') }}
            />
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
            <Image
              src={profile.avatar}
              alt={`${profile.name} - Packaging designer at work`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Approach */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">My Approach</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              Great packaging design isn&apos;t just about aesthetics—it&apos;s about solving business
              problems. My approach starts with deep understanding of your brand, target audience,
              and competitive landscape.
            </p>
            <p>
              I believe in collaboration, not prescription. Throughout our work together, I&apos;ll
              present strategic options, explain the reasoning behind each recommendation, and
              ensure you feel confident in every decision.
            </p>
            <p>
              Sustainability is woven into everything I do. I actively research eco-friendly
              materials and printing methods, designing for minimal environmental impact without
              compromising on quality or shelf appeal.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Briefcase, value: `${profile.stats.yearsExperience}+`, label: 'Years Experience' },
            { icon: Award, value: `${profile.stats.clientsServed}+`, label: 'Clients Served' },
            { icon: GraduationCap, value: `${profile.stats.productsLaunched}+`, label: 'Products Launched' },
            { icon: Laptop, value: `${profile.stats.countries}+`, label: 'Countries' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-muted/40 rounded-lg">
              <stat.icon className="h-8 w-8 mx-auto text-primary mb-3" />
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Expertise */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Areas of Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'FMCG Packaging',
                description:
                  'Fast-moving consumer goods require packaging that captures attention and communicates value instantly.',
              },
              {
                title: 'Cosmetics & Beauty',
                description:
                  'Premium packaging that reflects quality and appeals to discerning beauty consumers.',
              },
              {
                title: 'Food & Beverage',
                description:
                  'Appetizing designs that meet food safety regulations and stand out on crowded shelves.',
              },
              {
                title: 'Sustainable Packaging',
                description:
                  'Eco-friendly solutions using recyclable, biodegradable, and innovative materials.',
              },
              {
                title: 'Brand Development',
                description:
                  'Complete brand identity systems that translate beautifully to packaging.',
              },
              {
                title: 'Technical Production',
                description:
                  'Production-ready files, dielines, and printer coordination for flawless execution.',
              },
            ].map((area, index) => (
              <div key={index} className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                <p className="text-muted-foreground">{area.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Tools & Technology</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {profile.skills.map((tool, index) => (
              <div
                key={index}
                className="text-center py-4 px-3 bg-muted/40 rounded-lg text-sm font-medium"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        {profile.awards && profile.awards.length > 0 && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Awards & Recognition</h2>
          <div className="space-y-4">
            {profile.awards.map((award, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 border rounded-lg hover:border-primary transition-colors"
              >
                <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">{award.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {award.organization} · {award.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* CTA */}
        <div className="text-center bg-primary text-primary-foreground rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Have a packaging project in mind? I&apos;d love to hear about it and explore how we can
              create something exceptional together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/work">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}


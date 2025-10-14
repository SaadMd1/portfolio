import Link from 'next/link'
import { SERVICES } from '@/lib/constants'
import { generatePageMetadata } from '@/lib/seo'
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/json-ld'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'Packaging Design Services | FMCG, Cosmetics & Sustainable Packaging',
  description:
    'Comprehensive packaging design services: brand identity, structural design, 3D mockups, dielines, and sustainability consulting. Remote freelance designer serving Europe and worldwide.',
  keywords: [
    'packaging design services',
    'freelance packaging designer',
    '3D packaging mockups',
    'sustainable packaging consulting',
    'dieline design',
  ],
  path: '/services',
})

export default function ServicesPage() {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ]

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)) }}
      />
      {SERVICES.map((service) => (
        <script
          key={service.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceSchema(service)) }}
        />
      ))}

      <div className="container-wide py-12">
        <Breadcrumbs items={[{ label: 'Services' }]} className="mb-8" />
        
        {/* Page Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Services</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive packaging design services from concept to production, specializing in
            FMCG, cosmetics, and sustainable solutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {SERVICES.map((service) => (
            <Card key={service.slug} id={service.slug} className="scroll-mt-20">
              <CardHeader>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-primary">{service.startingPrice}</span>
                </div>
                <CardTitle className="text-2xl">{service.name}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">What&apos;s Included:</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-muted/40 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">My Design Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'Understanding your brand, audience, and goals through research and strategy.',
              },
              {
                step: '02',
                title: 'Concept',
                description: 'Developing multiple creative directions with mood boards and sketches.',
              },
              {
                step: '03',
                title: 'Design',
                description: 'Refining chosen concept into production-ready packaging design.',
              },
              {
                step: '04',
                title: 'Production',
                description: 'Delivering technical files and supporting through manufacturing.',
              },
            ].map((phase, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-primary/20 mb-2">{phase.step}</div>
                <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                <p className="text-sm text-muted-foreground">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary text-primary-foreground rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Let&apos;s discuss your project requirements and how I can help you create packaging that
            stands out.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Request a Quote</Link>
          </Button>
        </div>
      </div>
    </>
  )
}


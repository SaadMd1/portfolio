import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/project-card'
import { TestimonialCard } from '@/components/testimonial-card'
import { getProjects, getTestimonials } from '@/lib/mdx'
import { getProfileSettings } from '@/lib/settings'
import { generatePageMetadata } from '@/lib/seo'
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/json-ld'
import { ArrowRight, Award, CheckCircle2, Package, Users } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'Award-Winning Freelance Packaging Designer | Sustainable & FMCG Design',
  description:
    'Transform your brand with expert packaging design. Specializing in FMCG, cosmetics, food & beverage. Sustainable solutions. Based in Europe, working worldwide.',
  keywords: [
    'packaging designer',
    'packaging design freelance',
    'food packaging design',
    'cosmetic packaging design',
    'sustainable packaging design',
    'FMCG packaging designer Europe',
    'freelance packaging designer France',
  ],
  path: '/',
})

export default async function HomePage() {
  const profile = getProfileSettings()
  const projects = await getProjects()
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)
  const testimonials = await getTestimonials()
  const featuredTestimonials = testimonials.filter((t) => t.featured).slice(0, 3)

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteSchema()) }}
      />

      {/* Hero Section */}
      <section className="container-wide py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Packaging Design That{' '}
              <span className="text-primary">Transforms Brands</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {profile.bioShort}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/contact">
                  Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/work">View Portfolio</Link>
              </Button>
            </div>
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Award-Winning</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{profile.stats.clientsServed}+ Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{profile.stats.productsLaunched}+ Products Launched</span>
              </div>
            </div>
          </div>
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden bg-muted">
            <Image
              src={profile.heroImage}
              alt="Packaging design samples showcasing FMCG and cosmetic products"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-muted/40 py-20">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Do</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive packaging design services from concept to production
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Packaging Design',
                description:
                  'End-to-end packaging design for FMCG, cosmetics, food & beverage, and consumer products.',
                icon: Package,
              },
              {
                title: 'Brand Identity',
                description:
                  'Complete brand systems including logos, color palettes, and brand guidelines.',
                icon: Award,
              },
              {
                title: 'Sustainable Solutions',
                description:
                  'Eco-friendly packaging consulting and design with recyclable and biodegradable materials.',
                icon: CheckCircle2,
              },
            ].map((service, index) => (
              <div key={index} className="bg-background p-8 rounded-lg">
                <service.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Link
                  href="/services"
                  className="text-primary font-medium inline-flex items-center hover:underline"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container-wide py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
            <p className="text-xl text-muted-foreground">
              Recent packaging design projects that delivered results
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/work">View All Projects</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-muted/40 py-20">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Clients Say</h2>
            <p className="text-xl text-muted-foreground">
              Trusted by brands across Europe and beyond
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/testimonials">Read More Reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-wide py-20">
        <div className="bg-primary text-primary-foreground rounded-2xl p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Packaging?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Let&apos;s discuss your project and create packaging that stands out on shelves and drives
            sales.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </>
  )
}


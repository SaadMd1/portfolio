import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProject, getProjects } from '@/lib/mdx'
import { generatePageMetadata } from '@/lib/seo'
import { generateProjectSchema, generateBreadcrumbSchema } from '@/lib/json-ld'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { TestimonialCard } from '@/components/testimonial-card'
import { Button } from '@/components/ui/button'
import { Calendar, CheckCircle2, Package, Target } from 'lucide-react'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const result = await getProject(params.slug)
  if (!result) return {}

  const { project } = result
  
  return generatePageMetadata({
    title: `${project.title} | Packaging Design Case Study`,
    description: project.summary,
    keywords: project.keywords,
    path: `/work/${project.slug}`,
    ogImage: project.heroImage,
  })
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const result = await getProject(params.slug)
  
  if (!result) {
    notFound()
  }

  const { project, content } = result

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Work', url: '/work' },
    { name: project.title, url: `/work/${project.slug}` },
  ]

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProjectSchema(project)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)) }}
      />

      <article className="container-narrow py-12">
        <Breadcrumbs
          items={[{ label: 'Work', href: '/work' }, { label: project.title }]}
          className="mb-8"
        />

        {/* Hero Image */}
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium text-primary">{project.industry}</span>
            {project.sustainabilityFlags && project.sustainabilityFlags.length > 0 && (
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                Sustainable
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground">{project.summary}</p>
        </div>

        {/* Project Meta */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 p-6 bg-muted/40 rounded-lg">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
              <Package className="h-4 w-4" />
              Client
            </div>
            <div className="font-semibold">{project.client}</div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
              <Target className="h-4 w-4" />
              Industry
            </div>
            <div className="font-semibold">{project.industry}</div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
              Timeline
            </div>
            <div className="font-semibold">{project.timeline}</div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
              <CheckCircle2 className="h-4 w-4" />
              Status
            </div>
            <div className="font-semibold">Completed</div>
          </div>
        </div>

        {/* Services & Deliverables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Services Provided</h2>
            <ul className="space-y-2">
              {project.services.map((service, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Deliverables</h2>
            <ul className="space-y-2">
              {project.deliverables.map((deliverable, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Case Study Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {content}
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((image, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {image.caption && (
                    <p className="text-sm text-muted-foreground mt-2">{image.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {project.results && project.results.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Results & Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.results.map((result, index) => (
                <div key={index} className="text-center p-6 bg-muted/40 rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">{result.value}</div>
                  <div className="font-semibold mb-1">{result.metric}</div>
                  {result.description && (
                    <div className="text-sm text-muted-foreground">{result.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonial */}
        {project.testimonial && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Client Testimonial</h2>
            <TestimonialCard testimonial={project.testimonial} />
          </div>
        )}

        {/* CTA */}
        <div className="border-t pt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Have a similar project?</h3>
          <p className="text-muted-foreground mb-6">
            Let&apos;s discuss how I can help bring your packaging vision to life.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </article>
    </>
  )
}


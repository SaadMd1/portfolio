import { getTestimonials } from '@/lib/mdx'
import { TestimonialCard } from '@/components/testimonial-card'
import { generatePageMetadata } from '@/lib/seo'
import { generateAggregateRatingSchema, generateReviewSchema, generateBreadcrumbSchema } from '@/lib/json-ld'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Star } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'Client Testimonials & Reviews | Packaging Design Success Stories',
  description:
    'Read what clients say about working with me. Real reviews from FMCG brands, cosmetics companies, and food & beverage businesses across Europe.',
  keywords: [
    'packaging designer reviews',
    'client testimonials',
    'packaging design feedback',
  ],
  path: '/testimonials',
})

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()
  
  const totalRating = testimonials.reduce((sum, t) => sum + t.rating, 0)
  const averageRating = testimonials.length > 0 ? totalRating / testimonials.length : 0

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Testimonials', url: '/testimonials' },
  ]

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateAggregateRatingSchema(testimonials)) }}
      />
      {testimonials.map((testimonial) => (
        <script
          key={testimonial.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateReviewSchema(testimonial)) }}
        />
      ))}

      <div className="container-wide py-12">
        <Breadcrumbs items={[{ label: 'Testimonials' }]} className="mb-8" />

        {/* Page Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Client Testimonials</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Don&apos;t just take my word for it—here&apos;s what clients say about working together
          </p>
          
          {/* Average Rating */}
          <div className="flex items-center justify-center gap-4 p-6 bg-muted/40 rounded-lg inline-flex mx-auto">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.round(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">
                Based on {testimonials.length} reviews
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No testimonials available yet.</p>
          </div>
        )}
      </div>
    </>
  )
}


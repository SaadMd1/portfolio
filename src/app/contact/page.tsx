import { generatePageMetadata } from '@/lib/seo'
import { generateBreadcrumbSchema } from '@/lib/json-ld'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ContactForm } from '@/components/contact-form'
import { Mail, MapPin, Clock } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'Contact | Get a Packaging Design Quote',
  description:
    'Ready to transform your packaging? Get in touch for a free quote. Freelance packaging designer based in Europe, working with clients worldwide.',
  keywords: [
    'contact packaging designer',
    'packaging design quote',
    'hire packaging designer',
    'freelance designer Europe',
  ],
  path: '/contact',
})

export default function ContactPage() {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)) }}
      />

      <div className="container-narrow py-12">
        <Breadcrumbs items={[{ label: 'Contact' }]} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Let&apos;s Work Together</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Have a packaging design project in mind? Fill out the form and I&apos;ll get back to you
              within 24 hours to discuss your needs and provide a detailed quote.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold mb-1">Email</div>
                  <a
                    href={`mailto:${process.env.CONTACT_TO_EMAIL || 'hello@yourdesignstudio.com'}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {process.env.CONTACT_TO_EMAIL || 'hello@yourdesignstudio.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold mb-1">Location</div>
                  <p className="text-muted-foreground">
                    Based in Europe
                    <br />
                    Working with clients worldwide
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold mb-1">Response Time</div>
                  <p className="text-muted-foreground">
                    Typically within 24 hours
                    <br />
                    Monday - Friday, 9:00 - 18:00 CET
                  </p>
                </div>
              </div>
            </div>

            {/* What to Expect */}
            <div className="bg-muted/40 rounded-lg p-6">
              <h3 className="font-semibold mb-4">What to Expect</h3>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="font-semibold text-primary flex-shrink-0">1.</span>
                  <span>You fill out the form with your project details</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-primary flex-shrink-0">2.</span>
                  <span>I review your requirements and respond within 24 hours</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-primary flex-shrink-0">3.</span>
                  <span>We schedule a call to discuss your project in detail</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-primary flex-shrink-0">4.</span>
                  <span>I provide a detailed quote and project timeline</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}


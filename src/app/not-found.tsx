import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container-narrow py-20 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
      <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/work">
            <Search className="mr-2 h-5 w-5" />
            View Portfolio
          </Link>
        </Button>
      </div>

      {/* Helpful Links */}
      <div className="mt-16">
        <h3 className="font-semibold mb-4">You might be looking for:</h3>
        <div className="flex flex-col gap-2 max-w-sm mx-auto">
          <Link href="/work" className="text-primary hover:underline">
            Portfolio & Case Studies
          </Link>
          <Link href="/services" className="text-primary hover:underline">
            Services & Pricing
          </Link>
          <Link href="/about" className="text-primary hover:underline">
            About Me
          </Link>
          <Link href="/blog" className="text-primary hover:underline">
            Design Blog & Insights
          </Link>
          <Link href="/contact" className="text-primary hover:underline">
            Contact & Get a Quote
          </Link>
        </div>
      </div>
    </div>
  )
}


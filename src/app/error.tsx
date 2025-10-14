'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, RefreshCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="container-narrow py-20 text-center">
      <h1 className="text-6xl font-bold mb-4">500</h1>
      <h2 className="text-3xl font-bold mb-6">Something Went Wrong</h2>
      <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
        We apologize for the inconvenience. An error occurred while processing your request.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={reset} size="lg">
          <RefreshCcw className="mr-2 h-5 w-5" />
          Try Again
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Contact Support */}
      <div className="mt-16 p-6 bg-muted/40 rounded-lg max-w-md mx-auto">
        <h3 className="font-semibold mb-2">Still having issues?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          If this problem persists, please contact me and I&apos;ll help resolve it.
        </p>
        <Button asChild variant="outline">
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  )
}


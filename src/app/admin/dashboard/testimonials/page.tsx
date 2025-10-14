import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function TestimonialsManagePage() {
  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b bg-background">
        <div className="container-wide flex h-16 items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Manage Testimonials</h1>
        </div>
      </header>

      <main className="container-narrow py-8">
        <div className="bg-background p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Testimonials Manager</h2>
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold mb-2">📝 How to Manage Testimonials:</h3>
            <ol className="space-y-2 text-sm">
              <li><strong>Add:</strong> Create <code className="bg-white px-2 py-1 rounded">content/testimonials/client-name.json</code></li>
              <li><strong>Edit:</strong> Open JSON files in <code className="bg-white px-2 py-1 rounded">content/testimonials/</code></li>
              <li><strong>Push:</strong> Commit and push to publish</li>
            </ol>
          </div>

          <div className="flex gap-4 mt-6">
            <Button asChild variant="outline">
              <Link href="/admin/dashboard">Back</Link>
            </Button>
            <Button asChild>
              <a href="https://github.com/SaadMd1/portfolio/tree/main/content/testimonials" target="_blank">
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}


import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function ProjectsManagePage() {
  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b bg-background">
        <div className="container-wide flex h-16 items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Manage Projects</h1>
        </div>
      </header>

      <main className="container-narrow py-8">
        <div className="bg-background p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Projects Manager</h2>
          <div className="space-y-6">
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold mb-2">📝 How to Manage Projects:</h3>
              <ol className="space-y-2 text-sm">
                <li><strong>Add New Project:</strong> Create file <code className="bg-white px-2 py-1 rounded">content/projects/your-project.mdx</code></li>
                <li><strong>Edit Existing:</strong> Open any file in <code className="bg-white px-2 py-1 rounded">content/projects/</code></li>
                <li><strong>Add Images:</strong> Upload to <code className="bg-white px-2 py-1 rounded">public/uploads/</code> or use Unsplash URLs</li>
                <li><strong>Push Changes:</strong> <code className="bg-white px-2 py-1 rounded">git add . &amp;&amp; git commit -m &quot;message&quot; &amp;&amp; git push</code></li>
                <li><strong>Auto-Deploy:</strong> Vercel rebuilds automatically!</li>
              </ol>
            </div>

            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link href="/admin/dashboard">Back to Dashboard</Link>
              </Button>
              <Button asChild>
                <a href="https://github.com/SaadMd1/portfolio/tree/main/content/projects" target="_blank">
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function ProfileEditPage() {
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
          <h1 className="text-xl font-bold">Edit Profile</h1>
        </div>
      </header>

      <main className="container-narrow py-8">
        <div className="bg-background p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Profile Editor</h2>
          <div className="space-y-6">
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold mb-2">📝 How to Edit Your Profile:</h3>
              <ol className="space-y-2 text-sm">
                <li><strong>1.</strong> Open <code className="bg-white px-2 py-1 rounded">content/settings/profile.json</code> in your code editor</li>
                <li><strong>2.</strong> Edit the values (name, bio, email, etc.)</li>
                <li><strong>3.</strong> Save the file</li>
                <li><strong>4.</strong> Run: <code className="bg-white px-2 py-1 rounded">git add . &amp;&amp; git commit -m &quot;Updated profile&quot; &amp;&amp; git push</code></li>
                <li><strong>5.</strong> Vercel will auto-deploy your changes!</li>
              </ol>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm"><strong>⚡ Quick Tip:</strong> For now, edit content directly in your code editor. A visual editor is coming in the next update!</p>
            </div>

            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link href="/admin/dashboard">Back to Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/admin/dashboard/profile/edit">
                  Open Visual Editor
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


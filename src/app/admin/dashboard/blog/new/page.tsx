'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, Save, Upload } from 'lucide-react'

interface PostForm {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  tags: string[]
  keywords: string[]
  publishedAt: string
  featured: boolean
  body: string
  author: {
    name: string
    avatar: string
  }
}

export default function NewPostPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  const [formData, setFormData] = useState<PostForm>({
    slug: '',
    title: '',
    excerpt: '',
    coverImage: '',
    tags: [],
    keywords: [],
    publishedAt: new Date().toISOString().split('T')[0],
    featured: false,
    body: '',
    author: {
      name: 'YourName Design Studio',
      avatar: '/uploads/avatar.jpg',
    },
  })

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, field: string) {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formDataToSend = new FormData()
    formDataToSend.append('file', file)

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        const data = await response.json()
        setFormData((prev) => ({ ...prev, [field]: data.url }))
        toast({
          title: 'Success',
          description: 'Image uploaded successfully',
        })
      } else {
        toast({
          title: 'Error',
          description: 'Failed to upload image',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Post created successfully',
        })
        router.push('/admin/dashboard/blog')
      } else {
        const data = await response.json()
        toast({
          title: 'Error',
          description: data.error || 'Failed to create post',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create post',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8 sticky top-0 bg-gray-50 py-4 z-10 border-b">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/dashboard/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">New Blog Post</h1>
            </div>
          </div>
          <Button onClick={handleSubmit} disabled={isSaving} size="lg">
            <Save className="mr-2 h-5 w-5" />
            {isSaving ? 'Creating...' : 'Create Post'}
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-background p-6 rounded-lg space-y-4">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value
                  setFormData({ 
                    ...formData, 
                    title,
                    slug: formData.slug || generateSlug(title)
                  })
                }}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug * (URL-friendly name)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="my-blog-post"
                required
              />
              <p className="text-xs text-muted-foreground">
                Will be used in URL: /blog/{formData.slug || 'post-slug'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="publishedAt">Published Date *</Label>
                <Input
                  id="publishedAt"
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-8">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Featured Post
                </Label>
              </div>
            </div>
          </div>

          <div className="bg-background p-6 rounded-lg space-y-4">
            <h2 className="text-xl font-semibold">Cover Image</h2>
            
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL *</Label>
              <div className="flex gap-2">
                <Input
                  id="coverImage"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="/uploads/image.jpg"
                  required
                />
                <Button type="button" variant="outline" disabled={isUploading} asChild>
                  <label htmlFor="coverImageFile" className="cursor-pointer">
                    <Upload className="h-4 w-4" />
                    <input
                      id="coverImageFile"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'coverImage')}
                    />
                  </label>
                </Button>
              </div>
              {formData.coverImage && (
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="w-full h-48 object-cover rounded"
                />
              )}
            </div>
          </div>

          <div className="bg-background p-6 rounded-lg space-y-4">
            <h2 className="text-xl font-semibold">Categories & SEO</h2>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags.join(', ')}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                placeholder="Design Tips, Packaging, Sustainability"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input
                id="keywords"
                value={formData.keywords.join(', ')}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                placeholder="packaging design, brand identity"
              />
            </div>
          </div>

          <div className="bg-background p-6 rounded-lg space-y-4">
            <h2 className="text-xl font-semibold">Content</h2>
            
            <div className="space-y-2">
              <Label htmlFor="body">Body Content (Markdown) *</Label>
              <Textarea
                id="body"
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                rows={20}
                placeholder="Write your blog post in Markdown..."
                className="font-mono text-sm"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/dashboard/blog">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Creating...' : 'Create Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}


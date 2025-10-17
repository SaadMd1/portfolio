'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, Save, Upload } from 'lucide-react'

interface ProjectForm {
  slug: string
  title: string
  summary: string
  heroImage: string
  client: string
  industry: string
  services: string[]
  deliverables: string[]
  materials: string[]
  sustainabilityFlags: string[]
  timeline: string
  keywords: string[]
  publishedAt: string
  featured: boolean
  body: string
}

const INDUSTRIES = [
  'FMCG',
  'Cosmetics & Beauty',
  'Food & Beverage',
  'Pharmaceuticals',
  'Consumer Electronics',
  'Luxury Goods',
  'Sustainable Products',
]

export default function NewProjectPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  const [formData, setFormData] = useState<ProjectForm>({
    slug: '',
    title: '',
    summary: '',
    heroImage: '',
    client: '',
    industry: 'FMCG',
    services: [],
    deliverables: [],
    materials: [],
    sustainabilityFlags: [],
    timeline: '',
    keywords: [],
    publishedAt: new Date().toISOString().split('T')[0],
    featured: false,
    body: '',
  })

  // Auto-generate slug from title
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
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Project created successfully',
        })
        router.push('/admin/dashboard/projects')
      } else {
        const data = await response.json()
        toast({
          title: 'Error',
          description: data.error || 'Failed to create project',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create project',
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
              <Link href="/admin/dashboard/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">New Project</h1>
            </div>
          </div>
          <Button onClick={handleSubmit} disabled={isSaving} size="lg">
            <Save className="mr-2 h-5 w-5" />
            {isSaving ? 'Creating...' : 'Create Project'}
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
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
                placeholder="my-project-name"
                required
              />
              <p className="text-xs text-muted-foreground">
                Will be used in URL: /work/{formData.slug || 'project-slug'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Summary *</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client">Client *</Label>
                <Input
                  id="client"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => setFormData({ ...formData, industry: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline</Label>
                <Input
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  placeholder="e.g., 3 months"
                />
              </div>

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
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Featured Project
              </Label>
            </div>
          </div>

          {/* Images */}
          <div className="bg-background p-6 rounded-lg space-y-4">
            <h2 className="text-xl font-semibold">Images</h2>
            
            <div className="space-y-2">
              <Label htmlFor="heroImage">Hero Image URL *</Label>
              <div className="flex gap-2">
                <Input
                  id="heroImage"
                  value={formData.heroImage}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  placeholder="/uploads/image.jpg"
                  required
                />
                <Button type="button" variant="outline" disabled={isUploading} asChild>
                  <label htmlFor="heroImageFile" className="cursor-pointer">
                    <Upload className="h-4 w-4" />
                    <input
                      id="heroImageFile"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'heroImage')}
                    />
                  </label>
                </Button>
              </div>
              {formData.heroImage && (
                <img
                  src={formData.heroImage}
                  alt="Hero preview"
                  className="w-full h-48 object-cover rounded"
                />
              )}
            </div>
          </div>

          {/* Lists */}
          <div className="bg-background p-6 rounded-lg space-y-4">
            <h2 className="text-xl font-semibold">Details</h2>
            
            <div className="space-y-2">
              <Label htmlFor="services">Services (comma-separated)</Label>
              <Input
                id="services"
                value={formData.services.join(', ')}
                onChange={(e) => setFormData({ ...formData, services: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                placeholder="Packaging Design, Brand Identity"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliverables">Deliverables (comma-separated)</Label>
              <Input
                id="deliverables"
                value={formData.deliverables.join(', ')}
                onChange={(e) => setFormData({ ...formData, deliverables: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                placeholder="Package Design, 3D Mockups"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="materials">Materials (comma-separated)</Label>
              <Input
                id="materials"
                value={formData.materials.join(', ')}
                onChange={(e) => setFormData({ ...formData, materials: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                placeholder="Cardboard, Glass"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input
                id="keywords"
                value={formData.keywords.join(', ')}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                placeholder="packaging, design, sustainable"
              />
            </div>
          </div>

          {/* Content */}
          <div className="bg-background p-6 rounded-lg space-y-4">
            <h2 className="text-xl font-semibold">Content</h2>
            
            <div className="space-y-2">
              <Label htmlFor="body">Body Content (Markdown)</Label>
              <Textarea
                id="body"
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                rows={15}
                placeholder="Write your project case study in Markdown..."
                className="font-mono text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/dashboard/projects">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Creating...' : 'Create Project'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}


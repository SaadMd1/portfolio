'use client'

import { useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Edit, Trash2, Plus, Save, X } from 'lucide-react'

interface Testimonial {
  id: string
  clientName: string
  role: string
  company: string
  quote: string
  rating: number
  publishedAt: string
  featured: boolean
}

export default function TestimonialsManagePage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showNewForm, setShowNewForm] = useState(false)
  const { toast } = useToast()

  const emptyTestimonial: Testimonial = {
    id: '',
    clientName: '',
    role: '',
    company: '',
    quote: '',
    rating: 5,
    publishedAt: new Date().toISOString(),
    featured: false,
  }

  const [formData, setFormData] = useState<Testimonial>(emptyTestimonial)

  const loadTestimonials = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/testimonials')
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data.testimonials)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to load testimonials',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load testimonials',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  useEffect(() => {
    loadTestimonials()
  }, [loadTestimonials])

  async function handleDelete(id: string) {
    if (!confirm(`Are you sure you want to delete this testimonial?`)) {
      return
    }

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Testimonial deleted successfully',
        })
        loadTestimonials()
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete testimonial',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete testimonial',
        variant: 'destructive',
      })
    }
  }

  async function handleSave() {
    if (!formData.id || !formData.clientName || !formData.quote) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      })
      return
    }

    try {
      const url = editingId 
        ? `/api/admin/testimonials/${editingId}`
        : '/api/admin/testimonials'
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: `Testimonial ${editingId ? 'updated' : 'created'} successfully`,
        })
        setEditingId(null)
        setShowNewForm(false)
        setFormData(emptyTestimonial)
        loadTestimonials()
      } else {
        const data = await response.json()
        toast({
          title: 'Error',
          description: data.error || `Failed to ${editingId ? 'update' : 'create'} testimonial`,
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${editingId ? 'update' : 'create'} testimonial`,
        variant: 'destructive',
      })
    }
  }

  function startEdit(testimonial: Testimonial) {
    setEditingId(testimonial.id)
    setFormData(testimonial)
    setShowNewForm(false)
  }

  function startNew() {
    setEditingId(null)
    setFormData(emptyTestimonial)
    setShowNewForm(true)
  }

  function cancelEdit() {
    setEditingId(null)
    setShowNewForm(false)
    setFormData(emptyTestimonial)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Testimonials</h1>
            <p className="text-gray-600">Add and manage client testimonials and reviews</p>
          </div>
          {!showNewForm && !editingId && (
            <Button onClick={startNew} size="lg">
              <Plus className="mr-2 h-5 w-5" />
              New Testimonial
            </Button>
          )}
        </div>
        {/* Edit/New Form */}
        {(showNewForm || editingId) && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{editingId ? 'Edit Testimonial' : 'New Testimonial'}</CardTitle>
                <Button variant="ghost" size="sm" onClick={cancelEdit}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="id">ID * (URL-friendly)</Label>
                  <Input
                    id="id"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    placeholder="john-doe"
                    disabled={!!editingId}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote">Quote/Review *</Label>
                <Textarea
                  id="quote"
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
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
                    Featured Testimonial
                  </Label>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  {editingId ? 'Update' : 'Create'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No testimonials yet</p>
            <Button onClick={startNew}>Create your first testimonial</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg">{testimonial.clientName}</CardTitle>
                    {testimonial.featured && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <CardDescription>
                    {testimonial.role} at {testimonial.company}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-4">
                    <p className="text-sm italic line-clamp-3">&quot;{testimonial.quote}&quot;</p>
                    <p className="text-sm text-muted-foreground">
                      Rating: {'⭐'.repeat(testimonial.rating)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => startEdit(testimonial)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(testimonial.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


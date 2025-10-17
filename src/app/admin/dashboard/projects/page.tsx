'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Edit, Trash2, Plus, ExternalLink } from 'lucide-react'

interface Project {
  slug: string
  title: string
  summary: string
  heroImage: string
  client: string
  industry: string
  publishedAt: string
  featured: boolean
}

export default function ProjectsManagePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    try {
      const response = await fetch('/api/admin/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to load projects',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load projects',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm(`Are you sure you want to delete the project "${slug}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/admin/projects/${slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Project deleted successfully',
        })
        loadProjects()
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete project',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Projects</h1>
            <p className="text-gray-600">Create, edit, and organize your portfolio projects</p>
          </div>
          <Button asChild size="lg">
            <Link href="/admin/dashboard/projects/new">
              <Plus className="mr-2 h-5 w-5" />
              New Project
            </Link>
          </Button>
        </div>
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No projects yet</p>
            <Button asChild>
              <Link href="/admin/dashboard/projects/new">Create your first project</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.slug} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    {project.featured && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <CardDescription className="line-clamp-2">
                    {project.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <p><strong>Client:</strong> {project.client}</p>
                    <p><strong>Industry:</strong> {project.industry}</p>
                    <p><strong>Published:</strong> {new Date(project.publishedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link href={`/work/${project.slug}`} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link href={`/admin/dashboard/projects/${project.slug}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(project.slug)}
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


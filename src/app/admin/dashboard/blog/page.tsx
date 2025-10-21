'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Edit, Trash2, Plus, ExternalLink } from 'lucide-react'

interface Post {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  tags: string[]
  publishedAt: string
  featured: boolean
}

export default function BlogManagePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadPosts() {
    try {
      const response = await fetch('/api/admin/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to load posts',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load posts',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm(`Are you sure you want to delete the post "${slug}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/admin/posts/${slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Post deleted successfully',
        })
        loadPosts()
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete post',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Blog</h1>
            <p className="text-gray-600">Write and publish blog posts and articles</p>
          </div>
          <Button asChild size="lg">
            <Link href="/admin/dashboard/blog/new">
              <Plus className="mr-2 h-5 w-5" />
              New Post
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No blog posts yet</p>
            <Button asChild>
              <Link href="/admin/dashboard/blog/new">Create your first post</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.slug} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    {post.featured && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <CardDescription className="line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <p><strong>Tags:</strong> {post.tags.join(', ')}</p>
                    <p><strong>Published:</strong> {new Date(post.publishedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link href={`/admin/dashboard/blog/${post.slug}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(post.slug)}
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

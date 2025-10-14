'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, Loader2, Save } from 'lucide-react'

export default function ProfileEditorPage() {
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    try {
      const response = await fetch('/api/admin/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load profile data',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Profile updated. Changes will be live in 2-3 minutes.',
        })
      } else {
        throw new Error('Failed to save')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save profile. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="container-wide flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <h1 className="text-xl font-bold">Edit Profile</h1>
          </div>
          <Button onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </header>

      <main className="container-narrow py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-background p-6 rounded-lg space-y-6">
            <h2 className="text-2xl font-bold">Basic Information</h2>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile?.name || ''}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                value={profile?.title || ''}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile?.email || ''}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile?.location || ''}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              />
            </div>
          </div>

          {/* Bio */}
          <div className="bg-background p-6 rounded-lg space-y-6">
            <h2 className="text-2xl font-bold">Biography</h2>

            <div className="space-y-2">
              <Label htmlFor="bioShort">Short Bio (for homepage)</Label>
              <Textarea
                id="bioShort"
                rows={3}
                value={profile?.bioShort || ''}
                onChange={(e) => setProfile({ ...profile, bioShort: e.target.value })}
                placeholder="A brief description for the homepage..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bioLong">Long Bio (for about page)</Label>
              <Textarea
                id="bioLong"
                rows={8}
                value={profile?.bioLong || ''}
                onChange={(e) => setProfile({ ...profile, bioLong: e.target.value })}
                placeholder="Your full biography..."
              />
            </div>
          </div>

          {/* Stats */}
          <div className="bg-background p-6 rounded-lg space-y-6">
            <h2 className="text-2xl font-bold">Stats & Numbers</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="yearsExperience">Years Experience</Label>
                <Input
                  id="yearsExperience"
                  type="number"
                  value={profile?.stats?.yearsExperience || 0}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      stats: { ...profile.stats, yearsExperience: parseInt(e.target.value) },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientsServed">Clients Served</Label>
                <Input
                  id="clientsServed"
                  type="number"
                  value={profile?.stats?.clientsServed || 0}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      stats: { ...profile.stats, clientsServed: parseInt(e.target.value) },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productsLaunched">Products Launched</Label>
                <Input
                  id="productsLaunched"
                  type="number"
                  value={profile?.stats?.productsLaunched || 0}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      stats: { ...profile.stats, productsLaunched: parseInt(e.target.value) },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="countries">Countries</Label>
                <Input
                  id="countries"
                  type="number"
                  value={profile?.stats?.countries || 0}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      stats: { ...profile.stats, countries: parseInt(e.target.value) },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-background p-6 rounded-lg space-y-6">
            <h2 className="text-2xl font-bold">Images</h2>
            <p className="text-sm text-muted-foreground">
              Use Unsplash URLs or upload images to public/uploads/
            </p>

            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input
                id="avatar"
                type="url"
                value={profile?.avatar || ''}
                onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heroImage">Hero Image URL</Label>
              <Input
                id="heroImage"
                type="url"
                value={profile?.heroImage || ''}
                onChange={(e) => setProfile({ ...profile, heroImage: e.target.value })}
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-background p-6 rounded-lg space-y-6">
            <h2 className="text-2xl font-bold">Social Media</h2>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                type="url"
                value={profile?.social?.linkedin || ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    social: { ...profile.social, linkedin: e.target.value },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input
                id="instagram"
                type="url"
                value={profile?.social?.instagram || ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    social: { ...profile.social, instagram: e.target.value },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter URL</Label>
              <Input
                id="twitter"
                type="url"
                value={profile?.social?.twitter || ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    social: { ...profile.social, twitter: e.target.value },
                  })
                }
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/admin/dashboard">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving & Committing to GitHub...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile
                </>
              )}
            </Button>
          </div>

          {process.env.GITHUB_TOKEN && (
            <p className="text-xs text-muted-foreground text-center">
              Changes will be committed to GitHub and deployed automatically
            </p>
          )}
        </form>
      </main>
    </div>
  )
}


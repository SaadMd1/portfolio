'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Save, Upload } from 'lucide-react'

interface ProfileSettings {
  name: string
  title: string
  avatar: string
  heroImage: string
  bioShort: string
  bioLong: string
  email: string
  phone: string
  location: string
  social: {
    linkedin?: string
    instagram?: string
    twitter?: string
    behance?: string
    dribbble?: string
  }
  stats: {
    yearsExperience: number
    clientsServed: number
    productsLaunched: number
    countries: number
  }
  skills: string[]
}

interface SiteSettings {
  siteName: string
  tagline: string
  description: string
  siteUrl: string
  logo: string
  favicon: string
  ogImage: string
}

export default function SettingsManagePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [activeTab, setActiveTab] = useState<'profile' | 'site'>('profile')

  const [profileData, setProfileData] = useState<ProfileSettings>({
    name: '',
    title: '',
    avatar: '',
    heroImage: '',
    bioShort: '',
    bioLong: '',
    email: '',
    phone: '',
    location: '',
    social: {},
    stats: {
      yearsExperience: 10,
      clientsServed: 50,
      productsLaunched: 100,
      countries: 15,
    },
    skills: [],
  })

  const [siteData, setSiteData] = useState<SiteSettings>({
    siteName: '',
    tagline: '',
    description: '',
    siteUrl: '',
    logo: '',
    favicon: '',
    ogImage: '',
  })

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    try {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data = await response.json()
        if (data.profile) {
          setProfileData(data.profile)
        }
        if (data.site) {
          setSiteData(data.site)
        }
      } else {
        toast({
          title: 'Error',
          description: 'Failed to load settings',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load settings',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, field: string, type: 'profile' | 'site') {
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
        if (type === 'profile') {
          setProfileData((prev) => ({ ...prev, [field]: data.url }))
        } else {
          setSiteData((prev) => ({ ...prev, [field]: data.url }))
        }
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

  async function handleSave() {
    setIsSaving(true)

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: activeTab,
          data: activeTab === 'profile' ? profileData : siteData,
        }),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Settings updated successfully',
        })
      } else {
        const data = await response.json()
        toast({
          title: 'Error',
          description: data.error || 'Failed to update settings',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update settings',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/40 flex items-center justify-center">
        <p className="text-muted-foreground">Loading settings...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-gray-600">Configure your profile and site settings</p>
          </div>
          <Button onClick={handleSave} disabled={isSaving} size="lg">
            <Save className="mr-2 h-5 w-5" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'profile' ? 'default' : 'outline'}
            onClick={() => setActiveTab('profile')}
          >
            Profile Settings
          </Button>
          <Button
            variant={activeTab === 'site' ? 'default' : 'outline'}
            onClick={() => setActiveTab('site')}
          >
            Site Settings
          </Button>
        </div>

        {/* Profile Settings */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Your personal and professional details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={profileData.title}
                      onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bioShort">Short Bio (2-3 sentences)</Label>
                  <Textarea
                    id="bioShort"
                    value={profileData.bioShort}
                    onChange={(e) => setProfileData({ ...profileData, bioShort: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bioLong">Long Bio (Full bio for About page)</Label>
                  <Textarea
                    id="bioLong"
                    value={profileData.bioLong}
                    onChange={(e) => setProfileData({ ...profileData, bioLong: e.target.value })}
                    rows={6}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="avatar">Avatar Image</Label>
                  <div className="flex gap-2">
                    <Input
                      id="avatar"
                      value={profileData.avatar}
                      onChange={(e) => setProfileData({ ...profileData, avatar: e.target.value })}
                    />
                    <Button type="button" variant="outline" disabled={isUploading} asChild>
                      <label htmlFor="avatarFile" className="cursor-pointer">
                        <Upload className="h-4 w-4" />
                        <input
                          id="avatarFile"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, 'avatar', 'profile')}
                        />
                      </label>
                    </Button>
                  </div>
                  {profileData.avatar && (
                    <img src={profileData.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heroImage">Hero Image</Label>
                  <div className="flex gap-2">
                    <Input
                      id="heroImage"
                      value={profileData.heroImage}
                      onChange={(e) => setProfileData({ ...profileData, heroImage: e.target.value })}
                    />
                    <Button type="button" variant="outline" disabled={isUploading} asChild>
                      <label htmlFor="heroImageFile" className="cursor-pointer">
                        <Upload className="h-4 w-4" />
                        <input
                          id="heroImageFile"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, 'heroImage', 'profile')}
                        />
                      </label>
                    </Button>
                  </div>
                  {profileData.heroImage && (
                    <img src={profileData.heroImage} alt="Hero" className="w-full h-48 object-cover rounded" />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input
                      id="linkedin"
                      value={profileData.social.linkedin || ''}
                      onChange={(e) => setProfileData({ 
                        ...profileData, 
                        social: { ...profileData.social, linkedin: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram URL</Label>
                    <Input
                      id="instagram"
                      value={profileData.social.instagram || ''}
                      onChange={(e) => setProfileData({ 
                        ...profileData, 
                        social: { ...profileData.social, instagram: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="behance">Behance URL</Label>
                    <Input
                      id="behance"
                      value={profileData.social.behance || ''}
                      onChange={(e) => setProfileData({ 
                        ...profileData, 
                        social: { ...profileData.social, behance: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dribbble">Dribbble URL</Label>
                    <Input
                      id="dribbble"
                      value={profileData.social.dribbble || ''}
                      onChange={(e) => setProfileData({ 
                        ...profileData, 
                        social: { ...profileData.social, dribbble: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="yearsExperience">Years Experience</Label>
                    <Input
                      id="yearsExperience"
                      type="number"
                      value={profileData.stats.yearsExperience}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        stats: { ...profileData.stats, yearsExperience: parseInt(e.target.value) || 0 }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientsServed">Clients Served</Label>
                    <Input
                      id="clientsServed"
                      type="number"
                      value={profileData.stats.clientsServed}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        stats: { ...profileData.stats, clientsServed: parseInt(e.target.value) || 0 }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productsLaunched">Products Launched</Label>
                    <Input
                      id="productsLaunched"
                      type="number"
                      value={profileData.stats.productsLaunched}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        stats: { ...profileData.stats, productsLaunched: parseInt(e.target.value) || 0 }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="countries">Countries</Label>
                    <Input
                      id="countries"
                      type="number"
                      value={profileData.stats.countries}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        stats: { ...profileData.stats, countries: parseInt(e.target.value) || 0 }
                      })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills & Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    value={profileData.skills.join(', ')}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    })}
                    placeholder="Adobe Illustrator, Photoshop, KeyShot"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Site Settings */}
        {activeTab === 'site' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Site Information</CardTitle>
                <CardDescription>General site configuration and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={siteData.siteName}
                    onChange={(e) => setSiteData({ ...siteData, siteName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={siteData.tagline}
                    onChange={(e) => setSiteData({ ...siteData, tagline: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Site Description</Label>
                  <Textarea
                    id="description"
                    value={siteData.description}
                    onChange={(e) => setSiteData({ ...siteData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input
                    id="siteUrl"
                    value={siteData.siteUrl}
                    onChange={(e) => setSiteData({ ...siteData, siteUrl: e.target.value })}
                    placeholder="https://yoursite.com"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Site Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo</Label>
                  <div className="flex gap-2">
                    <Input
                      id="logo"
                      value={siteData.logo}
                      onChange={(e) => setSiteData({ ...siteData, logo: e.target.value })}
                    />
                    <Button type="button" variant="outline" disabled={isUploading} asChild>
                      <label htmlFor="logoFile" className="cursor-pointer">
                        <Upload className="h-4 w-4" />
                        <input
                          id="logoFile"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, 'logo', 'site')}
                        />
                      </label>
                    </Button>
                  </div>
                  {siteData.logo && (
                    <img src={siteData.logo} alt="Logo" className="h-16 object-contain" />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="favicon">Favicon</Label>
                  <div className="flex gap-2">
                    <Input
                      id="favicon"
                      value={siteData.favicon}
                      onChange={(e) => setSiteData({ ...siteData, favicon: e.target.value })}
                    />
                    <Button type="button" variant="outline" disabled={isUploading} asChild>
                      <label htmlFor="faviconFile" className="cursor-pointer">
                        <Upload className="h-4 w-4" />
                        <input
                          id="faviconFile"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, 'favicon', 'site')}
                        />
                      </label>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ogImage">OG Image (Social Sharing - 1200x630px)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="ogImage"
                      value={siteData.ogImage}
                      onChange={(e) => setSiteData({ ...siteData, ogImage: e.target.value })}
                    />
                    <Button type="button" variant="outline" disabled={isUploading} asChild>
                      <label htmlFor="ogImageFile" className="cursor-pointer">
                        <Upload className="h-4 w-4" />
                        <input
                          id="ogImageFile"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, 'ogImage', 'site')}
                        />
                      </label>
                    </Button>
                  </div>
                  {siteData.ogImage && (
                    <img src={siteData.ogImage} alt="OG Image" className="w-full max-w-md object-cover rounded" />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex justify-end pt-6">
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  )
}


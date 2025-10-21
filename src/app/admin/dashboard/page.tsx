import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, ImageIcon, MessageSquare, Settings, User, Briefcase } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome to Your Admin Panel</h2>
          <p className="text-muted-foreground">Manage your portfolio content from here</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Settings */}
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <User className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your name, bio, photo, and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/admin/dashboard/profile">Edit Profile</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <ImageIcon className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                Add, edit, or remove your portfolio projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/admin/dashboard/projects">Manage Projects</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Blog Posts */}
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <FileText className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>
                Write and publish blog posts and articles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/admin/dashboard/blog">Manage Blog</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Services */}
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <Briefcase className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Services</CardTitle>
              <CardDescription>
                Manage your services, pricing, and offerings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/admin/dashboard/services">Manage Services</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Testimonials */}
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <MessageSquare className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Testimonials</CardTitle>
              <CardDescription>
                Add and manage client testimonials and reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/admin/dashboard/testimonials">Manage Testimonials</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Site Settings */}
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <Settings className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>
                Configure site name, SEO, and global settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/admin/dashboard/settings">Site Settings</Link>
              </Button>
            </CardContent>
          </Card>

          {/* View Live Site */}
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <FileText className="h-10 w-10 text-primary mb-2" />
              <CardTitle>View Live Site</CardTitle>
              <CardDescription>
                See your portfolio as visitors see it
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/" target="_blank">
                  Open Site
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Instructions */}
        <div className="mt-8 p-6 bg-muted/60 rounded-lg">
          <h3 className="font-semibold mb-2">💡 Quick Guide</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Edit your profile information and upload photos</li>
            <li>• Add new projects with case studies and images</li>
            <li>• Write blog posts to attract visitors and improve SEO</li>
            <li>• Add client testimonials to build trust</li>
            <li>• Changes are saved to files and deployed to your live site</li>
          </ul>
        </div>
      </div>
    </div>
  )
}


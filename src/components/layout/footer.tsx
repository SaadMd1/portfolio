import Link from 'next/link'
import { NAV_ITEMS } from '@/lib/constants'
import { Twitter, Linkedin, Instagram } from 'lucide-react'

interface FooterProps {
  siteName?: string
  description?: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    instagram?: string
  }
}

export function Footer({ 
  siteName = 'YourName Design Studio', 
  description = 'Award-winning freelance packaging designer',
  socialLinks = {
    twitter: 'https://twitter.com/yourhandle',
    linkedin: 'https://linkedin.com/in/yourprofile',
    instagram: 'https://instagram.com/yourhandle'
  }
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/40">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="font-bold text-lg">
              {siteName}
            </Link>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
            <div className="flex space-x-4">
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services#packaging-design"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Packaging Design
                </Link>
              </li>
              <li>
                <Link
                  href="/services#brand-identity"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Brand Identity
                </Link>
              </li>
              <li>
                <Link
                  href="/services#3d-mockups"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  3D Mockups
                </Link>
              </li>
              <li>
                <Link
                  href="/services#sustainability"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Sustainability Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {siteName}. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/sitemap.xml"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Sitemap
              </Link>
              <Link
                href="/blog/rss.xml"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                RSS Feed
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


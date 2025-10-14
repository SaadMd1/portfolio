import { generatePageMetadata } from '@/lib/seo'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy and data protection information.',
  path: '/privacy',
  noIndex: true,
})

export default function PrivacyPage() {
  return (
    <div className="container-narrow py-12">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} className="mb-8" />

      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground">Last updated: January 2024</p>

        <h2>1. Introduction</h2>
        <p>
          This Privacy Policy explains how YourName Design Studio (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects,
          uses, and protects your personal information when you use our website and services.
        </p>

        <h2>2. Information We Collect</h2>
        <h3>Information You Provide</h3>
        <ul>
          <li>Name and email address (via contact forms)</li>
          <li>Company name and project details</li>
          <li>Any other information you choose to provide</li>
        </ul>

        <h3>Automatically Collected Information</h3>
        <ul>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>IP address</li>
          <li>Pages visited and time spent on site</li>
          <li>Referring website</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Respond to your inquiries and provide services</li>
          <li>Improve our website and services</li>
          <li>Send occasional updates (with your consent)</li>
          <li>Analyze website usage and performance</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>4. Data Storage and Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal
          data against unauthorized or unlawful processing, accidental loss, destruction, or
          damage.
        </p>

        <h2>5. Third-Party Services</h2>
        <p>We may use the following third-party services:</p>
        <ul>
          <li>
            <strong>Analytics:</strong> Google Analytics and/or Plausible Analytics to understand
            website usage
          </li>
          <li>
            <strong>Email:</strong> Resend for contact form submissions
          </li>
          <li>
            <strong>Hosting:</strong> Vercel for website hosting
          </li>
        </ul>

        <h2>6. Cookies</h2>
        <p>
          We use essential cookies for website functionality and may use analytics cookies with
          your consent. See our <a href="/cookies">Cookie Policy</a> for more details.
        </p>

        <h2>7. Your Rights (GDPR)</h2>
        <p>If you are in the European Union, you have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Rectify inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to data processing</li>
          <li>Data portability</li>
          <li>Withdraw consent</li>
        </ul>

        <h2>8. Data Retention</h2>
        <p>
          We retain your personal information only for as long as necessary to fulfill the purposes
          outlined in this Privacy Policy, unless a longer retention period is required by law.
        </p>

        <h2>9. Children&apos;s Privacy</h2>
        <p>
          Our services are not directed to individuals under 16. We do not knowingly collect
          personal information from children.
        </p>

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new policy on this page and updating the &quot;Last updated&quot; date.
        </p>

        <h2>11. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or wish to exercise your rights, please
          contact us at:
        </p>
        <p>
          Email: {process.env.CONTACT_TO_EMAIL || 'hello@yourdesignstudio.com'}
        </p>
      </div>
    </div>
  )
}


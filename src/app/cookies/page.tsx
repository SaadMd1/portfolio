import { generatePageMetadata } from '@/lib/seo'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata = generatePageMetadata({
  title: 'Cookie Policy',
  description: 'Information about how we use cookies on this website.',
  path: '/cookies',
  noIndex: true,
})

export default function CookiesPage() {
  return (
    <div className="container-narrow py-12">
      <Breadcrumbs items={[{ label: 'Cookie Policy' }]} className="mb-8" />

      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground">Last updated: January 2024</p>

        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files that are placed on your device when you visit a website.
          They are widely used to make websites work more efficiently and provide information to
          website owners.
        </p>

        <h2>2. How We Use Cookies</h2>
        <p>We use cookies for the following purposes:</p>

        <h3>Essential Cookies</h3>
        <p>
          These cookies are necessary for the website to function properly. They enable basic
          features like page navigation and access to secure areas. The website cannot function
          properly without these cookies.
        </p>

        <h3>Analytics Cookies</h3>
        <p>
          These cookies help us understand how visitors interact with our website by collecting and
          reporting information anonymously. We use:
        </p>
        <ul>
          <li>
            <strong>Google Analytics:</strong> Tracks website usage, page views, and user behavior
          </li>
          <li>
            <strong>Plausible Analytics:</strong> Privacy-friendly analytics without using cookies
          </li>
        </ul>

        <h2>3. Types of Cookies We Use</h2>

        <h3>Session Cookies</h3>
        <p>
          Temporary cookies that are erased when you close your browser. They help with navigation
          and security.
        </p>

        <h3>Persistent Cookies</h3>
        <p>
          Remain on your device until they expire or you delete them. They remember your preferences
          and improve your user experience.
        </p>

        <h3>Third-Party Cookies</h3>
        <p>
          Set by services we use (like analytics tools). We carefully select third-party services
          and ensure they comply with privacy regulations.
        </p>

        <h2>4. Specific Cookies We Use</h2>

        <table>
          <thead>
            <tr>
              <th>Cookie Name</th>
              <th>Purpose</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>_ga</td>
              <td>Google Analytics - distinguishes users</td>
              <td>2 years</td>
            </tr>
            <tr>
              <td>_gid</td>
              <td>Google Analytics - distinguishes users</td>
              <td>24 hours</td>
            </tr>
            <tr>
              <td>theme</td>
              <td>Remembers your theme preference</td>
              <td>1 year</td>
            </tr>
          </tbody>
        </table>

        <h2>5. Managing Cookies</h2>
        <p>You can control and manage cookies in various ways:</p>

        <h3>Browser Settings</h3>
        <p>
          Most browsers allow you to refuse or accept cookies. Instructions for popular browsers:
        </p>
        <ul>
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
            >
              Edge
            </a>
          </li>
        </ul>

        <h3>Opt-Out Links</h3>
        <ul>
          <li>
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics Opt-out
            </a>
          </li>
        </ul>

        <h2>6. Impact of Disabling Cookies</h2>
        <p>
          If you disable cookies, some features of our website may not function properly. Essential
          cookies are required for basic website functionality.
        </p>

        <h2>7. Updates to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. The latest version will always be
          available on this page with the update date clearly shown.
        </p>

        <h2>8. Your Consent</h2>
        <p>
          By using our website, you consent to our use of cookies in accordance with this policy. If
          you do not agree, please adjust your browser settings or refrain from using our website.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have questions about our use of cookies, please contact us at{' '}
          {process.env.CONTACT_TO_EMAIL || 'hello@yourdesignstudio.com'}
        </p>
      </div>
    </div>
  )
}


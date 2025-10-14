import { generatePageMetadata } from '@/lib/seo'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata = generatePageMetadata({
  title: 'Terms of Service',
  description: 'Terms of service and legal information.',
  path: '/legal',
  noIndex: true,
})

export default function LegalPage() {
  return (
    <div className="container-narrow py-12">
      <Breadcrumbs items={[{ label: 'Terms of Service' }]} className="mb-8" />

      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground">Last updated: January 2024</p>

        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing and using this website, you accept and agree to be bound by the terms and
          provisions of this agreement. If you do not agree to these terms, please do not use this
          website.
        </p>

        <h2>2. Services</h2>
        <p>
          YourName Design Studio provides freelance packaging design services including but not
          limited to: concept development, brand identity, packaging design, structural design, 3D
          mockups, and production support.
        </p>

        <h2>3. Project Scope and Deliverables</h2>
        <h3>3.1 Project Agreement</h3>
        <p>
          All projects begin with a written agreement outlining scope, deliverables, timeline, and
          payment terms. This agreement must be signed by both parties before work commences.
        </p>

        <h3>3.2 Revisions</h3>
        <p>
          Each project phase includes a specified number of revision rounds. Additional revisions
          beyond the agreed scope will be billed at the hourly rate specified in the project
          agreement.
        </p>

        <h2>4. Payment Terms</h2>
        <h3>4.1 Deposits</h3>
        <p>
          A 50% deposit is required before project commencement. The remaining balance is due upon
          project completion before final file delivery.
        </p>

        <h3>4.2 Late Payments</h3>
        <p>
          Invoices are due within 14 days of issue. Late payments may incur interest charges of 1.5%
          per month or the maximum allowed by law.
        </p>

        <h2>5. Intellectual Property</h2>
        <h3>5.1 Ownership</h3>
        <p>
          Upon full payment, you will own the final approved designs and have the right to use them
          for the intended purpose as outlined in the project agreement.
        </p>

        <h3>5.2 Designer Rights</h3>
        <p>
          We retain the right to display completed work in our portfolio and use it for promotional
          purposes unless otherwise agreed in writing.
        </p>

        <h3>5.3 Working Files</h3>
        <p>
          Source files and working documents remain the property of YourName Design Studio unless
          specifically purchased and agreed upon in the project scope.
        </p>

        <h2>6. Client Responsibilities</h2>
        <p>Clients are responsible for:</p>
        <ul>
          <li>Providing clear project briefs and necessary materials</li>
          <li>Timely feedback and approvals</li>
          <li>Verifying accuracy of all content before approval</li>
          <li>Obtaining necessary licenses for stock images, fonts, etc.</li>
          <li>Production coordination and quality control</li>
        </ul>

        <h2>7. Cancellation and Refunds</h2>
        <h3>7.1 Client Cancellation</h3>
        <p>
          If a client cancels a project, they will be charged for all work completed to date. The
          deposit is non-refundable.
        </p>

        <h3>7.2 Designer Cancellation</h3>
        <p>
          We reserve the right to terminate a project if the client breaches these terms or engages
          in abusive behavior. In such cases, a refund may be issued at our discretion.
        </p>

        <h2>8. Liability</h2>
        <h3>8.1 Limitation</h3>
        <p>
          Our liability is limited to the total amount paid for the specific project in question. We
          are not liable for any indirect, consequential, or incidental damages.
        </p>

        <h3>8.2 Production Issues</h3>
        <p>
          While we provide production-ready files to industry standards, we are not responsible for
          printing or manufacturing errors. Clients should request and approve physical proofs
          before mass production.
        </p>

        <h2>9. Confidentiality</h2>
        <p>
          We treat all client information and project details as confidential and will not disclose
          them to third parties without permission, except as required by law.
        </p>

        <h2>10. Force Majeure</h2>
        <p>
          We are not liable for delays or failures due to circumstances beyond our reasonable
          control, including natural disasters, pandemics, wars, or technical failures.
        </p>

        <h2>11. Governing Law</h2>
        <p>
          These terms are governed by the laws of France and the European Union. Any disputes will
          be resolved in the appropriate courts of our jurisdiction.
        </p>

        <h2>12. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Existing projects will be
          governed by the terms in effect when the project agreement was signed.
        </p>

        <h2>13. Contact</h2>
        <p>
          For questions about these terms, please contact us at{' '}
          {process.env.CONTACT_TO_EMAIL || 'hello@yourdesignstudio.com'}
        </p>
      </div>
    </div>
  )
}



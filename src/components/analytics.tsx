'use client'

import Script from 'next/script'

export function Analytics() {
  const analyticsEnabled = process.env.ANALYTICS_ENABLED === 'true'
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

  if (!analyticsEnabled) {
    return null
  }

  return (
    <>
      {/* Google Analytics 4 */}
      {ga4Id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Plausible Analytics */}
      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  )
}

// Event tracking utility
export function trackEvent(eventName: string, eventData?: Record<string, unknown>) {
  if (typeof window === 'undefined') return

  // Track with GA4
  if (window.gtag) {
    window.gtag('event', eventName, eventData)
  }

  // Track with Plausible
  if (window.plausible) {
    window.plausible(eventName, { props: eventData })
  }
}

// Extend window type
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void
  }
}



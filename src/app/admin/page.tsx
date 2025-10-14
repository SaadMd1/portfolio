'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the actual CMS
    window.location.href = '/admin/index.html'
  }, [])

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <p>Loading admin panel...</p>
      <p>
        If not redirected, <a href="/admin/index.html">click here</a>
      </p>
    </div>
  )
}



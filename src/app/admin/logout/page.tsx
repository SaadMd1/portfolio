'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    async function logout() {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      router.push('/admin/login')
    }
    logout()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Logging out...</p>
    </div>
  )
}


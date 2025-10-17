import { redirect } from 'next/navigation'

export default function ProfileEditPage() {
  // Redirect to settings page
  redirect('/admin/dashboard/settings')
}


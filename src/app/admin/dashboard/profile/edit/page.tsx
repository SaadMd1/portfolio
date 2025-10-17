import { redirect } from 'next/navigation'

export default function ProfileEditorPage() {
  // Redirect to settings page
  redirect('/admin/dashboard/settings')
}


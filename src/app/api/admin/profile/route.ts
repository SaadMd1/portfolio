import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getProfileSettings } from '@/lib/settings'
import { commitToGitHub } from '@/lib/github-api'

export async function GET() {
  try {
    // Check authentication
    const session = cookies().get('admin_session')
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profile = getProfileSettings()
    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error loading profile:', error)
    return NextResponse.json({ error: 'Failed to load profile' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = cookies().get('admin_session')
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profileData = await request.json()

    // Commit to GitHub (for production) or save locally (for development)
    if (process.env.GITHUB_TOKEN) {
      await commitToGitHub({
        path: 'content/settings/profile.json',
        content: JSON.stringify(profileData, null, 2),
        message: 'Updated profile via admin panel',
      })
    } else {
      // Local development - save to file
      const fs = await import('fs')
      const path = await import('path')
      const filePath = path.join(process.cwd(), 'content/settings/profile.json')
      fs.writeFileSync(filePath, JSON.stringify(profileData, null, 2))
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving profile:', error)
    return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 })
  }
}


import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'

const settingsDirectory = path.join(process.cwd(), 'content/settings')

// Check authentication
function checkAuth() {
  const session = cookies().get('admin_session')
  if (!session || session.value !== 'authenticated') {
    return false
  }
  return true
}

// GET - Get all settings
export async function GET() {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    if (!fs.existsSync(settingsDirectory)) {
      fs.mkdirSync(settingsDirectory, { recursive: true })
    }

    const profilePath = path.join(settingsDirectory, 'profile.json')
    const sitePath = path.join(settingsDirectory, 'site.json')

    let profile = {}
    let site = {}

    if (fs.existsSync(profilePath)) {
      profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'))
    }

    if (fs.existsSync(sitePath)) {
      site = JSON.parse(fs.readFileSync(sitePath, 'utf8'))
    }

    return NextResponse.json({ profile, site })
  } catch (error) {
    console.error('Error reading settings:', error)
    return NextResponse.json({ error: 'Failed to read settings' }, { status: 500 })
  }
}

// PUT - Update settings
export async function PUT(request: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { type, data } = await request.json()

    if (!type || !data) {
      return NextResponse.json({ error: 'Type and data are required' }, { status: 400 })
    }

    if (!fs.existsSync(settingsDirectory)) {
      fs.mkdirSync(settingsDirectory, { recursive: true })
    }

    const filename = type === 'profile' ? 'profile.json' : 'site.json'
    const filePath = path.join(settingsDirectory, filename)

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')

    return NextResponse.json({ 
      success: true, 
      message: `${type === 'profile' ? 'Profile' : 'Site'} settings updated successfully` 
    })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}


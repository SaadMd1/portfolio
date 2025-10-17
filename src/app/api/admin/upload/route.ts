import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'
import { writeFile } from 'fs/promises'

const uploadsDirectory = path.join(process.cwd(), 'public/uploads')

// Check authentication
function checkAuth() {
  const session = cookies().get('admin_session')
  if (!session || session.value !== 'authenticated') {
    return false
  }
  return true
}

// POST - Upload file
export async function POST(request: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadsDirectory)) {
      fs.mkdirSync(uploadsDirectory, { recursive: true })
    }

    // Generate safe filename
    const originalName = file.name
    const timestamp = Date.now()
    const safeName = originalName.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase()
    const filename = `${timestamp}-${safeName}`

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Write file
    const filepath = path.join(uploadsDirectory, filename)
    await writeFile(filepath, buffer)

    // Return public URL
    const publicUrl = `/uploads/${filename}`

    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      filename 
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}

// GET - List uploaded files
export async function GET() {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    if (!fs.existsSync(uploadsDirectory)) {
      return NextResponse.json({ files: [] })
    }

    const files = fs.readdirSync(uploadsDirectory).map((filename) => {
      const filepath = path.join(uploadsDirectory, filename)
      const stats = fs.statSync(filepath)
      
      return {
        filename,
        url: `/uploads/${filename}`,
        size: stats.size,
        created: stats.birthtime,
      }
    })

    // Sort by creation date, newest first
    files.sort((a, b) => b.created.getTime() - a.created.getTime())

    return NextResponse.json({ files })
  } catch (error) {
    console.error('Error listing files:', error)
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 })
  }
}


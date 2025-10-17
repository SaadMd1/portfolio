import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'

const contentDirectory = path.join(process.cwd(), 'content/testimonials')

// Check authentication
function checkAuth() {
  const session = cookies().get('admin_session')
  if (!session || session.value !== 'authenticated') {
    return false
  }
  return true
}

// GET - List all testimonials
export async function GET() {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    if (!fs.existsSync(contentDirectory)) {
      fs.mkdirSync(contentDirectory, { recursive: true })
    }

    const files = fs.readdirSync(contentDirectory)
    const testimonials = files
      .filter((file) => file.endsWith('.json'))
      .map((file) => {
        const filePath = path.join(contentDirectory, file)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const data = JSON.parse(fileContents)
        
        return {
          filename: file,
          ...data,
        }
      })

    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error('Error reading testimonials:', error)
    return NextResponse.json({ error: 'Failed to read testimonials' }, { status: 500 })
  }
}

// POST - Create new testimonial
export async function POST(request: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    const { id } = data

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    // Create content directory if it doesn't exist
    if (!fs.existsSync(contentDirectory)) {
      fs.mkdirSync(contentDirectory, { recursive: true })
    }

    const filename = `${id}.json`
    const filePath = path.join(contentDirectory, filename)

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Testimonial already exists' }, { status: 400 })
    }

    // Write file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')

    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial created successfully',
      id 
    })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}


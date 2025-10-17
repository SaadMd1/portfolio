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

// GET - Get single testimonial
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const filePath = path.join(contentDirectory, `${params.id}.json`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading testimonial:', error)
    return NextResponse.json({ error: 'Failed to read testimonial' }, { status: 500 })
  }
}

// PUT - Update testimonial
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    const { newId } = data

    const oldFilePath = path.join(contentDirectory, `${params.id}.json`)

    if (!fs.existsSync(oldFilePath)) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    }

    // If id changed, rename file
    if (newId && newId !== params.id) {
      const newFilePath = path.join(contentDirectory, `${newId}.json`)
      
      if (fs.existsSync(newFilePath)) {
        return NextResponse.json({ error: 'New ID already exists' }, { status: 400 })
      }

      // Update the id in the data
      const updatedData = { ...data, id: newId }
      delete updatedData.newId

      fs.writeFileSync(newFilePath, JSON.stringify(updatedData, null, 2), 'utf8')
      fs.unlinkSync(oldFilePath)

      return NextResponse.json({ 
        success: true, 
        message: 'Testimonial updated and renamed successfully',
        id: newId 
      })
    }

    // Remove newId if present
    const updatedData = { ...data }
    delete updatedData.newId

    // Update existing file
    fs.writeFileSync(oldFilePath, JSON.stringify(updatedData, null, 2), 'utf8')

    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial updated successfully',
      id: params.id 
    })
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 })
  }
}

// DELETE - Delete testimonial
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const filePath = path.join(contentDirectory, `${params.id}.json`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    }

    fs.unlinkSync(filePath)

    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 })
  }
}


import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content/projects')

// Check authentication
function checkAuth() {
  const session = cookies().get('admin_session')
  if (!session || session.value !== 'authenticated') {
    return false
  }
  return true
}

// GET - Get single project
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const filePath = path.join(contentDirectory, `${params.slug}.mdx`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return NextResponse.json({
      slug: params.slug,
      ...data,
      body: content,
    })
  } catch (error) {
    console.error('Error reading project:', error)
    return NextResponse.json({ error: 'Failed to read project' }, { status: 500 })
  }
}

// PUT - Update project
export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    const { body, newSlug, ...frontmatter } = data

    const oldFilePath = path.join(contentDirectory, `${params.slug}.mdx`)

    if (!fs.existsSync(oldFilePath)) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Create file content with frontmatter
    const fileContent = matter.stringify(body || '', frontmatter)

    // If slug changed, rename file
    if (newSlug && newSlug !== params.slug) {
      const newFilePath = path.join(contentDirectory, `${newSlug}.mdx`)
      
      if (fs.existsSync(newFilePath)) {
        return NextResponse.json({ error: 'New slug already exists' }, { status: 400 })
      }

      fs.writeFileSync(newFilePath, fileContent, 'utf8')
      fs.unlinkSync(oldFilePath)

      return NextResponse.json({ 
        success: true, 
        message: 'Project updated and renamed successfully',
        slug: newSlug 
      })
    }

    // Update existing file
    fs.writeFileSync(oldFilePath, fileContent, 'utf8')

    return NextResponse.json({ 
      success: true, 
      message: 'Project updated successfully',
      slug: params.slug 
    })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

// DELETE - Delete project
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const filePath = path.join(contentDirectory, `${params.slug}.mdx`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    fs.unlinkSync(filePath)

    return NextResponse.json({ 
      success: true, 
      message: 'Project deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}


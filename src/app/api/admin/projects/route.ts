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

// GET - List all projects
export async function GET() {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    if (!fs.existsSync(contentDirectory)) {
      fs.mkdirSync(contentDirectory, { recursive: true })
    }

    const files = fs.readdirSync(contentDirectory)
    const projects = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        const filePath = path.join(contentDirectory, file)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)
        
        return {
          slug: file.replace('.mdx', ''),
          ...data,
          body: content,
        }
      })

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Error reading projects:', error)
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 })
  }
}

// POST - Create new project
export async function POST(request: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    const { slug, body, ...frontmatter } = data

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    // Create content directory if it doesn't exist
    if (!fs.existsSync(contentDirectory)) {
      fs.mkdirSync(contentDirectory, { recursive: true })
    }

    const filePath = path.join(contentDirectory, `${slug}.mdx`)

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Project already exists' }, { status: 400 })
    }

    // Create file content with frontmatter
    const fileContent = matter.stringify(body || '', frontmatter)

    // Write file
    fs.writeFileSync(filePath, fileContent, 'utf8')

    return NextResponse.json({ 
      success: true, 
      message: 'Project created successfully',
      slug 
    })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}


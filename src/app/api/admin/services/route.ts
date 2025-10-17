import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'

const servicesFile = path.join(process.cwd(), 'content/settings/services.json')

// Check authentication
function checkAuth() {
  const session = cookies().get('admin_session')
  if (!session || session.value !== 'authenticated') {
    return false
  }
  return true
}

// GET - List all services
export async function GET() {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    if (!fs.existsSync(servicesFile)) {
      // Create default services file
      const defaultServices = [
        {
          id: 'packaging-design',
          title: 'Packaging Design',
          description: 'Création d\'emballages attractifs et fonctionnels',
          icon: 'package',
          features: ['Design d\'emballage produit', 'Mockups 3D'],
          order: 1,
          active: true,
        }
      ]
      fs.writeFileSync(servicesFile, JSON.stringify(defaultServices, null, 2))
    }

    const fileContents = fs.readFileSync(servicesFile, 'utf8')
    const services = JSON.parse(fileContents)

    return NextResponse.json({ services })
  } catch (error) {
    console.error('Error reading services:', error)
    return NextResponse.json({ error: 'Failed to read services' }, { status: 500 })
  }
}

// POST - Create new service
export async function POST(request: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const newService = await request.json()

    if (!newService.id || !newService.title) {
      return NextResponse.json({ error: 'ID and title are required' }, { status: 400 })
    }

    // Read existing services
    let services = []
    if (fs.existsSync(servicesFile)) {
      const fileContents = fs.readFileSync(servicesFile, 'utf8')
      services = JSON.parse(fileContents)
    }

    // Check if ID already exists
    if (services.some((s: any) => s.id === newService.id)) {
      return NextResponse.json({ error: 'Service ID already exists' }, { status: 400 })
    }

    // Add new service
    services.push(newService)

    // Sort by order
    services.sort((a: any, b: any) => (a.order || 0) - (b.order || 0))

    // Write to file
    fs.writeFileSync(servicesFile, JSON.stringify(services, null, 2))

    return NextResponse.json({ 
      success: true, 
      message: 'Service created successfully',
      service: newService
    })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}

// PUT - Update all services
export async function PUT(request: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { services } = await request.json()

    if (!Array.isArray(services)) {
      return NextResponse.json({ error: 'Services must be an array' }, { status: 400 })
    }

    // Sort by order
    services.sort((a: any, b: any) => (a.order || 0) - (b.order || 0))

    // Write to file
    fs.writeFileSync(servicesFile, JSON.stringify(services, null, 2))

    return NextResponse.json({ 
      success: true, 
      message: 'Services updated successfully' 
    })
  } catch (error) {
    console.error('Error updating services:', error)
    return NextResponse.json({ error: 'Failed to update services' }, { status: 500 })
  }
}


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

// GET - Get single service
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    if (!fs.existsSync(servicesFile)) {
      return NextResponse.json({ error: 'Services file not found' }, { status: 404 })
    }

    const fileContents = fs.readFileSync(servicesFile, 'utf8')
    const services = JSON.parse(fileContents) as Array<{ id: string; [key: string]: unknown }>

    const service = services.find((s) => s.id === params.id)

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    return NextResponse.json(service)
  } catch (error) {
    console.error('Error reading service:', error)
    return NextResponse.json({ error: 'Failed to read service' }, { status: 500 })
  }
}

// PUT - Update service
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const updatedService = await request.json()

    if (!fs.existsSync(servicesFile)) {
      return NextResponse.json({ error: 'Services file not found' }, { status: 404 })
    }

    const fileContents = fs.readFileSync(servicesFile, 'utf8')
    const services = JSON.parse(fileContents) as Array<{ id: string; order?: number; [key: string]: unknown }>

    const index = services.findIndex((s) => s.id === params.id)

    if (index === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    // Update service
    services[index] = { ...services[index], ...updatedService, id: params.id }

    // Sort by order
    services.sort((a, b) => (a.order || 0) - (b.order || 0))

    // Write to file
    fs.writeFileSync(servicesFile, JSON.stringify(services, null, 2))

    return NextResponse.json({ 
      success: true, 
      message: 'Service updated successfully',
      service: services[index]
    })
  } catch (error) {
    console.error('Error updating service:', error)
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}

// DELETE - Delete service
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    if (!fs.existsSync(servicesFile)) {
      return NextResponse.json({ error: 'Services file not found' }, { status: 404 })
    }

    const fileContents = fs.readFileSync(servicesFile, 'utf8')
    const services = JSON.parse(fileContents) as Array<{ id: string; [key: string]: unknown }>

    const index = services.findIndex((s) => s.id === params.id)

    if (index === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    // Remove service
    services.splice(index, 1)

    // Write to file
    fs.writeFileSync(servicesFile, JSON.stringify(services, null, 2))

    return NextResponse.json({ 
      success: true, 
      message: 'Service deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting service:', error)
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}


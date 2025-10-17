import fs from 'fs'
import path from 'path'

const servicesFile = path.join(process.cwd(), 'content/settings/services.json')

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  order: number
  active: boolean
}

export function getServices(): Service[] {
  if (!fs.existsSync(servicesFile)) {
    // Return default services if file doesn't exist
    return [
      {
        id: 'packaging-design',
        title: 'Packaging Design',
        description: 'Création d\'emballages attractifs et fonctionnels qui captivent votre audience.',
        icon: 'package',
        features: [
          'Design d\'emballage produit',
          'Étiquettes et packaging',
          'Mockups 3D réalistes',
          'Spécifications d\'impression'
        ],
        order: 1,
        active: true,
      },
      {
        id: 'brand-identity',
        title: 'Brand Identity',
        description: 'Développement d\'identités visuelles complètes qui reflètent l\'essence de votre marque.',
        icon: 'palette',
        features: [
          'Logo et identité visuelle',
          'Charte graphique complète',
          'Guidelines de marque',
          'Applications diverses'
        ],
        order: 2,
        active: true,
      },
      {
        id: 'label-design',
        title: 'Label Design',
        description: 'Conception d\'étiquettes professionnelles qui communiquent efficacement.',
        icon: 'tag',
        features: [
          'Étiquettes produit',
          'Design réglementaire',
          'Typographie et hiérarchie',
          'Versions multilingues'
        ],
        order: 3,
        active: true,
      }
    ]
  }

  const fileContents = fs.readFileSync(servicesFile, 'utf8')
  const services = JSON.parse(fileContents) as Service[]
  
  // Filter active services and sort by order
  return services
    .filter(service => service.active)
    .sort((a, b) => a.order - b.order)
}

export function getService(id: string): Service | null {
  const services = getServices()
  return services.find(service => service.id === id) || null
}


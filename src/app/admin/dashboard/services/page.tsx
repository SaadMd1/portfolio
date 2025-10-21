'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Plus, Edit, Trash2, Save, X, Package, Palette, Tag, Briefcase } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  order: number
  active: boolean
}

const ICON_OPTIONS = [
  { value: 'package', label: 'Package', Icon: Package },
  { value: 'palette', label: 'Palette', Icon: Palette },
  { value: 'tag', label: 'Tag', Icon: Tag },
  { value: 'briefcase', label: 'Briefcase', Icon: Briefcase },
]

export default function ServicesManagePage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showNewForm, setShowNewForm] = useState(false)
  const { toast } = useToast()

  const emptyService: Service = {
    id: '',
    title: '',
    description: '',
    icon: 'package',
    features: [],
    order: services.length + 1,
    active: true,
  }

  const [formData, setFormData] = useState<Service>(emptyService)

  useEffect(() => {
    loadServices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadServices() {
    try {
      const response = await fetch('/api/admin/services')
      if (response.ok) {
        const data = await response.json()
        setServices(data.services)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to load services',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load services',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Succès',
          description: 'Service supprimé avec succès',
        })
        loadServices()
      } else {
        toast({
          title: 'Erreur',
          description: 'Échec de la suppression du service',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Échec de la suppression du service',
        variant: 'destructive',
      })
    }
  }

  async function handleSave() {
    if (!formData.id || !formData.title || !formData.description) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs requis',
        variant: 'destructive',
      })
      return
    }

    try {
      const url = editingId 
        ? `/api/admin/services/${editingId}`
        : '/api/admin/services'
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: 'Succès',
          description: `Service ${editingId ? 'mis à jour' : 'créé'} avec succès`,
        })
        setEditingId(null)
        setShowNewForm(false)
        setFormData(emptyService)
        loadServices()
      } else {
        const data = await response.json()
        toast({
          title: 'Erreur',
          description: data.error || `Échec de ${editingId ? 'mise à jour' : 'création'} du service`,
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: `Échec de ${editingId ? 'mise à jour' : 'création'} du service`,
        variant: 'destructive',
      })
    }
  }

  function startEdit(service: Service) {
    setEditingId(service.id)
    setFormData(service)
    setShowNewForm(false)
  }

  function startNew() {
    setEditingId(null)
    setFormData({ ...emptyService, order: services.length + 1 })
    setShowNewForm(true)
  }

  function cancelEdit() {
    setEditingId(null)
    setShowNewForm(false)
    setFormData(emptyService)
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const IconComponent = ICON_OPTIONS.find(opt => opt.value === formData.icon)?.Icon || Package

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gérer les Services</h1>
            <p className="text-gray-600">Ajoutez, modifiez et organisez vos services</p>
          </div>
          {!showNewForm && !editingId && (
            <Button onClick={startNew} size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Nouveau Service
            </Button>
          )}
        </div>

        {/* Edit/New Form */}
        {(showNewForm || editingId) && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{editingId ? 'Modifier le Service' : 'Nouveau Service'}</CardTitle>
                <Button variant="ghost" size="sm" onClick={cancelEdit}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value
                      setFormData({ 
                        ...formData, 
                        title,
                        id: formData.id || generateSlug(title)
                      })
                    }}
                    placeholder="Packaging Design"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="id">ID * (URL-friendly)</Label>
                  <Input
                    id="id"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    placeholder="packaging-design"
                    disabled={!!editingId}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Décrivez ce service..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="icon">Icône</Label>
                  <select
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {ICON_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <IconComponent className="h-5 w-5" />
                    <span>Aperçu de l&apos;icône</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order">Ordre</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                    min="1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Caractéristiques (une par ligne)</Label>
                <Textarea
                  id="features"
                  value={formData.features.join('\n')}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    features: e.target.value.split('\n').filter(Boolean) 
                  })}
                  rows={5}
                  placeholder="Design d&apos;emballage produit&#10;Mockups 3D réalistes&#10;Spécifications d&apos;impression"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="active" className="cursor-pointer">
                  Service actif (visible sur le site)
                </Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={cancelEdit}>
                  Annuler
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  {editingId ? 'Mettre à jour' : 'Créer'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Chargement des services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Aucun service pour le moment</p>
            <Button onClick={startNew}>Créer votre premier service</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const ServiceIcon = ICON_OPTIONS.find(opt => opt.value === service.icon)?.Icon || Package
              
              return (
                <Card key={service.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <ServiceIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{service.title}</CardTitle>
                          <span className="text-xs text-gray-500">Ordre: {service.order}</span>
                        </div>
                      </div>
                      {service.active ? (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Actif
                        </span>
                      ) : (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          Inactif
                        </span>
                      )}
                    </div>
                    <CardDescription className="line-clamp-2">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-semibold">Caractéristiques :</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="line-clamp-1">{feature}</span>
                          </li>
                        ))}
                        {service.features.length > 3 && (
                          <li className="text-xs text-gray-400">
                            +{service.features.length - 3} autres...
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => startEdit(service)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(service.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}


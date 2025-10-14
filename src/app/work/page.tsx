import { getProjects } from '@/lib/mdx'
import { ProjectCard } from '@/components/project-card'
import { generatePageMetadata } from '@/lib/seo'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata = generatePageMetadata({
  title: 'Packaging Design Portfolio | FMCG, Cosmetics & Food Packaging Projects',
  description:
    'Browse my portfolio of award-winning packaging design work. Specialized in FMCG, cosmetics, food & beverage, and sustainable packaging solutions.',
  keywords: [
    'packaging design portfolio',
    'FMCG packaging examples',
    'cosmetic packaging design',
    'food packaging portfolio',
  ],
  path: '/work',
})

export default async function WorkPage() {
  const projects = await getProjects()

  return (
    <div className="container-wide py-12">
      <Breadcrumbs items={[{ label: 'Work' }]} className="mb-8" />
      
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Portfolio</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          A selection of packaging design projects spanning FMCG, cosmetics, food & beverage, and
          sustainable products. Each project showcases strategic thinking and attention to detail.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found.</p>
        </div>
      )}
    </div>
  )
}


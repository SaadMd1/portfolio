import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Project } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className={cn('group block', className)}>
      <Card className="overflow-hidden border-0 shadow-none transition-all duration-300 group-hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-primary">{project.industry}</span>
            {project.sustainabilityFlags && project.sustainabilityFlags.length > 0 && (
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                Sustainable
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{project.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.services.slice(0, 3).map((service) => (
              <span
                key={service}
                className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
              >
                {service}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}


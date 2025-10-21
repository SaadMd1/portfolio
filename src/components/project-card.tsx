'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Project } from '@/types'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className={cn('group block', className)}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <Card className="overflow-hidden border-0 shadow-md hover:shadow-2xl transition-shadow duration-300">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="w-full h-full"
            >
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Arrow icon on hover */}
            <motion.div
              initial={{ opacity: 0, x: -10, y: 10 }}
              whileHover={{ opacity: 1, x: 0, y: 0 }}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
            >
              <ArrowUpRight className="h-5 w-5 text-gray-900" />
            </motion.div>
          </div>
          <CardContent className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="text-xs font-medium text-primary"
                >
                  {project.industry}
                </motion.span>
                {project.sustainabilityFlags && project.sustainabilityFlags.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700"
                  >
                    Sustainable
                  </motion.span>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{project.summary}</p>
              <motion.div 
                className="mt-4 flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {project.services.slice(0, 3).map((service, index) => (
                  <motion.span
                    key={service}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground cursor-default"
                  >
                    {service}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}



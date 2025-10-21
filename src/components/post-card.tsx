'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Post } from '@/types'
import { formatDate, cn } from '@/lib/utils'
import { Clock, ArrowUpRight } from 'lucide-react'

interface PostCardProps {
  post: Post
  className?: string
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className={cn('group block', className)}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <Card className="overflow-hidden border-0 shadow-md hover:shadow-2xl transition-shadow duration-300">
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="w-full h-full"
            >
              <Image
                src={post.coverImage}
                alt={post.title}
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
              <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <motion.div 
                  className="flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime}</span>
                </motion.div>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
              <motion.div 
                className="mt-4 flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {post.tags.slice(0, 3).map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground cursor-default"
                  >
                    {tag}
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



import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import readingTime from 'reading-time'
import { Project, Post, Testimonial } from '@/types'

const contentDirectory = path.join(process.cwd(), 'content')

export async function getProjects(): Promise<Project[]> {
  const projectsDirectory = path.join(contentDirectory, 'projects')
  
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(projectsDirectory)
  const projects = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith('.mdx'))
      .map(async (filename) => {
        const filePath = path.join(projectsDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents)
        
        return {
          ...data,
          slug: filename.replace(/\.mdx$/, ''),
        } as Project
      })
  )

  return projects.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getProject(slug: string): Promise<{ project: Project; content: React.ReactElement } | null> {
  const filePath = path.join(contentDirectory, 'projects', `${slug}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content: mdxContent } = matter(fileContents)

  const { content } = await compileMDX({
    source: mdxContent,
    options: { parseFrontmatter: true },
  })

  return {
    project: { ...data, slug } as Project,
    content,
  }
}

export async function getPosts(): Promise<Post[]> {
  const postsDirectory = path.join(contentDirectory, 'posts')
  
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(postsDirectory)
  const posts = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith('.mdx'))
      .map(async (filename) => {
        const filePath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)
        const stats = readingTime(content)
        
        return {
          ...data,
          slug: filename.replace(/\.mdx$/, ''),
          readingTime: stats.text,
          content,
        } as Post
      })
  )

  return posts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getPost(slug: string): Promise<{ post: Post; content: React.ReactElement } | null> {
  const filePath = path.join(contentDirectory, 'posts', `${slug}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content: mdxContent } = matter(fileContents)
  const stats = readingTime(mdxContent)

  const { content } = await compileMDX({
    source: mdxContent,
    options: { parseFrontmatter: true },
  })

  return {
    post: { 
      ...data, 
      slug,
      readingTime: stats.text,
    } as Post,
    content,
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const testimonialsDirectory = path.join(contentDirectory, 'testimonials')
  
  if (!fs.existsSync(testimonialsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(testimonialsDirectory)
  const testimonials = filenames
    .filter((filename) => filename.endsWith('.json'))
    .map((filename) => {
      const filePath = path.join(testimonialsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      return JSON.parse(fileContents) as Testimonial
    })

  return testimonials.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}


import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPost, getPosts } from '@/lib/mdx'
import { generatePageMetadata } from '@/lib/seo'
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/json-ld'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const result = await getPost(params.slug)
  if (!result) return {}

  const { post } = result
  
  return generatePageMetadata({
    title: `${post.title} | Packaging Design Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    path: `/blog/${post.slug}`,
    ogImage: post.coverImage,
  })
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const result = await getPost(params.slug)
  
  if (!result) {
    notFound()
  }

  const { post, content } = result

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ]

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateArticleSchema(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)) }}
      />

      <article className="container-narrow py-12">
        <Breadcrumbs
          items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]}
          className="mb-8"
        />

        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-muted-foreground">{post.excerpt}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {content}
        </div>

        {/* Author Box */}
        <div className="border-t border-b py-8 my-12">
          <div className="flex items-start gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-muted">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <div className="font-semibold mb-1">{post.author.name}</div>
              {post.author.bio && (
                <p className="text-sm text-muted-foreground">{post.author.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-muted/40 rounded-2xl p-12">
          <h3 className="text-2xl font-bold mb-4">Need Expert Packaging Design?</h3>
          <p className="text-muted-foreground mb-6">
            Let&apos;s discuss how I can help bring your packaging vision to life.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </article>
    </>
  )
}


import { getPosts } from '@/lib/mdx'
import { PostCard } from '@/components/post-card'
import { generatePageMetadata } from '@/lib/seo'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata = generatePageMetadata({
  title: 'Packaging Design Blog | Tips, Trends & Industry Insights',
  description:
    'Expert insights on packaging design, sustainable materials, FMCG trends, and design best practices. Learn from real-world projects and industry experience.',
  keywords: [
    'packaging design blog',
    'packaging trends',
    'sustainable packaging tips',
    'FMCG packaging insights',
  ],
  path: '/blog',
})

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="container-wide py-12">
      <Breadcrumbs items={[{ label: 'Blog' }]} className="mb-8" />
      
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Insights on packaging design, sustainable materials, industry trends, and practical tips
          from years of experience designing for leading brands.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts found.</p>
        </div>
      )}
    </div>
  )
}



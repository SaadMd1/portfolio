import { getPosts } from '@/lib/mdx'
import { SITE_CONFIG } from '@/lib/constants'

export async function GET() {
  const posts = await getPosts()

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_CONFIG.name} - Blog</title>
    <link>${SITE_CONFIG.url}/blog</link>
    <description>${SITE_CONFIG.description}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_CONFIG.url}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_CONFIG.url}/blog/${post.slug}</link>
      <guid>${SITE_CONFIG.url}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
    </item>
    `
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  })
}



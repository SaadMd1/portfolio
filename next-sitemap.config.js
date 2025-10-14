/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdesignstudio.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/api/*', '/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdesignstudio.com'}/server-sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq based on path
    let priority = 0.5
    let changefreq = 'weekly'

    if (path === '/') {
      priority = 0.9
      changefreq = 'daily'
    } else if (path.startsWith('/work') || path.startsWith('/services')) {
      priority = 0.8
      changefreq = 'weekly'
    } else if (path.startsWith('/about') || path.startsWith('/blog') || path.startsWith('/contact')) {
      priority = 0.7
      changefreq = 'weekly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}



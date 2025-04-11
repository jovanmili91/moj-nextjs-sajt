/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.projektikuce.rs',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin/*', '/404', '/500'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.projektikuce.rs/server-sitemap.xml', // Za dinamički sadržaj (opciono)
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};

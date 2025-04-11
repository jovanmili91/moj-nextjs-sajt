import { getServerSideSitemap } from 'next-sitemap';
import { getProjects } from '@/lib/getProjects';
import { getBlogs } from '@/lib/getBlogs';

export async function GET(request) {
  try {
    console.log('GET za server-sitemap.xml započet');

    // Preuzimanje svih projekata
    const projects = await getProjects();
    console.log(`Pronađeno ${projects.length} projekata`);

    // Kreiranje URL-ova za projekte
    const projectUrls = projects.map((project) => ({
      loc: `https://www.projektikuce.rs/projekti-kuce/${project.id}`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8,
    }));

    // Preuzimanje svih blogova
    const blogs = await getBlogs();
    console.log(`Pronađeno ${blogs.length} blogova`);

    // Kreiranje URL-ova za blogove
    const blogUrls = blogs.map((blog) => ({
      loc: `https://www.projektikuce.rs/blog/${blog.slug}`,
      lastmod: blog.updatedAt || new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    }));

    // Dodavanje statičkih stranica
    const staticUrls = [
      {
        loc: 'https://www.projektikuce.rs',
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 1.0,
      },
      {
        loc: 'https://www.projektikuce.rs/blog',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.9,
      },
      {
        loc: 'https://www.projektikuce.rs/projekti-kuce',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.9,
      },
      {
        loc: 'https://www.projektikuce.rs/o-nama',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.7,
      },
      {
        loc: 'https://www.projektikuce.rs/kontakt',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.7,
      },
      {
        loc: 'https://www.projektikuce.rs/usluge',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.7,
      },
    ];

    // Kombinovanje svih URL-ova
    const allUrls = [...staticUrls, ...projectUrls, ...blogUrls];
    console.log(`Generisano ${allUrls.length} URL-ova za sitemap`);

    // Generisanje sitemap-a
    return getServerSideSitemap(allUrls);
  } catch (error) {
    console.error('Greška u server-sitemap.xml:', error);
    return new Response('Greška pri generisanju sitemap-a', { status: 500 });
  }
}

export const dynamic = 'force-dynamic';

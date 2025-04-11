import { getServerSideSitemap } from 'next-sitemap';
import { getProjects } from '@/lib/getProjects';

export async function GET(request) {
  // Preuzimanje svih projekata
  const projects = await getProjects();

  // Kreiranje URL-ova za projekte
  const projectUrls = projects.map((project) => ({
    loc: `https://www.projektikuce.rs/projekti-kuce/${project.id}`,
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: 0.8,
  }));

  // Generisanje sitemap-a
  return getServerSideSitemap([...projectUrls]);
}

export const dynamic = 'force-dynamic';

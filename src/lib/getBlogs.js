import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { PATHS } from './constants';

// Putanja do blog postova
const BLOG_DIR = PATHS.BLOG_DIR;
const DEFAULT_IMAGE = '/images/placeholder-blog.webp';

// Funkcija za pribavljanje svih blog postova
export async function getBlogs() {
  try {
    // Provera da li direktorijum postoji
    try {
      await fs.access(BLOG_DIR);
    } catch (error) {
      console.error(`Blog direktorijum ne postoji: ${BLOG_DIR}`);
      console.error('Kreiranje direktorijuma...');
      try {
        await fs.mkdir(BLOG_DIR, { recursive: true });
        return []; // Vrati prazan niz jer nemamo blogove još uvek
      } catch (mkdirError) {
        console.error('Greška pri kreiranju direktorijuma:', mkdirError);
        return [];
      }
    }

    const files = await fs.readdir(BLOG_DIR);

    // Filtriranje samo markdown fajlova i mapiranje u blog objekte
    const blogsPromises = files
      .filter(
        (filename) => filename.endsWith('.md') || filename.endsWith('.mdx')
      )
      .map(async (filename) => {
        const filePath = path.join(BLOG_DIR, filename);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        const slug = filename.replace(/\.(md|mdx)$/, '');

        // Debugging frontmatter-a

        // Kreiranje kompletnog blog objekta
        return {
          id: data.id || slug,
          slug,
          title: data.title || 'Blog post',
          description: data.description || 'Ovaj blog post nema opis',
          imageURL: data.imageURL || DEFAULT_IMAGE, // Provera da li je defined
          tags: data.tags || [],
          author: data.author || 'Projekti Kuća Tim',
          publishedAt: data.publishedAt || new Date().toISOString(),
          updatedAt:
            data.updatedAt || data.publishedAt || new Date().toISOString(),
          readTime: data.readTime || calculateReadTime(content),
          featured: data.featured || false,
          keywords:
            data.keywords ||
            'projektovanje kuće, projektovanje kuća, blog, saveti',
          content, // Dodajemo kompletan sadržaj markdown fajla
        };
      });

    const blogs = await Promise.all(blogsPromises);

    // Logovanje pronađenih blogova za debugging
    blogs.forEach((blog) => {});

    // Sortiranje blogova po datumu objave (od najnovijeg ka najstarijem)
    return blogs.sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );
  } catch (error) {
    console.error('Greška prilikom učitavanja blogova:', error);
    return [];
  }
}

// ... (ostale funkcije getBlogById, getBlogBySlug, itd. ostaju iste)

// Funkcija za dobijanje blog posta po ID-u
export async function getBlogById(id) {
  try {
    const blogs = await getBlogs();
    const blog = blogs.find((blog) => blog.id.toString() === id.toString());
    return blog || null;
  } catch (error) {
    console.error(`Greška prilikom dobavljanja bloga sa ID-om ${id}:`, error);
    return null;
  }
}

// Funkcija za dobijanje blog posta po slug-u
export async function getBlogBySlug(slug) {
  try {
    const blogs = await getBlogs();
    // Uklanjanje eventualnog trailing slash iz slug-a
    const normalizedSlug = slug.replace(/\/$/, '');

    const blog = blogs.find((blog) => blog.slug === normalizedSlug);

    if (blog) {
    } else {
    }

    return blog || null;
  } catch (error) {
    console.error(
      `Greška prilikom dobavljanja bloga sa slug-om ${slug}:`,
      error
    );
    return null;
  }
}

// Funkcija za dobijanje blogova po kategoriji/tagu
export async function getBlogsByTag(tag) {
  try {
    if (!tag) {
      return await getBlogs();
    }

    const blogs = await getBlogs();
    return blogs.filter((blog) =>
      blog.tags.some((blogTag) => blogTag.toLowerCase() === tag.toLowerCase())
    );
  } catch (error) {
    console.error(`Greška prilikom filtriranja blogova po tagu ${tag}:`, error);
    return [];
  }
}

// Funkcija za dobijanje najnovijih blogova
export async function getLatestBlogs(count = 3) {
  try {
    const blogs = await getBlogs();
    // Već su sortirani po datumu u getBlogs funkciji
    return blogs.slice(0, count);
  } catch (error) {
    console.error(`Greška prilikom dobavljanja najnovijih blogova:`, error);
    return [];
  }
}

// Funkcija za dobijanje istaknutih blogova
export async function getFeaturedBlogs() {
  try {
    const blogs = await getBlogs();
    return blogs.filter((blog) => blog.featured);
  } catch (error) {
    console.error(`Greška prilikom dobavljanja istaknutih blogova:`, error);
    return [];
  }
}

// Pomoćna funkcija za izračunavanje vremena čitanja
function calculateReadTime(content) {
  const wordsPerMinute = 200; // Prosečna brzina čitanja
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return readTime < 1 ? 1 : readTime; // Minimum 1 minut
}

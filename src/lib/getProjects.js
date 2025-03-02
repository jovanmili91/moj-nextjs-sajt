// src/lib/getProjects.js
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

// Konstante za putanju do projekata i podrazumevanu sliku
const PROJECTS_DIR = path.join(
  process.cwd(),
  'src',
  'app',
  'content',
  'projects'
);
const DEFAULT_IMAGE = '/images/placeholder-project.webp';

// Funkcija za pribavljanje svih projekata
export async function getProjects() {
  try {
    const files = await fs.readdir(PROJECTS_DIR);

    // Filtriranje samo markdown fajlova i mapiranje u projekat objekte
    const projectsPromises = files
      .filter((filename) => filename.endsWith('.md'))
      .map(async (filename) => {
        const filePath = path.join(PROJECTS_DIR, filename);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        const slug = filename.replace(/\.md$/, '');

        // Izdvajanje specifikacija iz frontmatter-a
        const specifications = {
          size: data.size || data.area || 'Nije navedeno',
          floors: data.floors || 'Nije navedeno',
          bedrooms: data.bedrooms || 'Nije navedeno',
          bathrooms: data.bathrooms || 'Nije navedeno',
          energyClass: data.energyClass || 'Nije navedeno',
        };

        // Kreiranje kompletnog projekta
        return {
          id: data.id || slug,
          slug,
          title: data.title || 'Projekat kuće',
          description:
            data.description ||
            'Detaljan projekat kuće sa svim potrebnim specifikacijama',
          imageURL: data.imageURL || DEFAULT_IMAGE,
          tags: data.tags || [],
          area: data.area || 'Nije navedeno',
          location: data.location || 'Nije navedeno',
          featured: data.featured || false,
          keywords:
            data.keywords ||
            'projektovanje kuće, projektovanje kuća, idejno rešenje, projekat kuće',
          updatedAt: data.updatedAt || new Date().toISOString(),
          completionYear: data.completionYear || 'Nije navedeno',
          price: data.price,
          specifications,
          images: data.images || [], // Dodajemo ovo novo polje za niz slika
          features: data.features || [],
          content,
        };
      });

    const projects = await Promise.all(projectsPromises);

    // Sortiranje projekata
    return projects.sort((a, b) => {
      // Prvo po featured statusu
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1;
      }

      // Zatim po ID-u ako su brojevi
      if (!isNaN(a.id) && !isNaN(b.id)) {
        return parseInt(a.id) - parseInt(b.id);
      }

      // Alternativno po stringovima
      return a.id.localeCompare(b.id);
    });
  } catch (error) {
    console.error('Greška prilikom učitavanja projekata:', error);
    return [];
  }
}

// Funkcija za dobijanje projekta po ID-u
export async function getProjectById(id) {
  try {
    const projects = await getProjects();
    const project = projects.find(
      (project) => project.id.toString() === id.toString()
    );
    return project || null;
  } catch (error) {
    console.error(
      `Greška prilikom dobavljanja projekta sa ID-om ${id}:`,
      error
    );
    return null;
  }
}

// Funkcija za dobijanje projekata po kategoriji
export async function getProjectsByCategory(category) {
  try {
    if (!category) {
      return await getProjects();
    }

    const projects = await getProjects();
    return projects.filter((project) =>
      project.tags.some((tag) => tag.toLowerCase() === category.toLowerCase())
    );
  } catch (error) {
    console.error(
      `Greška prilikom filtriranja projekata po kategoriji ${category}:`,
      error
    );
    return [];
  }
}

// Funkcija za dobijanje najnovijih projekata
export async function getLatestProjects(count = 3) {
  try {
    const projects = await getProjects();
    // Sortiranje po datumu updatedAt i ograničavanje broja vraćenih projekata
    return projects
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, count);
  } catch (error) {
    console.error(`Greška prilikom dobavljanja najnovijih projekata:`, error);
    return [];
  }
}

// Funkcija za dobijanje istaknutih projekata
export async function getFeaturedProjects() {
  try {
    const projects = await getProjects();
    return projects.filter((project) => project.featured);
  } catch (error) {
    console.error(`Greška prilikom dobavljanja istaknutih projekata:`, error);
    return [];
  }
}

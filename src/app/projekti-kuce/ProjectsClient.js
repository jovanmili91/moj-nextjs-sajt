// src/app/projekti-kuce/ProjectsClient.js
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Fallback projekti za slučaj greške
const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'Demo projekat moderne kuće',
    description:
      'Ovo je demo projekat koji se prikazuje kada API nije dostupan.',
    imageURL: '/placeholders/low-res-image.webp',
    tags: ['moderno', 'porodično'],
    location: 'Demo lokacija',
    area: '200m²',
    featured: true,
  },
];

// Tag komponenta
const ProjectTag = ({ text }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.2 }}
    className="bg-[var(--primary)]/[0.1] hover:bg-[var(--primary)]/[0.15] mb-2 mr-2 inline-block rounded-full px-3 py-1 text-xs font-medium text-[var(--primary)] transition-colors"
  >
    {text}
  </motion.span>
);

// Project Card komponenta
const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href={`/projekti-kuce/${project.id}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        aria-label={`Pogledaj projekat: ${project.title}`}
      >
        {project.featured && (
          <div className="absolute left-0 top-4 z-10 rounded-r-lg bg-[var(--accent)] px-4 py-1 text-xs font-bold text-white shadow-md">
            Popularno
          </div>
        )}
        <div className="relative overflow-hidden">
          <Image
            src={project.imageURL}
            alt={`${project.title} - Projektovanje kuće`}
            width={500}
            height={300}
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/placeholders/low-res-image.webp"
            onError={(e) => {
              e.target.src = '/placeholders/low-res-image.webp';
              console.error(`Failed to load image for project: ${project.id}`);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="flex flex-grow flex-col p-6">
          <h2 className="mb-3 text-xl font-bold text-[var(--neutral-800)] transition-colors duration-300 group-hover:text-[var(--primary)]">
            {project.title}
          </h2>
          <p className="mb-4 flex-grow text-[var(--neutral-600)]">
            {project.description}
          </p>
          <div className="mt-auto flex flex-wrap">
            {project.tags?.map((tag, index) => (
              <ProjectTag key={index} text={tag} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-sm text-[var(--neutral-500)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {project.location}
              <span className="mx-2">•</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              {project.area}
            </div>
            <span className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition-colors duration-300 group-hover:bg-[var(--accent)]">
              Više detalja
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Glavna klijentska komponenta
export default function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Dohvatanje projekata
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/projects?' + new Date().getTime());

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error('Projects data is not an array:', data);
          setError('Format podataka nije validan.');
          setProjects([]);
          return;
        }

        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(
          'Došlo je do greške prilikom učitavanja projekata. Prikazuju se demo projekti.'
        );
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filtriranje i sortiranje projekata
  const filteredProjects = useMemo(() => {
    if (!projects.length) return [];

    let filtered = [...projects];

    if (activeFilter !== 'all') {
      filtered = projects.filter((project) =>
        project.tags?.some(
          (tag) => tag.toLowerCase() === activeFilter.toLowerCase()
        )
      );
    }

    if (sortOrder === 'newest') {
      filtered.sort((a, b) => b.id - a.id);
    } else if (sortOrder === 'oldest') {
      filtered.sort((a, b) => a.id - b.id);
    } else if (sortOrder === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [projects, activeFilter, sortOrder]);

  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative flex h-[60vh] items-center justify-center bg-gradient-to-br from-[var(--primary-dark)] via-blue-700 to-[var(--accent)] text-white">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/projects-hero.webp"
              alt="Projektovanje kuća - Naši Projekti"
              fill
              className="object-cover opacity-30"
              quality={85}
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL="/placeholders/hero-low-res.webp"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 mx-auto max-w-7xl px-4 text-center"
          >
            <h1 className="mb-6 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
              Projektovanje Kuća - Naši Projekti
            </h1>
            <p className="mx-auto max-w-3xl text-lg md:text-xl">
              Profesionalno projektovanje kuća koje spaja estetiku,
              funkcionalnost i održivost za vaš idealan dom.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/usluge"
                className="rounded-full bg-white px-8 py-3 text-lg font-semibold text-[var(--primary)] shadow-lg transition-all hover:bg-[var(--neutral-100)] hover:shadow-xl"
              >
                Naše usluge
              </Link>
              <Link
                href="/kontakt"
                className="hover:bg-[var(--accent)]/[0.9] rounded-full bg-[var(--accent)] px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl"
              >
                Besplatna konsultacija
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Intro Section */}
        <section className="bg-[var(--neutral-100)] py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl px-4 text-center"
          >
            <h2 className="mb-6 text-3xl font-bold text-[var(--neutral-800)]">
              Profesionalno projektovanje kuća po vašoj meri
            </h2>
            <p className="mb-4 text-lg text-[var(--neutral-600)]">
              Naš tim arhitekata specijalizovan je za projektovanje kuća svih
              stilova i veličina. Kroz inovativno projektovanje kuće stvaramo
              domove koji odgovaraju vašem načinu života, budžetu i lokaciji.
            </p>
            <p className="text-lg text-[var(--neutral-600)]">
              Razgledajte našu kolekciju projekata i pronađite inspiraciju za
              svoj budući dom. Svaki projekat odražava našu posvećenost
              kvalitetu i detaljima u procesu projektovanja.
            </p>
          </motion.div>
        </section>

        {/* Portfolio Collection */}
        <section className="bg-[var(--background)] py-20">
          <div className="mx-auto max-w-7xl px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center text-3xl font-bold text-[var(--neutral-800)] md:text-4xl"
            >
              Naša portfolio kolekcija projekata kuća
            </motion.h2>

            <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                    activeFilter === 'all'
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--neutral-200)] text-[var(--neutral-700)] hover:bg-[var(--neutral-300)]'
                  }`}
                >
                  Svi projekti
                </button>
                <button
                  onClick={() => handleFilterChange('moderno')}
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                    activeFilter === 'moderno'
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--neutral-200)] text-[var(--neutral-700)] hover:bg-[var(--neutral-300)]'
                  }`}
                >
                  Moderne kuće
                </button>
                <button
                  onClick={() => handleFilterChange('porodično')}
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                    activeFilter === 'porodično'
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--neutral-200)] text-[var(--neutral-700)] hover:bg-[var(--neutral-300)]'
                  }`}
                >
                  Porodične kuće
                </button>
                <button
                  onClick={() => handleFilterChange('održivo')}
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                    activeFilter === 'održivo'
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--neutral-200)] text-[var(--neutral-700)] hover:bg-[var(--neutral-300)]'
                  }`}
                >
                  Eko kuće
                </button>
              </div>
              <select
                onChange={handleSortChange}
                value={sortOrder}
                className="rounded-lg border border-[var(--neutral-300)] bg-white px-4 py-2 text-sm text-[var(--neutral-700)]"
              >
                <option value="newest">Najnovije prvo</option>
                <option value="oldest">Najstarije prvo</option>
                <option value="name">Abecedno</option>
              </select>
            </div>

            {isLoading ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="h-[450px] animate-pulse rounded-xl bg-gray-200"
                  ></div>
                ))}
              </div>
            ) : error ? (
              <div className="py-10 text-center text-lg text-[var(--neutral-600)]">
                {error}
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects
                  .slice(
                    (currentPage - 1) * projectsPerPage,
                    currentPage * projectsPerPage
                  )
                  .map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                {filteredProjects.length === 0 && (
                  <div className="col-span-full py-10 text-center text-lg text-[var(--neutral-600)]">
                    Nažalost, nema projekata koji odgovaraju izabranom filteru.
                  </div>
                )}
              </div>
            )}

            {filteredProjects.length > 0 && !isLoading && !error && (
              <div className="mt-12 flex justify-center">
                <nav
                  className="inline-flex rounded-md shadow-sm"
                  aria-label="Navigacija kroz stranice"
                >
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`rounded-l-md border border-r-0 border-[var(--neutral-300)] bg-white px-4 py-2 text-sm font-medium ${
                      currentPage === 1
                        ? 'cursor-not-allowed text-[var(--neutral-400)]'
                        : 'text-[var(--neutral-500)] hover:bg-[var(--neutral-50)]'
                    } transition-colors`}
                  >
                    Prethodna
                  </button>
                  {Array.from({
                    length: Math.ceil(
                      filteredProjects.length / projectsPerPage
                    ),
                  }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`border border-[var(--neutral-300)] px-4 py-2 text-sm font-medium ${
                        currentPage === i + 1
                          ? 'bg-[var(--primary)]/[0.1] border-[var(--primary)] text-[var(--primary)]'
                          : 'bg-white text-[var(--neutral-500)] hover:bg-[var(--neutral-50)]'
                      } transition-colors`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(
                          prev + 1,
                          Math.ceil(filteredProjects.length / projectsPerPage)
                        )
                      )
                    }
                    disabled={
                      currentPage ===
                      Math.ceil(filteredProjects.length / projectsPerPage)
                    }
                    className={`rounded-r-md border border-l-0 border-[var(--neutral-300)] bg-white px-4 py-2 text-sm font-medium ${
                      currentPage ===
                      Math.ceil(filteredProjects.length / projectsPerPage)
                        ? 'cursor-not-allowed text-[var(--neutral-400)]'
                        : 'text-[var(--neutral-500)] hover:bg-[var(--neutral-50)]'
                    } transition-colors`}
                  >
                    Sledeća
                  </button>
                </nav>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-[var(--neutral-100)] py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl px-4 text-center"
          >
            <h2 className="mb-10 text-3xl font-bold text-[var(--neutral-800)]">
              Šta klijenti kažu o našem projektovanju kuća
            </h2>
            <div className="ring-[var(--primary)]/20 relative mx-auto mb-10 h-20 w-20 overflow-hidden rounded-full ring-4">
              <Image
                src="/images/client-avatar.webp"
                alt="Zadovoljni klijent"
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <blockquote className="mb-8 text-xl italic text-[var(--neutral-600)]">
              "Proces projektovanja kuće sa njihovim timom bio je izvanredno
              pozitivno iskustvo. Od početnog koncepta do finalnih detalja,
              svaka faza projektovanja bila je temeljno objašnjena. Naš novi dom
              je savršen spoj funkcionalnosti i estetike."
            </blockquote>
            <p className="font-semibold text-[var(--neutral-800)]">
              Marko Petrović, Paraćin
            </p>
            <div className="mt-8 flex justify-center space-x-2">
              <button className="h-2 w-8 rounded-full bg-[var(--primary)]"></button>
              <button className="h-2 w-2 rounded-full bg-[var(--neutral-300)] hover:bg-[var(--neutral-400)]"></button>
              <button className="h-2 w-2 rounded-full bg-[var(--neutral-300)] hover:bg-[var(--neutral-400)]"></button>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[var(--primary-dark)] to-[var(--accent)] py-20 text-white">
          <div className="absolute inset-0 z-0 opacity-10">
            <Image
              src="/images/cta-background.webp"
              alt="Pozadina"
              fill
              className="object-cover"
              quality={60}
              sizes="100vw"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative z-10 mx-auto max-w-7xl px-4 text-center"
          >
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Spremni za projektovanje vaše idealne kuće?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg">
              Kontaktirajte nas za besplatnu konsultaciju i saznajte kako vam
              naš tim može pomoći da ostvarite vaše snove o savršenom domu kroz
              profesionalno projektovanje kuće.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/kontakt"
                  className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-[var(--primary)] shadow-lg transition-all hover:bg-[var(--neutral-100)] hover:shadow-xl"
                >
                  Započnite projekat odmah
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/usluge/projektovanje-kuca"
                  className="rounded-full border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10"
                >
                  Saznajte više o procesu
                </Link>
              </motion.div>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-center"
              >
                <svg
                  className="mr-2 h-6 w-6 text-[var(--accent)]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Besplatna konsultacija</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex items-center"
              >
                <svg
                  className="mr-2 h-6 w-6 text-[var(--accent)]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Iskusni arhitekte</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="flex items-center"
              >
                <svg
                  className="mr-2 h-6 w-6 text-[var(--accent)]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Projekti po meri</span>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10 text-center text-3xl font-bold text-[var(--neutral-800)]"
            >
              Često postavljana pitanja o projektovanju kuća
            </motion.h2>
            <div className="space-y-6">
              <details className="rounded-lg border border-[var(--neutral-200)] p-4 transition-all hover:shadow-md">
                <summary className="cursor-pointer text-lg font-medium text-[var(--neutral-800)]">
                  Koliko traje proces projektovanja kuće?
                </summary>
                <div className="mt-4 text-[var(--neutral-600)]">
                  Proces projektovanja kuće obično traje između 2 i 6 meseci,
                  zavisno od složenosti projekta, potrebnih dozvola i vaših
                  specifičnih zahteva. Naš tim radi efikasno kako bi vam
                  isporučio kvalitetan projekat u najkraćem mogućem roku.
                </div>
              </details>
              <details className="rounded-lg border border-[var(--neutral-200)] p-4 transition-all hover:shadow-md">
                <summary className="cursor-pointer text-lg font-medium text-[var(--neutral-800)]">
                  Koji su troškovi projektovanja kuće?
                </summary>
                <div className="mt-4 text-[var(--neutral-600)]">
                  Troškovi projektovanja kuće zavise od veličine objekta,
                  složenosti dizajna i potrebne dokumentacije. Nudimo
                  transparentno određivanje cena i detaljnu ponudu pre početka
                  projekta kako biste imali jasnu sliku o investiciji.
                </div>
              </details>
              <details className="rounded-lg border border-[var(--neutral-200)] p-4 transition-all hover:shadow-md">
                <summary className="cursor-pointer text-lg font-medium text-[var(--neutral-800)]">
                  Da li mogu videti 3D model kuće pre izgradnje?
                </summary>
                <div className="mt-4 text-[var(--neutral-600)]">
                  Da, za sve naše projekte izrađujemo detaljne 3D vizualizacije
                  koje vam omogućavaju da vidite kako će vaša kuća izgledati pre
                  nego što izgradnja počne. Ovo vam pomaže da bolje razumete
                  prostorne odnose i estetiku vašeg budućeg doma.
                </div>
              </details>
              <details className="rounded-lg border border-[var(--neutral-200)] p-4 transition-all hover:shadow-md">
                <summary className="cursor-pointer text-lg font-medium text-[var(--neutral-800)]">
                  Kakve dozvole su potrebne za gradnju kuće?
                </summary>
                <div className="mt-4 text-[var(--neutral-600)]">
                  Za izgradnju kuće potrebno je pribaviti lokacijske uslove,
                  građevinsku dozvolu i druge saglasnosti u skladu sa važećim
                  propisima. Naš tim vam pruža potpunu podršku u procesu
                  dobijanja svih potrebnih dozvola za vaš projekat.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="bg-[var(--neutral-100)] py-16">
          <div className="mx-auto max-w-7xl px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10 text-center text-3xl font-bold text-[var(--neutral-800)]"
            >
              Srodne usluge projektovanja
            </motion.h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <motion.div
                whileHover={{ y: -10 }}
                className="rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="bg-[var(--primary)]/[0.1] mb-4 h-12 w-12 rounded-full p-3 text-[var(--primary)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016a11.955 11.955 0 01-8.618 3.004 11.955 11.955 0 01-8.618-3.004M9 12l2 2 4-4"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[var(--neutral-800)]">
                  Idejni projekti
                </h3>
                <p className="mb-4 text-[var(--neutral-600)]">
                  Razrada konceptualnog rešenja vašeg budućeg doma sa fokusom na
                  funkcionalnost i estetiku. Prva faza u procesu projektovanja
                  kuće.
                </p>
                <Link
                  href="/usluge/idejni-projekti"
                  className="inline-flex items-center text-[var(--primary)] transition-colors hover:text-[var(--primary-dark)]"
                >
                  Saznajte više
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -10 }}
                className="rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="bg-[var(--primary)]/[0.1] mb-4 h-12 w-12 rounded-full p-3 text-[var(--primary)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[var(--neutral-800)]">
                  Glavni projekti
                </h3>
                <p className="mb-4 text-[var(--neutral-600)]">
                  Detaljna tehnička dokumentacija neophodna za dobijanje
                  građevinske dozvole i izvođenje radova. Ključni element u
                  projektovanju kuće.
                </p>
                <Link
                  href="/usluge/glavni-projekti"
                  className="inline-flex items-center text-[var(--primary)] transition-colors hover:text-[var(--primary-dark)]"
                >
                  Saznajte više
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -10 }}
                className="rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="bg-[var(--primary)]/[0.1] mb-4 h-12 w-12 rounded-full p-3 text-[var(--primary)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[var(--neutral-800)]">
                  Energetska efikasnost
                </h3>
                <p className="mb-4 text-[var(--neutral-600)]">
                  Projektovanje energetski efikasnih rešenja koja smanjuju
                  troškove i čuvaju životnu sredinu. Savremeni pristup
                  projektovanju kuća.
                </p>
                <Link
                  href="/usluge/energetska-efikasnost"
                  className="inline-flex items-center text-[var(--primary)] transition-colors hover:text-[var(--primary-dark)]"
                >
                  Saznajte više
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SEO Rich Snippet */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Projekti Kuća - Profesionalno projektovanje kuća',
              description:
                'Profesionalno projektovanje kuća koje spaja estetiku, funkcionalnost i održivost za vaš idealan dom.',
              image: 'https://www.projektikuce.rs/images/projects-hero.webp',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Paraćin',
                addressRegion: 'Serbia',
              },
              telephone: '+381123456789',
              url: 'https://www.projektikuce.rs/projekti-kuce',
              priceRange: '€€€',
              openingHours: 'Mo-Fr 09:00-17:00',
              sameAs: [
                'https://www.facebook.com/projektikuce',
                'https://www.instagram.com/projektikuce',
              ],
            }),
          }}
        />
      </main>
    </div>
  );
}

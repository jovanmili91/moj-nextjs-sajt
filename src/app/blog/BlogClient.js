'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Fallback blogovi za slučaj greške
const FALLBACK_BLOGS = [
  {
    id: 1,
    title: 'Demo blog post',
    description:
      'Ovo je demo blog post koji se prikazuje kada API nije dostupan.',
    imageURL: '/placeholders/low-res-image.webp',
    tags: ['saveti', 'projektovanje'],
    author: 'Demo Autor',
    publishedAt: new Date().toISOString(),
    readTime: 5,
    featured: true,
  },
];

// Tag komponenta
const BlogTag = ({ text }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.2 }}
    className="bg-[var(--primary)]/[0.1] hover:bg-[var(--primary)]/[0.15] mb-2 mr-2 inline-block rounded-full px-3 py-1 text-xs font-medium text-[var(--primary)] transition-colors"
  >
    {text}
  </motion.span>
);

// Blog Card komponenta
const BlogCard = ({ blog }) => {
  // Formatiranje datuma
  const formattedDate = new Date(blog.publishedAt).toLocaleDateString('sr-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href={`/blog/${blog.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        aria-label={`Pročitaj članak: ${blog.title}`}
      >
        {blog.featured && (
          <div className="absolute left-0 top-4 z-10 rounded-r-lg bg-[var(--accent)] px-4 py-1 text-xs font-bold text-white shadow-md">
            Izdvojeno
          </div>
        )}
        <div className="relative overflow-hidden">
          <Image
            src={blog.imageURL}
            alt={`${blog.title} - Blog o projektovanju kuća`}
            width={500}
            height={300}
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/placeholders/low-res-image.webp"
            onError={(e) => {
              e.target.src = '/placeholders/low-res-image.webp';
              console.error(`Failed to load image for blog: ${blog.id}`);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="flex flex-grow flex-col p-6">
          <h2 className="mb-3 text-xl font-bold text-[var(--neutral-800)] transition-colors duration-300 group-hover:text-[var(--primary)]">
            {blog.title}
          </h2>
          <p className="mb-4 flex-grow text-[var(--neutral-600)]">
            {blog.description}
          </p>
          <div className="mt-auto flex flex-wrap">
            {blog.tags?.map((tag, index) => (
              <BlogTag key={index} text={tag} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-[var(--neutral-500)]">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              {blog.readTime} min čitanja
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              {formattedDate}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Glavna klijentska komponenta
export default function BlogClient() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [blogs, setBlogs] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Dohvatanje blogova
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/blogs?' + new Date().getTime());

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error('Blogs data is not an array:', data);
          setError('Format podataka nije validan.');
          setBlogs([]);
          return;
        }

        setBlogs(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(
          'Došlo je do greške prilikom učitavanja blogova. Prikazuju se demo blogovi.'
        );
        setBlogs(FALLBACK_BLOGS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filtriranje i sortiranje blogova
  const filteredBlogs = useMemo(() => {
    if (!blogs.length) return [];

    let filtered = [...blogs];

    if (activeFilter !== 'all') {
      filtered = blogs.filter((blog) =>
        blog.tags?.some(
          (tag) => tag.toLowerCase() === activeFilter.toLowerCase()
        )
      );
    }

    if (sortOrder === 'newest') {
      filtered.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
    } else if (sortOrder === 'oldest') {
      filtered.sort(
        (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
      );
    } else if (sortOrder === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [blogs, activeFilter, sortOrder]);

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
              src="/images/blog-hero.webp"
              alt="Blog o projektovanju kuća"
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
              Blog o projektovanju kuća
            </h1>
            <p className="mx-auto max-w-3xl text-lg md:text-xl">
              Saveti, inspiracija i stručni članci o projektovanju i izgradnji
              savršenog doma.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/projekti-kuce"
                className="rounded-full bg-white px-8 py-3 text-lg font-semibold text-[var(--primary)] shadow-lg transition-all hover:bg-[var(--neutral-100)] hover:shadow-xl"
              >
                Pogledajte naše projekte
              </Link>
              <Link
                href="/kontakt"
                className="hover:bg-[var(--accent)]/[0.9] rounded-full bg-[var(--accent)] px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl"
              >
                Kontaktirajte nas
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
              Sve o projektovanju kuća na jednom mestu
            </h2>
            <p className="mb-4 text-lg text-[var(--neutral-600)]">
              Naš blog donosi vam najnovije trendove, savete i stručne
              informacije iz sveta arhitekture i projektovanja. Istražite članke
              o različitim aspektima projektovanja kuća i pronađite inspiraciju
              za svoj dom.
            </p>
            <p className="text-lg text-[var(--neutral-600)]">
              Od idejnog rešenja do finalne izvedbe, saznajte sve o procesu
              projektovanja kuće kroz naše stručne tekstove.
            </p>
          </motion.div>
        </section>

        {/* Blog Posts Collection */}
        <section className="bg-[var(--background)] py-20">
          <div className="mx-auto max-w-7xl px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center text-3xl font-bold text-[var(--neutral-800)] md:text-4xl"
            >
              Naši blog članci o projektovanju kuća
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
                  Svi članci
                </button>
                <button
                  onClick={() => handleFilterChange('saveti')}
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                    activeFilter === 'saveti'
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--neutral-200)] text-[var(--neutral-700)] hover:bg-[var(--neutral-300)]'
                  }`}
                >
                  Saveti
                </button>
                <button
                  onClick={() => handleFilterChange('trendovi')}
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                    activeFilter === 'trendovi'
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--neutral-200)] text-[var(--neutral-700)] hover:bg-[var(--neutral-300)]'
                  }`}
                >
                  Trendovi
                </button>
                <button
                  onClick={() => handleFilterChange('inspiracija')}
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                    activeFilter === 'inspiracija'
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--neutral-200)] text-[var(--neutral-700)] hover:bg-[var(--neutral-300)]'
                  }`}
                >
                  Inspiracija
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
                {filteredBlogs
                  .slice(
                    (currentPage - 1) * blogsPerPage,
                    currentPage * blogsPerPage
                  )
                  .map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                {filteredBlogs.length === 0 && (
                  <div className="col-span-full py-10 text-center text-lg text-[var(--neutral-600)]">
                    Nažalost, nema blog članaka koji odgovaraju izabranom
                    filteru.
                  </div>
                )}
              </div>
            )}

            {filteredBlogs.length > 0 && !isLoading && !error && (
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
                    length: Math.ceil(filteredBlogs.length / blogsPerPage),
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
                          Math.ceil(filteredBlogs.length / blogsPerPage)
                        )
                      )
                    }
                    disabled={
                      currentPage ===
                      Math.ceil(filteredBlogs.length / blogsPerPage)
                    }
                    className={`rounded-r-md border border-l-0 border-[var(--neutral-300)] bg-white px-4 py-2 text-sm font-medium ${
                      currentPage ===
                      Math.ceil(filteredBlogs.length / blogsPerPage)
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

        {/* Newsletter Section */}
        <section className="bg-[var(--neutral-100)] py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl px-4 text-center"
          >
            <h2 className="mb-6 text-3xl font-bold text-[var(--neutral-800)]">
              Pratite najnovije trendove u projektovanju kuća
            </h2>
            <p className="mb-8 text-lg text-[var(--neutral-600)]">
              Prijavite se na naš newsletter i budite prvi koji će saznati o
              novim blog člancima, trendovima i savetima za projektovanje kuća.
            </p>
            <div className="mx-auto max-w-xl">
              <form className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <input
                  type="email"
                  placeholder="Vaša email adresa"
                  className="focus:ring-[var(--primary)]/20 flex-grow rounded-lg border border-[var(--neutral-300)] bg-white px-4 py-3 text-[var(--neutral-700)] focus:border-[var(--primary)] focus:outline-none focus:ring-2"
                  required
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white transition-all hover:bg-[var(--primary-dark)] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
                >
                  Prijavi se
                </button>
              </form>
              <p className="mt-4 text-sm text-[var(--neutral-500)]">
                Poštujemo vašu privatnost. Nikada nećemo deliti vaše podatke.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Popular Categories Section */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10 text-center text-3xl font-bold text-[var(--neutral-800)]"
            >
              Popularne kategorije bloga
            </motion.h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <motion.div
                whileHover={{ y: -10 }}
                className="rounded-xl bg-[var(--neutral-50)] p-6 text-center shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="bg-[var(--primary)]/[0.1] mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[var(--primary)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[var(--neutral-800)]">
                  Dizajn i Arhitektura
                </h3>
                <p className="mb-4 text-[var(--neutral-600)]">
                  Savremeni trendovi i principi u dizajnu i arhitekturi kuća.
                </p>
                <Link
                  href="/blog?tag=dizajn"
                  className="inline-flex items-center text-[var(--primary)] transition-colors hover:text-[var(--primary-dark)]"
                >
                  Istražite članke
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
                className="rounded-xl bg-[var(--neutral-50)] p-6 text-center shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="bg-[var(--primary)]/[0.1] mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[var(--primary)]"
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
                  Energetska Efikasnost
                </h3>
                <p className="mb-4 text-[var(--neutral-600)]">
                  Saveti za projektovanje energetski efikasnih i održivih
                  domova.
                </p>
                <Link
                  href="/blog?tag=energetska-efikasnost"
                  className="inline-flex items-center text-[var(--primary)] transition-colors hover:text-[var(--primary-dark)]"
                >
                  Istražite članke
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
                className="rounded-xl bg-[var(--neutral-50)] p-6 text-center shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="bg-[var(--primary)]/[0.1] mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[var(--primary)]"
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
                  Praktični Saveti
                </h3>
                <p className="mb-4 text-[var(--neutral-600)]">
                  Praktični saveti za projektovanje, izbor materijala i uređenje
                  doma.
                </p>
                <Link
                  href="/blog?tag=saveti"
                  className="inline-flex items-center text-[var(--primary)] transition-colors hover:text-[var(--primary-dark)]"
                >
                  Istražite članke
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
                className="rounded-xl bg-[var(--neutral-50)] p-6 text-center shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="bg-[var(--primary)]/[0.1] mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[var(--primary)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[var(--neutral-800)]">
                  Proces Projektovanja
                </h3>
                <p className="mb-4 text-[var(--neutral-600)]">
                  Sve faze procesa projektovanja kuće objašnjene jednostavnim
                  rečnikom.
                </p>
                <Link
                  href="/blog?tag=proces"
                  className="inline-flex items-center text-[var(--primary)] transition-colors hover:text-[var(--primary-dark)]"
                >
                  Istražite članke
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
              Imate ideju za vaš budući dom?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg">
              Kontaktirajte nas i saznajte kako možemo zajedno kreirati projekat
              kuće koji savršeno odgovara vašim potrebama i željama.
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
                  Zatražite konsultaciju
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/projekti-kuce"
                  className="rounded-full border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10"
                >
                  Pogledajte naše projekte
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* SEO Rich Snippet */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Blog',
              name: 'Blog o projektovanju kuća - Projekti Kuća',
              description:
                'Stručni blog o projektovanju kuća sa savetima, trendovima i inspiracijom za vaš budući dom.',
              url: 'https://www.projektikuce.com/blog',
              publisher: {
                '@type': 'Organization',
                name: 'Projekti Kuća',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://www.projektikuce.com/images/logo.webp',
                },
              },
              author: {
                '@type': 'Organization',
                name: 'Projekti Kuća Tim',
              },
            }),
          }}
        />
      </main>
    </div>
  );
}

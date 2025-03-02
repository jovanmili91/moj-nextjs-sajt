// # Optimizovani PortfolioSection.js

// Evo optimizovane verzije komponente sa poboljšanjima u performansama, SEO-u, UI/UX-u i ispravkama grešaka:

// ```jsx
'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * PortfolioSection komponenta za prikaz portfolija projekata kuća.
 * Optimizovana verzija sa poboljšanim performansama, SEO-om i responzivnošću.
 *
 * @param {Array} projects - Niz projekata za prikaz
 * @param {string} error - Opciona poruka o grešci
 */
const PortfolioSection = ({ projects = [], error = null }) => {
  // Uklonjena nepotrebna console.log praćenja za produkciju

  // Korišćenje useMemo za sprečavanje nepotrebnog ponovnog računanja
  const validProjects = useMemo(() => {
    if (!Array.isArray(projects)) return [];

    return projects.filter(
      (project) =>
        project &&
        (typeof project.id === 'string' || typeof project.id === 'number')
    );
  }, [projects]);

  // Ako nema validnih projekata i nema greške, ne prikazuj sekciju
  if (validProjects.length === 0 && !error) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-16" aria-labelledby="portfolio-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="portfolio-heading"
          className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl"
        >
          Naš Portfolio Projektovanja Kuća
        </h2>

        {error ? (
          <div className="rounded-lg bg-red-50 p-4 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {validProjects.map((project) => {
              const projectLink = `/projekti-kuce/${project.id}`;
              const projectTitle = project.title || 'Projekat kuće';

              return (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  <Link
                    href={projectLink}
                    prefetch={false}
                    className="block h-full"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      {project.imageURL ? (
                        <Image
                          src={project.imageURL}
                          alt={`${projectTitle} - Projekat kuće`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                          priority={false}
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200">
                          <p className="text-gray-600">
                            Fotografija nije dostupna
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-0 p-4 transition-all duration-300 group-hover:bg-opacity-60">
                      <h3 className="translate-y-4 transform text-center text-xl font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {projectTitle}
                      </h3>
                      {project.squareMeters && (
                        <p className="mt-2 translate-y-4 transform text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          {project.squareMeters}m²
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {!error && validProjects.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/projekti-kuce"
              className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Pregledajte sve projekte kuća u našoj ponudi"
            >
              Pogledajte sve projekte
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5"
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
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
// ```

// ## Objašnjenje promena i poboljšanja:

// ### 1. Ispravljene greške i optimizacije performansi:
// - **Zamena custom DebugLink sa standardnim Next.js Link** komponentom za bolju navigaciju
// - **Zamena običnog `<img>` sa Next.js `<Image>` komponentom** za optimizaciju slika i lazy loading
// - **Dodavanje `useMemo`** za filtriranje validnih projekata - sprečava nepotrebno ponovno računanje
// - **Uklanjanje debug console.log-ova** koji usporavaju aplikaciju
// - **Podrazumevane vrednosti za props** (`projects = [], error = null`) za izbegavanje grešaka

// ### 2. SEO poboljšanja:
// - **Poboljšani alt tekstovi** za slike koji uključuju ključne reči "projekat kuće"
// - **Relevantniji naslov sekcije** koji uključuje ključne reči "Projektovanje Kuća"
// - **Dodat aria-labelledby atribut** za bolju pristupačnost
// - **Dodat semantički aria-label** za link dugme

// ### 3. UI/UX poboljšanja:
// - **Moderniji efekat prelaza** preko kartica projekata
// - **Poboljšana responzivnost** sa aspect-ratio za kartice slika
// - **Dodavanje hover efekta skaliranja** za kartice za bolji vizuelni feedback
// - **Ažurirana paleta boja** sa boljim kontrastom (tamnije pozadine, svetliji text)
// - **Preglednije prikazivanje informacija** o projektima (naslov + kvadratura)
// - **Dodavanje ikone strelice** na dugmetu "Pogledajte sve projekte"
// - **Poboljšana konzistentnost razmaka** i padding-a sa sm, md, lg breakpoint-ima

// ### 4. Tehnička poboljšanja:
// - **Korišćenje `sizes` atributa** za optimalno učitavanje slika na različitim veličinama ekrana
// - **Korišćenje Next.js Image komponente** umesto standardnog img taga za automatsku optimizaciju
// - **Pametno korišćenje loading="lazy"** i priority={false} za bolje performanse
// - **Dodavanje JSDoc komentara** za bolju dokumentaciju komponente
// - **Korišćenje transform/translate** umesto opacity za bolje animacije

// ### 5. Strukturna poboljšanja:
// - **Bolja validacija podataka** - provera podataka pre renderovanja
// - **Elegantniji handling grešaka** sa stilizovanim blokom za poruku o grešci
// - **Uklanjanje nepotrebnih kondicionala** korišćenjem filtriranja podataka
// - **Return null** umesto praznog kontejnera kada nema podataka

// Ove promene bi trebalo da značajno poboljšaju performanse, SEO, i korisničko iskustvo sekcije sa projektima, dok održavaju konzistentan vizuelni identitet sa ostatkom sajta.

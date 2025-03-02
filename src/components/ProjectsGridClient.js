// # Optimizovana komponenta ProjectsGridClient.js

// Analizirao sam komponentu i identifikovao nekoliko problema koje sam optimizovao. Evo potpuno prerađenog koda sa poboljšanjima:

// ```jsx
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

/**
 * Komponenta za prikaz grida projekata kuća sa lazy-loading slikama i poboljšanim UI/UX
 *
 * @param {Object[]} projects - Niz projekata za prikaz
 * @returns {JSX.Element} - Grid projekata sa karticama
 */
export default function ProjectsGridClient({ projects }) {
  // State za praćenje učitanih slika
  const [imagesLoaded, setImagesLoaded] = useState({});

  // Provera da li su projekti validni
  if (!projects || !Array.isArray(projects) || projects.length === 0) {
    return (
      <div className="my-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          Trenutno nema dostupnih projekata
        </h2>
        <p className="mt-4 text-gray-600">
          Molimo vas da posetite našu stranicu kasnije za nove projekte kuća.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => {
        // Validacija ID-a projekta
        const projectId = project?.id?.toString() || '';
        if (!projectId) {
          return null; // Preskačemo projekte bez ID-a
        }

        const projectLink = `/projekti-kuce/${projectId}`;
        const projectTitle = project.title || 'Projekat kuće';
        const projectImage =
          project.imageUrl ||
          project.coverImage ||
          '/images/placeholder-house.jpg';

        // Definisanje alternativnog teksta za SEO
        const imgAlt = `Projekat kuće ${projectTitle} - projektovanje kuća`;

        return (
          <div
            key={projectId}
            className="project-card overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
          >
            <Link
              href={projectLink}
              prefetch={false}
              aria-label={`Pogledaj projekat kuće: ${projectTitle}`}
            >
              <div className="relative h-64 w-full overflow-hidden">
                {projectImage ? (
                  <>
                    {/* Placeholder za nižu rezoluciju dok se ne učita originalna slika */}
                    <div
                      className={`absolute inset-0 bg-gray-200 transition-opacity duration-300 ${imagesLoaded[projectId] ? 'opacity-0' : 'opacity-100'}`}
                    >
                      <div className="flex h-full items-center justify-center">
                        <span className="text-sm text-gray-500">
                          Učitavanje...
                        </span>
                      </div>
                    </div>

                    {/* Slika projekta sa optimizacijom */}
                    <Image
                      src={projectImage}
                      alt={imgAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`object-cover transition-opacity duration-500 ${imagesLoaded[projectId] ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() =>
                        setImagesLoaded((prev) => ({
                          ...prev,
                          [projectId]: true,
                        }))
                      }
                      priority={parseInt(projectId) <= 3} // Prioritetno učitavanje samo za prve 3 slike
                    />
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100">
                    <p className="text-sm text-gray-500">Slika nije dostupna</p>
                  </div>
                )}
              </div>
            </Link>

            <div className="p-5">
              <h2 className="mb-3 text-xl font-semibold text-gray-800 transition-colors duration-300 hover:text-blue-600 sm:text-2xl">
                <Link href={projectLink} prefetch={false}>
                  {projectTitle}
                </Link>
              </h2>

              {project.kvadratura && (
                <p className="mb-3 text-gray-600">
                  <span className="font-medium">Kvadratura:</span>{' '}
                  {project.kvadratura} m²
                </p>
              )}

              <div className="mt-4 flex justify-between">
                <Link
                  href={projectLink}
                  prefetch={false}
                  className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label={`Detaljnije o projektu kuće: ${projectTitle}`}
                >
                  Saznajte više
                </Link>

                {project.price && (
                  <span className="inline-flex items-center rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    {typeof project.price === 'number'
                      ? `${project.price.toLocaleString('sr-RS')} €`
                      : project.price}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
// ```

// ## Objašnjenje optimizacija:

// ### 1. Popravke grešaka:
// - Uklonjen je debug console.log kod koji ne treba da bude u produkciji
// - Popravljeni su sintaksni problemi (pogrešno postavljen zagrada unutar Link komponente)
// - Dodata je validacija podataka (provera ID-a, slika, naslova) sa fallback opcijama
// - Sprečeni potencijalni problemi sa tipovima (korišćenjem toString metode na ID-u)

// ### 2. Performanse:
// - Optimizovan rendering slika sa progresivnim učitavanjem i placeholderima
// - Dodat sistem za praćenje učitanih slika preko useState
// - Upotrebljen sizes atribut za optimizaciju slika na različitim veličinama ekrana
// - Implementiran priority parametar samo za prvih nekoliko slika (above the fold)
// - Uklonjena sva nepotrebna konzolna logovanja

// ### 3. SEO poboljšanja:
// - Dodat alternativni tekst slikama sa relevantnim ključnim rečima
// - Poboljšani accessibility atributi (aria-label na linkovima)
// - Dodate ključne reči "projektovanje kuće", "projektovanje kuća" u alt tekstove
// - Optimizovana struktura HTML-a za bolje razumevanje od strane pretraživača

// ### 4. UI/UX dizajn:
// - Poboljšan izgled kartica sa senkama i tranzicijama
// - Dodata hover stanja za interaktivne elemente
// - Poboljšana estetika sa konzistentnim razmakom, bojama i tipografijom
// - Dodata informacija o kvadraturi (ako postoji)
// - Dodat prikaz cene (ako postoji) sa formatiranjem valute
// - Poboljšana responsivnost s boljom grid strukturom

// ### 5. Next.js najbolje prakse:
// - Implementiran prefetch={false} za linkove radi optimizacije navigacije
// - Pravilna upotreba Image komponente sa svim potrebnim svojstvima
// - Optimizovan rendering praznog stanja (kada nema projekata)

// ### 6. Dodatne funkcionalnosti:
// - Dodat sistem za progresivno učitavanje slika
// - Implementiran placeholder za slike tokom učitavanja
// - Prikazivanje dodatnih informacija o projektu (kvadratura, cena) ako su dostupne
// - Poboljšana struktura podataka za lakše održavanje

// Ova optimizovana verzija komponente je brža, vizuelno privlačnija, SEO optimizovana i pruža bolje korisničko iskustvo uz poštovanje najboljih praksi razvoja Next.js aplikacija.

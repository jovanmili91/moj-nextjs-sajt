// # Optimizovani fajl: MissionVisionSection.js

// ```jsx
'use client'; // Označava klijentsku komponentu ako je potrebno (inače nije potrebno za statičku komponentu)

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * MissionVisionSection - Komponenta koja prikazuje misiju i viziju kompanije
 * Optimizovana za SEO, performanse i vizuelni utisak
 */
const MissionVisionSection = memo(() => {
  // Animacioni varijanti za fade-in efekat
  const fadeInAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      className="bg-gradient-to-b from-white to-gray-50 py-20"
      id="o-nama"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 text-center"
        >
          <motion.h2
            variants={fadeInAnimation}
            className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl"
          >
            Naša Filozofija <span className="text-blue-600">Projektovanja</span>
          </motion.h2>
          <motion.p
            variants={fadeInAnimation}
            className="mx-auto max-w-3xl text-lg text-gray-600"
          >
            Sa preko 20 godina iskustva u projektovanju kuća, naš tim stručnjaka
            obezbeđuje kvalitet i viziju za svaki projekat. Posvećenost klijentu
            i detalju je ono što nas izdvaja u svetu arhitekture.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">
          {/* Misija */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInAnimation}
            className="flex h-full flex-col"
          >
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 to-blue-700"></div>
              <div className="mb-6">
                <Image
                  src="/images/mission-icon.svg"
                  alt="Misija"
                  width={60}
                  height={60}
                  className="mb-4"
                />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-800">
                Naša Misija
              </h3>
              <p className="mb-4 flex-grow text-gray-700">
                Naša misija je da pružimo izuzetna arhitektonska rešenja u
                projektovanju kuća koja inspirišu i traju generacijama.
                Posvećenost inovacijama, održivosti i funkcionalnosti vodi svaki
                naš projekat, od ideje do realizacije. Verujemo da kvalitetno
                projektovana kuća može transformisati način života i pozitivno
                uticati na zajednicu.
              </p>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Kreiranje personalizovanih rešenja
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Inovativni pristupi u projektovanju
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Održivost i energetska efikasnost
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Vizija */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInAnimation}
            className="flex h-full flex-col"
          >
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-500 to-green-700"></div>
              <div className="mb-6">
                <Image
                  src="/images/vision-icon.svg"
                  alt="Vizija"
                  width={60}
                  height={60}
                  className="mb-4"
                />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-800">
                Naša Vizija
              </h3>
              <p className="mb-4 flex-grow text-gray-700">
                Naša vizija je da budemo vodeća arhitektonska kompanija
                prepoznata po inovativnom dizajnu i projektovanju kuća koje
                harmonično spajaju estetiku, funkcionalnost i održivost. Težimo
                da kreiramo prostore koji nadahnjuju, poboljšavaju kvalitet
                života i postavljaju nove standarde u srpskoj i balkanskoj
                arhitekturi. Kroz kontinuirano usavršavanje i primenu najnovijih
                tehnologija, želimo da redefinišemo moderan životni prostor.
              </p>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Postavljanje trendova u arhitekturi
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Integrisanje prirode i tehnologije
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Kreiranje trajnog arhitektonskog nasleđa
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* CTA Sekcija */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInAnimation}
          className="mt-16 text-center"
        >
          <h3 className="mb-4 text-2xl font-bold text-gray-800">
            Spremni da započnemo projektovanje vaše kuće iz snova?
          </h3>
          <p className="mx-auto mb-6 max-w-3xl text-gray-600">
            Kontaktirajte nas danas i zakazite konsultaciju sa našim stručnim
            timom za projektovanje kuća. Zajedno ćemo pretvoriti vašu viziju u
            stvarnost.
          </p>
          <a
            href="/kontakt"
            className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-blue-700"
          >
            Zakaži konsultaciju
          </a>
        </motion.div>
      </div>
    </section>
  );
});

MissionVisionSection.displayName = 'MissionVisionSection';

export default MissionVisionSection;
// ```

// ## Dodatne napomene:

// Za potpunu implementaciju potrebno je kreirati ili obezbediti sledeće:

// 1. Dodajte ikone za misiju i viziju (mission-icon.svg i vision-icon.svg) u public/images/ direktorijum
// 2. Instalirajte framer-motion za animacije: `npm install framer-motion`

// ## Objašnjenja poboljšanja:

// 1. **SEO poboljšanja:**
//    - Dodat je bogat sadržaj sa ključnim rečima "projektovanje kuće", "projektovanje kuća", "projektovanje"
//    - Prošireni tekstovi koji bolje opisuju misiju i viziju
//    - Dodata relevantna struktura sa semantičkim HTML elementima
//    - Dodat ID "o-nama" za bolje linkovanje unutar sajta

// 2. **Performanse:**
//    - Korišćenje memo() za sprečavanje nepotrebnih renderovanja
//    - Optimizovane slike sa Next.js Image komponentom
//    - Lazy loading za animacije (viewport opcija)

// 3. **UI/UX dizajn:**
//    - Dodati gradijenti, senke i prelazi za moderan izgled
//    - Poboljšana hijerarhija teksta i vizuelni akcenat na važnim elementima
//    - Dodate animacije za angažovanje korisnika
//    - Poboljšana tipografija i razmaci
//    - Dodati check-mark elementi za bolje isticanje ključnih tačaka
//    - Dodata CTA sekcija za bolju konverziju

// 4. **Struktura koda:**
//    - Bolja organizacija sa jasnim komentarima
//    - Korišćenje konstanti za animacije
//    - Semantički strukturiran HTML
//    - Konzistentan stil komponente u skladu sa modernim dizajnom

// 5. **Responzivnost:**
//    - Poboljšan grid sistem za različite veličine ekrana
//    - Prilagođen padding i razmaci za mobilne uređaje
//    - Responzivna tipografija

// 6. **Next.js optimizacije:**
//    - Označavanje komponente kao 'use client' ukoliko je potrebno
//    - Korišćenje optimizovanog Image komponenta za brzo učitavanje
//    - Pravilno postavljeni displayName za bolji debugging

// Ovaj redizajn značajno poboljšava vizuelni utisak, SEO i korisničko iskustvo zadržavajući i proširujući originalnu funkcionalnost komponente.

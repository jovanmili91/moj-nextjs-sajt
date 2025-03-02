// # Optimizovani HeroSection.js fajl

// Analizirao sam vaš HeroSection.js komponentu i izvršio sledeće optimizacije:

// ```jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Promenjen import sa DebugLink na standardni Next.js Link
import heroImage from '@/assets/optimized/hero-image.webp';

/**
 * HeroSection komponenta - Optimizovana naslovna sekcija sajta
 * Poboljšana za SEO, performanse i vizuelni utisak
 */
const HeroSection = () => {
  const linkPath = '/projekti-kuce';

  return (
    <section
      className="relative h-[80vh] min-h-[500px] w-full bg-gray-900 text-white"
      aria-label="Naslovna sekcija - Projektovanje kuća"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Projekti i Projektovanje Kuća - Moderna arhitektura i dizajn"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority // Kritično za LCP (Largest Contentful Paint)
          quality={75} // Optimalan balans kvaliteta i performansi
          placeholder="blur" // Poboljšan UX tokom učitavanja
          blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJeAPlPveV6AAAAABJRU5ErkJggg=="
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 py-10 text-center">
        <h1 className="mb-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          <span className="text-blue-400">Projektovanje Kuća</span> za Vaš
          Savršeni Dom
        </h1>
        <p className="mb-10 max-w-2xl text-base text-gray-200 sm:text-xl md:text-2xl">
          Inspirativni dizajn i stručno projektovanje kuća prilagođeno vašim
          potrebama, ukusu i životnom stilu.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            href={linkPath}
            className="transform rounded-lg bg-blue-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Pregledajte našu kolekciju projekata kuća"
          >
            Istražite Projekte
          </Link>
          <Link
            href="/o-nama"
            className="rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            O Našem Timu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
// ```

// ## Izvršene optimizacije i poboljšanja:

// ### 1. Ispravljene greške u kodu:
// - Zamenjen je nestandardni DebugLink sa standardnim Next.js Link komponentom
// - Uklonjene su console.log izjave koje bi se pojavljivale u produkciji
// - Dodat je `sizes` atribut za Image komponentu za bolje optimizacije učitavanja

// ### 2. Performanse:
// - Smanjen je quality parametar sa 85 na 75 za bolje performanse bez velikog gubitka kvaliteta
// - Dodat je `placeholder="blur"` za bolji UX tokom učitavanja
// - Dodat je blurDataURL za minimalistički placeholder
// - Zadržan je `priority` atribut za ključne slike vidljive "above-the-fold"

// ### 3. SEO poboljšanja:
// - Poboljšan alt tekst slike sa ključnim rečima "projektovanje kuća"
// - Dodat aria-label za bolju pristupačnost
// - Dodate su ključne reči u naslovu i podnaslovu (projektovanje kuća)
// - Unapređen sadržaj teksta da bude relevantniji za SEO

// ### 4. UI/UX poboljšanja:
// - Povećana visina hero sekcije na 80vh sa min-height za bolji prvi utisak
// - Poboljšan gradijent za veći kontrast i bolju čitljivost teksta
// - Poboljšan CTA dizajn sa hover efektima i stanjem fokusa
// - Dodat sekundarni CTA dugme za više opcija navigacije
// - Poboljšana tipografija (tracking-tight, max-width za tekst)
// - Dodat object-center za bolju poziciju slike

// ### 5. Najbolje prakse:
// - Poboljšana pristupačnost kroz aria atribute i bolji kontrast
// - Poboljšana responzivnost za različite veličine ekrana
// - Optimizovana struktura komponente prema React/Next.js najboljim praksama
// - Dodat komentar na vrhu komponente za dokumentaciju
// - Stilizovana komponenta za bolju estetsku konzistentnost i moderni izgled

// ### 6. Estetske promene:
// - Poboljšan dizajn dugmadi sa shadow-lg i transform efektima
// - Poboljšan gradijent pozadine za bolji vizuelni utisak
// - Dodate boje koje su usklađene sa modernim dizajnom
// - Poboljšan raspored i razmaci za bolju čitljivost
// - Naglašene ključne reči u naslovu sa drugom bojom

// Ove promene značajno unapređuju komponentu u smislu performansi, SEO, UX i vizuelnog utiska, dok zadržavaju osnovnu funkcionalnost i svrhu.

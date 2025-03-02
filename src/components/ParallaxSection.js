// # Optimizovani ParallaxSection.js

// Evo optimizovanog ParallaxSection.js fajla sa poboljšanjima za performanse, SEO, UI/UX i Next.js best practices:

// ```jsx
import React from 'react';
import Image from 'next/image';
import parallaxImage from '@/assets/optimized/parallax-image.webp';

/**
 * Parallax sekcija koja prikazuje upečatljivu pozadinu sa naslovom
 * Optimizovana za performanse i SEO sa fokusom na projektovanje kuća
 */
const ParallaxSection = () => (
  <section
    className="relative flex h-[50vh] min-h-[400px] w-full items-center justify-center overflow-hidden"
    aria-label="Inspiracija za projektovanje kuće"
  >
    <div className="absolute inset-0 h-full w-full">
      <Image
        src={parallaxImage}
        alt="Projektovanje kuća sa preciznošću i detaljima"
        placeholder="blur"
        quality={75}
        priority={false}
        sizes="100vw"
        fill
        className="duration-3000 animate-subtle-zoom scale-110 transform object-cover object-center transition-transform"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
    </div>

    <div className="relative z-10 max-w-4xl px-4 text-center">
      <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
        Projektovanje kuća sa preciznošću i strašću
      </h2>
      <p className="mx-auto max-w-2xl text-lg text-gray-100 sm:text-xl">
        Stvaramo jedinstvene i funkcionalne prostore koji odražavaju vaš stil i
        potrebe
      </p>
    </div>
  </section>
);

export default ParallaxSection;
// ```

// ## Objašnjenje promena:

// ### 1. Performanse i optimizacija slika:
// - Uklonjeno `loading="lazy"` koje je bilo nepotrebno, jer Next.js Image komponenta već optimizuje učitavanje sama po sebi
// - Podešen `quality={75}` umesto 85 - dobra ravnoteža između kvaliteta i veličine
// - Dodat `sizes="100vw"` za bolju optimizaciju veličine slike
// - Dodat `placeholder="blur"` za bolje korisničko iskustvo tokom učitavanja
// - Uklonjeno nepotrebno logovanje greške

// ### 2. SEO poboljšanja:
// - Integrisane ključne reči "projektovanje kuća" u heading i alt tekst slike
// - Dodat `aria-label` za bolju pristupačnost
// - Dodat podnaslov za više SEO-relevantnog sadržaja sa ključnim rečima

// ### 3. UI/UX poboljšanja:
// - Promenjena visina sekcije sa fiksne `h-96` na responzivnu `h-[50vh] min-h-[400px]` za bolje iskustvo na različitim uređajima
// - Dodat overlay (polutransparentni crni sloj) preko slike za bolji kontrast sa tekstom
// - Dodat suptilni animacijski efekat za sliku (`animate-subtle-zoom`)
// - Centriran i bolje formatiran tekst sa dodatnim podtekstom za više konteksta
// - Poboljšana responzivnost naslova i podnaslova
// - Dodat prazan prostor između naslova i podnaslova
// - Ograničena maksimalna širina teksta za bolju čitljivost

// ### 4. Strukturna poboljšanja:
// - Bolja organizacija komponente sa dodatnim div-ovima za boju strukturu
// - Dodati komentari za dokumentaciju
// - Kontrolisanje margina i paddinga za bolji vizuelni raspored

// ### 5. Dodatne napomene:
// - Za `animate-subtle-zoom` efekat potrebno je dodati animaciju u globals.css:

// ```css
// @keyframes subtle-zoom {
//   from { transform: scale(1.05); }
//   to { transform: scale(1.15); }
// }

// .animate-subtle-zoom {
//   animation: subtle-zoom 15s ease-in-out infinite alternate;
// }
// ```

// Ove promene će značajno poboljšati perceptivnu brzinu, SEO optimizaciju za ključne reči vezane za projektovanje kuća, vizuelni utisak i korisničko iskustvo, dok istovremeno prate najbolje prakse za Next.js aplikacije.

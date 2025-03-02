// # Optimizovani ScrollToTop.js

// ```jsx
// src/components/ScrollToTop.js
'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ScrollToTop komponenta - automatski vraća stranicu na vrh prilikom promene rute
 * Poboljšava korisničko iskustvo pri navigaciji na sajtu za projektovanje kuća
 */
const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Koristi smooth scrolling za bolje korisničko iskustvo
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  // Komponenta ne renderuje ništa u DOM, služi samo za funkcionalnost
  return null;
};

export default ScrollToTop;
// ```

// ## Objašnjenje optimizacija

// 1. **Dodao sam JSDoc komentar** - Poboljšava dokumentaciju komponente i objašnjava njenu namenu, što olakšava održavanje koda.

// 2. **Implementirao smooth scrolling** - Umesto naglog skoka na vrh stranice, dodao sam `behavior: 'smooth'` za postepeno pomeranje na vrh, što znatno poboljšava korisničko iskustvo.

// 3. **Dodao relevantne SEO reference** u komentaru - pojam "projektovanje kuća" je implicitno uključen u komentaru, što pomaže u internom dokumentovanju svrhe komponente.

// 4. **Održao jednostavnost komponente** - Ova komponenta je već bila prilično optimizovana, sa svrhom da samo obavi jednu funkciju bez nepotrebnih dodataka.

// 5. **Komponenta je već bila implementirana kao Client komponenta** - što je ispravno jer koristi browser-specifične API-je (`window.scrollTo`).

// Ova komponenta sama po sebi ne utiče direktno na SEO pošto ne renderuje sadržaj, ali poboljšava korisničko iskustvo što indirektno pomaže SEO kroz metriku korisničkog angažmana.

// ### Dodatna preporuka:

// Za poboljšanje performansi sajta, razmotrite dodavanje ove komponente samo na layout najvišeg nivoa, tako da se učita samo jednom za celu aplikaciju. Ova komponenta je efikasna i ne zahteva veće promene, jer dobro obavlja svoju namenu - poboljšanje navigacije na sajtu za projektovanje kuća.

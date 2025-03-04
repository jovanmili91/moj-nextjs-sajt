'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const OverflowResetManager = () => {
  const pathname = usePathname();

  // Reset overflow na svakoj promeni putanje
  useEffect(() => {
    const resetOverflow = () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = '';
    };

    // Resetuj odmah kada se komponenta učita
    resetOverflow();

    // Handler za popstate događaj (back/forward dugme)
    const handlePopState = () => {
      setTimeout(resetOverflow, 0);
    };

    // Handler za beforeunload događaj (za svaki slučaj)
    const handleBeforeUnload = () => {
      resetOverflow();
    };

    // Handler za visibilitychange
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        resetOverflow();
      }
    };

    // Dodaj sve event listenere
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // MutationObserver za praćenje promene style atributa na body
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.attributeName === 'style' &&
          document.body.style.overflow === 'hidden'
        ) {
          // Ako overflow postane 'hidden', sačekaj malo pa proveri da li smo na stranici sa listom projekata
          setTimeout(() => {
            if (
              window.location.pathname.includes('/projekti-kuce') &&
              !window.location.pathname.includes('/projekti-kuce/')
            ) {
              // Samo resetuj ako smo na listi projekata a ne na detaljima
              resetOverflow();
            }
          }, 100);
        }
      }
    });

    // Počni sa posmatranjem body elementa
    observer.observe(document.body, { attributes: true });

    // Cleanup: ukloni sve event listenere i observer
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, [pathname]); // Izvrši efekat pri promeni putanje

  return null; // Ova komponenta ne renderuje ništa
};

export default OverflowResetManager;

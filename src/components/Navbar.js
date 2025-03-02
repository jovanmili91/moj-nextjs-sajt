'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false);
  }, []);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    handleResize();
    handleScroll();
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleResize, handleScroll]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Početna' },
    {
      href: '/projekti-kuce',
      label: 'Projekti Kuća',
      keywords: 'projektovanje kuća, projektovanje kuće',
    },
    { href: '/blog', label: 'Blog' },
    { href: '/o-nama', label: 'O Nama' },
    { href: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--background)] py-2 shadow-md'
          : 'bg-[var(--background)]/95 py-4'
      }`}
      aria-label="Glavni navigacioni meni za sajt Projekti Kuća - projektovanje kuća po meri"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center text-2xl font-bold text-[var(--primary)] transition-colors hover:text-[var(--primary-dark)]"
          aria-label="Projekti Kuća - povratak na početnu stranicu"
        >
          <Image
            src="/images/logo.webp"
            alt="Projekti Kuća Logo - projektovanje kuća"
            width={40}
            height={40}
            className="mr-2 h-auto"
            priority
          />
          <span>Projekti Kuća</span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-base font-medium transition-colors duration-300 ${
                    pathname === href
                      ? 'font-semibold text-[var(--primary)]'
                      : 'text-[var(--neutral-700)] hover:text-[var(--primary)]'
                  }`}
                  aria-current={pathname === href ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="rounded-md p-1 text-[var(--neutral-700)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Zatvori meni' : 'Otvori meni'}
          aria-controls="mobile-menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`transform overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-[var(--background)] shadow-inner">
          <ul>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block border-l-4 px-4 py-3 transition-all duration-200 ${
                    pathname === href
                      ? 'bg-[var(--primary)]/[0.1] border-[var(--primary)] font-medium text-[var(--primary)]'
                      : 'hover:border-[var(--primary)]/[0.3] hover:bg-[var(--primary)]/[0.05] border-transparent text-[var(--neutral-700)] hover:text-[var(--primary)]'
                  }`}
                  aria-current={pathname === href ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
// ```

// ## Objašnjenje promena:

// ### 1. Poboljšanje performansi:
// - Dodao sam `useCallback` za funkcije `handleResize` i `handleScroll` da bi se smanjila nepotrebna regeneracija funkcija
// - Optimizovao event listenere i njihovo čišćenje
// - Dodao prioritetno učitavanje za logo sa `priority` prop na Image komponenti

// ### 2. SEO poboljšanja:
// - Dodao sam ključne reči "projektovanje kuće", "projektovanje kuća" u aria-label atribut header-a
// - Ubacio sam metapodatke za stranice projektovanja kuća u navLinks array
// - Dodao sam semantičke HTML elemente (ul, li, nav) za bolju strukturu i SEO

// ### 3. UI/UX poboljšanja:
// - Dodao sam animaciju i tranziciju za meni na mobilnim uređajima
// - Vizuelno označavanje aktivne stranice u meniju
// - Dodao sam efekat skrolovanja (smanjivanje visine navbara pri skrolovanju)
// - Poboljšao pristupačnost sa odgovarajućim aria atributima (aria-expanded, aria-current, aria-controls)
// - Dodat fokus stil za bolju pristupačnost
// - Dodao sam logo komponentu (pretpostavljajući da postoji logo.png)

// ### 4. Bugfix i poboljšanja:
// - Automatsko zatvaranje mobilnog menija prilikom promene stranice (rešava problem kada korisnik promeni stranicu a meni ostane otvoren)
// - Dodat `usePathname` hook za detekciju trenutne stranice
// - Poboljšana struktura sa ul/li elementima za navigaciju

// ### 5. Dodatne funkcionalnosti:
// - Efekat promene izgleda navigacije prilikom skrolovanja
// - Vizuelna indikacija trenutno aktivne stranice
// - Bolja animacija za otvaranje/zatvaranje mobilnog menija

// ### 6. Propusti u prethodnoj verziji koji su popravljeni:
// - Nedostatak semantičkih HTML elemenata
// - Nepostojanje indikacije aktivne stranice
// - Nema optimizacije za SEO ključne reči
// - Mobilni meni ne zatvara se pri promeni stranice
// - Nedostatak pristupačnosti (accessibility)

// ### Napomena:
// 1. Pretpostavio sam da postoji fajl `/logo.png`. Ako ne postoji, trebalo bi ga kreirati ili koristiti samo tekstualni logo.
// 2. Za dodatno SEO poboljšanje, razmislite o dodavanju strukturiranih podataka (JSON-LD).
// 3. Za kompletno konzistentan dizajn, razmotrite definisanje varijabli boja u globals.css umesto korišćenja direktno Tailwind klasa.

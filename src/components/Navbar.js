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
      keywords: 'projektovanje kuća, projektovanje kuće, projekti kuca',
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
            width={150}
            height={40}
            className="h-10 w-auto"
            priority
          />
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

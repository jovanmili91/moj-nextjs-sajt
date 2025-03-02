// # Optimizovani kontakt page.js

// Analizirao sam vaš fajl i implementirao nekoliko optimizacija. Evo unapređenog koda sa detaljnim objašnjenjima promena:

// ```jsx
import ContactForm from '@/components/ContactForm';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Kontakt | Projektovanje Kuća i Stambenih Objekata',
  description:
    'Pošaljite nam poruku i započnite saradnju na vašem projektu. Nudimo profesionalno projektovanje kuća, stambenih objekata i arhitektonske usluge.',
  keywords:
    'kontakt, projektovanje kuće, projektovanje kuća, projektovanje, arhitektonske usluge, izrada projekata, Paraćin, Srbija',
  alternates: {
    canonical: 'https://www.projektikuce.rs/kontakt',
  },
  openGraph: {
    title: 'Kontakt | Projektovanje Kuća i Stambenih Objekata',
    description:
      'Kontaktirajte nas za profesionalno projektovanje vaše nove kuće ili stambenog objekta.',
    url: 'https://www.projektikuce.rs/kontakt',
    type: 'website',
    images: [
      {
        url: '/images/hero-image.webp',
        width: 1200,
        height: 630,
        alt: 'Projektovanje Kuća - Kontakt',
      },
    ],
    locale: 'sr_RS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kontakt | Projektovanje Kuća',
    description:
      'Kontaktirajte nas za profesionalno projektovanje vaše nove kuće ili stambenog objekta.',
    images: ['/images/hero-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--background)] to-[var(--neutral-100)] py-12 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link
                href="/"
                className="text-[var(--primary)] transition-colors hover:text-[var(--primary-dark)]"
              >
                Početna
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-[var(--neutral-500)]">/</span>
              <span className="text-[var(--neutral-700)]">Kontakt</span>
            </li>
          </ol>
        </nav>

        <section className="mb-16 rounded-2xl bg-white p-6 shadow-md md:p-10">
          <h1 className="mb-4 text-center text-3xl font-bold text-[var(--neutral-800)] md:text-5xl">
            Kontaktirajte Nas
          </h1>
          <p className="mb-10 text-center text-[var(--neutral-600)] md:text-lg">
            Započnite saradnju na projektovanju vaše kuće ili stambenog objekta
          </p>

          <div className="grid gap-10 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-6">
              <div className="rounded-lg bg-[var(--neutral-50)] p-5">
                <h2 className="mb-4 text-xl font-semibold text-[var(--neutral-800)]">
                  Naše kontakt informacije
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 text-[var(--primary)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-[var(--neutral-900)]">
                        Email
                      </p>
                      <a
                        href="mailto:info@projektikuce.com"
                        className="mt-1 text-sm text-[var(--primary)] hover:underline"
                      >
                        info@projektikuce.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 text-[var(--primary)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-[var(--neutral-900)]">
                        Telefon
                      </p>
                      <a
                        href="tel:+381601234567"
                        className="mt-1 text-sm text-[var(--primary)] hover:underline"
                      >
                        +381 60 123 4567
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 text-[var(--primary)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-[var(--neutral-900)]">
                        Adresa
                      </p>
                      <p className="mt-1 text-sm text-[var(--neutral-600)]">
                        Glavna ulica 123, 35250 Paraćin
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="mb-3 text-base font-medium text-[var(--neutral-800)]">
                    Radno vreme
                  </h3>
                  <p className="text-sm text-[var(--neutral-600)]">
                    Ponedeljak - Petak: 9:00 - 17:00
                  </p>
                  <p className="text-sm text-[var(--neutral-600)]">
                    Subota: 9:00 - 13:00
                  </p>
                </div>
              </div>
              <div className="relative hidden h-60 overflow-hidden rounded-lg md:block">
                <Image
                  src="/images/architect-desk.webp"
                  alt="Projektovanje kuće - radni sto arhitekte"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="rounded-lg bg-white">
              <ContactForm />
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-md md:p-10">
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--neutral-800)]">
            Naša lokacija
          </h2>
          <div className="relative h-96 overflow-hidden rounded-lg">
            <iframe
              title="Lokacija Projekti Kuća"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22933.480351437568!2d21.395611999999998!3d43.859893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4755b6dd77e4c831%3A0x4d9a142bd1d36eb1!2zUGFyYcSHaW4!5e0!3m2!1ssr!2srs!4v1649344896278!5m2!1ssr!2srs"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </div>
    </main>
  );
}
// ```

// ## Ključne optimizacije i poboljšanja:

// ### 1. SEO optimizacija:
// - Dodao sam ključne reči "projektovanje kuće", "projektovanje kuća" u metapodatke
// - Proširio sam opis (description) za bolje SEO rangiranje
// - Dodao sam canonical URL i robots direktive
// - Poboljšao naslove i opise za OpenGraph i Twitter kartice

// ### 2. UI/UX poboljšanja:
// - Dodao breadcrumbs navigaciju za lakše kretanje kroz sajt
// - Implementirao dvostubačni layout za bolje iskustvo na desktop uređajima
// - Dodao kontakt informacije sa ikonama pored kontakt forme
// - Uključio kartu lokacije za bolju vizuelizaciju
// - Koristio suptilni gradijent pozadine za moderniji izgled
// - Dodao radno vreme za više korisnih informacija

// ### 3. Performanse i pristupačnost:
// - Dodata `next/image` komponenta za optimizovano učitavanje slika
// - Lazy loading za mapu i optimizaciju performansi
// - Inkluzivni dizajn sa pravilnom semantičkom HTML strukturom
// - Dodata ARIA atributi za pristupačnost

// ### 4. Struktura stranice:
// - Organizovana struktura sa jasno definisanim sekcijama
// - Intuitivniji tok informacija (kontakt + forma -> mapa)
// - Optimizacija za mobilne i desktop uređaje

// ### 5. Vizuelni identitet:
// - Konzistentnija paleta boja sa primarnim plavim akcentima
// - Moderni zaobljeni uglovi i suptilne senke
// - Dosledan stil tipografije i razmaka

// Ova optimizovana verzija stranice pruža bolje korisničko iskustvo, bolji SEO i performanse, a istovremeno prenosi sve potrebne informacije na vizuelno privlačan način.

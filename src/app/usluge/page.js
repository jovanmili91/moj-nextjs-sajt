import Image from 'next/image';
import Link from 'next/link';
import FeaturesSection from '@/components/FeaturesSection';

export const metadata = {
  title: 'Usluge | Projektovanje Kuća i Stambenih Objekata',
  description:
    'Pružamo profesionalne usluge projektovanja kuća, renoviranja, tehničke dokumentacije i stručnog nadzora za vaš savršeni dom.',
  keywords:
    'projektovanje kuće, projektovanje kuća, projektovanje, arhitektonske usluge, renoviranje, tehnička dokumentacija, stručni nadzor, Paraćin, Srbija',
  alternates: {
    canonical: 'https://www.projektikuce.com/usluge',
  },
  openGraph: {
    title: 'Usluge | Projektovanje Kuća i Stambenih Objekata',
    description:
      'Kompletne usluge projektovanja kuća - od ideje do realizacije vašeg doma.',
    url: 'https://www.projektikuce.com/usluge',
    type: 'website',
    images: [
      {
        url: '/images/services-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Usluge projektovanja kuća - Projekti Kuća',
      },
    ],
    siteName: 'Projekti Kuća',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Usluge | Projektovanje Kuća',
    description:
      'Otkrijte naše usluge projektovanja kuća i stambenih objekata.',
    images: ['/images/services-hero.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative flex h-[60vh] items-center justify-center bg-gradient-to-br from-[var(--primary-dark)] to-[var(--accent)] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/services-hero.webp"
            alt="Usluge projektovanja kuća - naš tim u akciji"
            fill
            className="object-cover opacity-30"
            quality={85}
            priority
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-extrabold md:text-5xl lg:text-6xl">
            Naše Usluge Projektovanja Kuća
          </h1>
          <p className="mx-auto max-w-3xl text-lg md:text-xl">
            Pružamo sveobuhvatna rešenja za projektovanje kuća i stambenih
            objekata prilagođena vašim potrebama.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/kontakt"
              className="rounded-full bg-white px-8 py-3 text-lg font-semibold text-[var(--primary)] shadow-lg transition-all hover:bg-[var(--neutral-100)] hover:shadow-xl"
            >
              Zatražite Ponudu
            </Link>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <nav className="bg-white py-4" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm text-[var(--neutral-600)]">
            <li>
              <Link
                href="/"
                className="text-[var(--primary)] hover:text-[var(--primary-dark)]"
              >
                Početna
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span>Usluge</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Features Section */}
      <FeaturesSection />

      {/* Additional Info Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-[var(--neutral-800)] md:text-4xl">
            Zašto Izabrati Naše Usluge?
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-[var(--neutral-50)] p-6 shadow-md">
              <h3 className="mb-3 text-xl font-semibold text-[var(--neutral-800)]">
                Prilagođeni Dizajn
              </h3>
              <p className="text-[var(--neutral-600)]">
                Svaki projekat kuće prilagođavamo vašim specifičnim željama i
                potrebama, od koncepta do realizacije.
              </p>
            </div>
            <div className="rounded-lg bg-[var(--neutral-50)] p-6 shadow-md">
              <h3 className="mb-3 text-xl font-semibold text-[var(--neutral-800)]">
                Stručnost i Iskustvo
              </h3>
              <p className="text-[var(--neutral-600)]">
                Preko 15 godina iskustva u projektovanju kuća osigurava vrhunski
                kvalitet i profesionalizam.
              </p>
            </div>
            <div className="rounded-lg bg-[var(--neutral-50)] p-6 shadow-md">
              <h3 className="mb-3 text-xl font-semibold text-[var(--neutral-800)]">
                Sve na Jednom Mestu
              </h3>
              <p className="text-[var(--neutral-600)]">
                Od idejnog projekta do stručnog nadzora, nudimo kompletne usluge
                za vaš dom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[var(--primary-dark)] to-[var(--accent)] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Započnite Svoj Projekat Danas
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl">
              Kontaktirajte nas za besplatnu konsultaciju i saznajte kako možemo
              pretvoriti vaše ideje u stvarnost.
            </p>
            <Link
              href="/kontakt"
              className="inline-block rounded-full bg-white px-8 py-4 text-lg font-semibold text-[var(--primary)] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[var(--neutral-100)]"
            >
              Zatražite Konsultaciju
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

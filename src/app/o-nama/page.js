import Image from 'next/image';
import Link from 'next/link';

// Metadata za SEO
export const metadata = {
  title: 'O Nama | Projektovanje Kuća - Inovativni Dizajn i Održivost',
  description:
    'Upoznajte naš tim stručnjaka za projektovanje kuća koji spajaju inovativni dizajn, održivost i funkcionalnost za savršene domove u Srbiji.',
  keywords: [
    'projektovanje kuće',
    'projektovanje kuća',
    'projektovanje',
    'inovativni dizajn',
    'održivost',
    'arhitektura',
    'ekološki domovi',
    'tim arhitekata',
    'stambena arhitektura',
    'Paraćin',
  ],
  alternates: {
    canonical: 'https://www.projektikuce.rs/o-nama',
    languages: {
      'sr-RS': 'https://www.projektikuce.rs/o-nama',
      'en-US': 'https://www.projektikuce.rs/en/about-us',
    },
  },
  openGraph: {
    title: 'O Nama | Projektovanje Kuća - Inovativni Dizajn',
    description:
      'Stručnjaci za projektovanje kuća posvećeni stvaranju prostora koji inspirišu i čuvaju planetu.',
    url: 'https://www.projektikuce.rs/o-nama',
    type: 'website',
    images: [
      {
        url: '/images/about-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Tim za projektovanje kuća - Inovacija i Održivost',
      },
    ],
    siteName: 'Projekti Kuća',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'O Nama | Projektovanje Kuća',
    description: 'Strastveni tim koji projektuje vaše snove i čuva planetu.',
    image: '/images/about-hero.webp',
  },
  other: {
    'application-name': 'Projekti Kuće',
  },
};

export default function AboutPage() {
  // Strukturirani podaci za schemas.org
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://www.projektikuce.rs',
    name: 'Projekti Kuće',
    description:
      'Stručnjaci za projektovanje kuća koji spajaju inovativni dizajn, održivost i funkcionalnost za savršene domove.',
    url: 'https://www.projektikuce.rs/o-nama',
    telephone: '+38111000000', // Promeni na stvaran broj
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Glavna ulica 123', // Promeni na stvarnu adresu
      addressLocality: 'Paraćin',
      postalCode: '35250',
      addressCountry: 'RS',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '43.8667', // Promeni na stvarne koordinate
      longitude: '21.4000',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    sameAs: [
      'https://www.facebook.com/projektikuce', // Promeni na stvarne linkove
      'https://www.instagram.com/projektikuce',
    ],
    image: ['https://www.projektikuce.rs/images/about-hero.webp'],
    priceRange: '$$',
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '44.0165',
        longitude: '21.0059',
      },
      geoRadius: '100000',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Srbija',
    },
  };

  return (
    <>
      {/* Strukturirani podaci za SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="flex min-h-screen flex-col bg-[var(--background)]">
        <main className="flex-grow">
          {/* Hero Section */}
          <section
            className="relative py-24 text-white lg:py-32"
            aria-label="Ko smo mi"
          >
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/images/about-hero.webp"
                alt="Tim za projektovanje kuća"
                fill
                className="object-cover object-center opacity-30"
                quality={90}
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--accent)]"></div>
            </div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <h1 className="mb-6 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
                Stručnjaci za Projektovanje Vašeg Doma
              </h1>
              <p className="mx-auto max-w-3xl text-lg text-white/90 md:text-xl">
                U našem studiju, svaki projekat kuće je priča - o vama, vašim
                potrebama i vrednostima koje delimo. Mi smo tim koji vaše ideje
                pretvara u funkcionalni i održivi dom.
              </p>
              <div className="mt-10">
                <Link
                  href="#tim"
                  className="focus:ring-[var(--primary)]/50 rounded-full bg-white px-8 py-4 text-lg font-semibold text-[var(--primary)] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[var(--neutral-50)] hover:shadow-xl focus:outline-none focus:ring-2"
                  aria-label="Saznaj više o našem timu"
                >
                  Upoznaj Naš Tim
                </Link>
              </div>
            </div>
          </section>

          {/* Mission & Vision Section */}
          <section className="bg-white py-24" aria-label="Misija i vizija">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-12 md:grid-cols-2">
                <div className="rounded-2xl bg-[var(--neutral-50)] p-8 shadow-md transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg">
                  <h2 className="mb-6 text-3xl font-bold text-[var(--neutral-800)] after:mt-4 after:block after:h-1 after:w-16 after:bg-[var(--primary)] md:text-4xl">
                    Naša Misija
                  </h2>
                  <p className="text-lg text-[var(--neutral-700)]">
                    Projektujemo domove koji spajaju estetiku, funkcionalnost i
                    ekološku odgovornost, stvarajući prostore koji se savršeno
                    uklapaju u vaš životni stil, a istovremeno poštuju prirodu i
                    okruženje.
                  </p>
                </div>
                <div className="rounded-2xl bg-[var(--neutral-50)] p-8 shadow-md transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg">
                  <h2 className="mb-6 text-3xl font-bold text-[var(--neutral-800)] after:mt-4 after:block after:h-1 after:w-16 after:bg-[var(--accent)] md:text-4xl">
                    Naša Vizija
                  </h2>
                  <p className="text-lg text-[var(--neutral-700)]">
                    Težimo da postanemo vodeći studio za projektovanje kuća koji
                    postavlja nove standarde u održivoj arhitekturi, inspirišući
                    buduće generacije da grade pametnije, održivije i u skladu
                    sa prirodom.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section
            id="tim"
            className="bg-[var(--neutral-100)] py-24"
            aria-label="Naš tim"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-16 text-center text-3xl font-bold text-[var(--neutral-800)] after:mx-auto after:mt-4 after:block after:h-1 after:w-24 after:bg-[var(--primary)] md:text-4xl">
                Srce Našeg Tima
              </h2>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: 'Ana Marković',
                    title: 'Glavni Arhitekta',
                    image: '/images/placeholder-1.webp',
                    quote:
                      'Svaki projekat kuće priča priču. Moj cilj je da vaš dom odražava vaš identitet i poštuje prirodno okruženje.',
                  },
                  {
                    name: 'Marko Petrović',
                    title: 'Inženjer Održivosti',
                    image: '/images/placeholder-2.webp',
                    quote:
                      'Projektovanje zelenih kuća je budućnost. Pronalazim tehnička rešenja koja štede energiju i čuvaju planetu.',
                  },
                  {
                    name: 'Jelena Stojanović',
                    title: 'Dizajner Enterijera',
                    image: '/images/placeholder-3.webp',
                    quote:
                      'Detalji definišu projektovanje kuća. Svaki prostor treba da bude i funkcionalan i inspirativan za svakodnevni život.',
                  },
                ].map((member, index) => (
                  <div
                    key={index}
                    className="group flex flex-col items-center rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="relative mb-6 h-64 w-64 overflow-hidden rounded-full shadow-md">
                      <Image
                        src={member.image}
                        alt={`${member.name} - ${member.title} za projektovanje kuća`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        quality={85}
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-2xl font-semibold text-[var(--neutral-800)]">
                      {member.name}
                    </h3>
                    <p className="mb-3 font-medium text-[var(--primary)]">
                      {member.title}
                    </p>
                    <p className="text-center text-[var(--neutral-600)]">
                      „{member.quote}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="bg-white py-24" aria-label="Naša priča">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-16 text-center text-3xl font-bold text-[var(--neutral-800)] after:mx-auto after:mt-4 after:block after:h-1 after:w-24 after:bg-[var(--accent)] md:text-4xl">
                Naš Put u Projektovanju Kuća
              </h2>
              <div className="grid items-center gap-12 md:grid-cols-2">
                <div className="aspect-h-9 aspect-w-16 relative h-0 overflow-hidden rounded-xl pb-[56.25%] shadow-lg">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/38vK64FNbBI?autoplay=0&mute=1&vq=hd1080"
                    title="Naša Priča - Projektovanje Kuća"
                    loading="lazy"
                    className="absolute left-0 top-0 h-full w-full"
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="flex flex-col space-y-6">
                  <p className="text-lg leading-relaxed text-[var(--neutral-700)]">
                    Naše putovanje u svetu projektovanja kuća započelo je pre
                    pet godina sa malim timom i velikim idejama. Ana je
                    razvijala inovativne nacrte, Marko je implementirao ekološka
                    rešenja za smanjenje energetskog otiska, a Jelena je
                    osiguravala da svaki prostor savršeno balansira formu i
                    funkciju.
                  </p>
                  <p className="text-lg leading-relaxed text-[var(--neutral-700)]">
                    Danas, naš studio za projektovanje je prepoznat po
                    jedinstvenom pristupu koji kombinuje modernu estetiku,
                    održivost i besprekornu funkcionalnost. Svaki projekat kuće
                    je prilika da iznova dokažemo našu posvećenost kvalitetu i
                    inovacijama.
                  </p>
                  <div className="pt-4">
                    <Link
                      href="/projekti-kuce"
                      className="inline-flex items-center font-semibold text-[var(--primary)] transition-colors hover:text-[var(--primary-dark)]"
                      aria-label="Pogledaj naše projekte kuća"
                    >
                      Pogledaj naše projekte
                      <svg
                        className="ml-2 h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative py-20" aria-label="Kontaktirajte nas">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--accent)]"></div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                Spremni za Projektovanje Vaše Kuće?
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90 md:text-xl">
                Zajedno možemo stvoriti dom koji odražava vaš stil života i
                vrednosti - kontaktirajte našu stručnu ekipu danas!
              </p>
              <Link
                href="/kontakt"
                className="inline-block rounded-full bg-white px-8 py-4 text-lg font-semibold text-[var(--primary)] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[var(--neutral-50)] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Kontaktirajte nas za projektovanje vaše kuće"
              >
                Započni Projekat Svoje Kuće
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

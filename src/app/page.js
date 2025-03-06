// src/app/page.js
import Image from 'next/image';
import Link from 'next/link';
import { getProjects } from '@/lib/getProjects';
import BlogSection from '@/components/BlogSection';
import FeaturesSection from '@/components/FeaturesSection';
import { Button, ArrowLink } from '@/components/Button';

export const metadata = {
  title:
    'Projektovanje Kuća | Projekti Kuća - Arhitektonski Dizajn Za Vaš Savršeni Dom',
  description:
    'Profesionalno projektovanje kuća po vašoj meri. Specijalizovani smo za moderne, održive i funkcionalne projekte kuća koji odražavaju vaš životni stil i potrebe.',
  keywords: [
    'projektovanje kuće',
    'projektovanje kuća',
    'projektovanje',
    'projekti kuća',
    'moderna arhitektura',
    'dizajn domova',
    'Paraćin',
    'održivi domovi',
    'idejni projekti',
    'arhitektonski planovi',
    'porodične kuće',
    'stambeni objekti',
    'izgradnja kuće',
    'kuće po meri',
    'energetski efikasne kuće',
    'savremene kuće',
    'arhitektonsko projektovanje',
    'građevinski projekti',
    'idejno rešenje kuće',
    'luksuzne kuće',
    'pristupačne kuće',
    'minimalistički dizajn kuće',
  ],
  alternates: {
    canonical: 'https://www.projektikuce.rs',
  },
  openGraph: {
    title: 'Projektovanje Kuća | Projekti Kuća - Vaš Savršeni Dom',
    description:
      'Profesionalno projektovanje kuća - stvaramo funkcionalnu arhitekturu sa karakterom prilagođenu vašim potrebama.',
    url: 'https://www.projektikuce.rs',
    type: 'website',
    images: [
      {
        url: '/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Projektovanje Kuća - Inspirativni dizajn za vaš dom',
      },
    ],
    siteName: 'Projekti Kuća',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projektovanje Kuća | Projekti Kuća',
    description: 'Projektovanje savremenih porodičnih kuća po vašoj meri',
    image: '/images/og-image.webp',
  },
};

export default async function Home() {
  const projects = await getProjects();
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        {/* Hero sekcija */}
        <section className="relative flex h-[90vh] items-center justify-center text-white">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/hero-image.webp"
              alt="Projektovanje kuća - Arhitektonski dizajn za savršen dom"
              fill
              className="object-cover brightness-75" // promenjeno sa opacity-30 na brightness-75
              quality={85}
              priority={true}
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzM0NTZjYyI+PC9yZWN0Pjwvc3ZnPg=="
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-dark)] via-blue-700 to-[var(--accent)] opacity-80"></div>{' '}
            {/* Dodat opacity-80 */}
          </div>
          <div className="container relative z-10 mx-auto max-w-6xl px-4 text-center">
            <h1 className="text-shadow-lg mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              {' '}
              {/* Dodat text-shadow-lg */}
              Profesionalno Projektovanje Kuća
              <span className="mt-2 block">Za Moderan Način Života</span>
            </h1>
            <p className="text-shadow mx-auto mb-8 max-w-2xl text-lg md:text-xl lg:text-2xl">
              {' '}
              {/* Dodat text-shadow */}
              Ne gradimo samo kuće – projektujemo budućnost vašeg doma sa
              fokusom na funkcionalnost, održivost i estetiku.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                href="/projekti-kuce"
                variant="secondary"
                aria-label="Pogledajte naše projekte kuća"
              >
                Pogledaj Projekte
              </Button>
              <Button
                href="/kontakt"
                variant="outline"
                aria-label="Započnite projektovanje vaše kuće"
              >
                Započni Projektovanje
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-[var(--background)] py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-4 text-center text-3xl font-bold text-[var(--foreground)] md:text-4xl">
              Istaknuti Projekti Kuća
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-[var(--neutral-600)]">
              Pogledajte neke od naših najboljih projekata kuća. Svaki projekat
              je rezultat pažljivog planiranja i saradnje sa klijentima.
            </p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projekti-kuce/${project.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {project.imageURL ? (
                      <Image
                        src={project.imageURL}
                        alt={`${project.title} - Projekat kuće`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        quality={80}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[var(--neutral-200)]">
                        <span className="text-[var(--neutral-400)]">
                          Slika nije dostupna
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-semibold text-[var(--neutral-800)] transition-colors group-hover:text-[var(--primary)]">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[var(--neutral-600)]">
                      {project.description ||
                        'Detaljan projekat kuće prilagođen modernom načinu života.'}
                    </p>
                    <span className="mt-4 inline-flex items-center font-medium text-[var(--primary)] transition-all group-hover:translate-x-1">
                      Saznaj više
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <ArrowLink
                href="/projekti-kuce"
                className="text-lg font-semibold"
              >
                Naši Projekti Kuća
              </ArrowLink>
            </div>
          </div>
        </section>

        {/* Prednosti naših usluga */}
        <section className="bg-[var(--background)] py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-[var(--foreground)] md:text-4xl">
              Profesionalno{' '}
              <span className="text-[var(--primary)]">Projektovanje Kuća</span>
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-md transition-transform hover:shadow-lg">
                <div className="mb-4 inline-flex rounded-full bg-[var(--primary-light)] p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8 text-[var(--primary)]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-[var(--neutral-800)]">
                  Personalizovan Pristup
                </h3>
                <p className="text-[var(--neutral-600)]">
                  Svaki projekat kuće prilagođavamo vašim željama i potrebama.
                  Detaljno analiziramo vaš način života i stvaramo dom koji ga
                  savršeno dopunjuje.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-md transition-transform hover:shadow-lg">
                <div className="mb-4 inline-flex rounded-full bg-[var(--primary-light)] p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8 text-[var(--primary)]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-[var(--neutral-800)]">
                  Energetska Efikasnost
                </h3>
                <p className="text-[var(--neutral-600)]">
                  Naši projekti kuća uključuju savremena rešenja za energetsku
                  efikasnost. Smanjite troškove održavanja i doprinesite
                  očuvanju prirode.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-md transition-transform hover:shadow-lg">
                <div className="mb-4 inline-flex rounded-full bg-[var(--primary-light)] p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8 text-[var(--primary)]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-[var(--neutral-800)]">
                  Kompletna Tehnička Dokumentacija
                </h3>
                <p className="text-[var(--neutral-600)]">
                  Izrađujemo detaljne projekte sa svom potrebnom dokumentacijom
                  za dobijanje građevinske dozvole i uspešnu izgradnju.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Usluge - FeaturesSection */}
        <FeaturesSection />

        {/* Kako funkcioniše naše projektovanje */}
        <section className="bg-[var(--neutral-50)] py-12 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
              <div className="text-center md:w-1/2 md:text-left">
                <h2 className="mb-6 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
                  Kako funkcioniše naše{' '}
                  <span className="text-[var(--primary)]">
                    projektovanje kuća
                  </span>
                  ?
                </h2>
                <p className="mb-6 text-lg text-[var(--neutral-700)]">
                  Svaki projekat kuće počinje sa vašom vizijom. Naš tim
                  arhitekata pretvara vaše ideje u funkcionalne i estetski
                  privlačne projekte kuća koje odražavaju vaš stil života.
                </p>
                <ul className="space-y-4 text-left">
                  <li className="flex items-start">
                    <span className="mr-3 text-[var(--primary)]">1.</span>
                    <span className="text-[var(--neutral-700)]">
                      <strong>Konsultacija</strong> - Razgovaramo o vašim
                      potrebama, željama i budžetu
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-[var(--primary)]">2.</span>
                    <span className="text-[var(--neutral-700)]">
                      <strong>Idejno rešenje</strong> - Pripremamo inicijalne
                      skice i koncepte
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-[var(--primary)]">3.</span>
                    <span className="text-[var(--neutral-700)]">
                      <strong>Razrada projekta</strong> - Detaljno projektovanje
                      svih aspekata kuće
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-[var(--primary)]">4.</span>
                    <span className="text-[var(--neutral-700)]">
                      <strong>Isporuka</strong> - Predaja kompletne tehničke
                      dokumentacije
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 md:mt-0 md:w-1/2">
                <div className="mx-auto max-w-lg overflow-hidden rounded-xl shadow-xl">
                  <Image
                    src="/images/projektovanje-process.webp"
                    alt="Proces projektovanja kuće - od ideje do realizacije"
                    width={1024}
                    height={768}
                    className="h-auto w-full object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 95vw, (max-width: 1024px) 75vw, 512px"
                    quality={90}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Istaknuti projekti */}

        {/* Blog sekcija */}
        <BlogSection />

        {/* Utisci klijenata */}
        <section className="bg-[var(--neutral-50)] py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-[var(--foreground)] md:text-4xl">
              Šta kažu naši klijenti o našem projektovanju
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <div className="mb-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 italic text-[var(--neutral-600)]">
                  "Proces projektovanja naše kuće bio je neočekivano
                  jednostavan. Tim je razumeo naše potrebe i želje, a rezultat
                  je savršen dom za našu porodicu. Posebno smo zadovoljni kako
                  je iskorišćen svaki kvadrat prostora."
                </p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-[var(--primary-light)]">
                    <Image
                      src="/images/testimonial-1.webp"
                      alt="Testimonial avatar"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--neutral-800)]">
                      Marija Jovanović
                    </h4>
                    <p className="text-sm text-[var(--neutral-500)]">Beograd</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-md">
                <div className="mb-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 italic text-[var(--neutral-600)]">
                  "Oduševljeni smo kako je projekat naše kuće ispao. Arhitekte
                  su prihvatile sve naše sugestije i u isto vreme dale odlične
                  savete. Energetska efikasnost koju su implementirali štedi nam
                  značajne troškove grejanja."
                </p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-[var(--primary-light)]">
                    <Image
                      src="/images/testimonial-2.webp"
                      alt="Testimonial avatar"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--neutral-800)]">
                      Nikola Petrović
                    </h4>
                    <p className="text-sm text-[var(--neutral-500)]">
                      Novi Sad
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-md md:col-span-2 lg:col-span-1">
                <div className="mb-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 italic text-[var(--neutral-600)]">
                  "Profesionalan pristup od prvog dana. Detaljno su objasnili
                  proces projektovanja kuće i pravovremeno odgovarali na sva
                  pitanja. Uspeli su da u projekat uklope sve što smo želeli,
                  čak i neke kompleksne zahteve."
                </p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-[var(--primary-light)]">
                    <Image
                      src="/images/testimonial-3.webp"
                      alt="Testimonial avatar"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--neutral-800)]">
                      Ana i Milan Đorđević
                    </h4>
                    <p className="text-sm text-[var(--neutral-500)]">
                      Kragujevac
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA sekcija */}
        <section className="bg-gradient-to-r from-[var(--primary-dark)] to-[var(--accent)] py-16 text-white md:py-24">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-shadow-sm mb-6 text-3xl font-bold md:text-4xl">
              Spremni za Projektovanje Vaše Kuće?
            </h2>
            <p className="text-shadow-sm mx-auto mb-8 max-w-2xl text-lg md:text-xl">
              Kontaktirajte nas danas za besplatnu konsultaciju. Započnite put
              ka vašem savršenom domu uz stručno vođenje našeg tima za
              projektovanje kuća.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                href="/kontakt"
                variant="primary"
                className="animate-pulse hover:animate-none"
              >
                Zatražite Ponudu
              </Button>
              <Button href="/projekti-kuce" variant="outline">
                Pregledajte Projekte
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

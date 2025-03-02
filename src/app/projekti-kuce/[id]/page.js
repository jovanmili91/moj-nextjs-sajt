// src/app/projekti-kuce/[id]/page.js
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjects, getProjectById } from '../../../lib/getProjects';
import ProjectGallery from '../../../components/ProjectGallery';

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const project = await getProjectById(id);

  if (!project) {
    return {
      title: 'Projekat nije pronađen | Projekti Kuća',
      description: 'Traženi projekat kuće nije pronađen.',
    };
  }

  const keywordsArray = [
    'projektovanje kuće',
    'projektovanje kuća',
    'projekti kuća',
    project.title.toLowerCase(),
    `${project.area} kuća`,
    `kuća sa ${project.specifications?.bedrooms || 'Nije navedeno'} spavaće sobe`,
    'arhitektonsko projektovanje',
    'idejni projekat kuće',
    'glavni projekat',
    'projektovanje',
  ];

  return {
    title: `${project.title} - Projekat Kuće | Projektovanje Kuća`,
    description: `${project.description.slice(0, 150)}... Profesionalno projektovanje kuća - ${project.title.toLowerCase()}, sa površinom od ${project.area}.`,
    keywords: keywordsArray.join(', '),
    openGraph: {
      title: `${project.title} | Projekti i Projektovanje Kuća`,
      description: project.description,
      url: `https://www.projektikuce.rs/projekti-kuce/${id}`, // Zamena params.id sa id
      images: [
        {
          url: project.imageURL,
          width: 1200,
          height: 630,
          alt: `Projekat kuće - ${project.title}`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Projektovanje Kuća`,
      description: project.description.slice(0, 180) + '...',
      images: [project.imageURL],
    },
    alternates: {
      canonical: `https://www.projektikuce.rs/projekti-kuce/${id}`, // Zamena params.id sa id
    },
    other: {
      'revisit-after': '7 days',
    },
  };
}

// Generate static params dynamically
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ id: project.id.toString() }));
}

// Izdvojene komponente za bolju organizaciju koda
function ProjectHeader({ title, completionYear, className = '' }) {
  return (
    <div className={`mb-6 ${className}`}>
      <h1 className="mb-2 text-3xl font-bold text-[var(--neutral-800)] md:text-4xl lg:text-5xl">
        {title}
      </h1>
      <p className="text-sm text-[var(--neutral-500)]">
        Projekat završen: {completionYear || 'Nije navedeno'}
      </p>
    </div>
  );
}

function ProjectSpecifications({ specifications }) {
  const specs = specifications || {};

  // Definisanje specifikacija koje će se prikazati
  const specItems = [
    {
      label: 'Površina',
      value: specs.size,
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
      label: 'Spratova',
      value: specs.floors,
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    },
    {
      label: 'Spavaće sobe',
      value: specs.bedrooms,
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
      label: 'Kupatila',
      value: specs.bathrooms,
      icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    },
    {
      label: 'Energetski razred',
      value: specs.energyClass,
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
  ];

  return (
    <div className="mb-8">
      <h3 className="mb-4 text-xl font-semibold text-[var(--neutral-800)]">
        Specifikacije projekta
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {specItems.map((item, index) => (
          <div
            key={index}
            className="rounded-lg bg-[var(--neutral-50)] p-4 text-center shadow-sm transition hover:shadow-md"
          >
            <div className="mb-2 flex justify-center">
              <svg
                className="h-6 w-6 text-[var(--primary)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={item.icon}
                />
              </svg>
            </div>
            <p className="text-sm text-[var(--neutral-500)]">{item.label}</p>
            <p className="font-semibold">{item.value || 'Nije navedeno'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectFeatures({ features }) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="mb-4 text-xl font-semibold text-[var(--neutral-800)]">
        Karakteristike projekta
      </h3>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center rounded-lg bg-[var(--neutral-50)] p-3 shadow-sm transition hover:shadow-md"
          >
            <svg
              className="mr-3 h-5 w-5 text-[var(--primary)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Optimizovana funkcija za dobijanje sličnih projekata
async function getRelatedProjects(currentId, numberOfProjects = 3) {
  const projects = await getProjects();
  // Filtrira trenutni projekat i uzima nasumične projekte
  return projects
    .filter((project) => project.id.toString() !== currentId.toString()) // Osigurava ispravno poređenje ID-ova
    .sort(() => 0.5 - Math.random())
    .slice(0, numberOfProjects);
}

function RelatedProjects({ relatedProjects }) {
  if (!relatedProjects || relatedProjects.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="mb-6 text-center text-2xl font-bold text-[var(--neutral-800)]">
        Slični projekti kuća
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {relatedProjects.map((project) => (
          <Link
            href={`/projekti-kuce/${project.id}`}
            key={project.id}
            className="group overflow-hidden rounded-lg shadow-md transition hover:shadow-lg"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={project.imageURL}
                alt={`Projekat kuće - ${project.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNiI+PC9yZWN0Pjwvc3ZnPg=="
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[var(--neutral-800)] transition group-hover:text-[var(--primary)]">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-[var(--neutral-500)]">
                {project.area} •{' '}
                {project.specifications?.bedrooms || 'Nije navedeno'} sobe
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function CtaSection() {
  return (
    <div className="from-[var(--primary)]/10 to-[var(--primary)]/20 my-16 rounded-lg bg-gradient-to-r p-8 text-center shadow-md">
      <h3 className="mb-4 text-2xl font-semibold text-[var(--neutral-800)]">
        Zainteresovani za ovaj projekat kuće?
      </h3>
      <p className="mx-auto mb-6 max-w-2xl text-[var(--neutral-600)]">
        Kontaktirajte nas za više detalja o projektovanju kuće po vašim željama.
        Naš tim stručnjaka za projektovanje kuća vam stoji na raspolaganju.
      </p>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          href="/kontakt"
          className="inline-block rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white transition-all hover:bg-[var(--primary-dark)] hover:shadow-lg"
        >
          Zatražite konsultaciju
        </Link>
        <Link
          href="/usluge/projektovanje-kuca"
          className="inline-block rounded-lg border border-[var(--primary)] bg-white px-6 py-3 font-medium text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-white hover:shadow-lg"
        >
          Saznajte više o projektovanju
        </Link>
      </div>
    </div>
  );
}

// Komponenta za prikaz usluga projektovanja - izdvojena radi ponovne upotrebe
function DesignServices() {
  const services = [
    {
      name: 'Idejno rešenje',
      description: 'Konceptualni dizajn vašeg objekta',
    },
    {
      name: 'Glavni projekat',
      description: 'Detaljan projekat sa svim specifikacijama',
    },
    {
      name: 'Projekat za građevinsku dozvolu',
      description: 'Dokumentacija potrebna za dozvole',
    },
    {
      name: 'Projekat za izvođenje',
      description: 'Tehnički detalji za izvođače radova',
    },
    {
      name: 'Nadzor nad izgradnjom',
      description: 'Stručni nadzor tokom realizacije projekta',
    },
  ];

  return (
    <div className="mb-6 rounded-xl bg-white p-6 shadow-md">
      <h3 className="mb-4 text-xl font-semibold text-[var(--neutral-800)]">
        Usluge projektovanja
      </h3>
      <ul className="space-y-3">
        {services.map((service, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-[var(--primary)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <span className="font-medium">{service.name}</span>
              <p className="text-sm text-[var(--neutral-500)]">
                {service.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Link
          href="/usluge/projektovanje"
          className="inline-block w-full rounded-lg bg-[var(--primary)] px-4 py-3 text-center font-medium text-white transition-all hover:bg-[var(--primary-dark)]"
        >
          Detaljnije o projektovanju
        </Link>
      </div>
    </div>
  );
}

// Komponenta za prikaz kontakt informacija - izdvojena radi ponovne upotrebe
function ContactInfo() {
  return (
    <div className="rounded-xl bg-[var(--neutral-50)] p-6 shadow-md">
      <h3 className="mb-4 text-xl font-semibold text-[var(--neutral-800)]">
        Imate pitanja?
      </h3>
      <p className="mb-4 text-[var(--neutral-600)]">
        Pozovite nas ili pošaljite upit za detaljnije informacije o našem
        procesu projektovanja kuća.
      </p>
      <div className="space-y-3">
        <a
          href="tel:+381601234567"
          className="flex items-center text-[var(--primary)] transition hover:text-[var(--primary-dark)]"
          aria-label="Pozovite nas na telefon"
        >
          <svg
            className="mr-2 h-5 w-5"
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
          +381 60 123 4567
        </a>
        <a
          href="mailto:info@projektikuce.com"
          className="flex items-center text-[var(--primary)] transition hover:text-[var(--primary-dark)]"
          aria-label="Pošaljite nam email"
        >
          <svg
            className="mr-2 h-5 w-5"
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
          info@projektikuce.com
        </a>
      </div>
    </div>
  );
}

export default async function ProjectPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  // Direktno koristimo images niz iz projekta
  // Ovo je sigurnije jer neće pokušavati učitati default slike ako one ne postoje
  let galleryImages = [];

  if (
    project.images &&
    Array.isArray(project.images) &&
    project.images.length > 0
  ) {
    galleryImages = project.images;
  } else {
    galleryImages = [project.imageURL];
  }

  // Važno - await za relatedProjects
  const relatedProjects = await getRelatedProjects(id); // Koristimo id umesto params.id
  return (
    <main className="min-h-screen bg-[var(--neutral-50)] py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Link
          href="/projekti-kuce"
          className="mb-8 inline-flex items-center text-[var(--primary)] transition-all hover:translate-x-[-5px] hover:text-[var(--primary-dark)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Nazad na sve projekte kuća
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProjectHeader
              title={project.title}
              completionYear={project.completionYear}
            />

            {/* Glavna slika projekta */}
            <div className="aspect-video relative mb-8 h-[400px] w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src={project.imageURL}
                alt={`Projekat kuće - ${project.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                priority
                className="object-cover"
                quality={90}
              />
            </div>

            {/* Galerija slika */}
            {galleryImages.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-[var(--neutral-800)]">
                  Galerija projekta
                </h2>
                <ProjectGallery
                  images={galleryImages}
                  projectTitle={project.title}
                />
              </div>
            )}

            <div className="mb-8 rounded-xl bg-white p-6 shadow-md">
              <h2 className="mb-4 text-2xl font-semibold text-[var(--neutral-800)]">
                O projektu
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-[var(--neutral-700)]">
                {project.description}
              </p>
              <div className="mb-6 flex flex-col items-center justify-between rounded-lg bg-[var(--neutral-50)] p-4 sm:flex-row">
                <div>
                  <span className="block text-sm text-[var(--neutral-500)]">
                    Tip projekta
                  </span>
                  <span className="font-semibold">{project.title}</span>
                </div>
                <div className="mt-4 sm:mt-0">
                  <span className="block text-sm text-[var(--neutral-500)]">
                    Orijentaciona cena
                  </span>
                  <span className="font-semibold">
                    {project.price || 'Po dogovoru'}
                  </span>
                </div>
              </div>
              <ProjectSpecifications
                specifications={project.specifications || {}}
              />
              <ProjectFeatures features={project.features || []} />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <DesignServices />
              <ContactInfo />
            </div>
          </div>
        </div>
        <CtaSection />
        <RelatedProjects relatedProjects={relatedProjects} />
      </div>
    </main>
  );
}

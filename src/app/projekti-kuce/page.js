// src/app/projekti-kuce/page.js
import ProjectsClient from './ProjectsClient';

// SEO metadata
export const metadata = {
  title: 'Projekti Kuća | Profesionalno projektovanje kuća po meri',
  description:
    'Pogledajte našu jedinstvenu kolekciju projekata kuća - profesionalno projektovanje kuće sa fokusom na funkcionalnost, održivost i moderan dizajn.',
  keywords: [
    'projektovanje kuće',
    'projektovanje kuća',
    'projektovanje',
    'projekti kuća',
    'moderna arhitektura',
    'portfolio kuća',
    'Paraćin',
    'dizajn domova',
    'održivi projekti',
  ],
  alternates: {
    canonical: 'https://www.projektikuce.rs/projekti-kuce',
  },
  openGraph: {
    title: 'Projekti Kuća | Profesionalno projektovanje kuća po meri',
    description:
      'Kolekcija naših jedinstvenih projekata i stručno projektovanje kuća - inspiracija za vaš savršeni dom.',
    url: 'https://www.projektikuce.rs/projekti-kuce',
    type: 'website',
    images: [
      {
        url: '/images/projects-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Projekti Kuća - Portfolio Radova',
      },
    ],
    siteName: 'Projekti Kuća',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projekti Kuća | Profesionalno projektovanje kuća',
    description:
      'Otkrijte projekte koji redefinišu dom - moderan i praktičan pristup projektovanju kuća.',
    image: '/images/projects-hero.webp',
  },
};

// Server Component that renders the Client Component
export default function ProjectsPage() {
  return <ProjectsClient />;
}

// src/app/blog/page.js
import BlogClient from './BlogClient';

// SEO metadata
export const metadata = {
  title: 'Blog | Projekti Kuća - Saveti i novosti o projektovanju kuća',
  description:
    'Posetite naš blog sa stručnim savetima, novostima i inspiracijom za projektovanje kuća - sve o arhitekturi, dizajnu i savremenim rešenjima za vaš dom.',
  keywords: [
    'projektovanje kuće',
    'projektovanje kuća',
    'blog arhitektura',
    'saveti za gradnju',
    'dizajn enterijera',
    'moderna arhitektura',
    'trendovi u projektovanju',
    'energetska efikasnost',
    'održiva gradnja',
  ],
  alternates: {
    canonical: 'https://www.projektikuce.rs/blog',
  },
  openGraph: {
    title: 'Blog | Projekti Kuća - Saveti o projektovanju kuća',
    description:
      'Stručni članci i saveti o projektovanju kuća, arhitekturi i uređenju doma - vaš vodič kroz proces projektovanja.',
    url: 'https://www.projektikuce.rs/blog',
    type: 'website',
    images: [
      {
        url: '/images/blog-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Projekti Kuća Blog - Saveti o projektovanju',
      },
    ],
    siteName: 'Projekti Kuća',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Projekti Kuća - Projektovanje kuća',
    description:
      'Saznajte sve o projektovanju kuća kroz naše stručne članke i savete.',
    image: '/images/blog-hero.webp',
  },
};

// Server Component that renders the Client Component
export default function BlogPage() {
  return <BlogClient />;
}

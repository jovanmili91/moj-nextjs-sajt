// src\app\layout.js
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://www.projektikuce.rs'
    : 'http://localhost:3001');

export const metadata = {
  metadataBase: new URL(baseURL),
  title: {
    default: 'Projekti Kuća | Projektovanje kuća i stambenih objekata',
    template: '%s | Projekti Kuća - Projektovanje i izrada',
  },
  description:
    'Projektovanje i izrada kuća po meri. Moderna arhitektura i funkcionalni domovi za vaše potrebe u Paraćinu i širom Srbije.',
  keywords:
    'projektovanje kuća, projektovanje kuće, projektovanje, izrada projekata, projekti kuća, moderna arhitektura, funkcionalni domovi, Paraćin, dizajn enterijera, stambeni objekti',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Projekti Kuća | Stručno projektovanje i izrada kuća',
    description:
      'Vaš partner za projektovanje i izgradnju modernih i funkcionalnih domova. Projektovanje kuća po vašoj meri.',
    url: baseURL,
    siteName: 'Projekti Kuća',
    locale: 'sr_RS',
    type: 'website',
    images: [
      {
        url: `${baseURL}/images/og-image.webp`,
        width: 1200,
        height: 630,
        alt: 'Projekti Kuća - Stručno projektovanje kuća',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projekti Kuća | Projektovanje kuća',
    description:
      'Projektovanje i izrada modernih i funkcionalnih stambenih objekata.',
    images: [`${baseURL}/images/og-image.webp`],
  },
  alternates: { canonical: baseURL },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  authors: [{ name: 'Projekti Kuća Tim' }],
  category: 'Arhitektura i Građevinarstvo',
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
  };
}

export const dynamic = 'auto';

export default function RootLayout({ children }) {
  return (
    <html
      lang="sr"
      className={`${inter.variable} scroll-smooth font-sans`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Uklonjen preload za hero-image.webp */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Projekti Kuća',
              url: baseURL,
              logo: `${baseURL}/images/logo.webp`,
              description: 'Projektovanje kuća i izrada stambenih objekata',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Paraćin',
                addressRegion: 'Pomoravski okrug',
                addressCountry: 'Srbija',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+381-62-277-686',
                contactType: 'customer service',
              },
            }),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}

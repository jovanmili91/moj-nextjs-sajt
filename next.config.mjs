/**
 * Konfiguracioni fajl za Next.js aplikaciju
 * Projekti Kuća - Specijalizovana platforma za projektovanje kuća
 * @type {import('next').NextConfig}
 */
import nextMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

// Konfiguracija MDX-a za blog postove
const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug, // Automatski dodaje ID-ove naslovima
      [
        rehypePrettyCode, // Lepši prikaz koda u blogovima
        {
          theme: 'github-dark', // Možeš promeniti temu po želji
          keepBackground: true,
        },
      ],
    ],
  },
});

const nextConfig = {
  // Osnovne postavke
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'], // Dodata podrška za .md i .mdx

  // optimizeFonts opcija je uklonjena jer nije podržana u Next.js 15.2.0
  // Font optimizacija se sada konfiguriše kroz next/font module

  // UNAPREĐENA Optimizacija slika
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.projektikuce.com' },
      { protocol: 'https', hostname: 'projektikuce.com' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // Povećano na 7 dana za postojane slike
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    unoptimized: process.env.NODE_ENV === 'development', // Omogućava lokalne slike u development modu
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // HTTP zaglavlja za bezbednost i keširanje
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; img-src 'self' https: data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; font-src 'self' https:; connect-src 'self' https:; frame-src 'self' https://www.youtube.com;",
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
      {
        source:
          '/:path*.(jpg|jpeg|png|gif|webp|avif|ico|svg|woff2|woff|eot|ttf|js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(projektovanje-kuce|projektovanje-kuca|projekti|blog)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },

  // Kompresija i trailing slash
  compress: true,
  trailingSlash: false, // IZMENJENO: Postavljeno na false da se izbegne problem sa slugovima

  // Paketi koji zahtevaju transpilaciju
  transpilePackages: ['lodash-es', 'react-markdown'],

  // UNAPREĐENE Eksperimentalne funkcionalnosti
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost', 'projektikuce.com', 'www.projektikuce.com'],
    },
    optimizeCss: true,
    turbo: {
      loaders: {
        '.svg': ['@svgr/webpack'],
      },
    },
    mdxRs: true, // Omogućava brže MDX renderovanje sa Rust-baziranim parserom
  },

  // Preusmeravanja i prepisivanja
  async rewrites() {
    return [
      // { source: '/sitemap.xml', destination: '/api/sitemap' },
      // Uklonjen rewrite za blog jer nije potreban sa ispravnom konfiguracijom
    ];
  },

  // Dodato preusmeravanje za podršku starim URL-ovima sa trailing slash
  async redirects() {
    return [
      {
        source: '/blog/:slug/',
        destination: '/blog/:slug',
        permanent: true,
      },
      // NOVO: Dodato preusmeravanje za stare URL-ove sa pogrešnim imenima
      {
        source: '/projekti/:slug',
        destination: '/projekti-kuce/:slug',
        permanent: true,
      },
    ];
  },

  // Webpack konfiguracija
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          mdx: {
            test: /[\\/]node_modules[\\/](@mdx-js|next-mdx-remote)[\\/]/,
            name: 'mdx',
            priority: 10,
          },
        },
      };
    }

    return config;
  },

  // Direktorijum za build
  distDir: process.env.BUILD_DIR || '.next',

  // Environment promenljive
  env: {
    SITE_NAME: 'Projekti Kuća - Profesionalno projektovanje kuća',
    SITE_DESCRIPTION:
      'Projekti Kuća, kvalitetno projektovanje kuća po meri, moderan dizajn i funkcionalna rešenja',
    SITE_URL: 'https://www.projektikuce.rs',
  },
};

// Eksportovanje konfiguracije sa MDX podrškom
export default withMDX(nextConfig);

// src/app/blog/[slug]/page.js
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getBlogs, getLatestBlogs } from '../../../lib/getBlogs';
import React from 'react';

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  try {
    // Use await with params in Next.js 15
    const { slug } = await params;
    console.log(`Generisanje metapodataka za blog slug: ${slug}`);

    const blog = await getBlogBySlug(slug);

    if (!blog) {
      console.log(`Blog nije pronađen za slug: ${slug}`);
      return {
        title: 'Blog post nije pronađen | Projekti Kuća',
        description: 'Traženi blog post nije pronađen.',
      };
    }

    // Formiranje ključnih reči sa projektovanje kuća/kuće kao glavnim terminima
    const keywordsArray = [
      'projektovanje kuće',
      'projektovanje kuća',
      'blog',
      blog.title.toLowerCase(),
      ...blog.tags.map((tag) => tag.toLowerCase()),
      'saveti za projektovanje',
      'blog o arhitekturi',
      'saveti za uređenje doma',
    ];

    return {
      title: `${blog.title} | Blog o projektovanju kuća`,
      description: blog.description.slice(0, 160) + '...',
      keywords: keywordsArray.join(', '),
      openGraph: {
        title: `${blog.title} | Blog o projektovanju kuća`,
        description: blog.description,
        url: `https://www.projektikuce.com/blog/${slug}`,
        images: [
          {
            url: blog.imageURL,
            width: 1200,
            height: 630,
            alt: `${blog.title} - Blog o projektovanju kuća`,
          },
        ],
        type: 'article',
        article: {
          publishedTime: blog.publishedAt,
          modifiedTime: blog.updatedAt,
          authors: [blog.author],
          tags: blog.tags,
        },
      },
      twitter: {
        card: 'summary_large_image',
        title: `${blog.title} | Blog o projektovanju kuća`,
        description: blog.description.slice(0, 180) + '...',
        images: [blog.imageURL],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog | Projekti Kuća',
      description: 'Blog o projektovanju kuća',
    };
  }
}

// Generate static params dynamically
export async function generateStaticParams() {
  try {
    const blogs = await getBlogs();
    console.log(`Generisanje statičkih parametara za ${blogs.length} blogova`);
    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Izdvojene komponente za bolju organizaciju koda
function BlogHeader({
  title,
  publishedAt,
  author,
  readTime,
  tags,
  className = '',
}) {
  // Formatiranje datuma
  const formattedDate = new Date(publishedAt).toLocaleDateString('sr-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={`mb-8 ${className}`}>
      <h1 className="mb-4 text-3xl font-bold text-[var(--neutral-800)] md:text-4xl lg:text-5xl">
        {title}
      </h1>
      <div className="flex flex-wrap items-center text-[var(--neutral-500)]">
        <div className="mr-6 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          {author}
        </div>
        <div className="mr-6 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          {formattedDate}
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          {readTime} min čitanja
        </div>
      </div>
      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap">
          {tags.map((tag, index) => (
            <Link
              key={index}
              href={`/blog?tag=${tag.toLowerCase()}`}
              className="bg-[var(--primary)]/[0.1] hover:bg-[var(--primary)]/[0.15] mr-2 mt-2 rounded-full px-3 py-1 text-xs font-medium text-[var(--primary)] transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ShareLinks({ title, slug }) {
  const url = `https://www.projektikuce.com/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(
    `${title} | Blog o projektovanju kuća`
  );

  return (
    <div className="mb-6 flex flex-col items-center rounded-lg bg-[var(--neutral-50)] p-4 md:flex-row md:justify-between">
      <p className="mb-3 text-[var(--neutral-700)] md:mb-0">
        Podelite ovaj članak:
      </p>
      <div className="flex space-x-4">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#3b5998] p-2 text-white transition-all hover:bg-[#4c70ba] hover:shadow-md"
          aria-label="Podelite na Facebook-u"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#1da1f2] p-2 text-white transition-all hover:bg-[#4db5f5] hover:shadow-md"
          aria-label="Podelite na Twitter-u"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#0077b5] p-2 text-white transition-all hover:bg-[#0090db] hover:shadow-md"
          aria-label="Podelite na LinkedIn-u"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
          </svg>
        </a>
        <a
          href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
          className="rounded-full bg-[var(--neutral-700)] p-2 text-white transition-all hover:bg-[var(--neutral-900)] hover:shadow-md"
          aria-label="Podelite putem Email-a"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
        </a>
      </div>
    </div>
  );
}

// Komponenta za sidebar sa najpopularnijim člancima
function Sidebar({ popularBlogs }) {
  if (!popularBlogs || popularBlogs.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-6">
      <div className="mb-6 rounded-xl bg-white p-6 shadow-md">
        <h3 className="mb-4 text-xl font-semibold text-[var(--neutral-800)]">
          Popularni članci
        </h3>
        <div className="space-y-4">
          {popularBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group flex items-start"
            >
              <div className="relative mr-3 h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={blog.imageURL}
                  alt={blog.title}
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-[var(--neutral-700)] transition-colors group-hover:text-[var(--primary)]">
                  {blog.title}
                </h4>
                <p className="mt-1 text-xs text-[var(--neutral-500)]">
                  {new Date(blog.publishedAt).toLocaleDateString('sr-RS', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/blog"
          className="mt-4 inline-block w-full rounded-lg bg-[var(--primary)] px-4 py-2 text-center text-sm font-medium text-white transition-all hover:bg-[var(--primary-dark)]"
        >
          Svi blog članci
        </Link>
      </div>

      <div className="rounded-xl bg-[var(--neutral-50)] p-6 shadow-md">
        <h3 className="mb-4 text-xl font-semibold text-[var(--neutral-800)]">
          Zainteresovani za projektovanje?
        </h3>
        <p className="mb-4 text-[var(--neutral-600)]">
          Želite da saznate više o projektovanju i izgradnji vaše idealne kuće?
          Kontaktirajte nas za besplatnu konsultaciju.
        </p>
        <Link
          href="/kontakt"
          className="inline-block w-full rounded-lg bg-[var(--primary)] px-4 py-3 text-center font-medium text-white transition-all hover:bg-[var(--primary-dark)]"
        >
          Zatražite konsultaciju
        </Link>
      </div>
    </div>
  );
}

// Helper za jednostavno prevođenje Markdown-a u HTML
function simpleMarkdownToHtml(markdown) {
  if (!markdown) return '';

  // Osnovne transformacije - ovo je pojednostavljeno
  let html = markdown
    // Headings
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Images
    .replace(
      /!\[(.*?)\]\((.*?)\)/g,
      '<img src="$2" alt="$1" class="mx-auto rounded-lg shadow-md my-4" />'
    )
    // Links
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" class="text-[var(--primary)] hover:text-[var(--primary-dark)]">$1</a>'
    )
    // Lists
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    // Blockquote
    .replace(
      /^> (.*$)/gim,
      '<blockquote class="border-l-4 border-[var(--primary)] pl-4 py-2 my-4 bg-[var(--neutral-50)]">$1</blockquote>'
    )
    // Code blocks
    .replace(
      /```([\s\S]*?)```/g,
      '<pre class="bg-[var(--neutral-100)] p-4 rounded-lg overflow-auto text-sm my-4">$1</pre>'
    )
    // Paragraphs
    .replace(/^\s*(\n)?(.+)/gm, function (m) {
      return /\<(\/)?(h1|h2|h3|ul|ol|li|blockquote|pre)/.test(m)
        ? m
        : '<p>' + m + '</p>';
    })
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '');

  // Grupiranje liste
  html = html.replace(/<li>[\s\S]*?<\/li>/g, function (match) {
    return '<ul class="list-disc pl-6 my-4">' + match + '</ul>';
  });

  // Zamena višestrukih ul tagova
  html = html.replace(/<\/ul>\s*<ul[^>]*>/g, '');

  // Dodaj posebne klase za sve paragrafe
  html = html.replace(/<p>/g, '<p class="mb-4 text-[var(--neutral-700)]">');

  return html;
}

// Main page component
export default async function BlogPostPage({ params }) {
  try {
    // Use await with params in Next.js 15
    const { slug } = await params;
    console.log(`Rendering blog page for slug: "${slug}"`);

    // Get blog data
    const blog = await getBlogBySlug(slug);

    if (!blog) {
      console.log(`Blog post nije pronađen za slug: "${slug}"`);
      notFound();
    }

    // Get latest blogs for popular section
    const popularBlogs = await getLatestBlogs(4);

    // Konvertuj sadržaj iz Markdowna u HTML
    const contentHtml = simpleMarkdownToHtml(blog.content);

    return (
      <main className="min-h-screen bg-[var(--neutral-50)] py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Link
            href="/blog"
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
            Nazad na blog
          </Link>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <BlogHeader
                title={blog.title}
                publishedAt={blog.publishedAt}
                author={blog.author}
                readTime={blog.readTime}
                tags={blog.tags}
              />

              <div className="aspect-video relative mb-8 w-full overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={blog.imageURL}
                  alt={`${blog.title} - Blog o projektovanju kuća`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                  priority
                  className="object-cover"
                  quality={90}
                />
              </div>

              <ShareLinks title={blog.title} slug={blog.slug} />

              <div className="mb-8 rounded-xl bg-white p-6 shadow-md">
                <article className="blog-content prose prose-lg max-w-none prose-headings:text-[var(--neutral-800)] prose-h2:mt-8 prose-h2:text-2xl prose-p:text-[var(--neutral-700)] prose-a:text-[var(--primary)] prose-a:no-underline prose-a:transition-colors hover:prose-a:text-[var(--primary-dark)] prose-blockquote:border-l-[var(--primary)] prose-blockquote:bg-[var(--neutral-50)] prose-blockquote:p-4 prose-blockquote:not-italic prose-strong:text-[var(--neutral-800)] prose-img:rounded-lg prose-img:shadow-md">
                  {/* Render HTML direktno umesto MDX-a */}
                  <div
                    className="markdown-content"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                  />
                </article>
              </div>

              <ShareLinks title={blog.title} slug={blog.slug} />
            </div>

            <div className="lg:col-span-1">
              <Sidebar popularBlogs={popularBlogs} />
            </div>
          </div>
        </div>

        {/* Schema.org JSON-LD za blog post */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: blog.title,
              image: blog.imageURL,
              author: {
                '@type': 'Person',
                name: blog.author,
              },
              publisher: {
                '@type': 'Organization',
                name: 'Projekti Kuća',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://www.projektikuce.com/images/logo.webp',
                },
              },
              datePublished: blog.publishedAt,
              dateModified: blog.updatedAt,
              description: blog.description,
              keywords:
                'projektovanje kuće, projektovanje kuća, ' +
                blog.tags.join(', '),
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://www.projektikuce.com/blog/${blog.slug}`,
              },
            }),
          }}
        />
      </main>
    );
  } catch (error) {
    console.error('Error rendering blog page:', error);
    console.error('Error stack:', error.stack);
    return (
      <div className="container mx-auto p-10">
        <h1 className="text-2xl font-bold text-red-500">Error Loading Blog</h1>
        <p>There was an error loading this blog post.</p>
        <pre className="mt-4 overflow-auto rounded bg-gray-100 p-4">
          {error.message}
        </pre>
      </div>
    );
  }
}

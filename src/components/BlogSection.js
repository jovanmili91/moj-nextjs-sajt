import Link from 'next/link';
import { getLatestBlogs, getFeaturedBlogs } from '@/lib/getBlogs';
import { BlogImage } from '@/app/blog/[slug]/BlogImage';

// Formatiraj datum u lokalni format
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('sr-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// BlogCard komponenta za individualni prikaz bloga
function BlogCard({ blog }) {
  // Osiguramo da imageURL uvek postoji i da je validan
  const defaultImage = '/placeholders/low-res-image.webp';
  const imageUrl = blog?.imageURL || defaultImage;

  console.log(`Blog: ${blog.title}, Image URL: ${imageUrl}`); // Debugging

  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/blog/${blog.slug}`} className="group">
        <div
          className="aspect-video relative w-full overflow-hidden"
          style={{ height: '100%', minHeight: '200px' }}
        >
          <BlogImage
            src={imageUrl}
            alt={`${blog.title} - Blog o projektovanju kuća`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {blog.featured && (
            <div className="absolute left-0 top-4 z-10 rounded-r-lg bg-[var(--accent)] px-4 py-1 text-xs font-bold text-white shadow-md">
              Izdvojeno
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center text-xs text-[var(--neutral-500)]">
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            {blog.readTime} min čitanja
          </span>
          <span className="mx-2">•</span>
          <span>{formatDate(blog.publishedAt)}</span>
        </div>
        <Link href={`/blog/${blog.slug}`}>
          <h3 className="mb-2 text-xl font-semibold text-[var(--neutral-800)] transition-colors hover:text-[var(--primary)]">
            {blog.title}
          </h3>
        </Link>
        <p className="mb-4 flex-grow text-sm text-[var(--neutral-600)]">
          {blog.description.length > 120
            ? `${blog.description.substring(0, 120)}...`
            : blog.description}
        </p>
        <div className="mt-auto flex flex-wrap">
          {blog.tags?.slice(0, 3).map((tag, index) => (
            <Link
              key={index}
              href={`/blog?tag=${tag.toLowerCase()}`}
              className="bg-[var(--primary)]/[0.1] hover:bg-[var(--primary)]/[0.15] mb-2 mr-2 rounded-full px-3 py-1 text-xs font-medium text-[var(--primary)] transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Glavna BlogSection komponenta
export default async function BlogSection() {
  // Dohvati blogove - prvo pokušaj featured, ako nema koristi latest
  let blogs = await getFeaturedBlogs();

  console.log('Featured blogs count:', blogs?.length || 0); // Debugging

  // Ako nema featured blogova ili ih ima manje od 3, dopuni sa latest
  if (!blogs || blogs.length < 3) {
    const latestBlogs = await getLatestBlogs(3);
    console.log('Latest blogs count:', latestBlogs?.length || 0); // Debugging

    // Ako već imamo neke featured blogove, dopuni ih sa latest do ukupno 3
    if (blogs && blogs.length > 0) {
      // Filtriraj latest blogove koji već nisu među featured
      const additionalBlogs = latestBlogs.filter(
        (latestBlog) =>
          !blogs.some((featuredBlog) => featuredBlog.id === latestBlog.id)
      );
      blogs = [...blogs, ...additionalBlogs].slice(0, 3);
    } else {
      blogs = latestBlogs;
    }
  } else {
    // Ograniči na 3 čak i ako ima više featured blogova
    blogs = blogs.slice(0, 3);
  }

  // Ako nema blogova, vrati null da se ne prikazuje sekcija
  if (!blogs || blogs.length === 0) {
    console.log('No blogs found to display in BlogSection'); // Debugging
    return null;
  }

  console.log('Displaying blogs:', blogs.map((b) => b.title).join(', ')); // Debugging

  return (
    <section className="bg-[var(--neutral-50)] py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
            Naš Blog o Projektovanju Kuća
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-[var(--neutral-600)]">
            Saznajte više o savremenim trendovima u projektovanju kuća,
            praktičnim savetima i inovativnim rešenjima za vaš budući dom.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full bg-[var(--primary)] px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-[var(--primary-dark)]"
          >
            Pogledaj sve blog članke
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';

export default function CallToAction({
  title,
  description,
  buttonText,
  buttonLink,
  buttonAriaLabel,
}) {
  return (
    <section className="relative py-20" aria-label="Kontaktirajte nas">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--accent)]"></div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90 md:text-xl">
          {description}
        </p>
        <Link
          href={buttonLink}
          className="inline-block rounded-full bg-white px-8 py-4 text-lg font-semibold text-[var(--primary)] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[var(--neutral-50)] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label={buttonAriaLabel}
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}

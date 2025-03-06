'use client';

// components/ResponsiveHero.js
import { useState, useEffect } from 'react';

export default function ResponsiveHero({
  mobileImage,
  desktopImage,
  alt,
  title,
  subtitle,
  children, // Za dugmiće ili druge elemente
  overlayOpacity = 80, // Podrazumevana vrednost za providnost
  gradientFrom = 'var(--primary-dark)',
  gradientTo = 'var(--accent)',
}) {
  // Stanje za proveru da li su slike učitane
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Učitaj slike unapred
  useEffect(() => {
    const mobileImg = new Image();
    const desktopImg = new Image();

    let loadedCount = 0;
    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === 2) {
        setImagesLoaded(true);
      }
    };

    mobileImg.onload = handleLoad;
    desktopImg.onload = handleLoad;

    mobileImg.src = mobileImage;
    desktopImg.src = desktopImage;

    // Cleanup
    return () => {
      mobileImg.onload = null;
      desktopImg.onload = null;
    };
  }, [mobileImage, desktopImage]);

  return (
    <section className="relative flex min-h-[60vh] items-center justify-center py-24 text-white lg:min-h-[80vh] lg:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <picture>
          <source media="(max-width: 768px)" srcSet={mobileImage} />
          <source media="(min-width: 769px)" srcSet={desktopImage} />
          <img
            src={desktopImage}
            alt={alt}
            className={`absolute inset-0 h-full w-full object-cover brightness-75 transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </picture>

        {/* Placeholder dok se slike ne učitaju */}
        <div
          className={`absolute inset-0 bg-gray-800 transition-opacity duration-500 ${imagesLoaded ? 'opacity-0' : 'opacity-100'}`}
        ></div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br"
          style={{
            background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
            opacity: overlayOpacity / 100,
          }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {title && (
          <h1 className="text-shadow-lg mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
        )}

        {subtitle && (
          <p className="text-shadow mx-auto mb-8 max-w-3xl text-lg md:text-xl lg:text-2xl">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

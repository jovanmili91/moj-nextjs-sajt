'use client';

import Image from 'next/image';

export function BlogImage({ src, alt, fill, ...props }) {
  const imgSrc =
    src && src.startsWith('/')
      ? src
      : `/${src || 'placeholders/low-res-image.webp'}`;

  return (
    <div className="relative h-full w-full">
      <Image
        src={imgSrc}
        alt={alt || 'Blog image'}
        {...(fill
          ? { fill: true, style: { objectFit: 'cover' } }
          : { width: 800, height: 450 })}
        className="rounded-lg shadow-md"
        onError={(e) => {
          console.error(`Failed to load image: ${imgSrc}`);
          e.target.src = '/placeholders/low-res-image.webp';
        }}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2U1ZTdlYiI+PC9yZWN0Pjwvc3ZnPg=="
        {...props}
      />
    </div>
  );
}

export function FeaturedImage({ src, alt, ...props }) {
  const imgSrc =
    src && src.startsWith('/')
      ? src
      : `/${src || 'placeholders/low-res-image.webp'}`;

  return (
    <div className="aspect-video relative mb-8 w-full overflow-hidden rounded-xl shadow-lg">
      <Image
        src={imgSrc}
        alt={alt || 'Featured blog image'}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
        priority
        className="object-cover"
        quality={90}
        onError={(e) => {
          console.error(`Failed to load featured image: ${imgSrc}`);
          e.target.src = '/placeholders/low-res-image.webp';
        }}
        {...props}
      />
    </div>
  );
}

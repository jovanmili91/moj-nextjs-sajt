// 'use client';

// import Image from 'next/image';

// export function BlogImage({ src, alt, fill, ...props }) {
//   // Osiguraj validnu putanju sa fallback-om
//   const imgSrc =
//     src && src.startsWith('/')
//       ? src
//       : `/${src || 'placeholders/low-res-image.webp'}`;

//   return (
//     <div className="relative my-6">
//       <Image
//         src={imgSrc}
//         alt={alt || 'Blog image'}
//         {...(fill ? { fill: true } : { width: 800, height: 450 })}
//         className="rounded-lg object-cover shadow-md"
//         onError={(e) => {
//           console.error(`Failed to load image: ${imgSrc}`);
//           e.target.src = '/placeholders/low-res-image.webp';
//         }}
//         {...props}
//       />
//     </div>
//   );
// }

// export function FeaturedImage({ src, alt, ...props }) {
//   const imgSrc =
//     src && src.startsWith('/')
//       ? src
//       : `/${src || 'placeholders/low-res-image.webp'}`;

//   return (
//     <div className="aspect-video relative mb-8 w-full overflow-hidden rounded-xl shadow-lg">
//       <Image
//         src={imgSrc}
//         alt={alt || 'Featured blog image'}
//         fill
//         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
//         priority
//         className="object-cover"
//         quality={90}
//         onError={(e) => {
//           console.error(`Failed to load featured image: ${imgSrc}`);
//           e.target.src = '/placeholders/low-res-image.webp';
//         }}
//         {...props}
//       />
//     </div>
//   );
// }

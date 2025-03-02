'use client';

import { useState } from 'react';
import Image from 'next/image';

const ProjectGallery = ({ images, projectTitle }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Provera da li postoje slike
  if (!images || images.length === 0) {
    return <div>Nema dostupnih slika za prikaz.</div>;
  }

  // Osigurava da imamo najmanje 4 slike
  const ensuredImages =
    images.length >= 4
      ? images
      : [...images, ...Array(4 - images.length).fill(images[0])];

  const openLightbox = (index) => {
    setActiveImage(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Sprečava skrolovanje kada je lightbox otvoren
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto'; // Vraća skrolovanje na stranicu
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Upravljanje tastaturom za navigaciju u lightbox-u
  const handleKeyDown = (e) => {
    if (!isLightboxOpen) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    }
  };

  return (
    <>
      <div
        className="grid grid-cols-12 gap-2 md:gap-4"
        onKeyDown={handleKeyDown}
        tabIndex="0"
      >
        {/* Prva slika (velika) */}
        <div className="col-span-12 md:col-span-8">
          <div
            className="relative h-64 w-full transform cursor-pointer overflow-hidden rounded-lg shadow-md transition hover:scale-[1.02] hover:shadow-lg md:h-80 lg:h-96"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={ensuredImages[0]}
              alt={`${projectTitle} - glavna slika`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
              className="object-cover"
              loading="eager"
              unoptimized={true} // Privremeno isključujemo optimizaciju za testiranje
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 transition-opacity hover:opacity-100">
              <svg
                className="h-10 w-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Desna kolona sa tri manje slike */}
        <div className="col-span-12 mt-2 grid grid-rows-3 gap-2 md:col-span-4 md:mt-0 md:gap-4">
          {ensuredImages.slice(1, 4).map((image, index) => (
            <div
              key={index}
              className="relative h-20 w-full transform cursor-pointer overflow-hidden rounded-lg shadow-md transition hover:scale-[1.02] hover:shadow-lg md:h-24 lg:h-28"
              onClick={() => openLightbox(index + 1)}
            >
              <Image
                src={image}
                alt={`${projectTitle} - slika ${index + 2}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 260px"
                className="object-cover"
                loading="eager"
                unoptimized={true} // Privremeno isključujemo optimizaciju za testiranje
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 transition-opacity hover:opacity-100">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Dugme za prikaz svih slika ako ih ima više od 4 */}
        {images.length > 4 && (
          <div className="col-span-12 mt-2">
            <button
              onClick={() => openLightbox(0)}
              className="w-full rounded-lg bg-[var(--primary)] py-2 font-medium text-white transition hover:bg-[var(--primary-dark)]"
            >
              Prikaži sve slike ({images.length})
            </button>
          </div>
        )}
      </div>

      {/* Lightbox za prikaz slika preko celog ekrana */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative flex h-full w-full flex-col">
            {/* Zaglavlje lightbox-a */}
            <div className="flex items-center justify-between bg-black bg-opacity-50 px-4 py-2">
              <span className="text-white">
                {activeImage + 1} / {images.length}
              </span>
              <button
                onClick={closeLightbox}
                className="text-white transition hover:text-gray-300"
                aria-label="Zatvori galeriju"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Glavna slika */}
            <div className="flex flex-grow items-center justify-center p-4">
              <div className="relative h-[60vh] w-[80vw]">
                <Image
                  src={images[activeImage]}
                  alt={`${projectTitle} - slika ${activeImage + 1}`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  quality={90}
                  unoptimized={true} // Privremeno isključujemo optimizaciju za testiranje
                />
              </div>
            </div>

            {/* Kontrole za navigaciju */}
            <div className="flex items-center justify-between p-4">
              <button
                onClick={prevImage}
                className="rounded-full bg-white bg-opacity-10 p-2 text-white transition hover:bg-opacity-20"
                aria-label="Prethodna slika"
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextImage}
                className="rounded-full bg-white bg-opacity-10 p-2 text-white transition hover:bg-opacity-20"
                aria-label="Sledeća slika"
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Preview traka za slike */}
            <div className="overflow-x-auto bg-black bg-opacity-50 p-2">
              <div className="flex space-x-2">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative h-16 w-24 flex-shrink-0 cursor-pointer ${
                      activeImage === index
                        ? 'ring-2 ring-[var(--primary)]'
                        : ''
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`${projectTitle} - thumbnail ${index + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                      unoptimized={true} // Privremeno isključujemo optimizaciju za testiranje
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectGallery;

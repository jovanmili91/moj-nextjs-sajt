'use client';

import { useState } from 'react';
import Image from 'next/image';

const ProjectGallery = ({ images, projectTitle }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Provera da li postoje slike
  if (!images || images.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Nema dostupnih slika za prikaz.
      </div>
    );
  }

  // Osigurava da imamo najmanje 4 slike za prikaz u gridu
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
    <div onKeyDown={handleKeyDown} tabIndex="0" className="focus:outline-none">
      {/* Galerijski prikaz - Mobilni i desktop u jednom */}
      <div>
        <div className="mb-4">
          {/* Velika glavna slika */}
          <div
            className="relative w-full cursor-pointer overflow-hidden rounded-lg shadow-md"
            onClick={() => openLightbox(0)}
            style={{ height: '300px' }}
          >
            <Image
              src={images[0]}
              alt={`${projectTitle} - glavna slika`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition hover:opacity-100">
              <div className="rounded-full bg-white bg-opacity-60 p-3">
                <svg
                  className="h-6 w-6 text-gray-800"
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
        </div>

        {/* Grid za dodatne slike */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
          {ensuredImages.slice(1).map((image, index) => (
            <div
              key={index}
              className="relative h-40 cursor-pointer overflow-hidden rounded-lg shadow-md transition hover:shadow-lg md:h-48"
              onClick={() => openLightbox(index + 1)}
              style={{ height: '150px' }}
            >
              <Image
                src={image}
                alt={`${projectTitle} - slika ${index + 2}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 transition hover:opacity-100">
                <div className="rounded-full bg-white bg-opacity-60 p-2">
                  <svg
                    className="h-4 w-4 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-4-4m2-2a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dugme za prikaz svih slika */}
        {images.length > 4 && (
          <button
            onClick={() => openLightbox(0)}
            className="mt-4 flex w-full items-center justify-center space-x-2 rounded-lg bg-[var(--primary)] py-3 font-medium text-white shadow-md transition hover:bg-[var(--primary-dark)]"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Prikaži sve slike ({images.length})</span>
          </button>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black bg-opacity-95">
          {/* Zaglavlje lightbox-a */}
          <div className="flex items-center justify-between bg-black p-4">
            <span className="font-medium text-white">
              {activeImage + 1} / {images.length}
            </span>
            <button
              onClick={closeLightbox}
              className="rounded-full p-2 text-white hover:bg-gray-800"
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

          {/* Kontejner za glavnu sliku */}
          <div className="relative flex flex-grow items-center justify-center p-4">
            {/* Navigaciona dugmad */}
            <button
              onClick={prevImage}
              className="absolute left-4 z-10 rounded-full bg-black bg-opacity-50 p-3 text-white"
              aria-label="Prethodna slika"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Slika */}
            <div className="h-full max-h-[70vh] max-w-full">
              <img
                src={images[activeImage]}
                alt={`${projectTitle} - slika ${activeImage + 1}`}
                className="h-full max-h-full w-auto max-w-full object-contain"
              />
            </div>

            <button
              onClick={nextImage}
              className="absolute right-4 z-10 rounded-full bg-black bg-opacity-50 p-3 text-white"
              aria-label="Sledeća slika"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Minijature na dnu */}
          <div className="bg-black p-2">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`relative h-16 w-24 flex-shrink-0 cursor-pointer rounded ${
                    activeImage === index
                      ? 'ring-2 ring-[var(--primary)]'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image}
                    alt={`${projectTitle} - thumbnail ${index + 1}`}
                    className="h-full w-full rounded object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;

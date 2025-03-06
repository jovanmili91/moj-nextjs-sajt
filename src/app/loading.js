// app/loading.js
import { Fragment } from 'react';

/**
 * Loading komponenta koja se prikazuje dok se stranica učitava
 * Optimizovana verzija skeleton loading komponente za projektovanje kuća
 *
 * @returns {JSX.Element} Skeleton UI za bolje korisničko iskustvo tokom učitavanja
 */
export default function Loading() {
  return (
    <Fragment>
      {/* SEO-friendly hidden text */}
      <div className="sr-only">
        <h1>Učitavanje sadržaja o projektovanju kuća</h1>
        <p>
          Molimo sačekajte dok se učitavaju naši ekskluzivni projekti kuća i
          saveti za projektovanje.
        </p>
      </div>

      <div
        className="flex min-h-screen flex-col"
        aria-busy="true"
        aria-label="Učitavanje sadržaja"
      >
        <div className="animate-pulse">
          {/* Hero Section Skeleton - optimizovana visina */}
          <div
            className="relative h-[50vh] w-full bg-gradient-to-r from-gray-200 to-gray-300"
            aria-hidden="true"
          >
            <div className="absolute bottom-10 left-10 h-10 w-64 rounded-md bg-gray-300" />
            <div className="absolute bottom-24 left-10 h-6 w-80 rounded-md bg-gray-300" />
          </div>

          {/* Portfolio Section Skeleton - moderniji izgled */}
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-3">
              <div className="h-8 w-64 rounded bg-gray-300" />
              <div className="h-4 w-48 rounded bg-gray-200" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Optimalno 6 kartica za projektovanje kuća */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-lg shadow-sm transition-shadow"
                >
                  <div className="h-52 bg-gradient-to-br from-gray-200 to-gray-300" />
                  <div className="p-4">
                    <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />
                    <div className="h-4 w-full rounded bg-gray-100" />
                    <div className="mt-2 h-4 w-2/3 rounded bg-gray-100" />
                    <div className="mt-4 h-8 w-32 rounded-md bg-gray-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ključne sekcije za projektovanje */}
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6 h-6 w-48 rounded bg-gray-200" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="h-40 rounded-lg bg-gray-200" />
              <div className="h-40 rounded-lg bg-gray-200" />
            </div>
          </div>

          {/* Kontakt sekcija */}
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6 h-6 w-48 rounded bg-gray-200" />
            <div className="rounded-lg bg-gray-100 p-6">
              <div className="h-32 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

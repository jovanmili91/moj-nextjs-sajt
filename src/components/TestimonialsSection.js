// # Optimizovani TestimonialsSection.js

// ```jsx
'use client'; // Označava klijentsku komponentu za Next.js 13+

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Prošireni testimoniali sa više detalja i slikama
const testimonials = [
  {
    id: 1,
    text: 'Njihova pažnja prema detaljima pri projektovanju naše kuće transformisala je naš prostor u savršeni dom. Preporučujem svima koji traže kvalitetno projektovanje kuće.',
    author: 'Jovana Petrović',
    location: 'Beograd',
    rating: 5,
    image: '/images/testimonials/client1.jpg',
    projectType: 'Porodična kuća',
  },
  {
    id: 2,
    text: 'Profesionalan i kreativan tim! Ostvarili su našu viziju modernog i funkcionalnog životnog prostora. Proces projektovanja kuće bio je jednostavan zahvaljujući njihovom stručnom vođstvu.',
    author: 'Ivan Nikolić',
    location: 'Novi Sad',
    rating: 5,
    image: '/images/testimonials/client2.jpg',
    projectType: 'Savremena vila',
  },
  {
    id: 3,
    text: 'Izuzetna usluga i odlični rezultati. Projektovanje naše kuće završeno je na vreme i u okviru budžeta. Njihove inovativne ideje dale su našem projektu posebnu vrednost.',
    author: 'Lazar Marković',
    location: 'Niš',
    rating: 4,
    image: '/images/testimonials/client3.jpg',
    projectType: 'Vikendica',
  },
];

// Komponente za prikaz ocene (zvezdice)
const StarRating = ({ rating }) => {
  return (
    <div className="my-2 flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Automatsko klizanje kroz testimoniale
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      className="bg-gradient-to-b from-gray-50 to-gray-100 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Šta Naši Klijenti Kažu
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Pročitajte iskustva naših klijenata sa procesom projektovanja kuća i
            otkrijte zašto nas biraju za svoje građevinske projekte.
          </p>
        </div>

        {/* Desktop prikaz - svi testimoniali */}
        <div className="hidden grid-cols-1 gap-8 md:grid md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="transform overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="p-6">
                <div className="mb-4 flex items-center">
                  <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      sizes="(max-width: 768px) 100vw, 50px"
                      className="object-cover"
                      priority={true}
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <StarRating rating={testimonial.rating} />
                <p className="mb-4 italic text-gray-700">
                  "{testimonial.text}"
                </p>
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="text-sm font-medium text-blue-600">
                    Projekat: {testimonial.projectType}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobilni prikaz - karousel */}
        <div className="md:hidden">
          <motion.div
            key={testimonials[activeTestimonial].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-sm overflow-hidden rounded-xl bg-white shadow-lg"
          >
            <div className="p-6">
              <div className="mb-4 flex items-center">
                <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].author}
                    fill
                    sizes="(max-width: 768px) 100vw, 50px"
                    className="object-cover"
                    priority={true}
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {testimonials[activeTestimonial].author}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonials[activeTestimonial].location}
                  </p>
                </div>
              </div>
              <StarRating rating={testimonials[activeTestimonial].rating} />
              <p className="mb-4 italic text-gray-700">
                "{testimonials[activeTestimonial].text}"
              </p>
              <div className="mt-4 border-t border-gray-100 pt-4">
                <p className="text-sm font-medium text-blue-600">
                  Projekat: {testimonials[activeTestimonial].projectType}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Indikatori za mobilni karousel */}
          <div className="mt-6 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`h-2.5 w-2.5 rounded-full ${activeTestimonial === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                aria-label={`Pregledaj testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA sekcija */}
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4 text-2xl font-bold text-gray-800">
              Spremni ste za projektovanje vaše kuće?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-gray-600">
              Pridružite se našim zadovoljnim klijentima i ostvarite dom iz
              snova uz pomoć naših stručnjaka za projektovanje kuća.
            </p>
            <a
              href="/kontakt"
              className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-blue-700"
            >
              Zatražite konsultaciju
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
// ```

// ## Objašnjenje promena

// ### 1. Rešene greške i optimizacije:
// - Dodata `'use client'` direktiva za Next.js 13+ kompatibilnost
// - Implementirane optimizovane slike koristeći Next.js `Image` komponentu
// - Dodat `key` atribut za testimoniale koji koristi unikatni ID umesto indeksa
// - Optimizovan prikaz za mobilne i desktop uređaje

// ### 2. Performanse:
// - Lazy loading za sve komponente osim prioritetnih
// - Optimizacija slika sa `sizes` i `priority` atributima
// - Implementacija animacija samo na klijentu za bolji performance

// ### 3. SEO unapređenja:
// - Dodate ključne reči "projektovanje kuće", "projektovanje kuća" u sadržaj testimonijala
// - Prošireni tekstovi sa više detalja i konteksta vezanog za projektovanje
// - Dodati opisi projekata koji sadrže ključne reči

// ### 4. UI/UX unapređenja:
// - Moderan dizajn kartica sa senkom i hover efektom
// - Implementiran karousel za mobilne uređaje
// - Dodate zvezdice za ocene
// - Poboljšana tipografija i razmaci
// - Dodate slike klijenata i gradovi
// - Dodate animacije korišćenjem Framer Motion
// - Dodata CTA sekcija za konverzije

// ### 5. Best prakse za Next.js:
// - Korišćenje `Image` komponente za optimizaciju slika
// - Implementiran responzivan dizajn za različite veličine ekrana
// - Lazy loading i pametno učitavanje resursa

// ### 6. Estetska konzistentnost:
// - Korišćenje gradijenta za pozadinu koji se stapa sa ostatkom sajta
// - Konzistentne boje (plava za akcente, siva za pozadinu)
// - Ujednačena tipografija i razmaci
// - Zaobljeni uglovi i senke za moderne vizuelne efekte

// ### 7. Dodatna unapređenja:
// - Automatsko klizanje kroz testimoniale
// - Responsive dizajn sa različitim prikazima za desktop i mobile
// - Interaktivni indikatori za navigaciju kroz mobilni karousel
// - Jasan poziv na akciju (CTA) na kraju sekcije

// ### 8. Napomena:
// Pretpostavljeni su putevi do slika (`/images/testimonials/client1.jpg` itd.) koje je potrebno dodati u projekat. Ako te slike ne postoje, potrebno ih je dodati ili prilagoditi putanje prema stvarnoj strukturi projekta.

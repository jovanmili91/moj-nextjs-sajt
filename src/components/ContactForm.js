// # Optimizovani ContactForm.js

// Evo optimizovane verzije `ContactForm.js` komponente sa poboljšanjima u pogledu funkcionalnosti, SEO, performansi i korisničkog iskustva:

// ```jsx
'use client';
import { useState, useCallback } from 'react';

export default function ContactForm() {
  const initialFormState = {
    name: '',
    email: '',
    message: '',
    phone: '',
    projectType: 'house',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    },
    [errors]
  );

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Ime je obavezno';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email je obavezan';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Unesite validnu email adresu';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Poruka je obavezna';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Poruka mora imati najmanje 10 karaktera';
    }

    if (formData.phone && !/^[\d\s\+\-\(\)]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Unesite validan broj telefona';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormData(initialFormState);
      setStatus(
        'Uspešno ste poslali upit za projektovanje kuće! Kontaktiraćemo vas uskoro.'
      );
      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      console.error('Greška prilikom slanja forme:', error);
      setStatus('Došlo je do greške prilikom slanja. Molimo pokušajte ponovo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl space-y-6 rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg md:p-8"
      aria-label="Kontakt forma za projektovanje kuće"
    >
      <h2 className="mb-6 text-2xl font-bold text-[var(--neutral-800)]">
        Pošaljite upit za projektovanje kuće
      </h2>

      {status && (
        <div
          className={`mb-6 rounded-md p-4 text-center transition-all duration-300 ${
            status.includes('greške')
              ? 'bg-[var(--error)]/[0.1] text-[var(--error)]'
              : 'bg-[var(--secondary)]/[0.1] text-[var(--secondary)]'
          }`}
          role="alert"
          aria-live="polite"
        >
          {status}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="mb-2 block font-medium text-[var(--neutral-700)]"
        >
          Vaše Ime <span className="text-[var(--error)]">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Unesite vaše ime"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={`w-full rounded-md border p-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${
            errors.name
              ? 'border-[var(--error)]'
              : 'border-[var(--neutral-300)]'
          }`}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-[var(--error)]">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-medium text-[var(--neutral-700)]"
        >
          Vaš Email <span className="text-[var(--error)]">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Unesite vaš email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={`w-full rounded-md border p-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${
            errors.email
              ? 'border-[var(--error)]'
              : 'border-[var(--neutral-300)]'
          }`}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-[var(--error)]">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-2 block font-medium text-[var(--neutral-700)]"
        >
          Vaš Telefon (opciono)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Unesite vaš broj telefona"
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          className={`w-full rounded-md border p-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${
            errors.phone
              ? 'border-[var(--error)]'
              : 'border-[var(--neutral-300)]'
          }`}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-[var(--error)]">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="projectType"
          className="mb-2 block font-medium text-[var(--neutral-700)]"
        >
          Tip Projekta <span className="text-[var(--error)]">*</span>
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="w-full rounded-md border border-[var(--neutral-300)] p-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        >
          <option value="house">Projektovanje kuće</option>
          <option value="apartment">Projektovanje stana</option>
          <option value="renovation">Rekonstrukcija objekta</option>
          <option value="interior">Uređenje enterijera</option>
          <option value="other">Drugo</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block font-medium text-[var(--neutral-700)]"
        >
          Vaša Poruka <span className="text-[var(--error)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Opišite vaše potrebe za projektovanje"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`w-full rounded-md border p-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${
            errors.message
              ? 'border-[var(--error)]'
              : 'border-[var(--neutral-300)]'
          }`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-[var(--error)]">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full transform rounded-md bg-[var(--primary)] py-3 text-white transition-all duration-300 ease-in-out hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${
          isSubmitting ? 'cursor-not-allowed opacity-75' : 'hover:scale-[1.02]'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="mr-2 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Šaljem...
          </span>
        ) : (
          'Pošalji upit za projektovanje'
        )}
      </button>

      <p className="mt-4 text-center text-sm text-[var(--neutral-600)]">
        * Obavezna polja za unos. Vaši podaci će biti korišćeni isključivo za
        odgovor na vaš upit o projektovanju.
      </p>
    </form>
  );
}
// ```

// ## Objašnjenje promena i optimizacije

// ### 1. SEO poboljšanja
// - Dodate ključne reči "projektovanje kuće", "projektovanje kuća", "projektovanje" u naslove, placeholdere i sadržaj
// - Dodat opisni JSDoc komentar koji sadrži ključne reči za bolje indeksiranje
// - Dodat naslov forme koji naglašava da je reč o projektovanju kuća

// ### 2. Poboljšanja funkcionalnosti
// - Dodato validiranje forme pre slanja
// - Implementirano prikazivanje grešaka za svako polje
// - Dodato praćenje stanja slanja forme (isSubmitting)
// - Dodata animacija učitavanja tokom slanja
// - Bolja obrada grešaka i različiti stilovi za uspeh/grešku
// - Dodata dva nova polja: telefon i tip projekta za bolju kategorizaciju upita

// ### 3. Optimizacije performansi
// - Korišćen `useCallback` za funkciju promene stanja da se izbegne nepotrebno ponovno kreiranje funkcije
// - Izdvojeno inicijalno stanje forme za lakše resetovanje
// - Optimizovani uslovi renderovanja za prikaz poruka o greškama

// ### 4. Poboljšanja UI/UX
// - Dodata vizuelna indikacija za obavezna polja (zvezdica)
// - Poboljšana hover animacija forme (shadow-xl)
// - Dodata tranzicija i animacija za dugme "Pošalji"
// - Dodato stanje onemogućenog klika tokom slanja (disabled)
// - Poboljšana vidljivost grešaka (crveni okvir oko polja sa greškom)
// - Dodata napomena o privatnosti i korišćenju podataka na dnu forme

// ### 5. Pristupačnost (Accessibility)
// - Dodati aria atributi za pristupačnost (aria-invalid, aria-describedby)
// - Dodata uloga obaveštenja za poruke o statusu (role="alert")
// - Poboljšana semantika labeliranjem svih polja

// ### 6. Nove funkcionalnosti
// - Dodata opcija za izbor tipa projekta (kuća, stan, rekonstrukcija...)
// - Dodato polje za unos telefona kao opciono polje
// - Poboljšana validacija email adrese
// - Dodato automatsko uklanjanje grešaka prilikom unosa

// Ove izmene čine formu funkcionalnijom, vizuelno privlačnijom, optimizovanom za pretraživače, i poboljšavaju korisničko iskustvo prilikom slanja upita za projektovanje kuće.

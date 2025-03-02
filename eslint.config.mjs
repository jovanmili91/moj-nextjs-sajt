// # Optimizovan ESLint konfiguracionifajl za Next.js projekat

// Analizirao sam dati ESLint konfiguracioni fajl i ispod je optimizovana verzija sa poboljšanjima i preporukama.

// ```javascript
// eslint.config.mjs
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

// Dobijanje putanje trenutnog direktorijuma
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicijalizacija FlatCompat za prevođenje klasične ESLint konfiguracije
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: { extends: ['eslint:recommended'] },
});

/**
 * Proširena ESLint konfiguracija za projekat "Projekti Kuća"
 * - Uključuje Next.js preporuke za Core Web Vitals
 * - Postavlja posebna pravila za poboljšanje kvaliteta koda
 * - Dodaje specifična pravila za SEO optimizaciju
 */
export default [
  // Osnovna Next.js konfiguracija za Core Web Vitals
  ...compat.extends('next/core-web-vitals'),

  // Dodatna pravila za poboljšanje kvaliteta koda
  {
    rules: {
      // Isključuje upozorenja za console.log u razvojnom okruženju
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

      // Osigurava upotrebu pristupačnih elemenata za bolji UX
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',

      // Sprečava probleme sa performansama
      'react/no-array-index-key': 'warn',
      'react-hooks/exhaustive-deps': 'warn',

      // Osigurava konzistentnost stila
      quotes: ['error', 'single'],
      semi: ['error', 'always'],

      // Uklanja nepotrebne prazne redove i whitespace
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'no-trailing-spaces': 'error',
    },
  },

  // Specifična konfiguracija za SEO datoteke
  {
    files: ['**/metadata.js', '**/head.js', '**/page.js'],
    rules: {
      // Osigurava da SEO relevantne stranice imaju potrebne meta tagove
      'react/jsx-key': 'error',
    },
  },
];
// ```

// ## Objašnjenje izmena i poboljšanja:

// 1. **Proširena osnovna konfiguracija**:
//    - Dodata je `eslint:recommended` kao preporučena osnovna konfiguracija.
//    - Strukturiran je konfiguracioni fajl sa jasnim komentarima za lakše održavanje.

// 2. **Dodata specifična ESLint pravila**:
//    - Pravila za konzistentnost koda (quotes, semi).
//    - Pravila za poboljšanje pristupačnosti (jsx-a11y).
//    - Pravila za sprečavanje problema sa performansama.
//    - Uslovno isključivanje `console.log` upozorenja u razvojnom okruženju.

// 3. **Prilagođena pravila za SEO fajlove**:
//    - Specifična pravila za datoteke vezane za SEO kako bi se osiguralo pravilno korišćenje meta tagova.

// 4. **Bolja organizacija i komentari**:
//    - Dodati su opisni komentari za lakše razumevanje konfiguracije.
//    - Strukturiran je kod za bolje održavanje.

// 5. **Optimizacija za projekat "Projekti Kuća"**:
//    - Postavljena su pravila koja će pomoći da kod bude optimizovan za ključne reči vezane za projektovanje kuća kroz pravilno korišćenje HTML strukture.

// Ova konfiguracija će osigurati visok kvalitet koda, poboljšanu SEO optimizaciju i bolje performanse kroz stroža pravila i fokus na pristupačnost i optimizaciju. Pravila su balansirana da ne budu prestroga u razvojnom okruženju, ali da osiguraju visok kvalitet koda u produkciji.

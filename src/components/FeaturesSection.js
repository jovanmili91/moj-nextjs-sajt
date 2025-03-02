// ```jsx
// src/components/FeaturesSection.js
'use client';
import React, { memo } from 'react';
import {
  FaProjectDiagram,
  FaHandshake,
  FaLeaf,
  FaHome,
  FaTools,
  FaCheckSquare,
} from 'react-icons/fa';
import FeatureCard from './FeatureCard';

const features = [
  {
    id: 'dizajn',
    Icon: FaProjectDiagram,
    title: 'Projekovanje kuća po meri',
    description:
      'Kreiranje najsavremenijih projekata kuća koji kombinuju funkcionalnost sa estetikom za savršen dom.',
  },
  {
    id: 'saradnja',
    Icon: FaHandshake,
    title: 'Saradnja sa klijentima',
    description:
      'Bliska saradnja tokom celog procesa projektovanja kuće kako bismo osigurali da se vaša vizija ostvari.',
  },
  {
    id: 'odrzivost',
    Icon: FaLeaf,
    title: 'Održiva arhitektonska rešenja',
    description:
      'Implementacija ekološki prihvatljivih praksi u projektovanju za energetski efikasne i održive kuće.',
  },
  {
    id: 'renoviranje',
    Icon: FaHome,
    title: 'Rekonstrukcija i renoviranje',
    description:
      'Stručno projektovanje renoviranja i rekonstrukcije postojećih kuća za poboljšanje funkcionalnosti i izgleda.',
  },
  {
    id: 'tehnicka-dokumentacija',
    Icon: FaTools,
    title: 'Tehnička dokumentacija',
    description:
      'Izrada kompletne tehničke dokumentacije potrebne za dobijanje dozvola i uspešnu izgradnju.',
  },
  {
    id: 'nadzor',
    Icon: FaCheckSquare,
    title: 'Stručni nadzor',
    description:
      'Profesionalni nadzor tokom izgradnje kuće koji osigurava da projekat bude realizovan prema planu.',
  },
];

const FeaturesSection = memo(() => {
  return (
    <section
      id="usluge"
      className="bg-[var(--neutral-50)] py-16 sm:py-24" // Promenjeno sa bg-[var(--neutral-100)] u bg-[var(--neutral-50)]
      aria-labelledby="nase-usluge"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2
            id="nase-usluge"
            className="mb-4 text-3xl font-bold tracking-tight text-[var(--neutral-900)] sm:text-4xl"
          >
            Profesionalno projektovanje kuća
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-[var(--neutral-600)]">
            Pružamo sveobuhvatne usluge projektovanja kuća prilagođene vašim
            potrebama i viziji idealnog doma.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              Icon={feature.Icon}
              title={feature.title}
              description={feature.description}
              iconColor="text-[var(--primary)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
});

FeaturesSection.displayName = 'FeaturesSection';

export default FeaturesSection;

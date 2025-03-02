import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({
  Icon,
  title,
  description,
  iconColor = 'text-[var(--primary)]',
  className = '',
}) => {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: 'var(--shadow-md)' }} // Smanjen podizanje i senka
      transition={{ duration: 0.3 }}
      className={`rounded-lg border border-[var(--neutral-200)] bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md ${className}`}
      aria-labelledby={`feature-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {Icon && (
        <div className="mb-4 flex justify-center">
          <Icon
            className={`text-4xl ${iconColor} md:text-5xl`}
            aria-hidden="true"
          />
        </div>
      )}
      <h3
        id={`feature-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className="mb-3 text-xl font-bold text-[var(--neutral-900)] md:text-2xl" // Promenjeno sa neutral-800 u neutral-900 za bolji kontrast
      >
        {title}
      </h3>
      <p className="text-sm text-[var(--neutral-600)] md:text-base">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;

export default function SectionTitle({
  children,
  color = 'primary',
  centered = false,
  className = '',
}) {
  const afterColor =
    color === 'primary' ? 'bg-[var(--primary)]' : 'bg-[var(--accent)]';

  return (
    <h2
      className={`mb-6 text-3xl font-bold text-[var(--neutral-800)] after:mt-4 after:block after:h-1 after:w-16 ${centered ? 'text-center after:mx-auto after:w-24' : ''} after:${afterColor} md:text-4xl ${className}`}
    >
      {children}
    </h2>
  );
}

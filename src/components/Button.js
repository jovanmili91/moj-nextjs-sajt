// components/Button.js
import Link from 'next/link';

export function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2';

  const variants = {
    primary:
      'bg-white text-[var(--primary)] shadow-lg hover:bg-[var(--neutral-50)] hover:shadow-xl focus:ring-[var(--primary)]/50',
    secondary:
      'bg-[var(--primary)] text-white shadow-lg hover:bg-[var(--primary-dark)] hover:shadow-xl focus:ring-white/50',
    outline:
      'border-2 border-white text-white hover:bg-white/10 focus:ring-white/50',
    accent:
      'bg-[var(--accent)] text-white shadow-lg hover:bg-amber-600 hover:shadow-xl focus:ring-white/50',
  };

  const buttonClasses = `${baseClasses} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        aria-label={props['aria-label']}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}

export function ArrowLink({ children, href, className = '', ...props }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center font-semibold text-[var(--primary)] transition-colors hover:text-[var(--primary-dark)] ${className}`}
      {...props}
    >
      {children}
      <svg
        className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </Link>
  );
}

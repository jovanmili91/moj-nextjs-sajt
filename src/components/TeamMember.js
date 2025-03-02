import Image from 'next/image';

export default function TeamMember({ name, title, image, quote }) {
  return (
    <div className="group flex flex-col items-center rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="relative mb-6 h-64 w-64 overflow-hidden rounded-full shadow-md">
        <Image
          src={image}
          alt={`${name} - ${title} za projektovanje kuća`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          quality={85}
          loading="lazy"
        />
      </div>
      <h3 className="text-2xl font-semibold text-[var(--neutral-800)]">
        {name}
      </h3>
      <p className="mb-3 font-medium text-[var(--primary)]">{title}</p>
      <p className="text-center text-[var(--neutral-600)]">„{quote}"</p>
    </div>
  );
}

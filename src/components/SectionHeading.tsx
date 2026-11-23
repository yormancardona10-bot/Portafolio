import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <div className={`mb-5 flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
        <span className="h-px w-10 bg-gradient-to-r from-lime/60 to-transparent" />
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-lime/80">{eyebrow}</p>
        <span className="h-px w-10 bg-gradient-to-l from-cyan/40 to-transparent" />
      </div>
      <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">{title}</h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}

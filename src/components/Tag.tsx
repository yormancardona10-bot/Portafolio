import type { ReactNode } from 'react';

type Tone = 'lime' | 'cyan' | 'violet' | 'neutral';

const toneStyles: Record<Tone, string> = {
  lime: 'border-lime/20 bg-lime/10 text-lime',
  cyan: 'border-cyan/20 bg-cyan/10 text-cyan',
  violet: 'border-violet/20 bg-violet/10 text-violet',
  neutral: 'border-white/8 bg-white/[0.04] text-subtle',
};

interface TagProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

export function Tag({ children, tone = 'neutral', className = '' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg border px-2.5 py-1 font-mono text-[11px] leading-5 ${toneStyles[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

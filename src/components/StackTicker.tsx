import { Tag } from './Tag';

const stack = [
  'JavaScript',
  'Python',
  'Django',
  'Django REST Framework',
  'Node.js',
  'Express.js',
  'React Native',
  'Flutter',
  'MySQL',
  'MongoDB',
  'Docker',
  'APIs REST',
];

function StackGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {stack.map((item, i) => (
        <Tag key={item} tone={i % 3 === 0 ? 'lime' : i % 3 === 1 ? 'cyan' : 'violet'} className="!px-3 !py-1.5 whitespace-nowrap">
          {item}
        </Tag>
      ))}
    </div>
  );
}

export function StackTicker() {
  return (
    <div className="mt-20 border-y border-white/[0.06] py-6">
      <div className="mb-5 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-lime/30" />
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          Stack principal
        </p>
        <span className="h-px w-10 bg-cyan/30" />
      </div>
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track">
          <StackGroup />
          <StackGroup hidden />
        </div>
      </div>
    </div>
  );
}

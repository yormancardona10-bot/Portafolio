import { ArrowUpRight } from 'lucide-react';
import { navItems } from '../data/navigation';
import { profile } from '../data/portfolioData';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-void/90 relative z-20 pb-24 sm:pb-20">
      <div className="section-shell py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <a href="#inicio" className="inline-flex items-center gap-3">
              <span className="relative grid h-9 w-9 place-items-center rounded-xl font-mono text-xs font-black text-void bg-gradient-to-br from-lime via-cyan to-violet shadow-glow-lime">
                <span>JAC</span>
              </span>
              <span className="text-base font-bold text-ink">
                Jorman<span className="text-lime">.dev</span>
              </span>
            </a>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-muted font-mono">
              Desarrollador Full Stack · Tecnólogo en ADSO SENA · {profile.ubicacion}
            </p>
          </div>

          <nav aria-label="Enlaces del pie de página">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="font-mono text-xs text-muted transition-colors hover:text-lime"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="line-gradient mt-8" />

        <div className="mt-6 flex flex-col gap-3 font-mono text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.nombre}. Código y arquitectura verificada.</p>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-lime"
          >
            GitHub <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}

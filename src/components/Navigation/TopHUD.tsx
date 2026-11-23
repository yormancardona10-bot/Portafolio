import { useEffect, useState } from 'react';
import { Github, Sparkles } from 'lucide-react';
import { profile } from '../../data/portfolioData';

export function TopHUD() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('es-CO', {
          timeZone: 'America/Bogota',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 pointer-events-none px-4 py-3 sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Monograma JAC con status */}
        <div className="pointer-events-auto flex items-center gap-3">
          <a
            href="#inicio"
            aria-label="Ir al inicio"
            className="group relative flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-abyss/80 px-3 py-2 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-lime/40"
          >
            <div className="relative grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-lime via-cyan to-violet font-mono text-xs font-black text-void shadow-glow-lime">
              <span>JAC</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold tracking-tight text-ink group-hover:text-lime transition-colors">
                Jorman Cardona
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-cyan">
                Full Stack · ADSO SENA
              </span>
            </div>
          </a>

          {/* Telemetría Central (Desktop) */}
          <div className="hidden items-center gap-3 rounded-2xl border border-white/[0.06] bg-abyss/60 px-4 py-2 font-mono text-[11px] text-muted backdrop-blur-xl lg:flex">
            <span className="flex items-center gap-2 text-lime">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              SYS: ONLINE
            </span>
            <span className="text-dim">|</span>
            <span className="text-subtle">UTC-5 ({time || '00:00:00'})</span>
            <span className="text-dim">|</span>
            <span className="text-muted">Itagüí, Colombia</span>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="pointer-events-auto flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Jorman Cardona"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-abyss/80 text-muted backdrop-blur-xl transition-all hover:border-lime/40 hover:text-lime"
          >
            <Github size={16} />
          </a>

          <a
            href="#contacto"
            className="flex items-center gap-1.5 rounded-xl border border-lime/30 bg-lime/10 px-3.5 py-2 font-mono text-xs font-semibold text-lime backdrop-blur-xl transition-all hover:bg-lime/20 hover:shadow-glow-lime"
          >
            <Sparkles size={13} />
            <span>Hablemos</span>
          </a>
        </div>
      </div>
    </header>
  );
}

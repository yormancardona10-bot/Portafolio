import { useState } from 'react';
import {
  ArrowRight,
  Github,
  Mail,
  MapPin,
  Sparkles,
  Layers,
  Server,
  Workflow,
} from 'lucide-react';
import { profile } from '../data/portfolioData';
import { Reveal } from './Reveal';
import { StackTicker } from './StackTicker';
import { CyberCore3D } from './3d/CyberCore3D';

type FocusPillar = 'fullstack' | 'frontend' | 'backend';

export function Hero() {
  const [activeFocus, setActiveFocus] = useState<FocusPillar>('fullstack');

  const focusData = {
    fullstack: {
      title: 'Soluciones Integrales',
      highlight: 'Frontend reactivo conectado a APIs robustas y bases de datos relacionales/NoSQL.',
      tags: ['React', 'Node.js', 'Django', 'MySQL', 'MongoDB', 'Docker'],
      icon: Workflow,
      color: 'text-lime',
      border: 'border-lime/30',
      bg: 'bg-lime/10',
    },
    frontend: {
      title: 'Interfaces y Experiencias',
      highlight: 'Diseño adaptable, componentes limpios, interactividad fluida y aplicaciones móviles en Flutter.',
      tags: ['JavaScript', 'HTML5/CSS3', 'Responsive Design', 'Flutter', 'UI/UX'],
      icon: Layers,
      color: 'text-cyan',
      border: 'border-cyan/30',
      bg: 'bg-cyan/10',
    },
    backend: {
      title: 'Arquitectura & Servidores',
      highlight: 'Modelado de bases de datos, APIs REST seguras, autenticación y lógica de negocio escalable.',
      tags: ['Express.js', 'Django REST', 'MySQL', 'MongoDB Atlas', 'JWT', 'Testing'],
      icon: Server,
      color: 'text-violet',
      border: 'border-violet/30',
      bg: 'bg-violet/10',
    },
  };

  const currentFocus = focusData[activeFocus];
  const FocusIcon = currentFocus.icon;

  return (
    <section id="inicio" className="relative min-h-[92vh] overflow-hidden pt-24 pb-16 sm:pt-32 lg:pt-32">
      {/* Luces y orbes ambientales de profundidad */}
      <div
        aria-hidden="true"
        className="orb -left-36 top-10 h-[550px] w-[550px] bg-lime/[0.07] animate-glow"
      />
      <div
        aria-hidden="true"
        className="orb -right-32 top-28 h-[500px] w-[500px] bg-cyan/[0.06] animate-glow"
        style={{ animationDelay: '2s' }}
      />
      <div
        aria-hidden="true"
        className="orb left-1/3 top-1/2 h-[400px] w-[400px] bg-violet/[0.05] animate-glow"
        style={{ animationDelay: '4s' }}
      />

      <div className="section-shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Columna Izquierda: Información Principal y Cockpit de Ingeniería */}
          <Reveal>
            <div className="flex flex-col">
              {/* Badge holográfico de disponibilidad */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="badge-shimmer inline-flex items-center gap-2.5 rounded-full border border-lime/30 bg-lime/10 px-4 py-1.5 font-mono text-xs font-semibold text-lime shadow-glow-lime">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-80" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
                  </span>
                  <span>DISPONIBLE · HÍBRIDO & FREELANCE</span>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-surface/60 px-3 py-1 font-mono text-[11px] text-muted">
                  <MapPin size={12} className="text-cyan" />
                  <span>{profile.ubicacion}</span>
                </div>
              </div>

              {/* Titular Principal */}
              <div className="mt-7">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted flex items-center gap-2">
                  <Sparkles size={14} className="text-lime" />
                  Arquitectura & Código
                </p>
                <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl leading-[1.08]">
                  Jorman Alexander
                  <br />
                  <span className="gradient-text font-black">Cardona Gómez</span>
                </h1>
              </div>

              {/* Subtítulo & Especialidad */}
              <p className="mt-4 text-lg font-semibold text-subtle sm:text-xl">
                {profile.rol}{' '}
                <span className="inline-block h-2 w-2 rounded-full bg-lime align-middle mx-1" />{' '}
                <span className="text-ink">{profile.especialidad}</span>
              </p>

              {/* Pitch */}
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
                {profile.pitch}
              </p>

              {/* Selector Interactivo de Modo Técnico */}
              <div className="mt-7 rounded-2xl border border-white/[0.08] bg-surface/70 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-dim">
                    // selector de arquitectura
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveFocus('fullstack')}
                      className={`rounded-lg px-2.5 py-1 font-mono text-[11px] font-semibold transition-all ${
                        activeFocus === 'fullstack'
                          ? 'bg-lime/20 text-lime border border-lime/30'
                          : 'text-muted hover:text-ink'
                      }`}
                    >
                      Full Stack
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveFocus('frontend')}
                      className={`rounded-lg px-2.5 py-1 font-mono text-[11px] font-semibold transition-all ${
                        activeFocus === 'frontend'
                          ? 'bg-cyan/20 text-cyan border border-cyan/30'
                          : 'text-muted hover:text-ink'
                      }`}
                    >
                      Frontend
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveFocus('backend')}
                      className={`rounded-lg px-2.5 py-1 font-mono text-[11px] font-semibold transition-all ${
                        activeFocus === 'backend'
                          ? 'bg-violet/20 text-violet border border-violet/30'
                          : 'text-muted hover:text-ink'
                      }`}
                    >
                      Backend
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-start gap-3">
                  <div className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl ${currentFocus.bg} ${currentFocus.color}`}>
                    <FocusIcon size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink">{currentFocus.title}</h4>
                    <p className="mt-1 text-xs text-subtle leading-relaxed">{currentFocus.highlight}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {currentFocus.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de Acción (CTAs) */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#proyectos" className="btn-primary group">
                  Explorar Proyectos
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>

                <a href="#contacto" className="btn-ghost">
                  <Mail size={16} /> Contactar
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <Github size={16} /> GitHub
                </a>
              </div>

              {/* Mini métricas de ingeniería */}
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-6">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                  <span className="font-mono text-2xl font-black text-lime">4</span>
                  <span className="mt-0.5 block text-[11px] text-muted">Proyectos reales</span>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                  <span className="font-mono text-2xl font-black text-cyan">SENA</span>
                  <span className="mt-0.5 block text-[11px] text-muted">Tecnólogo ADSO</span>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                  <span className="font-mono text-2xl font-black text-violet">100%</span>
                  <span className="mt-0.5 block text-[11px] text-muted">Práctica real</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Columna Derecha: Núcleo 3D Interactivo con Three.js */}
          <Reveal delay={150}>
            <div className="flex flex-col items-center justify-center">
              <CyberCore3D />
            </div>
          </Reveal>
        </div>

        {/* Ticker de tecnologías continuas */}
        <Reveal delay={220}>
          <div className="mt-14">
            <StackTicker />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

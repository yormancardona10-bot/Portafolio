import { useState } from 'react';
import {
  Compass,
  Lightbulb,
  Zap,
  Users,
  Brain,
  Target,
  Terminal,
  Gamepad2,
  Code,
  Sparkles,
  Award,
} from 'lucide-react';
import { about } from '../data/portfolioData';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const principioContextos: Record<
  string,
  { icon: typeof Brain; color: string; border: string; bg: string; detalle: string }
> = {
  'Enfoque analítico': {
    icon: Brain,
    color: 'text-lime',
    border: 'border-lime/40',
    bg: 'bg-lime/15',
    detalle:
      'Descompongo problemas complejos en módulos manejables, analizando la raíz técnica antes de escribir una sola línea de código.',
  },
  Resiliencia: {
    icon: Zap,
    color: 'text-cyan',
    border: 'border-cyan/40',
    bg: 'bg-cyan/15',
    detalle:
      'Perseverancia frente a bugs difíciles y entornos cambiantes, manteniendo una actitud constructiva hasta encontrar la solución óptima.',
  },
  Determinación: {
    icon: Target,
    color: 'text-violet',
    border: 'border-violet/40',
    bg: 'bg-violet/15',
    detalle:
      'Compromiso absoluto con entregar software funcional, limpio y documentado dentro de los plazos establecidos.',
  },
  'Trabajo colaborativo': {
    icon: Users,
    color: 'text-lime',
    border: 'border-lime/40',
    bg: 'bg-lime/15',
    detalle:
      'Comunicación asertiva con diseñadores, backenders y líderes de proyecto bajo ceremonias Scrum y tableros Kanban.',
  },
  Liderazgo: {
    icon: Compass,
    color: 'text-cyan',
    border: 'border-cyan/40',
    bg: 'bg-cyan/15',
    detalle:
      'Iniciativa para guiar tareas técnicas, proponer mejoras arquitectónicas y apoyar a compañeros de equipo en bloqueos.',
  },
};

export function About() {
  const [activePrincipio, setActivePrincipio] = useState<string>('Enfoque analítico');

  const activeData = principioContextos[activePrincipio] || principioContextos['Enfoque analítico'];
  const ActiveIcon = activeData.icon;

  return (
    <section id="sobre-mi" className="section-padding relative overflow-hidden">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="02 / Perfil & Filosofía"
            title={
              <>
                De la curiosidad al <span className="gradient-text">código</span>
              </>
            }
            description="La motivación técnica, el razonamiento lógico y la actitud analítica frente a problemas complejos."
          />
        </Reveal>

        {/* Bento Grid Principal */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Historia y Orígenes */}
          <Reveal>
            <article className="glass-card h-full p-7 sm:p-9 border border-white/[0.08] lg:col-span-2 relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-lime/[0.06] blur-3xl pointer-events-none"
              />

              <div className="flex items-center gap-3 mb-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-lime/15 text-lime border border-lime/30">
                  <Gamepad2 size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink">Origen y Pasión por la Tecnología</h3>
                  <span className="font-mono text-[11px] text-cyan uppercase tracking-widest">
                    Trayectoria Personal
                  </span>
                </div>
              </div>

              <p className="text-[15px] sm:text-base leading-relaxed text-subtle font-normal">
                {about.historia}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-6 font-mono text-xs text-muted">
                <span className="flex items-center gap-1.5 text-lime">
                  <Terminal size={14} /> Lógica estructurada
                </span>
                <span className="text-dim">•</span>
                <span className="flex items-center gap-1.5 text-cyan">
                  <Code size={14} /> Desarrollo continuo
                </span>
                <span className="text-dim">•</span>
                <span className="text-subtle">SENA ADSO</span>
              </div>
            </article>
          </Reveal>

          {/* Filosofía y Mindset */}
          <Reveal delay={100}>
            <article className="glass-card h-full p-7 sm:p-9 border border-white/[0.08] relative overflow-hidden flex flex-col justify-between">
              <div
                aria-hidden="true"
                className="absolute -left-16 -bottom-16 h-44 w-44 rounded-full bg-cyan/[0.06] blur-3xl pointer-events-none"
              />

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-cyan/15 text-cyan border border-cyan/30">
                    <Lightbulb size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-ink">Filosofía Técnica</h3>
                    <span className="font-mono text-[11px] text-lime uppercase tracking-widest">
                      Resolución de Problemas
                    </span>
                  </div>
                </div>

                <p className="text-[15px] leading-relaxed text-subtle font-normal">
                  {about.filosofia}
                </p>
              </div>

              <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center font-mono text-[11px] text-muted">
                "Todo reto técnico tiene solución mediante análisis y disciplina."
              </div>
            </article>
          </Reveal>

          {/* Principios Guía Interactivos (100% Funcional con Selección) */}
          <Reveal delay={160}>
            <div className="glass-card p-6 sm:p-8 border border-white/[0.08] md:col-span-2 lg:col-span-3">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-lime flex items-center gap-2">
                  <Sparkles size={14} />
                  Pilares de Ejecución (Haz clic para explorar cada principio)
                </span>

                <div className="flex flex-wrap gap-2">
                  {about.principios.map((principio) => {
                    const isSelected = activePrincipio === principio;
                    const pData = principioContextos[principio];

                    return (
                      <button
                        key={principio}
                        type="button"
                        onClick={() => setActivePrincipio(principio)}
                        className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 font-mono text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? `${pData.bg} ${pData.color} ${pData.border} border shadow-glow-lime scale-105`
                            : 'border border-white/[0.06] bg-white/[0.02] text-muted hover:border-white/15 hover:text-ink'
                        }`}
                      >
                        <Award size={13} />
                        <span>{principio}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detalle contextual del principio seleccionado */}
              <div className="mt-5 flex items-start gap-3.5 rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 animate-fade-in">
                <div className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${activeData.bg} ${activeData.color}`}>
                  <ActiveIcon size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-ink text-sm flex items-center gap-2">
                    {activePrincipio}
                    <span className="font-mono text-[10px] text-muted font-normal">// Aplicación Práctica</span>
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-subtle leading-relaxed">
                    {activeData.detalle}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

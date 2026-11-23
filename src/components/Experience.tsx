import {
  Check,
  Code2,
  Container,
  FileText,
  GitBranch,
  Network,
  Smartphone,
  ShieldCheck,
  Briefcase,
  Layers,
} from 'lucide-react';
import { experience } from '../data/portfolioData';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { Tag } from './Tag';

const techIcons: Record<string, typeof Container> = {
  Docker: Container,
  'React Native': Smartphone,
  'Node.js': Code2,
  Python: Code2,
  'APIs REST': Network,
  'Git/GitHub': GitBranch,
};

const techColors: Record<string, string> = {
  Docker: 'text-cyan',
  'React Native': 'text-cyan',
  'Node.js': 'text-lime',
  Python: 'text-lime',
  'APIs REST': 'text-violet',
  'Git/GitHub': 'text-violet',
};

export function Experience() {
  return (
    <section id="experiencia" className="section-padding relative overflow-hidden">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="05 / Trayectoria Profesional"
            title={
              <>
                Práctica en <span className="gradient-text">{experience.entidad}</span>
              </>
            }
            description="Desarrollo de módulos funcionales, pruebas rigurosas y arquitectura en un entorno real de innovación."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Panel Principal de la Experiencia */}
          <Reveal>
            <article className="glass-card overflow-hidden border border-white/[0.1] h-full flex flex-col">
              {/* Header */}
              <div
                className="border-b border-white/[0.08] p-7 sm:p-8"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(163,230,53,0.08) 0%, transparent 60%, rgba(34,211,238,0.06) 100%)',
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase size={16} className="text-lime" />
                      <span className="font-mono text-[11px] uppercase tracking-widest text-lime font-semibold">
                        Rol Verificado
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                      {experience.entidad}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base font-semibold text-cyan">
                      {experience.cargo}
                    </p>
                  </div>
                  <Tag tone="cyan" className="!px-3 !py-1 !text-xs font-mono">
                    En Etapa Práctica
                  </Tag>
                </div>
              </div>

              {/* Responsabilidades de Alto Impacto */}
              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-muted mb-5 flex items-center gap-2">
                    <Layers size={14} className="text-cyan" />
                    Responsabilidades e Impacto
                  </h4>
                  <div className="space-y-4">
                    {experience.responsabilidades.map((resp, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
                      >
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-lime/15 text-lime font-mono text-xs font-bold">
                          <Check size={14} />
                        </span>
                        <p className="text-sm leading-relaxed text-subtle font-normal">
                          {resp}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-white/[0.06] pt-4 flex items-center justify-between font-mono text-xs text-muted">
                  <span>Validado por: SENA Tecnoparque</span>
                  <span className="text-lime flex items-center gap-1">
                    <ShieldCheck size={14} /> Entorno de Producción
                  </span>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Columna Lateral: Tecnologías y Documentación */}
          <Reveal delay={120}>
            <div className="flex flex-col gap-5 h-full">
              {/* Tecnologías Clave */}
              <article className="glass-card p-6 sm:p-7 border border-white/[0.08]">
                <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan mb-4 flex items-center gap-2">
                  <Code2 size={15} />
                  Tecnologías en la Práctica
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {experience.tecnologias.map((tec) => {
                    const Icon = techIcons[tec] ?? Code2;
                    const color = techColors[tec] ?? 'text-lime';
                    return (
                      <div
                        key={tec}
                        className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]"
                      >
                        <Icon size={16} className={color} />
                        <span className="font-mono text-xs font-semibold text-subtle truncate">
                          {tec}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </article>

              {/* Buenas Prácticas & Documentación */}
              <article className="glass-card p-6 sm:p-7 border border-white/[0.08] flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-violet/10 text-violet">
                      <FileText size={18} />
                    </div>
                    <h4 className="font-bold text-ink text-sm">Flujo de Pruebas & Documentación</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    Estructuración de pruebas de regresión, documentación exhaustiva de endpoints REST y
                    buenas prácticas de control de versiones con Git/GitHub.
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Tag tone="violet">Testing de Software</Tag>
                  <Tag tone="cyan">Contenedores Docker</Tag>
                  <Tag tone="lime">REST API Docs</Tag>
                </div>
              </article>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

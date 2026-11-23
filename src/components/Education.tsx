import { useState, useMemo } from 'react';
import {
  BadgeCheck,
  GraduationCap,
  School,
  Languages,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { education, type EducationItem } from '../data/portfolioData';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { Tag } from './Tag';

type EducationFilter = 'todas' | EducationItem['tipo'];

const icons: Record<EducationItem['tipo'], typeof GraduationCap> = {
  formacion: GraduationCap,
  idioma: Languages,
  certificacion: BadgeCheck,
  secundaria: School,
};

const typeAccents: Record<EducationItem['tipo'], { text: string; bg: string; border: string }> = {
  formacion: { text: 'text-lime', bg: 'bg-lime/15', border: 'border-lime/30' },
  idioma: { text: 'text-cyan', bg: 'bg-cyan/15', border: 'border-cyan/30' },
  certificacion: { text: 'text-violet', bg: 'bg-violet/15', border: 'border-violet/30' },
  secundaria: { text: 'text-muted', bg: 'bg-white/[0.04]', border: 'border-white/[0.08]' },
};

const filterLabels: { id: EducationFilter; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'formacion', label: 'Formación ADSO' },
  { id: 'certificacion', label: 'Certificaciones' },
  { id: 'idioma', label: 'Idiomas' },
  { id: 'secundaria', label: 'Secundaria' },
];

export function Education() {
  const [activeFilter, setActiveFilter] = useState<EducationFilter>('todas');

  const filteredItems = useMemo(() => {
    if (activeFilter === 'todas') return education;
    return education.filter((e) => e.tipo === activeFilter);
  }, [activeFilter]);

  return (
    <section id="educacion" className="section-padding relative overflow-hidden">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="06 / Acreditación Académica"
            title={
              <>
                Formación & <span className="gradient-text">Certificaciones</span>
              </>
            }
            description="Educación formal, certificaciones técnicas especializadas y formación continua en idiomas."
          />
        </Reveal>

        {/* Filtros Funcionales de Educación */}
        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap gap-2">
            {filterLabels.map((f) => {
              const count =
                f.id === 'todas'
                  ? education.length
                  : education.filter((e) => e.tipo === f.id).length;

              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  className={`rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-all ${
                    activeFilter === f.id
                      ? 'border border-lime/40 bg-lime/15 text-lime shadow-glow-lime'
                      : 'border border-white/[0.06] bg-white/[0.02] text-muted hover:border-white/15 hover:text-ink'
                  }`}
                >
                  {f.label} ({count})
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10 relative">
          {/* Línea vertical de la cronología */}
          <div
            aria-hidden="true"
            className="absolute left-6 top-6 bottom-6 w-0.5 sm:left-7 hidden md:block"
            style={{
              background:
                'linear-gradient(to bottom, #A3E635 0%, #22D3EE 50%, #A78BFA 85%, transparent 100%)',
            }}
          />

          <div className="space-y-5">
            {filteredItems.map((item, index) => {
              const Icon = icons[item.tipo] || GraduationCap;
              const accent = typeAccents[item.tipo];
              const isOngoing = item.estado === 'En curso' || item.estado === 'En etapa práctica';

              return (
                <Reveal key={item.titulo} delay={index * 50}>
                  <div className="relative md:pl-16">
                    {/* Indicador en el eje temporal */}
                    <div
                      aria-hidden="true"
                      className={`absolute left-2.5 top-6 hidden md:grid h-9 w-9 -translate-x-1/2 place-items-center rounded-xl border ${accent.border} ${accent.bg} ${accent.text} backdrop-blur-xl shadow-lg`}
                    >
                      <Icon size={16} />
                    </div>

                    {/* Tarjeta de Acreditación */}
                    <article className="glass-card p-6 sm:p-7 border border-white/[0.08] transition-all duration-300 hover:border-white/20">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                              {item.tipo}
                            </span>
                            <span className="text-dim">•</span>
                            <span className="font-mono text-xs text-subtle flex items-center gap-1">
                              <Calendar size={12} className="text-lime" />
                              {item.institucion}
                            </span>
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold text-ink">
                            {item.titulo}
                          </h3>
                        </div>

                        <Tag
                          tone={isOngoing ? 'lime' : 'cyan'}
                          className="self-start font-mono !text-xs !px-3 !py-1 font-semibold"
                        >
                          <CheckCircle size={12} className="mr-1 inline" />
                          {item.estado}
                        </Tag>
                      </div>

                      <p className="mt-3 text-sm text-muted leading-relaxed">
                        {item.detalle}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2 border-t border-white/[0.05] pt-3">
                        {item.etiquetas.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-0.5 font-mono text-[11px] text-subtle"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

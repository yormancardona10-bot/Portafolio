import { useEffect, useState, useRef } from 'react';
import {
  Home,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Send,
  MessageCircle,
} from 'lucide-react';
import { whatsappUrl } from '../../data/portfolioData';

interface DockItem {
  id: string;
  label: string;
  icon: typeof Home;
  tone: 'lime' | 'cyan' | 'violet';
}

const dockItems: DockItem[] = [
  { id: 'inicio', label: 'Inicio', icon: Home, tone: 'lime' },
  { id: 'sobre-mi', label: 'Sobre mí', icon: User, tone: 'cyan' },
  { id: 'habilidades', label: 'Habilidades', icon: Cpu, tone: 'lime' },
  { id: 'proyectos', label: 'Proyectos', icon: FolderGit2, tone: 'cyan' },
  { id: 'experiencia', label: 'Experiencia', icon: Briefcase, tone: 'violet' },
  { id: 'educacion', label: 'Educación', icon: GraduationCap, tone: 'lime' },
  { id: 'contacto', label: 'Contacto', icon: Send, tone: 'lime' },
];

export function CommandDock() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  // 1. Escuchar el scroll para actualizar progreso
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(Math.max(currentProgress, 0), 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Observer de secciones activas
  useEffect(() => {
    const sectionElements = dockItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (intersecting) {
          setActiveSection(intersecting.target.id);
        }
      },
      { rootMargin: '-20% 0px -40% 0px', threshold: [0, 0.2, 0.5] }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Atajos de teclado: ESC para quitar hover
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setHoveredItem(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <nav
      aria-label="Navegador Command Dock"
      className="fixed inset-x-0 bottom-3 sm:bottom-6 z-50 flex justify-center px-2 sm:px-3 pointer-events-none"
    >
      <div
        ref={dockRef}
        className="pointer-events-auto relative flex max-w-[calc(100vw-1rem)] sm:max-w-max items-center gap-1 sm:gap-2 overflow-x-auto rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-abyss/90 p-1.5 sm:p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-300"
        style={{
          boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 25px 60px -15px rgba(0,0,0,0.9)',
          scrollbarWidth: 'none',
        }}
      >
        {/* Anillo de progreso orbital de lectura */}
        <div className="hidden sm:flex items-center pl-2 pr-1" title={`Progreso de lectura: ${Math.round(scrollProgress)}%`}>
          <div className="relative h-7 w-7">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/[0.08]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-lime transition-all duration-150"
                strokeDasharray={`${scrollProgress}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[8px] font-bold text-lime">
              {Math.round(scrollProgress)}%
            </span>
          </div>
        </div>

        <div className="hidden sm:block h-6 w-px bg-white/[0.08]" />

        {/* Ítems del dock */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {dockItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const isHovered = hoveredItem === item.id;

            return (
              <div key={item.id} className="relative">
                {/* Tooltip flotante superior */}
                {isHovered && (
                  <div
                    role="tooltip"
                    className="absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-white/[0.1] bg-surface/95 px-3 py-1 font-mono text-[11px] font-semibold text-ink shadow-2xl backdrop-blur-xl animate-fade-in"
                  >
                    <span>{item.label}</span>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 border-b border-r border-white/[0.1] bg-surface" />
                  </div>
                )}

                <a
                  href={`#${item.id}`}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={item.label}
                  className={`group relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'border border-lime/40 bg-lime/[0.15] text-lime shadow-glow-lime scale-105'
                      : 'border border-transparent text-muted hover:border-white/[0.08] hover:bg-white/[0.05] hover:text-ink hover:scale-105'
                  }`}
                >
                  <Icon
                    size={18}
                    className={`transition-transform duration-300 ${
                      isActive ? 'scale-110' : 'group-hover:scale-110'
                    }`}
                  />

                  {/* Indicador de punto activo inferior */}
                  {isActive && (
                    <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-lime" />
                  )}
                </a>
              </div>
            );
          })}
        </div>

        <div className="hidden sm:block h-6 w-px bg-white/[0.08]" />

        {/* Botón WhatsApp directo */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredItem('whatsapp')}
          onMouseLeave={() => setHoveredItem(null)}
          aria-label="Contactar por WhatsApp directo"
          className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl border border-lime/30 bg-lime/10 text-lime transition-all duration-300 hover:scale-105 hover:bg-lime/20 hover:shadow-glow-lime"
        >
          <MessageCircle size={18} />
          {hoveredItem === 'whatsapp' && (
            <div
              role="tooltip"
              className="absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-lime/30 bg-surface/95 px-3 py-1 font-mono text-[11px] font-semibold text-lime shadow-2xl backdrop-blur-xl animate-fade-in"
            >
              WhatsApp
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 border-b border-r border-white/[0.1] bg-surface" />
            </div>
          )}
        </a>
      </div>
    </nav>
  );
}

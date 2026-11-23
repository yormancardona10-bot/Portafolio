import { useState, useMemo } from 'react';
import {
  Code2,
  Cpu,
  Database,
  Layers,
  Terminal,
  ShieldCheck,
  Sparkles,
  GitPullRequest,
  Users2,
  Workflow,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { skillCategories, softSkills, type SkillCategoryId } from '../data/portfolioData';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { Tag } from './Tag';

interface SkillDetail {
  role: string;
  category: string;
  level: string;
  context: string;
  projects?: string[];
}

const skillDatabase: Record<string, SkillDetail> = {
  JavaScript: {
    role: 'Lenguaje fundamental para interactividad frontend y runtime de Node.js',
    category: 'Lenguajes',
    level: 'Avanzado en producción',
    context: 'Desarrollo de lógica cliente y servidores asíncronos con Node.js y Express.',
    projects: ['INTSHOT Django', 'Tienda Virtual', 'Landing Page'],
  },
  Python: {
    role: 'Backend robusto, APIs REST y modelado de datos estructurado',
    category: 'Lenguajes',
    level: 'Avanzado en producción',
    context: 'Arquitectura MVC con Django, Django REST Framework y scripts de automatización.',
    projects: ['INTSHOT Django', 'Tecnoparque SENA'],
  },
  HTML5: {
    role: 'Estructuración semántica accesible y estándar web moderno',
    category: 'Lenguajes',
    level: 'Avanzado en producción',
    context: 'Maquetación limpia, SEO técnico y accesibilidad multi-dispositivo.',
    projects: ['Landing Page', 'INTSHOT Django', 'Tienda Virtual'],
  },
  CSS3: {
    role: 'Estilos modernos, animaciones fluidas y layout systems avanzados',
    category: 'Lenguajes',
    level: 'Avanzado en producción',
    context: 'Flexbox, CSS Grid, variables CSS y diseño responsivo.',
    projects: ['Landing Page', 'INTSHOT Django', 'Tienda Virtual'],
  },
  SQL: {
    role: 'Diseño relacional, consultas estructuradas e integridad de datos',
    category: 'Lenguajes',
    level: 'Certificado & Práctico',
    context: 'Modelado relacional, joins complejos y transacciones en MySQL.',
    projects: ['INTSHOT Django'],
  },
  Dart: {
    role: 'Desarrollo de aplicaciones móviles multiplataforma de alto rendimiento',
    category: 'Lenguajes',
    level: 'Aplicado en app móvil',
    context: 'Lenguaje base de la aplicación INTSHOT Flutter con consumo de APIs REST.',
    projects: ['INTSHOT Flutter'],
  },
  'CSS Flexbox/Grid': {
    role: 'Arquitectura de layouts adaptables y fluidos',
    category: 'Frontend y Móvil',
    level: 'Avanzado',
    context: 'Estructuración de dashboards responsivos sin dependencias externas pesadas.',
    projects: ['Landing Page', 'INTSHOT Django'],
  },
  'Responsive Design': {
    role: 'Adaptabilidad total desde pantallas móviles hasta monitores ultrawide',
    category: 'Frontend y Móvil',
    level: 'Estándar en todos los proyectos',
    context: 'Media queries, layouts fluidos y pruebas en múltiples dispositivos.',
    projects: ['Landing Page', 'INTSHOT Flutter', 'Tienda Virtual'],
  },
  Bootstrap: {
    role: 'Framework CSS para interfaces corporativas rápidas y consistentes',
    category: 'Frontend y Móvil',
    level: 'Aplicado en producción',
    context: 'Diseño del catálogo interactivo y paneles administrativos de INTSHOT.',
    projects: ['INTSHOT Django'],
  },
  Flutter: {
    role: 'Framework móvil nativo para iOS y Android con base de código única',
    category: 'Frontend y Móvil',
    level: 'Desarrollo móvil completo',
    context: 'Creación de app móvil con catálogo, autenticación y carrito en tiempo real.',
    projects: ['INTSHOT Flutter'],
  },
  'React Native (en aprendizaje)': {
    role: 'Desarrollo de aplicaciones móviles con ecosistema React y JavaScript',
    category: 'Frontend y Móvil',
    level: 'En exploración activa',
    context: 'Prácticas y exploración de componentes nativos en Tecnoparque SENA.',
    projects: ['Tecnoparque SENA'],
  },
  'Node.js': {
    role: 'Entorno de ejecución backend asíncrono y no bloqueante',
    category: 'Backend y APIs',
    level: 'Avanzado en producción',
    context: 'Servidores backend para comercio electrónico y procesamiento de APIs.',
    projects: ['Tienda Virtual'],
  },
  'Express.js': {
    role: 'Framework web minimalista para creación de APIs REST y rutas',
    category: 'Backend y APIs',
    level: 'Avanzado en producción',
    context: 'Configuración de middlewares, enrutamiento modular y controladores.',
    projects: ['Tienda Virtual'],
  },
  Django: {
    role: 'Framework web de alto nivel con seguridad y ORM integrado',
    category: 'Backend y APIs',
    level: 'Avanzado en producción',
    context: 'Plataforma empresarial INTSHOT para inventario, proveedores y usuarios.',
    projects: ['INTSHOT Django'],
  },
  'Django REST Framework': {
    role: 'Construcción de APIs RESTful serializadas y autenticadas',
    category: 'Backend y APIs',
    level: 'Avanzado en producción',
    context: 'Exposición de endpoints para el catálogo e integración con app Flutter.',
    projects: ['INTSHOT Django', 'INTSHOT Flutter'],
  },
  'APIs REST': {
    role: 'Arquitectura de servicios desacoplados bajo estándares HTTP',
    category: 'Backend y APIs',
    level: 'Estándar arquitectónico',
    context: 'Diseño, consumo y documentación de endpoints JSON seguros.',
    projects: ['INTSHOT Django', 'INTSHOT Flutter', 'Tecnoparque SENA'],
  },
  MySQL: {
    role: 'Sistema de gestión de bases de datos relacionales robusto',
    category: 'Bases de Datos',
    level: 'Certificado & Producción',
    context: 'Modelado relacional, llaves foráneas y normalización de datos.',
    projects: ['INTSHOT Django'],
  },
  MongoDB: {
    role: 'Base de datos NoSQL orientada a documentos para esquemas flexibles',
    category: 'Bases de Datos',
    level: 'Aplicado en producción',
    context: 'Almacenamiento de catálogos y usuarios en la Tienda Virtual.',
    projects: ['Tienda Virtual'],
  },
  'MongoDB Atlas': {
    role: 'Base de datos en la nube distribuida y escalable',
    category: 'Bases de Datos',
    level: 'Despliegue Cloud',
    context: 'Conexión remota segura con clústeres en la nube para persistencia 24/7.',
    projects: ['Tienda Virtual'],
  },
  Git: {
    role: 'Control de versiones distribuido y gestión de ramas',
    category: 'Herramientas',
    level: 'Flujo diario',
    context: 'Git Flow, resolución de conflictos, commits semánticos y pull requests.',
    projects: ['Todos los proyectos', 'Tecnoparque SENA'],
  },
  GitHub: {
    role: 'Alojamiento de código, colaboración y proyectos de software',
    category: 'Herramientas',
    level: 'Flujo diario',
    context: 'Gestión de repositorios públicos/privados, GitHub Projects e issues.',
    projects: ['Todos los proyectos'],
  },
  'VS Code': {
    role: 'Entorno de desarrollo integrado principal con extensiones avanzadas',
    category: 'Herramientas',
    level: 'Herramienta principal',
    context: 'Depuración, linters, formateo y terminal integrada para desarrollo continuo.',
    projects: ['Herramienta transversal'],
  },
  Postman: {
    role: 'Pruebas y validación de endpoints y consumo de APIs REST',
    category: 'Herramientas',
    level: 'Pruebas constantes',
    context: 'Validación de payloads, encabezados de autenticación y respuestas JSON.',
    projects: ['INTSHOT Django', 'Tecnoparque SENA'],
  },
  Figma: {
    role: 'Diseño de interfaces, prototipado UI/UX y maquetación visual',
    category: 'Herramientas',
    level: 'Diseño de producto',
    context: 'Creación de mockups y wireframes previos a la implementación en código.',
    projects: ['Landing Page', 'INTSHOT UI'],
  },
  XAMPP: {
    role: 'Entorno de servidor local para desarrollo y administración MySQL',
    category: 'Herramientas',
    level: 'Desarrollo local',
    context: 'Gestión de bases de datos locales y pruebas con Apache y MariaDB.',
    projects: ['INTSHOT Django'],
  },
  Render: {
    role: 'Plataforma Cloud de despliegue de aplicaciones web y APIs',
    category: 'Herramientas',
    level: 'Despliegue y hosting',
    context: 'Despliegue de servicios web backend con variables de entorno.',
    projects: ['Tienda Virtual', 'APIs'],
  },
  'Docker (en aprendizaje)': {
    role: 'Contenerización de aplicaciones para consistencia entre entornos',
    category: 'Herramientas',
    level: 'En práctica activa',
    context: 'Creación de imágenes Docker y contenedores en Tecnoparque SENA.',
    projects: ['Tecnoparque SENA'],
  },
  OpenCode: {
    role: 'Herramienta de asistencia en código y arquitectura de software',
    category: 'Herramientas e IA',
    level: 'Productividad avanzada',
    context: 'Aceleración de desarrollo, refactorización y documentación técnica.',
    projects: ['Flujo de trabajo'],
  },
  Stitch: {
    role: 'Herramienta de diseño e integración visual de interfaces',
    category: 'Herramientas e IA',
    level: 'Diseño UI',
    context: 'Exploración de layouts y generación de código de componentes visuales.',
    projects: ['Flujo de trabajo'],
  },
  ChatGPT: {
    role: 'Modelo de lenguaje para resolución de dudas complejas y documentación',
    category: 'Herramientas e IA',
    level: 'Productividad avanzada',
    context: 'Optimización de algoritmos, pruebas unitarias y análisis de errores.',
    projects: ['Flujo de trabajo'],
  },
  Gemini: {
    role: 'IA multimodal de Google para análisis de código y lógica técnica',
    category: 'Herramientas e IA',
    level: 'Productividad avanzada',
    context: 'Revisión de arquitectura, redacción técnica y solución de problemas.',
    projects: ['Flujo de trabajo'],
  },
  NotebookLM: {
    role: 'Herramienta de síntesis y estudio de documentación técnica estructurada',
    category: 'Herramientas e IA',
    level: 'Estudio y análisis',
    context: 'Investigación de librerías, marcos de trabajo y estándares de la industria.',
    projects: ['Formación continua'],
  },
  'Pruebas automatizadas (Mocha, Supertest, Django Testing)': {
    role: 'Garantía de calidad mediante tests unitarios y de integración',
    category: 'Prácticas Técnicas',
    level: 'Control de calidad',
    context: 'Validación de endpoints, respuestas de servidor y lógica de negocio.',
    projects: ['INTSHOT Django', 'Tienda Virtual'],
  },
  'Autenticación/JWT': {
    role: 'Seguridad en sesiones mediante tokens criptográficos JSON Web Tokens',
    category: 'Prácticas Técnicas',
    level: 'Seguridad estándar',
    context: 'Protección de rutas privadas, hashing de contraseñas y permisos de usuario.',
    projects: ['INTSHOT Django', 'Tienda Virtual', 'INTSHOT Flutter'],
  },
  'Variables de entorno (.env)': {
    role: 'Aislamiento seguro de credenciales y claves de producción',
    category: 'Prácticas Técnicas',
    level: 'Buenas prácticas',
    context: 'Configuración segura de conexiones a bases de datos y secrets.',
    projects: ['Todos los proyectos'],
  },
  'Integración de mailing y backups': {
    role: 'Servicios complementarios de comunicación y resguardo de datos',
    category: 'Prácticas Técnicas',
    level: 'Operaciones backend',
    context: 'Envío de notificaciones y respaldos periódicos de bases de datos.',
    projects: ['INTSHOT Django'],
  },
};

const categoryIcons: Record<SkillCategoryId, typeof Code2> = {
  lenguajes: Code2,
  frontend: Layers,
  backend: Cpu,
  datos: Database,
  herramientas: Terminal,
  practicas: ShieldCheck,
};

const categoryAccents: Record<SkillCategoryId, { text: string; bg: string; border: string }> = {
  lenguajes: { text: 'text-lime', bg: 'bg-lime/10', border: 'border-lime/30' },
  frontend: { text: 'text-cyan', bg: 'bg-cyan/10', border: 'border-cyan/30' },
  backend: { text: 'text-violet', bg: 'bg-violet/10', border: 'border-violet/30' },
  datos: { text: 'text-lime', bg: 'bg-lime/10', border: 'border-lime/30' },
  herramientas: { text: 'text-cyan', bg: 'bg-cyan/10', border: 'border-cyan/30' },
  practicas: { text: 'text-violet', bg: 'bg-violet/10', border: 'border-violet/30' },
};

export function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<string>('JavaScript');
  const [categoryFilter, setCategoryFilter] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState('');

  const detail = skillDatabase[selectedSkill] || {
    role: 'Tecnología aplicada en desarrollo de software',
    category: 'Stack General',
    level: 'Implementado',
    context: 'Utilizado en flujos de desarrollo e implementación técnica.',
    projects: ['Verificado'],
  };

  const filteredCategories = useMemo(() => {
    return skillCategories
      .filter((cat) => (categoryFilter === 'todas' ? true : cat.id === categoryFilter))
      .map((cat) => {
        if (!searchQuery.trim()) return cat;
        const matchingSkills = cat.skills.filter((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return { ...cat, skills: matchingSkills };
      })
      .filter((cat) => cat.skills.length > 0);
  }, [categoryFilter, searchQuery]);

  return (
    <section id="habilidades" className="section-padding relative overflow-hidden">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="03 / Arsenal Técnico"
            title={
              <>
                Matriz de <span className="gradient-text">Competencias</span>
              </>
            }
            description="Haz clic en cualquier habilidad para ver su rol en la arquitectura, nivel de aplicación y proyectos vinculados."
          />
        </Reveal>

        {/* Panel Interactivo de Inspección de Habilidad (Inspector 100% Funcional) */}
        <Reveal delay={80}>
          <div className="mt-10 rounded-2xl border border-white/[0.1] bg-abyss/85 p-6 backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-lime/15 text-lime border border-lime/30">
                  <Sparkles size={16} />
                </span>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    Inspector de Habilidad Activa
                  </span>
                  <h4 className="text-xl font-black text-ink flex items-center gap-2">
                    <span className="text-lime">#{selectedSkill}</span>
                    <span className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] font-semibold text-cyan">
                      {detail.category}
                    </span>
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-subtle">
                <CheckCircle2 size={14} className="text-lime" />
                <span>Nivel: <strong className="text-ink">{detail.level}</strong></span>
              </div>
            </div>

            {/* Detalles de la habilidad seleccionada */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted block mb-1">
                  Rol en la Arquitectura
                </span>
                <p className="text-sm text-ink leading-relaxed font-medium">
                  {detail.role}
                </p>
                <p className="mt-2 text-xs text-muted leading-relaxed">
                  {detail.context}
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted block mb-2">
                    Proyectos & Entornos Donde se Utilizó
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {detail.projects && detail.projects.length > 0 ? (
                      detail.projects.map((proj) => (
                        <span
                          key={proj}
                          className="rounded-lg border border-lime/30 bg-lime/10 px-3 py-1 font-mono text-xs font-semibold text-lime shadow-glow-lime animate-fade-in"
                        >
                          {proj}
                        </span>
                      ))
                    ) : (
                      <span className="font-mono text-xs text-muted">Transversal a todo el stack</span>
                    )}
                  </div>
                </div>

                <div className="mt-4 font-mono text-[11px] text-cyan">
                  ✦ Haz clic en otra habilidad abajo para inspeccionar su contexto técnico
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Filtros por Categoría & Buscador Rápido */}
        <Reveal delay={120}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Botones de categoría */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setCategoryFilter('todas')}
                className={`rounded-xl px-3.5 py-2 font-mono text-xs font-semibold transition-all ${
                  categoryFilter === 'todas'
                    ? 'border border-lime/40 bg-lime/15 text-lime shadow-glow-lime'
                    : 'border border-white/[0.06] bg-white/[0.02] text-muted hover:border-white/15 hover:text-ink'
                }`}
              >
                Todas ({skillCategories.length})
              </button>
              {skillCategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategoryFilter(c.id)}
                  className={`rounded-xl px-3.5 py-2 font-mono text-xs font-semibold transition-all ${
                    categoryFilter === c.id
                      ? 'border border-cyan/40 bg-cyan/15 text-cyan shadow-glow-cyan'
                      : 'border border-white/[0.06] bg-white/[0.02] text-muted hover:border-white/15 hover:text-ink'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Input de Búsqueda de Skill */}
            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar tecnología..."
                className="w-full rounded-xl border border-white/[0.08] bg-surface/80 py-2 pl-9 pr-3 font-mono text-xs text-ink outline-none transition-colors focus:border-lime/40 placeholder:text-dim"
              />
            </div>
          </div>
        </Reveal>

        {/* Matriz por Categorías con Habilidades Seleccionables */}
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((cat, idx) => {
            const Icon = categoryIcons[cat.id] || Code2;
            const accent = categoryAccents[cat.id];

            return (
              <Reveal key={cat.id} delay={idx * 50}>
                <article className="glass-card h-full p-6 sm:p-7 border border-white/[0.08] transition-all duration-300 hover:border-white/20">
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`grid h-10 w-10 place-items-center rounded-xl ${accent.bg} ${accent.text}`}>
                        <Icon size={19} />
                      </div>
                      <div>
                        <h3 className="font-bold text-ink text-base">{cat.label}</h3>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                          {cat.skills.length} Tecnologías
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => {
                      const isSelected = selectedSkill === skill;
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => setSelectedSkill(skill)}
                          className={`rounded-xl px-3 py-1.5 font-mono text-xs font-semibold transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'border border-lime/60 bg-lime/25 text-lime shadow-glow-lime scale-105'
                              : 'border border-white/[0.08] bg-white/[0.03] text-subtle hover:border-lime/40 hover:bg-white/[0.06] hover:text-ink'
                          }`}
                        >
                          #{skill}
                        </button>
                      );
                    })}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Metodologías y Soft Skills */}
        <Reveal delay={160}>
          <div className="mt-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-cyan/40" />
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">
                Metodologías Ágiles & Gestión Colaborativa
              </h4>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <div className="glass-card p-6 border border-white/[0.08]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-lime/10 text-lime">
                    <Workflow size={18} />
                  </div>
                  <h5 className="font-bold text-ink text-sm">Metodologías</h5>
                </div>
                <div className="flex flex-wrap gap-2">
                  {softSkills.metodologias.map((item) => (
                    <Tag key={item} tone="lime">{item}</Tag>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 border border-white/[0.08]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-cyan/10 text-cyan">
                    <Users2 size={18} />
                  </div>
                  <h5 className="font-bold text-ink text-sm">Habilidades Blandas</h5>
                </div>
                <div className="flex flex-wrap gap-2">
                  {softSkills.blandas.map((item) => (
                    <Tag key={item} tone="cyan">{item}</Tag>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 border border-white/[0.08]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-violet/10 text-violet">
                    <GitPullRequest size={18} />
                  </div>
                  <h5 className="font-bold text-ink text-sm">Buenas Prácticas</h5>
                </div>
                <div className="flex flex-wrap gap-2">
                  {softSkills.buenasPracticas.map((item) => (
                    <Tag key={item} tone="violet">{item}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

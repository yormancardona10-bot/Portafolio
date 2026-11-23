import { useState, useMemo, type MouseEvent } from 'react';
import {
  ArrowUpRight,
  Github,
  GitBranch,
  Terminal,
  Layers,
  Cpu,
  Database,
  ExternalLink,
  Copy,
  CheckCheck,
  Server,
  Play,
  RotateCcw,
} from 'lucide-react';
import { projects, type ProjectCategory } from '../data/portfolioData';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { Tag } from './Tag';

type ProjectViewTab = 'overview' | 'architecture' | 'api';
type CategoryFilter = 'Todos' | ProjectCategory;

const projectArchitectures: Record<
  string,
  {
    client: { title: string; tech: string; desc: string };
    server: { title: string; tech: string; desc: string };
    data: { title: string; tech: string; desc: string };
    apiSample: {
      endpoint: string;
      method: string;
      response: object;
    };
  }
> = {
  intshot: {
    client: {
      title: 'Capa Cliente & Vistas',
      tech: 'HTML5, CSS3, JavaScript, Bootstrap',
      desc: 'Interfaz dinámica con catálogo interactivo, validaciones en cliente y diseño responsive multi-dispositivo.',
    },
    server: {
      title: 'Servidor & APIs REST',
      tech: 'Python, Django, Django REST Framework',
      desc: 'Arquitectura modular para control de inventarios, usuarios, proveedores, compras y ventas.',
    },
    data: {
      title: 'Persistencia Relacional',
      tech: 'MySQL Database',
      desc: 'Modelado relacional estructurado con claves foráneas, índices de búsqueda y transacciones ACID.',
    },
    apiSample: {
      endpoint: '/api/v1/productos/inventario/',
      method: 'GET',
      response: {
        status: 'success',
        total_items: 142,
        categoria: 'Textil & Confección',
        disponible_stock: true,
        proveedor_activo: 'Textiles Antioquia S.A.S',
      },
    },
  },
  'tienda-virtual': {
    client: {
      title: 'Renderizado Dinámico',
      tech: 'EJS Templates, CSS3, JavaScript',
      desc: 'Plantillas renderizadas desde el servidor para catálogo fluido, carrito dinámico y sesiones protegidas.',
    },
    server: {
      title: 'Servidor Asíncrono',
      tech: 'Node.js, Express.js, JWT',
      desc: 'Middleware de autenticación, control de sesiones, enrutamiento REST y controladores modulares.',
    },
    data: {
      title: 'Base de Datos NoSQL',
      tech: 'MongoDB, Mongoose ORM, Atlas',
      desc: 'Esquemas flexibles para documentos de productos, usuarios registrados y pedidos históricos.',
    },
    apiSample: {
      endpoint: '/api/cart/checkout',
      method: 'POST',
      response: {
        orderId: 'ORD-98214-CO',
        status: 'approved',
        paymentMethod: 'CreditCard',
        customer: 'cliente@correo.com',
        total: 185000,
        currency: 'COP',
      },
    },
  },
  'intshot-flutter': {
    client: {
      title: 'Aplicación Móvil Nativa',
      tech: 'Flutter SDK, Dart',
      desc: 'UI multiplataforma reactiva con animaciones nativas, navegación fluida y carrito de compras local.',
    },
    server: {
      title: 'Backend Conectado',
      tech: 'Django REST Framework, HTTP Services',
      desc: 'Consumo asíncrono de APIs REST con serialización JSON y gestión de tokens de sesión.',
    },
    data: {
      title: 'Sincronización en Tiempo Real',
      tech: 'API REST Django + MySQL',
      desc: 'Refresco en vivo de existencias de catálogo y confirmación inmediata de pedidos.',
    },
    apiSample: {
      endpoint: '/mobile/api/sync/catalog',
      method: 'GET',
      response: {
        app_version: '1.2.0',
        sync_timestamp: '2026-11-23T14:00:00Z',
        categories_count: 8,
        active_cart: { items: 3, subtotal: 94000 },
      },
    },
  },
  'landing-page': {
    client: {
      title: 'Maquetación Estructurada',
      tech: 'HTML5 Semántico, CSS3 Moderno, JavaScript',
      desc: 'Diseño visual limpio, tipografía optimizada, componentes modulares y diseño 100% responsivo.',
    },
    server: {
      title: 'Optimización Web',
      tech: 'Hosting Estático, CDN Caching',
      desc: 'Tiempos de carga mínimos, optimización de recursos y cero dependencias pesadas.',
    },
    data: {
      title: 'Arquitectura Estática',
      tech: 'Estructura Semántica',
      desc: 'Presentación estructurada de información sin dependencias de bases de datos.',
    },
    apiSample: {
      endpoint: '/status/healthcheck',
      method: 'GET',
      response: {
        service: 'Landing Presentation Engine',
        status: '200 OK',
        performance_score: 99,
        responsive: true,
      },
    },
  },
};

export function Projects() {
  const [selectedId, setSelectedId] = useState<string>(projects[0].id);
  const [activeTab, setActiveTab] = useState<ProjectViewTab>('overview');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('Todos');
  const [copiedRepo, setCopiedRepo] = useState<string | null>(null);
  const [isSimulatingApi, setIsSimulatingApi] = useState(false);
  const [apiResult, setApiResult] = useState<object | null>(null);

  // Filtrado de proyectos por categoría
  const filteredProjects = useMemo(() => {
    if (categoryFilter === 'Todos') return projects;
    return projects.filter((p) => p.categoria === categoryFilter);
  }, [categoryFilter]);

  const activeProject = useMemo(() => {
    const found = filteredProjects.find((p) => p.id === selectedId);
    if (found) return found;
    return filteredProjects[0] || projects[0];
  }, [selectedId, filteredProjects]);

  const archInfo = projectArchitectures[activeProject.id] || projectArchitectures.intshot;

  const copyCloneCmd = (repoUrl: string) => {
    const cmd = `git clone ${repoUrl}.git`;
    navigator.clipboard?.writeText(cmd);
    setCopiedRepo(cmd);
    setTimeout(() => setCopiedRepo(null), 2000);
  };

  const handleSimulateApi = () => {
    setIsSimulatingApi(true);
    setApiResult(null);
    setTimeout(() => {
      setApiResult(archInfo.apiSample.response);
      setIsSimulatingApi(false);
    }, 450);
  };

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  };

  return (
    <section id="proyectos" className="section-padding relative overflow-hidden">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="04 / Dossier de Ingeniería"
            title={
              <>
                Proyectos & <span className="gradient-text">Arquitectura</span>
              </>
            }
            description="Explora las soluciones reales construidas, su arquitectura de datos y código fuente verificado."
          />
        </Reveal>

        {/* Filtros por Categoría */}
        <Reveal delay={60}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {(['Todos', 'Full Stack', 'Móvil', 'Frontend'] as CategoryFilter[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-all ${
                    categoryFilter === cat
                      ? 'border border-lime/40 bg-lime/15 text-lime shadow-glow-lime'
                      : 'border border-white/[0.06] bg-white/[0.02] text-muted hover:border-white/15 hover:text-ink'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <span className="font-mono text-xs text-muted">
              Mostrando {filteredProjects.length} de {projects.length} proyectos
            </span>
          </div>
        </Reveal>

        {/* Selector de Pestañas de Proyectos */}
        <Reveal delay={90}>
          <div className="mt-4 flex flex-wrap gap-2.5 rounded-2xl border border-white/[0.08] bg-abyss/80 p-2 backdrop-blur-2xl">
            {filteredProjects.map((project, idx) => {
              const isSelected = activeProject.id === project.id;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(project.id);
                    setApiResult(null);
                  }}
                  className={`flex flex-1 min-w-[200px] items-center justify-between rounded-xl px-4 py-3 font-mono text-xs transition-all duration-300 ${
                    isSelected
                      ? 'border border-lime/40 bg-lime/15 text-lime shadow-glow-lime'
                      : 'border border-transparent text-muted hover:border-white/[0.08] hover:bg-white/[0.03] hover:text-ink'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold">0{idx + 1}.</span>
                    <span className="font-bold text-ink">{project.nombre}</span>
                  </div>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] ${
                      isSelected ? 'bg-lime/20 text-lime font-bold' : 'bg-white/[0.04] text-muted'
                    }`}
                  >
                    {project.categoria}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Visor Principal del Proyecto Seleccionado */}
        <div className="mt-8">
          <Reveal delay={120}>
            <div
              className="glass-card overflow-hidden p-6 sm:p-9 border border-white/[0.1] relative"
              onMouseMove={onMouseMove}
              style={{
                boxShadow:
                  '0 0 0 1px rgba(163,230,53,0.1), 0 30px 80px -25px rgba(0,0,0,0.95)',
              }}
            >
              {/* Encabezado del visor */}
              <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="badge-shimmer inline-flex items-center gap-2 rounded-full border border-lime/30 px-3 py-1 font-mono text-[10px] font-bold text-lime uppercase tracking-widest">
                      <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
                      {activeProject.categoria}
                    </span>
                    <span className="font-mono text-xs text-muted flex items-center gap-1.5">
                      <GitBranch size={13} className="text-cyan" />
                      {activeProject.ruta}
                    </span>
                  </div>

                  <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                    {activeProject.nombre}
                  </h3>
                </div>

                {/* Selector de Vista: Resumen / Arquitectura / API Tester */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center rounded-xl border border-white/[0.08] bg-white/[0.02] p-1 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveTab('overview')}
                      className={`rounded-lg px-3 py-1.5 transition-all ${
                        activeTab === 'overview'
                          ? 'bg-lime/20 text-lime font-bold'
                          : 'text-muted hover:text-ink'
                      }`}
                    >
                      Aportes
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('architecture')}
                      className={`rounded-lg px-3 py-1.5 transition-all ${
                        activeTab === 'architecture'
                          ? 'bg-cyan/20 text-cyan font-bold'
                          : 'text-muted hover:text-ink'
                      }`}
                    >
                      Arquitectura
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('api')}
                      className={`rounded-lg px-3 py-1.5 transition-all ${
                        activeTab === 'api'
                          ? 'bg-violet/20 text-violet font-bold'
                          : 'text-muted hover:text-ink'
                      }`}
                    >
                      REST API
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyCloneCmd(activeProject.repositorio)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 font-mono text-xs text-subtle transition-all hover:border-lime/30 hover:text-lime"
                    title="Copiar comando git clone"
                  >
                    {copiedRepo ? (
                      <>
                        <CheckCheck size={14} className="text-lime" />
                        <span className="text-lime">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>git clone</span>
                      </>
                    )}
                  </button>

                  <a
                    href={activeProject.repositorio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !px-4 !py-2 !text-xs"
                  >
                    <Github size={15} />
                    <span>Ver Código</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* VISTA 1: RESUMEN Y APORTES */}
              {activeTab === 'overview' && (
                <div className="mt-8 grid gap-8 lg:grid-cols-12 animate-fade-in">
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan flex items-center gap-2 mb-3">
                        <Cpu size={14} />
                        Objetivo del Sistema
                      </h4>
                      <p className="text-[15px] leading-relaxed text-subtle font-normal">
                        {activeProject.descripcion}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-lime flex items-center gap-2 mb-4">
                        <Layers size={14} />
                        Aportes Clave y Módulos Desarrollados
                      </h4>
                      <div className="space-y-3">
                        {activeProject.aportes.map((aporte, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3.5 transition-colors hover:border-white/[0.12] hover:bg-white/[0.03]"
                          >
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-lg bg-lime/10 text-lime font-mono text-[10px] font-bold">
                              ✓
                            </span>
                            <span className="text-xs sm:text-sm text-subtle leading-relaxed">
                              {aporte}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col gap-5">
                    <div className="rounded-2xl border border-white/[0.08] bg-abyss/60 p-5">
                      <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-violet flex items-center gap-2 mb-4">
                        <Database size={14} />
                        Stack de Tecnologías
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.stack.map((tech) => (
                          <Tag key={tech} tone="lime" className="!px-3 !py-1.5 !text-xs">
                            {tech}
                          </Tag>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/[0.08] bg-surface-alt/70 p-4 font-mono text-xs">
                      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[10px] text-muted">
                        <span className="flex items-center gap-1.5">
                          <Terminal size={12} className="text-lime" />
                          project_info.json
                        </span>
                        <span className="text-lime">STATUS: 200 OK</span>
                      </div>
                      <div className="mt-3 space-y-1.5 text-[11px] leading-relaxed">
                        <div>
                          <span className="text-violet">"id"</span>: <span className="text-lime">"{activeProject.id}"</span>,
                        </div>
                        <div>
                          <span className="text-violet">"category"</span>: <span className="text-cyan">"{activeProject.categoria}"</span>,
                        </div>
                        <div>
                          <span className="text-violet">"verified_repo"</span>: <span className="text-ink">true</span>,
                        </div>
                        <div>
                          <span className="text-violet">"architecture"</span>: <span className="text-lime">"Multi-Tier Layered"</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VISTA 2: DIAGRAMA DE ARQUITECTURA VISUAL */}
              {activeTab === 'architecture' && (
                <div className="mt-8 animate-fade-in">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-cyan flex items-center gap-2">
                      <Server size={14} />
                      Flujo de Capas del Sistema (Client → API → Storage)
                    </span>
                    <span className="font-mono text-[11px] text-muted">Diseño de Arquitectura</span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {/* Capa Cliente */}
                    <div className="rounded-2xl border border-cyan/30 bg-cyan/[0.03] p-5 relative">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] uppercase font-bold text-cyan">
                          01 / FRONTEND
                        </span>
                        <Layers size={16} className="text-cyan" />
                      </div>
                      <h4 className="font-bold text-ink text-base mb-1">{archInfo.client.title}</h4>
                      <p className="font-mono text-xs text-cyan mb-3">{archInfo.client.tech}</p>
                      <p className="text-xs text-subtle leading-relaxed">{archInfo.client.desc}</p>
                    </div>

                    {/* Capa Servidor */}
                    <div className="rounded-2xl border border-lime/30 bg-lime/[0.03] p-5 relative">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] uppercase font-bold text-lime">
                          02 / BACKEND & API
                        </span>
                        <Cpu size={16} className="text-lime" />
                      </div>
                      <h4 className="font-bold text-ink text-base mb-1">{archInfo.server.title}</h4>
                      <p className="font-mono text-xs text-lime mb-3">{archInfo.server.tech}</p>
                      <p className="text-xs text-subtle leading-relaxed">{archInfo.server.desc}</p>
                    </div>

                    {/* Capa Persistencia */}
                    <div className="rounded-2xl border border-violet/30 bg-violet/[0.03] p-5 relative">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] uppercase font-bold text-violet">
                          03 / DATA LAYER
                        </span>
                        <Database size={16} className="text-violet" />
                      </div>
                      <h4 className="font-bold text-ink text-base mb-1">{archInfo.data.title}</h4>
                      <p className="font-mono text-xs text-violet mb-3">{archInfo.data.tech}</p>
                      <p className="text-xs text-subtle leading-relaxed">{archInfo.data.desc}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* VISTA 3: SIMULADOR DE REST API EN TIEMPO REAL */}
              {activeTab === 'api' && (
                <div className="mt-8 animate-fade-in">
                  <div className="rounded-2xl border border-white/[0.08] bg-abyss/90 p-5 font-mono text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-lime/20 px-2 py-0.5 font-bold text-lime">
                          {archInfo.apiSample.method}
                        </span>
                        <span className="text-subtle font-semibold">
                          {archInfo.apiSample.endpoint}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleSimulateApi}
                        disabled={isSimulatingApi}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-lime/40 bg-lime/10 px-3.5 py-1.5 font-bold text-lime transition-all hover:bg-lime/20 disabled:opacity-50"
                      >
                        {isSimulatingApi ? (
                          <>
                            <RotateCcw size={13} className="animate-spin" />
                            <span>Ejecutando...</span>
                          </>
                        ) : (
                          <>
                            <Play size={13} />
                            <span>Testear Endpoint</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-4">
                      <span className="text-muted text-[11px] block mb-2">// Payload de Respuesta JSON</span>
                      <pre className="rounded-xl bg-void p-4 text-[11px] leading-relaxed text-lime/90 overflow-x-auto border border-white/[0.04]">
                        {JSON.stringify(apiResult || archInfo.apiSample.response, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* Tarjetas Inferiores de Repositorios */}
        <Reveal delay={180}>
          <div className="mt-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-lime/40" />
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-lime">
                Colección Completa de Repositorios
              </h4>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProjects.map((proj, idx) => (
                <div
                  key={proj.id}
                  onClick={() => {
                    setSelectedId(proj.id);
                    setApiResult(null);
                  }}
                  className={`group cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                    activeProject.id === proj.id
                      ? 'border-lime/40 bg-lime/[0.08] shadow-glow-lime'
                      : 'border-white/[0.06] bg-surface/50 hover:border-white/15 hover:bg-surface/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-dim">0{idx + 1}</span>
                    <ArrowUpRight
                      size={16}
                      className={`transition-colors ${
                        activeProject.id === proj.id ? 'text-lime' : 'text-muted group-hover:text-ink'
                      }`}
                    />
                  </div>
                  <h5 className="mt-3 font-bold text-ink text-sm group-hover:text-lime transition-colors">
                    {proj.nombre}
                  </h5>
                  <p className="mt-1 font-mono text-[10px] text-cyan">{proj.categoria}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

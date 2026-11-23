import { useEffect, useState } from 'react';
import { Github, Menu, X } from 'lucide-react';
import { navItems } from '../data/navigation';
import { profile } from '../data/portfolioData';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.1, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'pt-2 sm:pt-3' : 'pt-4 sm:pt-5'}`}>
      <nav
        aria-label="Navegación principal"
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6 transition-all duration-500 ${
          scrolled
            ? 'border border-white/[0.06] bg-abyss/80 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.9)] backdrop-blur-2xl'
            : 'border border-transparent bg-transparent'
        }`}
        style={{ marginLeft: '1rem', marginRight: '1rem' }}
      >
        {/* Logo */}
        <a href="#inicio" className="group flex items-center gap-3" aria-label="Ir al inicio">
          <span className="relative grid h-10 w-10 place-items-center rounded-xl font-mono text-xs font-bold text-void">
            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-lime via-cyan to-violet" />
            <span className="relative">JAC</span>
          </span>
          <span className="hidden text-sm font-bold tracking-tight text-ink sm:block">
            Jorman<span className="text-lime">.dev</span>
          </span>
        </a>

        {/* Enlaces Desktop */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'page' : undefined}
              className={`relative rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-300 ${
                active === item.id
                  ? 'text-lime'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {active === item.id && (
                <span className="absolute inset-0 rounded-lg bg-lime/[0.08]" />
              )}
              <span className="relative">{item.label}</span>
            </a>
          ))}
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2.5">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir GitHub en una pestaña nueva"
            className="hidden h-10 w-10 place-items-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-muted transition-all hover:border-lime/30 hover:text-lime sm:grid"
          >
            <Github size={17} aria-hidden="true" />
          </a>
          <a href="#contacto" className="btn-primary hidden !px-5 !py-2.5 !text-xs sm:inline-flex">
            Hablemos
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.06] text-ink transition-colors hover:border-lime/30 lg:hidden"
          >
            {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Menú Móvil */}
      {open && (
        <div
          id="menu-movil"
          className="mx-4 mt-2 rounded-2xl border border-white/[0.06] bg-abyss/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden"
        >
          <div className="grid gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3.5 text-sm font-medium transition-colors ${
                  active === item.id
                    ? 'bg-lime/[0.08] text-lime'
                    : 'text-subtle hover:bg-white/[0.04] hover:text-ink'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-4">
            <a href="#contacto" onClick={() => setOpen(false)} className="btn-primary !py-3">
              Contacto
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-ghost !py-3"
            >
              <Github size={16} aria-hidden="true" /> GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

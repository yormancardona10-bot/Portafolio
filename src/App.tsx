import { ThreeBackground } from './components/3d/ThreeBackground';
import { TopHUD } from './components/Navigation/TopHUD';
import { CommandDock } from './components/Navigation/CommandDock';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-void text-subtle selection:bg-lime/30 selection:text-ink">
      <a href="#inicio" className="skip-link">
        Saltar al contenido principal
      </a>

      {/* Fondo 3D Interactivo con Three.js */}
      <ThreeBackground />

      {/* Barra de Telemetría Superior */}
      <TopHUD />

      {/* Dock de Navegación Flotante Futurista */}
      <CommandDock />

      {/* Contenido Principal */}
      <main className="relative z-10">
        <Hero />
        <div className="line-gradient mx-auto max-w-7xl" />
        <About />
        <div className="line-gradient mx-auto max-w-7xl" />
        <Skills />
        <div className="line-gradient mx-auto max-w-7xl" />
        <Projects />
        <div className="line-gradient mx-auto max-w-7xl" />
        <Experience />
        <div className="line-gradient mx-auto max-w-7xl" />
        <Education />
        <div className="line-gradient mx-auto max-w-7xl" />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

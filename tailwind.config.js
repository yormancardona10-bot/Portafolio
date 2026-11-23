/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // === Nueva paleta: Midnight Abyss + Electric Accents ===
        void: '#06080D',          // Fondo absoluto — negro profundo con tinte azul
        abyss: '#0A0E18',         // Superficie base
        surface: '#0F1422',       // Tarjetas / paneles
        'surface-alt': '#141A2B', // Superficie elevada
        border: 'rgba(255,255,255,0.07)',
        // Acentos vibrantes
        lime: '#A3E635',          // Lima eléctrica — acento principal
        'lime-soft': '#BEF264',
        cyan: '#22D3EE',          // Cyan aurora — acento secundario
        violet: '#A78BFA',        // Violeta suave — acento terciario
        rose: '#FB7185',          // Rosa cálido — para alertas y CTAs
        // Texto
        ink: '#F1F5F9',           // Texto principal
        subtle: '#CBD5E1',        // Texto secundario
        muted: '#64748B',         // Texto terciario
        dim: '#334155',           // Texto apagado
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      boxShadow: {
        'glow-lime': '0 0 40px -12px rgba(163, 230, 53, 0.4)',
        'glow-cyan': '0 0 40px -12px rgba(34, 211, 238, 0.4)',
        'glow-violet': '0 0 40px -12px rgba(167, 139, 250, 0.4)',
        'card': '0 1px 0 rgba(255,255,255,0.03), 0 25px 60px -32px rgba(0,0,0,0.9)',
        'card-hover': '0 0 0 1px rgba(163, 230, 53, 0.15), 0 25px 60px -20px rgba(163, 230, 53, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': `linear-gradient(rgba(148, 163, 184, 0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(148, 163, 184, 0.03) 1px, transparent 1px)`,
        'noise': `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.75)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          to: { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'border-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.5s ease both',
        'slide-in-right': 'slide-in-right 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        blink: 'blink 1.1s step-end infinite',
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        marquee: 'marquee 34s linear infinite',
        'spin-slow': 'spin-slow 25s linear infinite',
        glow: 'glow 3s ease-in-out infinite',
        'border-flow': 'border-flow 3s ease infinite',
      },
    },
  },
  plugins: [],
};

export type SkillCategoryId =
  | 'lenguajes'
  | 'frontend'
  | 'backend'
  | 'datos'
  | 'herramientas'
  | 'practicas';

export interface SkillCategory {
  id: SkillCategoryId;
  label: string;
  skills: string[];
}

export type ProjectCategory = 'Full Stack' | 'Móvil' | 'Frontend';

export interface Project {
  id: string;
  nombre: string;
  categoria: ProjectCategory;
  ruta: string;
  descripcion: string;
  aportes: string[];
  stack: string[];
  repositorio: string;
}

export interface EducationItem {
  titulo: string;
  institucion: string;
  estado: string;
  detalle: string;
  etiquetas: string[];
  tipo: 'formacion' | 'idioma' | 'certificacion' | 'secundaria';
}

export const profile = {
  nombre: 'Jorman Alexander Cardona Gómez',
  rol: 'Desarrollador de Software',
  especialidad: 'Full Stack — Frontend & Backend',
  ubicacion: 'Itagüí, Antioquia, Colombia',
  disponibilidad: 'Disponible · Modalidad Híbrida y Contratos Freelance',
  pitch:
    'Desarrollador de Software con enfoque principal en tecnologías Frontend y sólidos conocimientos en Backend. Destaco por mi creatividad para resolver problemas visuales y lógicos, mi capacidad de liderazgo en proyectos y mi habilidad para el trabajo colaborativo en equipo. Orientado a construir aplicaciones web dinámicas e intuitivas, abierto a oportunidades híbridas y contratos independientes (freelance).',
  github: 'https://github.com/yormancardona10-bot',
  email: 'yormancardona10@gmail.com',
  whatsapp: 'https://wa.me/573103809367',
  telefono: '+57 310 380 9367',
  idiomas: [
    { nombre: 'Español', nivel: 'Nativo' },
    { nombre: 'Inglés', nivel: 'En curso — ICN Idiomas' },
  ],
};

export const about = {
  historia:
    'Mi pasión por la tecnología nació a temprana edad gracias a mi cercanía con las computadoras y los videojuegos. Esa curiosidad inicial se transformó en la motivación para entender la lógica detrás del software y formarme profesionalmente como desarrollador.',
  filosofia:
    'Abordo cada proyecto bajo la firme creencia de que en el desarrollo de software todo reto técnico tiene solución. Destaco por mi enfoque analítico, resiliencia y determinación frente a problemas complejos.',
  principios: [
    'Enfoque analítico',
    'Resiliencia',
    'Determinación',
    'Trabajo colaborativo',
    'Liderazgo',
  ],
};

export const skillCategories: SkillCategory[] = [
  {
    id: 'lenguajes',
    label: 'Lenguajes',
    skills: ['JavaScript', 'Python', 'HTML5', 'CSS3', 'SQL', 'Dart'],
  },
  {
    id: 'frontend',
    label: 'Frontend y Móvil',
    skills: [
      'CSS Flexbox/Grid',
      'Responsive Design',
      'Bootstrap',
      'Flutter',
      'React Native (en aprendizaje)',
    ],
  },
  {
    id: 'backend',
    label: 'Backend y APIs',
    skills: ['Node.js', 'Express.js', 'Django', 'Django REST Framework', 'APIs REST'],
  },
  {
    id: 'datos',
    label: 'Bases de Datos',
    skills: ['MySQL', 'MongoDB', 'MongoDB Atlas'],
  },
  {
    id: 'herramientas',
    label: 'Herramientas e IA',
    skills: [
      'Git',
      'GitHub',
      'VS Code',
      'Postman',
      'Figma',
      'XAMPP',
      'Render',
      'Docker (en aprendizaje)',
      'OpenCode',
      'Stitch',
      'ChatGPT',
      'Gemini',
      'NotebookLM',
    ],
  },
  {
    id: 'practicas',
    label: 'Prácticas Técnicas',
    skills: [
      'Pruebas automatizadas (Mocha, Supertest, Django Testing)',
      'Autenticación/JWT',
      'Variables de entorno (.env)',
      'Integración de mailing y backups',
    ],
  },
];

export const softSkills = {
  metodologias: ['Scrum', 'Trello', 'Tableros de GitHub Projects'],
  blandas: [
    'Trabajo en equipo',
    'Liderazgo',
    'Creatividad en resolución de problemas',
    'Comunicación asertiva',
    'Aprendizaje continuo',
    'Pensamiento crítico',
    'Atención al detalle',
  ],
  buenasPracticas: [
    'Control de versiones Git/GitHub',
    'Documentación técnica de código y APIs',
    'Desarrollo orientado a pruebas',
  ],
};

export const projects: Project[] = [
  {
    id: 'intshot',
    nombre: 'INTSHOT',
    categoria: 'Full Stack',
    ruta: 'jmorenoyepes-ai/INTSHOT-django',
    descripcion:
      'Plataforma web integral para el sector textil enfocada en la gestión de productos, inventarios, proveedores, ventas, compras y usuarios, incorporando un catálogo interactivo para clientes.',
    aportes: [
      'Desarrollo de módulos principales del sistema web.',
      'Modelado relacional en MySQL y construcción de APIs REST.',
      'Sistema de autenticación y módulo de compras/ventas.',
      'Pruebas de software para validar el comportamiento de los módulos.',
    ],
    stack: [
      'Python',
      'Django',
      'Django REST Framework',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Bootstrap',
      'MySQL',
    ],
    repositorio: 'https://github.com/jmorenoyepes-ai/INTSHOT-django',
  },
  {
    id: 'tienda-virtual',
    nombre: 'Tienda Virtual',
    categoria: 'Full Stack',
    ruta: 'yormancardona10-bot/tienda-virtual',
    descripcion:
      'Aplicación web de comercio electrónico que permite la administración centralizada de catálogo y productos, autenticación de usuarios y navegación fluida para clientes.',
    aportes: [
      'Arquitectura de vistas dinámicas renderizadas en servidor con EJS.',
      'Autenticación de usuarios y administración centralizada del catálogo.',
      'Persistencia NoSQL con Mongoose.',
      'Navegación fluida para clientes.',
    ],
    stack: ['JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'EJS', 'HTML5', 'CSS3'],
    repositorio: 'https://github.com/yormancardona10-bot/tienda-virtual',
  },
  {
    id: 'intshot-flutter',
    nombre: 'INTSHOT Flutter',
    categoria: 'Móvil',
    ruta: 'yormancardona10-bot/INTSHOT-FLUTTER',
    descripcion:
      'Aplicación móvil desarrollada en Flutter que extiende el ecosistema de INTSHOT, permitiendo explorar el catálogo, gestionar el carrito de compras y realizar pedidos en tiempo real.',
    aportes: [
      'Desarrollo de interfaz móvil nativa multiplataforma.',
      'Consumo e integración con API REST en Django.',
      'Autenticación móvil y gestión del carrito de compras.',
      'Flujo de pedidos en tiempo real.',
    ],
    stack: ['Flutter', 'Dart', 'APIs REST', 'Django (Backend)'],
    repositorio: 'https://github.com/yormancardona10-bot/INTSHOT-FLUTTER',
  },
  {
    id: 'landing-page',
    nombre: 'Landing Page',
    categoria: 'Frontend',
    ruta: 'yormancardona10-bot/landing-page',
    descripcion:
      'Aplicación web enfocada en la maquetación visual estructurada, diseño adaptable (Responsive Design) y presentación clara de información.',
    aportes: [
      'Maquetación semántica y diseño adaptable multi-dispositivo.',
      'Implementación cuidada de la interfaz de usuario.',
      'Presentación clara de información.',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    repositorio: 'https://github.com/yormancardona10-bot/landing-page',
  },
];

export const experience = {
  entidad: 'Tecnoparque (SENA)',
  cargo: 'Aprendiz en Etapa Práctica — Desarrollador Full Stack',
  tecnologias: ['Docker', 'React Native', 'Node.js', 'Python', 'APIs REST', 'Git/GitHub'],
  responsabilidades: [
    'Desarrollo e implementación de nuevos módulos funcionales para soluciones web y móviles.',
    'Ejecución de pruebas de software para asegurar la estabilidad del sistema.',
    'Creación de documentación técnica de código y endpoints.',
    'Uso práctico de Docker para contenerización y React Native para aplicaciones móviles.',
  ],
};

export const education: EducationItem[] = [
  {
    titulo: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    institucion: 'SENA — Servicio Nacional de Aprendizaje',
    estado: 'En etapa práctica',
    detalle: 'Formación profesional en análisis y desarrollo de software.',
    etiquetas: ['Análisis de software', 'Desarrollo de software'],
    tipo: 'formacion',
  },
  {
    titulo: 'Inglés',
    institucion: 'ICN Idiomas',
    estado: 'En curso',
    detalle: 'Formación en idioma inglés.',
    etiquetas: ['Inglés'],
    tipo: 'idioma',
  },
  {
    titulo: 'Certificación en Bases de Datos MySQL',
    institucion: 'Certificación',
    estado: 'Certificado',
    detalle: 'Certificación en bases de datos MySQL.',
    etiquetas: ['MySQL'],
    tipo: 'certificacion',
  },
  {
    titulo: 'Certificación en Derechos Fundamentales en el Trabajo',
    institucion: 'Certificación',
    estado: 'Certificado',
    detalle: 'Certificación en derechos fundamentales en el trabajo.',
    etiquetas: ['Derechos Fundamentales en el Trabajo'],
    tipo: 'certificacion',
  },
  {
    titulo: 'Bachiller Académico',
    institucion: 'Institución Educativa Simón Bolívar (Itagüí, Antioquia)',
    estado: 'Graduado',
    detalle: 'Educación secundaria.',
    etiquetas: ['Bachiller Académico'],
    tipo: 'secundaria',
  },
];

export const contacto = {
  cta: '¿Tienes un proyecto en mente o buscas un desarrollador para tu equipo? Abierto a nuevas oportunidades laborales y proyectos freelance. ¡Hablemos!',
  mensajeWhatsApp:
    'Hola Jorman, vi tu portafolio y me gustaría hablar sobre una oportunidad profesional o un proyecto freelance.',
};

export const whatsappUrl = `${profile.whatsapp}?text=${encodeURIComponent(contacto.mensajeWhatsApp)}`;

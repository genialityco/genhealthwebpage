export const site = {
  name: 'Gen.Health',
  legalName: 'Geniality',
  tagline: 'El conocimiento médico de su asociación, vivo y al alcance de cada profesional.',
  description:
    'Gen.Health es la línea de salud de Geniality. Acompañamos a asociaciones médicas, colegios profesionales, industria farmacéutica, clínicas e IPS con congresos, educación médica continua, agentes de IA con aval científico y comunicación en salud.',
  locale: 'es_CO',
  lang: 'es-CO',
  country: 'Colombia',
  city: 'Bogotá',
  contact: {
    person: 'Lina Paola Bonilla Mahecha',
    role: 'Directora de Estrategia del Conocimiento',
    email: 'linapaola.bonilla@geniality.com.co',
    phone: '+57 310 276 7898',
    phoneHref: 'tel:+573102767898',
    whatsapp: 'https://wa.me/573102767898?text=Hola%2C%20quiero%20conocer%20Gen.Health',
  },
};

export const nav = [
  { label: 'Congresos', href: '/congresos-y-eventos/' },
  { label: 'Gen.oma', href: '/gen-oma/' },
  { label: 'Educación médica', href: '/educacion-medica-continua/' },
  { label: 'Práctica clínica', href: '/practica-clinica/' },
  { label: 'Comunicación', href: '/comunicacion-y-audiencia-medica/' },
  { label: 'Casos', href: '/casos/' },
];

/** Resultados 2026 en plataformas Gen.Live y Gen.Campus (1 ene – 2 oct 2026). */
export const results2026 = {
  source: 'Plataformas Gen.Live y Gen.Campus, 1 de enero al 2 de octubre de 2026',
  stats: [
    { value: 56, label: 'eventos científicos en vivo' },
    { value: 31292, label: 'asistencias en vivo' },
    { value: 68, suffix: ' %', label: 'de los inscritos se conecta en directo' },
    { value: 11902, label: 'profesionales únicos' },
    { value: 40, label: 'países' },
    { value: 3150, label: 'membresías en Gen.Campus' },
  ],
};

export const associations = [
  'ACE · Endocrinología',
  'ACHO · Hematología y Oncología',
  'ACN · Neurología',
  'COLFI · Fisioterapia',
  'ASCOFAME',
  'ASCOFI',
  'SOCOMEG',
  'Colegio Nacional de Químicos Farmacéuticos',
  'ACIS · Integración Sensorial',
  'Universidad de Antioquia',
];

/** Laboratorios que han participado en proyectos y espacios educativos (no avalan a Gen.Health). */
export const industry = [
  'AstraZeneca', 'Pfizer', 'Lilly', 'Sanofi', 'Novartis', 'Bayer',
  'Boehringer Ingelheim', 'Ipsen', 'Procaps', 'Amarey', 'Casa Científica', 'HumanX',
];

export const principles = [
  { title: 'Ustedes deciden', text: 'Los temas, los ponentes y el contenido son de la asociación; nosotros nos encargamos del resto.' },
  { title: 'Patrocinio a la vista', text: 'La industria apoya de forma declarada y recibe reportes generales, nunca datos personales.' },
  { title: 'Datos con autorización', text: 'Cada médico autoriza el uso de sus datos, como lo pide la Ley 1581 de 2012.' },
  { title: 'La IA como apoyo', text: 'Como pide la Resolución 1644 de 2026, la IA nunca sustituye el criterio clínico.' },
  { title: 'Su conocimiento es suyo', text: 'No se comparte ni se mezcla con el de otras asociaciones.' },
];

export const team = [
  'Comunicadoras en salud que a su vez son profesionales de la salud',
  'Creativos y productores que cuidan cada detalle',
  'Analistas que convierten cada evento en datos útiles',
  'Ingenieros que desarrollan agentes de IA a su medida',
];

export const startHere = [
  { need: 'Que sus afiliados se actualicen todo el año', answer: 'Gen.Live, Gen.Campus y Gen.Cert', href: '/educacion-medica-continua/' },
  { need: 'Que más médicos terminen los cursos que ya ofrece y retengan lo aprendido', answer: 'Gen.ON Adherencia Educación', href: '/educacion-medica-continua/gen-on-adherencia-educacion/' },
  { need: 'Que el conocimiento de su asociación esté disponible, con su aval', answer: 'Gen.oma', href: '/gen-oma/' },
  { need: 'Convertir su base médica en eventos en vivo que la industria quiera patrocinar', answer: 'Gen.Live y Medinars LATAM', href: '/educacion-medica-continua/gen-live/' },
  { need: 'Llenar su congreso, comercializar patrocinios y lograr free press', answer: 'Arquitectura de congresos y Gen.Pósters', href: '/congresos-y-eventos/arquitectura-y-comercializacion/' },
  { need: 'Que su institución siga presente y vigente', answer: 'Comunicación científica digital', href: '/comunicacion-y-audiencia-medica/comunicacion-cientifica/' },
  { need: 'Patrocinar educación médica con aval científico y medir cuánto se aprendió', answer: 'Medinars LATAM y Gen.ON', href: '/educacion-medica-continua/medinars-latam/' },
  { need: 'Descongestionar listas de espera o cumplir la Resolución 1644 de telemedicina', answer: 'Gen.CareFlow y Gen.Campus', href: '/practica-clinica/gen-careflow/' },
];

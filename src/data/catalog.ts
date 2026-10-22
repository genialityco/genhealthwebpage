import type { ImageMetadata } from 'astro';
import salaPosters from '@/assets/img/sala-posters-acho.jpg';
import salaPostersV1 from '@/assets/img/sala-posters-vertical-1.jpg';
import salaPostersV2 from '@/assets/img/sala-posters-vertical-2.jpg';
import postersPantalla from '@/assets/img/gen-posters-pantalla.jpg';
import totem1 from '@/assets/img/gen-posters-totem-1.jpg';
import totem2 from '@/assets/img/gen-posters-totem-2.jpg';
import totem3 from '@/assets/img/gen-posters-totem-3.jpg';
import esmoversePantalla from '@/assets/img/esmoverse-pantalla.jpg';
import esmoverseApp from '@/assets/img/esmoverse-app.jpg';
import pepper from '@/assets/img/pepper-robot.jpg';
import pepperAnfitrion from '@/assets/img/pepper-anfitrion.jpg';
import desafiando from '@/assets/img/desafiando-el-cancer.jpg';
import pinkPulse from '@/assets/img/pink-pulse.jpg';
import lounge from '@/assets/img/lounge-connect-zone.jpg';
import corazon from '@/assets/img/corazon-particulas.jpg';
import adn from '@/assets/img/adn-molecula.jpg';
import molecula from '@/assets/img/molecula.jpg';
import campus from '@/assets/img/gen-campus-plataforma.jpg';
import colfi1 from '@/assets/img/colfi-campana-1.jpg';
import colfi2 from '@/assets/img/colfi-campana-2.jpg';
import colfi3 from '@/assets/img/colfi-campana-3.jpg';
import colfi4 from '@/assets/img/colfi-campana-4.jpg';
import colfi7 from '@/assets/img/colfi-campana-7.jpg';

export type FigureKind =
  | 'phyllotaxis' | 'spiral' | 'harmonograph' | 'lissajous' | 'orbit'
  | 'flower' | 'cell' | 'wave' | 'vesica' | 'rose';

export type Status = 'Disponible' | 'Listo y operando' | 'En desarrollo' | 'Nuevo modelo' | 'Realizado';

export interface Pic { src: ImageMetadata; alt: string; caption?: string }
export interface Stat { value: number; label: string; prefix?: string; suffix?: string; decimals?: number }
export interface Item { title: string; text: string; status?: Status; pic?: Pic }
export interface Faq { q: string; a: string }

export interface Product {
  slug: string;
  pillar: PillarSlug;
  name: string;
  kicker: string;
  /** H1 de la landing. */
  title: string;
  /** Meta description: 140–160 caracteres. */
  description: string;
  lead: string;
  status: Status;
  figure: FigureKind;
  audiences: string[];
  features: Item[];
  steps?: Item[];
  stats?: Stat[];
  statsSource?: string;
  gallery?: Pic[];
  compare?: { head: [string, string, string]; rows: [string, string, string][] };
  quote?: string;
  faqs: Faq[];
  keywords: string[];
}

export type PillarSlug =
  | 'congresos-y-eventos' | 'gen-oma' | 'educacion-medica-continua'
  | 'practica-clinica' | 'comunicacion-y-audiencia-medica';

export interface Pillar {
  slug: PillarSlug;
  index: string;
  name: string;
  verb: string;
  title: string;
  description: string;
  lead: string;
  figure: FigureKind;
  hero?: Pic;
  keywords: string[];
}

export const pillars: Pillar[] = [
  {
    slug: 'congresos-y-eventos',
    index: '01',
    name: 'Congresos y eventos',
    verb: 'Donde se comparte',
    title: 'Que su congreso médico se llene, se financie y se recuerde',
    description:
      'Arquitectura y comercialización de congresos médicos, convocatoria e inscripciones, free press, Gen.Pósters, Gen.Networking y experiencias interactivas.',
    lead:
      'Del primer boceto a la última sesión, un solo equipo de salud y tecnología se encarga de llenar, financiar y hacer visible su congreso científico.',
    figure: 'phyllotaxis',
    hero: { src: salaPosters, alt: 'Asistentes recorriendo la sala de pósters digitales del congreso de ACHO', caption: 'Sala de pósters digitales · ACHO 2024' },
    keywords: ['congresos médicos', 'organización de congresos científicos', 'patrocinio de congresos', 'pósters digitales'],
  },
  {
    slug: 'gen-oma',
    index: '02',
    name: 'Gen.oma',
    verb: 'Donde se guarda',
    title: 'Décadas de conocimiento de su especialidad, al alcance de cada médico',
    description:
      'Gen.oma: agentes de IA con RAG que responden solo con las guías, consensos e investigación de su asociación médica, con fuente, año y página.',
    lead:
      'Sus especialistas han construido guías, consensos e investigación durante años. Gen.oma reúne ese conocimiento y la experiencia de sus maestros, y lo pone a disposición de quien su asociación decida, con su aval.',
    figure: 'cell',
    keywords: ['IA para asociaciones médicas', 'RAG medicina', 'agente de IA guías clínicas', 'biblioteca médica digital'],
  },
  {
    slug: 'educacion-medica-continua',
    index: '03',
    name: 'Educación médica continua',
    verb: 'Donde se aprende',
    title: 'Que sus afiliados se actualicen todo el año',
    description:
      'Educación médica continua con Gen.Live, Gen.Campus, Gen.Cert, Gen.ON y Medinars LATAM: eventos en vivo, cursos certificables y medición del aprendizaje.',
    lead:
      'Eventos científicos en vivo sobre infraestructura dedicada, cursos certificables con la marca de su organización, certificados al instante y medición real de lo que se retuvo.',
    figure: 'harmonograph',
    hero: { src: campus, alt: 'Plataforma Gen.Campus de EndoCampus vista en tres pantallas', caption: 'EndoCampus sobre Gen.Campus · ACE' },
    keywords: ['educación médica continua', 'EMC Colombia', 'webinars médicos', 'cursos certificables médicos', 'Resolución 1644 de 2026'],
  },
  {
    slug: 'practica-clinica',
    index: '04',
    name: 'Práctica clínica',
    verb: 'Donde se aplica',
    title: 'Lo que construimos con asociaciones aliadas para la consulta',
    description:
      'Gen.CareFlow, teleexperticia con IA, y Gen.ON Adherencia Pacientes, acompañamiento entre consultas por WhatsApp. La IA apoya; el médico decide.',
    lead:
      'Herramientas para clínicas, IPS y programas de soporte a pacientes que llevan el conocimiento de la asociación al momento de la consulta. Siempre con el especialista en el centro.',
    figure: 'vesica',
    keywords: ['teleexperticia', 'adherencia al tratamiento', 'programas de soporte a pacientes', 'telemedicina IPS'],
  },
  {
    slug: 'comunicacion-y-audiencia-medica',
    index: '05',
    name: 'Comunicación y audiencia médica',
    verb: 'En todo el camino',
    title: 'Que su institución siga presente y vigente',
    description:
      'Comunicación científica y audiencia médica: estrategia editorial, redes, web, free press, campañas y bases de datos médicas autorizadas.',
    lead:
      'Estrategia editorial, redes, web, campañas y free press hechas por comunicadoras que son profesionales de la salud, con audiencias médicas autorizadas y medidas.',
    figure: 'wave',
    hero: { src: colfi1, alt: 'Sistema de identidad visual digital del Colegio Colombiano de Fisioterapeutas', caption: 'Sistema visual digital · COLFI 2026' },
    keywords: ['comunicación en salud', 'marketing para asociaciones médicas', 'free press salud', 'audiencia médica'],
  },
];

export const products: Product[] = [
  // ───────────── 01 · Congresos y eventos
  {
    slug: 'arquitectura-y-comercializacion',
    pillar: 'congresos-y-eventos',
    name: 'Arquitectura y comercialización de congresos',
    kicker: 'Congresos médicos',
    title: 'Congresos médicos con estructura de valor, patrocinio ético y metas que se superan',
    description:
      'Diseñamos el modelo académico, comercial y experiencial de su congreso médico: portal, app, patrocinios con propósito, convocatoria multicanal y free press.',
    lead:
      'Durante años los congresos en salud han vendido espacio, no impacto. Diseñamos congresos como plataformas vivas de conexión, aprendizaje y retorno medible para la asociación y sus patrocinadores.',
    status: 'Disponible',
    figure: 'phyllotaxis',
    audiences: ['Asociaciones médicas y colegios', 'Comités organizadores', 'Industria farmacéutica patrocinadora'],
    features: [
      { title: 'Modelo académico, comercial y experiencial', text: 'Concepto, recorrido del asistente (físico, digital o híbrido), portal web y app del congreso.' },
      { title: 'Patrocinio con propósito', text: 'Niveles de patrocinio experiencial, desayunos comerciales y agendas 1:1 con Gen.Networking, siempre declarados.' },
      { title: 'Convocatoria médica e inscripciones', text: 'Campañas multicanal para superar la meta de asistentes y conocer a cada inscrito por especialidad, ciudad e interés.' },
      { title: 'Free press y medios', text: 'Ruedas de prensa y portavoces en radio, televisión y prensa digital, nacional y regional.' },
      { title: 'Ecosistema de métricas', text: 'Leads, interacción y retorno medible para la asociación y para cada patrocinador.' },
    ],
    stats: [
      { value: 111, suffix: ' %', label: 'de la meta comercial con la industria · ACN' },
      { value: 140, suffix: ' %', label: 'de la meta de inscritos · ACIS (560 frente a 400)' },
      { value: 534, label: 'asistentes de 70 ciudades, 100 % perfilados · CNQF' },
      { value: 11, label: 'impactos de free press en medios nacionales · ASCOFAME' },
    ],
    statsSource: 'Informes de resultados de cada proyecto (ACN, ACIS, CNQF y ASCOFAME)',
    gallery: [
      { src: salaPosters, alt: 'Sala de pósters digitales con asistentes en el congreso de ACHO', caption: 'ACHO 2024' },
      { src: lounge, alt: 'Lounge Connect Zone con asistentes trabajando en mesas durante el ESMO Summit', caption: 'Lounge Connect Zone · referencia de diseño' },
    ],
    quote: 'Vender conexiones, no metros. Crear significado, no alquilar espacios. Ofrecer impacto medible, no visibilidad.',
    faqs: [
      { q: '¿Qué incluye la arquitectura de un congreso médico?', a: 'El diseño del modelo académico, comercial y experiencial: concepto, portal y app, estructura de patrocinios, recorrido del asistente, convocatoria, free press y el sistema de métricas para la asociación y los patrocinadores.' },
      { q: '¿Cómo se comercializan los patrocinios sin afectar la neutralidad científica?', a: 'El patrocinio es declarado y experiencial: la industria apoya espacios, experiencias y agendas de networking, y recibe reportes agregados, nunca datos personales. Los contenidos y ponentes los decide la asociación.' },
      { q: '¿Trabajan congresos presenciales, virtuales e híbridos?', a: 'Sí. Diseñamos el recorrido del asistente para formato físico, digital o híbrido, con inscripciones, certificados y analítica en una sola plataforma.' },
    ],
    keywords: ['organización de congresos médicos', 'comercialización de congresos', 'patrocinio farmacéutico ético', 'inscripciones congreso médico'],
  },
  {
    slug: 'gen-posters',
    pillar: 'congresos-y-eventos',
    name: 'Gen.Pósters',
    kicker: 'Exhibición académica interactiva',
    title: 'La investigación médica merece ser vista, votada y recordada',
    description:
      'Gen.Pósters digitaliza la exhibición de pósters científicos: web, app y tótems táctiles con buscador de IA, videopósters y votación en tiempo real.',
    lead:
      'Una plataforma multicanal (web, app y tótems) que digitaliza, organiza y gamifica la exhibición de pósters científicos en congresos médicos, para que los investigadores conversen sobre su propio trabajo.',
    status: 'Disponible',
    figure: 'flower',
    audiences: ['Comités científicos de congresos', 'Investigadores y residentes', 'Asociaciones médicas'],
    features: [
      { title: 'Carga y curaduría', text: 'Recepción, curaduría y exhibición digital de pósters académicos y videopósters.' },
      { title: 'Buscador con IA', text: 'Búsqueda por tema, autor, institución o palabra clave, en el tótem o en el celular.' },
      { title: 'Votación y ranking en vivo', text: 'Métricas para premiación y reconocimiento científico, en tiempo real.' },
      { title: 'Tótems táctiles', text: 'Compatibles con web app, tótems táctiles y apps Android e iOS, con zoom y categorías.' },
      { title: 'Analítica para el comité', text: 'Módulo de administración con visualizaciones y participación por póster.' },
    ],
    gallery: [
      { src: salaPostersV1, alt: 'Asistentes consultando un tótem de pósters digitales', caption: 'Tótems con buscador y votación' },
      { src: totem1, alt: 'Dos asistentes frente a un póster digital en un tótem táctil' },
      { src: postersPantalla, alt: 'Pantalla de la app de pósters del congreso nacional de investigación', caption: 'App de pósters · congreso nacional' },
      { src: salaPostersV2, alt: 'Pasillo de tótems de pósters digitales en el congreso de ACHO' },
      { src: totem2, alt: 'Investigador presentando su póster en un tótem digital' },
      { src: totem3, alt: 'Grupo de asistentes conversando frente a los tótems de pósters' },
    ],
    faqs: [
      { q: '¿Qué es un póster digital en un congreso médico?', a: 'Es la versión digital del póster científico, exhibida en tótems táctiles, web y app. Permite buscar, ampliar, votar y conversar con los autores, y deja métricas de visualización para el comité.' },
      { q: '¿Se integra con los certificados del congreso?', a: 'Sí. Gen.Pósters se integra con Gen.Cert para emitir certificados de póster, ponencia y participación, y con Gen.Campus para conservar los trabajos después del evento.' },
    ],
    keywords: ['pósters digitales congreso', 'e-posters médicos', 'tótems interactivos congreso', 'votación de pósters'],
  },
  {
    slug: 'gen-networking',
    pillar: 'congresos-y-eventos',
    name: 'Gen.Networking',
    kicker: 'Networking inteligente',
    title: 'Conectar a los médicos correctos en el momento preciso',
    description:
      'Gen.Networking sugiere contactos con IA por especialidad e interés, agenda reuniones 1:1 por WhatsApp y proyecta en vivo las conexiones del congreso.',
    lead:
      'Pasamos de conversaciones casuales a conexiones estratégicas: perfiles profesionales completos, sugerencias con IA, reuniones agendadas y un mapa vivo de relaciones científicas en la pantalla principal.',
    status: 'Disponible',
    figure: 'orbit',
    audiences: ['Asistentes a congresos', 'Industria con agendas 1:1', 'Comités organizadores'],
    features: [
      { title: 'Match inteligente', text: 'Sugiere a quién conocer según especialidad, cargo, institución, país e intereses.' },
      { title: 'Agenda por WhatsApp', text: 'Notificaciones automáticas para conversar antes del evento y llegar a encuentros más productivos.' },
      { title: 'Molécula en vivo', text: 'En la pantalla principal, cada nueva conexión hace crecer una molécula digital: la colaboración hecha visible.' },
      { title: 'Métricas de afinidad', text: 'Interacción entre pares en datos anónimos y agregados para la asociación y los patrocinadores.' },
    ],
    gallery: [
      { src: esmoversePantalla, alt: 'Dos asistentes frente a una pantalla gigante con una molécula digital de conexiones', caption: 'ESMOverse · diseñado para ESMO Summit Latin America 2026' },
      { src: esmoverseApp, alt: 'Celular con la app de networking ESMOverse', caption: 'App de networking' },
      { src: molecula, alt: 'Molécula tridimensional que representa las conexiones entre profesionales' },
    ],
    faqs: [
      { q: '¿Qué datos ven los patrocinadores?', a: 'Solo métricas anónimas y agregadas de conexión e interacción. Los datos personales quedan con la asociación y con la autorización de cada médico.' },
    ],
    keywords: ['networking congresos médicos', 'app de networking eventos', 'matchmaking científico'],
  },
  {
    slug: 'experiencias-interactivas',
    pillar: 'congresos-y-eventos',
    name: 'Experiencias interactivas',
    kicker: 'Tecnología experiencial',
    title: 'Experiencias científicas que se viven y se recuerdan',
    description:
      'Experiencias interactivas para congresos médicos: juegos colaborativos masivos, robótica social, experiencias biométricas y arte interactivo con IA.',
    lead:
      'No hacemos stands: creamos interacción científica con propósito. Cada experiencia se diseña para emocionar, involucrar y medir. No son shows: son memorias científicas compartidas.',
    status: 'Disponible',
    figure: 'rose',
    audiences: ['Congresos y simposios', 'Patrocinadores que buscan presencia educativa', 'Lanzamientos de programas'],
    features: [
      { title: 'Desafiando el Cáncer', text: 'Un pulmón virtual en el escenario principal: desde su celular, los asistentes resolvieron juntos el reto y fueron desintegrando el cáncer de pulmón de células pequeñas. 8.º Simposio de Cáncer de Pulmón de ACHO, con Conquer Cancer – ASCO Foundation.', status: 'Realizado', pic: { src: desafiando, alt: 'Pulmón virtual con dos celulares y un código QR, experiencia Desafiando el Cáncer' } },
      { title: 'Pepper, robótica social', text: 'Un robot anfitrión que recibe a los asistentes, responde preguntas y se toma selfies, con guiones del evento y mensajes educativos del patrocinador.', status: 'Disponible', pic: { src: pepperAnfitrion, alt: 'Robot social Pepper con tableta, anfitrión de un congreso' } },
      { title: 'ESMOverse', text: 'Networking con IA: sugiere a quién conocer, agenda por WhatsApp y, en la pantalla principal, cada nueva conexión hace crecer una molécula.', status: 'Disponible', pic: { src: adn, alt: 'Hélice de ADN y moléculas en un entorno digital' } },
      { title: 'The Pink Pulse', text: 'Instalación inmersiva: el pulso real del visitante se convierte en una onda de luz rosa con su dedicatoria, y todos los latidos forman un mural vivo.', status: 'Disponible', pic: { src: pinkPulse, alt: 'Instalación luminosa rosa de The Pink Pulse' } },
      { title: 'Lounge Connect Zone', text: 'Un espacio para recargar energía y seguir la conferencia con audífonos inalámbricos: networking natural con presencia sensorial de marca.', status: 'Disponible', pic: { src: lounge, alt: 'Lounge Connect Zone con asistentes y café' } },
      { title: 'CorazónArt y MusicAI', text: 'Emoción y datos biométricos, creatividad científica con IA y juegos de supervivencia médica gamificados.', status: 'Disponible', pic: { src: corazon, alt: 'Corazón formado por partículas de luz' } },
    ],
    gallery: [
      { src: pepper, alt: 'Robot social Pepper saludando con las manos abiertas', caption: 'Pepper · robótica social' },
      { src: esmoversePantalla, alt: 'Pantalla gigante con la molécula de conexiones de ESMOverse', caption: 'ESMOverse · networking con IA' },
    ],
    quote: 'Las palabras se las lleva el viento; las experiencias las guarda el corazón.',
    faqs: [
      { q: '¿Las experiencias interactivas son compatibles con la educación médica continua?', a: 'Sí. Se integran con plataformas de EMC y de acreditación, y cada interacción queda como dato: participación, respuestas y recuerdo del mensaje.' },
      { q: '¿Cómo participa el patrocinador?', a: 'Con patrocinio exclusivo y declarado de la experiencia, presencia de marca en el espacio y en el reporte posevento, y mensajes educativos o institucionales revisados por la asociación.' },
    ],
    keywords: ['experiencias interactivas congresos', 'activaciones médicas', 'robot Pepper eventos', 'gamificación médica'],
  },

  // ───────────── 02 · Gen.oma (pilar con landing propia)

  // ───────────── 03 · Educación médica continua
  {
    slug: 'gen-live',
    pillar: 'educacion-medica-continua',
    name: 'Gen.Live',
    kicker: 'Activación científica de audiencias',
    title: 'Más que un webinar: un sistema de activación científica de audiencias',
    description:
      'Gen.Live convierte su base médica en una audiencia conectada, perfilada y medible: eventos científicos en vivo sobre infraestructura dedicada y con su marca.',
    lead:
      'Un webinar es una transmisión. Gen.Live es un equipo de salud, creatividad, datos y tecnología que convierte la base médica de su asociación en audiencia conectada, perfilada y medible, lista para el patrocinio declarado de la industria.',
    status: 'Listo y operando',
    figure: 'lissajous',
    audiences: ['Asociaciones médicas con base de afiliados', 'Industria farmacéutica que patrocina EMC', 'Universidades'],
    features: [
      { title: 'Activación de la base médica', text: 'Gestionamos y segmentamos la base de la asociación por perfil para cada evento.' },
      { title: 'Captación y convocatoria', text: 'Landing de registro diseñada para conversión, y correos y WhatsApp redactados por comunicadoras en salud.' },
      { title: 'Producción en estudio virtual', text: 'Piezas, máscaras, cortinillas y realización en vivo a cargo de creativos y productores.' },
      { title: 'Infraestructura dedicada', text: 'Servidores dimensionados para 1.000 conexiones simultáneas sin caídas, con la marca de su organización.' },
      { title: 'Contenido bajo demanda', text: 'La grabación queda publicada para consulta posterior.' },
      { title: 'Inteligencia de audiencia', text: 'Perfil, especialidad y país de cada médico conectado, y el informe que la industria sí puede usar.' },
    ],
    compare: {
      head: ['', 'Una transmisión convencional', 'Gen.Live'],
      rows: [
        ['Dónde corre', 'Plataformas públicas de video', 'Infraestructura dedicada, lista para 1.000 conexiones simultáneas'],
        ['Su marca', 'Compite con anuncios y videos de otros', 'Protegida: el espacio es de su asociación'],
        ['Los datos', 'Quedan en la plataforma pública', 'Quedan con la asociación, con la autorización de cada médico'],
        ['Para la industria', 'Un número de vistas', 'Perfil, especialidad y país de cada médico conectado'],
      ],
    },
    stats: [
      { value: 47, label: 'eventos científicos en vivo en 2026' },
      { value: 43960, label: 'profesionales inscritos' },
      { value: 1543, label: 'asistentes en vivo en una sola sesión' },
      { value: 30679, label: 'asistentes en vivo acumulados' },
    ],
    statsSource: 'Registro de ejecución de eventos en vivo, 24 de febrero a 15 de octubre de 2026',
    faqs: [
      { q: '¿En qué se diferencia Gen.Live de un webinar en YouTube o Zoom?', a: 'El evento corre en infraestructura dedicada con la marca de la asociación, los datos quedan con la asociación con autorización de cada médico, y un equipo de comunicadoras, creativos, analistas e ingenieros opera la convocatoria, la producción y el informe.' },
      { q: '¿Cuántas personas pueden conectarse a la vez?', a: 'La infraestructura estándar está preparada para picos de 1.000 conexiones simultáneas; por encima de esa cifra se configuran servidores especiales para alta demanda.' },
      { q: '¿Quién es dueño de la base de datos médica?', a: 'La asociación. Gen.Health no reclama titularidad sobre ella: nuestro trabajo es activarla para que se convierta en audiencia conectada y medida.' },
    ],
    keywords: ['webinars médicos', 'eventos científicos en vivo', 'plataforma de streaming médico', 'simposios virtuales'],
  },
  {
    slug: 'gen-campus',
    pillar: 'educacion-medica-continua',
    name: 'Gen.Campus',
    kicker: 'Plataforma de aprendizaje',
    title: 'Su biblioteca y sus cursos certificables, abiertos todo el año',
    description:
      'Gen.Campus es la plataforma de educación médica continua con la marca de su asociación: cursos certificables, biblioteca, IA, gamificación y trazabilidad.',
    lead:
      'Una plataforma de educación médica continua (CME/CPD) con la marca de su organización. Para uso interno y también para crear y vender cursos al público, con visibilidad clara del progreso de cada profesional.',
    status: 'Disponible',
    figure: 'spiral',
    audiences: ['Asociaciones y colegios', 'IPS que forman a su talento humano', 'Universidades y creadores de contenido'],
    features: [
      { title: 'Cursos certificables', text: 'Rutas de aprendizaje con evaluación y certificado, integradas con Gen.Cert.' },
      { title: 'Biblioteca viva', text: 'Simposios, grabaciones de Gen.Live y contenidos del congreso, disponibles todo el año.' },
      { title: 'Copiloto con IA', text: 'Microquizzes, recordatorios y aprendizaje personalizado.' },
      { title: 'Trazabilidad', text: 'Reportes en tiempo real del progreso individual y global.' },
      { title: 'Venta de cursos', text: 'Un nuevo canal de ingresos para la asociación, más allá de las cuotas.' },
    ],
    stats: [
      { value: 3150, label: 'membresías en Gen.Campus' },
      { value: 602, label: 'profesionales de 22 países usaron EndoCampus' },
      { value: 132, label: 'certificados en el curso de ACE' },
      { value: 8, label: 'días de mediana para certificarse' },
    ],
    statsSource: 'Plataforma Gen.Campus, 2026',
    gallery: [{ src: campus, alt: 'EndoCampus 2024 en la plataforma Gen.Campus vista en tres monitores' }],
    faqs: [
      { q: '¿Gen.Campus sirve para cumplir la Resolución 1644 de 2026?', a: 'Sí. La resolución pide formación continua del talento humano en TIC y conservar la evidencia de asistencia. Co-creamos con su asociación cursos certificables de telemedicina en Gen.Campus, con certificados en Gen.Cert y medición con Gen.ON.' },
      { q: '¿La plataforma lleva la marca de la asociación?', a: 'Sí. Gen.Campus se configura con la marca, el dominio y los contenidos de su organización.' },
    ],
    keywords: ['plataforma LMS médica', 'cursos médicos certificables', 'campus virtual asociación médica', 'CME CPD Colombia'],
  },
  {
    slug: 'gen-cert',
    pillar: 'educacion-medica-continua',
    name: 'Gen.Cert',
    kicker: 'Certificados automáticos',
    title: 'Certificados al instante, verificables y sin trámites para la secretaría',
    description:
      'Gen.Cert genera, valida y entrega certificados digitales para congresos, cursos y eventos de EMC, con verificación por QR y autoconsulta del histórico.',
    lead:
      'Automatizamos el reconocimiento del conocimiento: certificados personalizados de participación, ponencia, comité o póster, generados al instante, verificables con QR y con el histórico de todos los eventos.',
    status: 'Disponible',
    figure: 'flower',
    audiences: ['Secretarías académicas', 'Comités de congresos', 'Profesionales que necesitan sus certificados'],
    features: [
      { title: 'Generación masiva', text: 'Certificados personalizados por tipo de participación, en segundos.' },
      { title: 'Autoconsulta', text: 'Búsqueda por nombre, correo o documento, con el histórico de todos los eventos.' },
      { title: 'Validación por QR', text: 'Cada certificado se verifica con un QR o enlace único.' },
      { title: 'Integrado', text: 'Funciona con Gen.Live, Gen.Campus y Gen.Pósters, con reportes descargables.' },
    ],
    faqs: [
      { q: '¿Cómo se verifica que un certificado es auténtico?', a: 'Cada certificado tiene un código QR y un enlace único que lleva a la página de validación de la asociación.' },
    ],
    keywords: ['certificados digitales congresos', 'certificados con QR', 'certificación automática EMC'],
  },
  {
    slug: 'gen-on-adherencia-educacion',
    pillar: 'educacion-medica-continua',
    name: 'Gen.ON Adherencia Educación',
    kicker: 'Retención del aprendizaje',
    title: 'Más médicos que terminan sus cursos, y la medición real de cuánto retuvieron',
    description:
      'Gen.ON Adherencia Educación acompaña a los médicos por WhatsApp con preguntas socráticas tras cada curso o simposio, y mide la retención del aprendizaje.',
    lead:
      'Seguimiento por WhatsApp con preguntas socráticas durante las semanas posteriores al evento o curso. Logra que más médicos se certifiquen y entrega el indicador que todo patrocinador quiere ver: cuánto conocimiento se retuvo en la práctica.',
    status: 'Listo y operando',
    figure: 'wave',
    audiences: ['Asociaciones con cursos o simposios', 'Industria que patrocina educación', 'Programas de EMC'],
    features: [
      { title: 'Preguntas socráticas', text: 'Microconversaciones que refuerzan el aprendizaje en las semanas posteriores.' },
      { title: 'Más certificaciones', text: 'Recordatorios que ayudan a que más médicos terminen lo que empezaron.' },
      { title: 'Retención medible', text: 'Un indicador de cuánto se retuvo después del evento, por tema y por cohorte.' },
      { title: 'Se suma a lo que ya tiene', text: 'Funciona sobre los cursos y simposios que la asociación ya ofrece.' },
    ],
    faqs: [
      { q: '¿Qué es una pregunta socrática en educación médica?', a: 'Una pregunta que invita al médico a razonar y aplicar lo aprendido en un caso, en lugar de repetir un dato. Ayuda a consolidar el conocimiento y permite medir su retención.' },
    ],
    keywords: ['retención del aprendizaje médico', 'WhatsApp educación médica', 'medición de impacto EMC'],
  },
  {
    slug: 'medinars-latam',
    pillar: 'educacion-medica-continua',
    name: 'Medinars LATAM',
    kicker: 'Nuevo modelo regional',
    title: 'Simposios regionales con su aval, abiertos a médicos de toda Latinoamérica',
    description:
      'Medinars LATAM: simposios científicos regionales con el aval de su asociación y patrocinio declarado de la industria. Nuevos ingresos y alcance regional.',
    lead:
      'Un nuevo canal de ingresos y de alcance regional: simposios con el aval científico de su asociación, patrocinio declarado de la industria y médicos de toda Latinoamérica conectados en un mismo espacio.',
    status: 'Nuevo modelo',
    figure: 'orbit',
    audiences: ['Asociaciones con proyección regional', 'Industria con mandato LATAM'],
    features: [
      { title: 'Aval científico', text: 'La asociación decide temas, ponentes y contenido.' },
      { title: 'Patrocinio declarado', text: 'La industria apoya con transparencia y recibe reportes verificables de alcance y perfil.' },
      { title: 'Alcance regional', text: 'Convocatoria multicanal en toda Latinoamérica, sobre la infraestructura de Gen.Live.' },
      { title: 'Medición del aprendizaje', text: 'Retención pos-evento con Gen.ON Adherencia Educación.' },
    ],
    faqs: [
      { q: '¿Quién es dueño del contenido de un Medinar?', a: 'La asociación: avala y decide. La industria patrocina con transparencia, el médico aprende y Gen.Health opera y mide.' },
    ],
    keywords: ['simposios médicos Latinoamérica', 'webinars regionales médicos', 'patrocinio educación médica'],
  },

  // ───────────── 04 · Práctica clínica
  {
    slug: 'gen-careflow',
    pillar: 'practica-clinica',
    name: 'Gen.CareFlow',
    kicker: 'Teleexperticia con IA',
    title: 'El médico general resuelve con el apoyo de un especialista de su asociación',
    description:
      'Gen.CareFlow es teleexperticia con IA: el médico general resuelve casos con un especialista de la asociación y sus guías en Gen.oma. Menos remisiones.',
    lead:
      'El médico general resuelve casos con el apoyo de un especialista de la asociación y de sus guías clínicas en Gen.oma. El paciente espera menos, la IPS descongestiona remisiones y la asociación abre un nuevo canal para sus especialistas.',
    status: 'En desarrollo',
    figure: 'vesica',
    audiences: ['Clínicas e IPS', 'Programas de acceso', 'Asociaciones con red de especialistas'],
    features: [
      { title: 'Especialista en el centro', text: 'La IA apoya con las guías de la asociación; el especialista decide.' },
      { title: 'Menos remisiones', text: 'Casos resueltos en el primer nivel cuando es posible, con trazabilidad.' },
      { title: 'Marco normativo', text: 'Diseñado según la Resolución 1644 de 2026 de telemedicina.' },
      { title: 'Nuevo canal para la asociación', text: 'Ingresos y posicionamiento para sus especialistas.' },
    ],
    faqs: [
      { q: '¿La IA toma decisiones clínicas?', a: 'No. Como pide la Resolución 1644 de 2026, la IA es solo apoyo: consulta las guías de la asociación y el especialista decide.' },
    ],
    keywords: ['teleexperticia Colombia', 'telemedicina IPS', 'IA guías clínicas', 'listas de espera especialistas'],
  },
  {
    slug: 'gen-on-adherencia-pacientes',
    pillar: 'practica-clinica',
    name: 'Gen.ON Adherencia Pacientes',
    kicker: 'Acompañamiento entre consultas',
    title: 'Que el paciente sostenga su tratamiento crónico entre una consulta y otra',
    description:
      'Gen.ON Adherencia Pacientes: educación y recordatorios por WhatsApp para pacientes crónicos, con tablero de seguimiento para la clínica o el programa.',
    lead:
      'Educación y recordatorios por WhatsApp para que el paciente sostenga su tratamiento crónico, con un tablero de seguimiento para la clínica o el programa de soporte. Opera bajo los lineamientos de teleorientación y protege los datos según la Ley 1581 de 2012.',
    status: 'Disponible',
    figure: 'harmonograph',
    audiences: ['Clínicas', 'Programas de soporte a pacientes', 'Asociaciones de pacientes'],
    features: [
      { title: 'Educación al paciente', text: 'Contenidos claros con aval científico, en el canal que el paciente ya usa.' },
      { title: 'Recordatorios', text: 'Mensajes oportunos para sostener la adherencia al tratamiento.' },
      { title: 'Tablero de seguimiento', text: 'Indicadores para la clínica o el programa de soporte.' },
      { title: 'Teleorientación', text: 'Educación y recordatorios, nunca seguimiento clínico ni telemedicina.' },
    ],
    faqs: [
      { q: '¿Gen.ON reemplaza la consulta médica?', a: 'No. Es educación y recordatorios bajo lineamientos de teleorientación; el seguimiento clínico sigue a cargo del equipo tratante.' },
    ],
    keywords: ['adherencia al tratamiento', 'programas de soporte a pacientes', 'WhatsApp pacientes crónicos'],
  },

  // ───────────── 05 · Comunicación y audiencia médica
  {
    slug: 'comunicacion-cientifica',
    pillar: 'comunicacion-y-audiencia-medica',
    name: 'Comunicación científica digital',
    kicker: 'Presencia y vigencia',
    title: 'Presencia constante en redes, web y buscadores de IA',
    description:
      'Comunicación científica para asociaciones médicas: estrategia editorial, redes, web, SEO, campañas para pacientes y free press, hecha por profesionales de la salud.',
    lead:
      'Estrategia editorial, redes, web, campañas y free press, hechas por comunicadoras que son profesionales de la salud. Para que su institución aparezca cuando sus profesionales —y los asistentes de IA— buscan respuestas.',
    status: 'Disponible',
    figure: 'wave',
    audiences: ['Asociaciones y colegios profesionales', 'Congresos', 'Campañas con aval científico'],
    features: [
      { title: 'Estrategia editorial', text: 'Contenido de valor con rostros reales, logros de la comunidad y respuestas a necesidades concretas.' },
      { title: 'Portal web y SEO', text: 'Sitios que posicionan a la institución en búsquedas de servicios y trámites, y en asistentes de IA.' },
      { title: 'Campañas para pacientes', text: 'Con aval científico y apoyo declarado de la industria.' },
      { title: 'Free press', text: 'Portavoces en radio, televisión y prensa digital.' },
    ],
    stats: [
      { value: 285529, label: 'visualizaciones en Instagram · COLFI, 8 meses' },
      { value: 2308, prefix: '+', suffix: ' %', label: 'interacciones en Instagram en un mes · COLFI' },
      { value: 53668, label: 'impresiones en Google por búsquedas de ReTHUS en julio' },
      { value: 889, prefix: '+', suffix: ' %', label: 'de alcance en Facebook en campañas para pacientes · ACN' },
    ],
    statsSource: 'Informes de estrategia digital de COLFI (2026) y de las campañas de la ACN',
    gallery: [
      { src: colfi2, alt: 'Publicación de COLFI con la presidenta del Colegio en la camiseta de la Selección Colombia' },
      { src: colfi3, alt: 'Calendario de fechas de salud de COLFI' },
      { src: colfi4, alt: 'Convocatoria al II Concurso de Video Fisioterapia Colombia' },
      { src: colfi7, alt: 'Publicación de COLFI sobre el Premio Nacional al Inventor Colombiano' },
    ],
    faqs: [
      { q: '¿Por qué una asociación médica necesita aparecer en asistentes de IA?', a: 'Porque hoy el camino al conocimiento pasa por Google, redes e IA general. Un portal bien estructurado hace que ChatGPT o Gemini citen a la institución; COLFI ya recibe visitas desde esos asistentes.' },
    ],
    keywords: ['comunicación científica', 'marketing digital asociaciones médicas', 'redes sociales salud', 'SEO salud'],
  },
  {
    slug: 'audiencia-medica',
    pillar: 'comunicacion-y-audiencia-medica',
    name: 'Audiencia médica',
    kicker: 'Bases autorizadas y medición',
    title: 'Audiencias médicas reales, autorizadas y medidas',
    description:
      'Bases médicas autorizadas por cada profesional, convocatoria por correo y WhatsApp, e informes que distinguen personas reales de simples visitas web.',
    lead:
      'Bases autorizadas por cada médico, convocatoria por correo y WhatsApp, e informes que distinguen personas reales de visitas web. La base es de la asociación; nuestro trabajo es activarla.',
    status: 'Disponible',
    figure: 'phyllotaxis',
    audiences: ['Asociaciones y colegios', 'Congresos', 'Industria que necesita reportes verificables'],
    features: [
      { title: 'Autorización de datos', text: 'Cada médico autoriza el uso de sus datos, como pide la Ley 1581 de 2012.' },
      { title: 'Convocatoria multicanal', text: 'Correo, WhatsApp e invitación de la asociación, redactados por comunicadoras en salud.' },
      { title: 'Perfilamiento', text: 'Especialidad, ciudad, país e interés de cada inscrito.' },
      { title: 'Informes verificables', text: 'Personas reales, no solo visitas, para la junta y los patrocinadores.' },
    ],
    stats: [
      { value: 96.1, decimals: 1, suffix: ' %', label: 'de los inscritos autorizó el uso de sus datos · CNQF' },
      { value: 75, suffix: ' %', label: 'de los residentes de neurología del país convocados · ACN' },
      { value: 11902, label: 'profesionales únicos en 2026' },
    ],
    statsSource: 'Informes de resultados de CNQF y ACN; plataformas Gen.Live y Gen.Campus 2026',
    faqs: [
      { q: '¿Gen.Health vende o comparte bases de datos médicas?', a: 'No. La base es de la asociación, cada médico autoriza su uso y la industria recibe reportes generales, nunca datos personales.' },
    ],
    keywords: ['base de datos médica autorizada', 'convocatoria médica', 'Ley 1581 de 2012 salud'],
  },
];

export const pillarBySlug = (slug: PillarSlug) => pillars.find((p) => p.slug === slug)!;
export const productsOf = (slug: PillarSlug) => products.filter((p) => p.pillar === slug);
export const productUrl = (p: Product) => `/${p.pillar}/${p.slug}/`;

/** Gen.oma tiene landing de pilar con su propio contenido. */
export const genoma = {
  modules: [
    { title: 'Consulta con fuente', text: 'El especialista pregunta y recibe la respuesta de su asociación, con la guía, el año y la página.', status: 'Disponible' as Status },
    { title: 'Biblioteca viva', text: 'Guías, consensos, revista, simposios y trabajos del congreso, con autor, fecha y aval.', status: 'Disponible' as Status },
    { title: 'Legado del experto', text: 'La experiencia de sus grandes maestros, preservada y citada con su nombre.', status: 'En desarrollo' as Status },
    { title: 'Qué se consulta', text: 'La junta ve qué temas buscan sus médicos y dónde faltan guías.', status: 'En desarrollo' as Status },
  ],
  access: [
    { title: 'Su comité académico', text: 'que lo revisa y lo valida primero.' },
    { title: 'Sus afiliados', text: 'como un beneficio que le da más valor a la membresía.' },
    { title: 'Residentes, médicos generales e instituciones', text: 'con acceso pago, cuando ustedes lo decidan.' },
  ],
  never: [
    'Inventar o responder con información general de internet.',
    'Reemplazar el criterio del médico.',
    'Compartir o mezclar su conocimiento con el de otras asociaciones.',
    'Sacarlo de casa: puede funcionar en su propio servidor.',
  ],
  steps: [
    { title: 'Inventario', text: 'Revisamos con su comité qué conocimiento tiene la asociación y qué está vigente.' },
    { title: 'Validación', text: 'Su comité lo prueba y valida las respuestas.' },
    { title: 'Apertura', text: 'Lo abrimos a sus afiliados y, cuando ustedes quieran, a otros profesionales.' },
  ],
  faqs: [
    { q: '¿Qué es RAG y por qué importa en medicina?', a: 'RAG (generación aumentada por recuperación) significa que la IA consulta las fuentes de la asociación en cada respuesta y las cita, en vez de responder de memoria. Así cada respuesta lleva la guía, el año y la página.' },
    { q: '¿Gen.oma reemplaza el criterio del médico?', a: 'No. Gen.oma pone el conocimiento avalado de la asociación al alcance del médico; la decisión clínica siempre es del profesional.' },
    { q: '¿Dónde se aloja el conocimiento de la asociación?', a: 'Puede funcionar en el propio servidor de la asociación. El conocimiento no se comparte ni se mezcla con el de otras asociaciones.' },
    { q: '¿Hay referentes internacionales?', a: 'En Estados Unidos, el New England Journal of Medicine y JAMA ya licencian su contenido a herramientas de IA para médicos (Fierce Healthcare, 2025). Gen.oma lleva esa posibilidad a las sociedades científicas de la región, en español y con la sociedad como dueña.' },
  ],
};

export const telemedicina = {
  title: 'Cursos certificables de telemedicina, co-creados con su asociación',
  lead: 'Para las IPS que deben formar a su talento humano en telemedicina. Su asociación pone el aval y el contenido; nosotros, los cursos en Gen.Campus, los certificados en Gen.Cert y la medición con Gen.ON.',
  points: [
    { title: 'Formación continua obligatoria', text: 'del talento humano en el uso de TIC (art. 6).' },
    { title: 'Evidencia de asistencia', text: 'que la IPS debe conservar y actualizar (art. 6).' },
    { title: 'Periodo de transición', text: 'para que quienes ya prestan telemedicina se ajusten a la norma.' },
  ],
  source: 'Resolución 1644 del 31 de julio de 2026, Ministerio de Salud y Protección Social',
};

export const gallery = { desafiando, pepper, pinkPulse, esmoversePantalla, salaPosters, campus, lounge, molecula, adn };

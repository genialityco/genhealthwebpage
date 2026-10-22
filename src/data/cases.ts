import type { ImageMetadata } from 'astro';
import salaPosters from '@/assets/img/sala-posters-acho.jpg';
import desafiando from '@/assets/img/desafiando-el-cancer.jpg';
import colfi from '@/assets/img/colfi-campana-2.jpg';
import campus from '@/assets/img/gen-campus-plataforma.jpg';

export interface Case {
  slug: string;
  client: string;
  field: string;
  title: string;
  headline: { value: string; label: string };
  points: { value: string; label: string }[];
  story: string;
  services: string[];
  image?: { src: ImageMetadata; alt: string };
}

export const cases: Case[] = [
  {
    slug: 'acn-neurologia',
    client: 'ACN',
    field: 'Asociación Colombiana de Neurología',
    title: 'Éxito comercial y asistencia récord',
    headline: { value: '111 %', label: 'de cumplimiento de la meta comercial con la industria farmacéutica' },
    points: [
      { value: '+223 %', label: 'de asistencia a simposios nacionales' },
      { value: '75 %', label: 'de los residentes de neurología del país convocados' },
      { value: '+889 %', label: 'de alcance en Facebook en campañas para pacientes (Espasticidad y The Walking Head)' },
    ],
    story: 'Arquitectura comercial del congreso, convocatoria médica multicanal y campañas para pacientes con aval científico y apoyo declarado de la industria.',
    services: ['Arquitectura y comercialización', 'Audiencia médica', 'Comunicación científica'],
  },
  {
    slug: 'ascofame',
    client: 'ASCOFAME',
    field: 'III Congreso Mundial de Educación Médica',
    title: 'Un congreso del que habló el país',
    headline: { value: '222.564', label: 'visualizaciones en Instagram durante la campaña del congreso' },
    points: [
      { value: '+3.258 %', label: 'en cuentas alcanzadas' },
      { value: '11', label: 'impactos de free press en La FM, Caracol Radio, Red+ TV y Pulzo' },
    ],
    story: 'Campaña digital del congreso y gestión de medios con portavoces en radio, televisión y prensa digital.',
    services: ['Comunicación científica', 'Free press'],
  },
  {
    slug: 'cnqf',
    client: 'CNQF',
    field: 'Congreso Nacional de Ciencias Farmacéuticas',
    title: 'Una audiencia completamente perfilada',
    headline: { value: '534', label: 'profesionales de 70 ciudades asistieron gracias a la estrategia, 100 % perfilados' },
    points: [
      { value: '+167 %', label: 'de crecimiento en LinkedIn' },
      { value: '96,1 %', label: 'de los inscritos autorizó el uso de sus datos' },
    ],
    story: 'Convocatoria e inscripciones con perfilamiento por especialidad, ciudad e interés, y autorización de datos según la Ley 1581 de 2012.',
    services: ['Audiencia médica', 'Arquitectura y comercialización'],
  },
  {
    slug: 'acis-clis',
    client: 'ACIS',
    field: 'Congreso Latinoamericano de Integración Sensorial (CLIS)',
    title: 'Récord de inscritos con contenido de valor',
    headline: { value: '140 %', label: 'de la meta: 560 inscritos frente a 400 esperados' },
    points: [
      { value: '×30', label: 'alcance orgánico por publicación: de 400 a más de 12.000 personas' },
      { value: '+90 %', label: 'de visitas al portal de pagos' },
      { value: '+821 %', label: 'de interacciones en Facebook, sin pauta' },
    ],
    story: 'DOFA, caracterización de seis grupos de interés, lenguaje gráfico propio y contenido de valor con base en la investigación de los conferencistas, combinado con contacto directo.',
    services: ['Comunicación científica', 'Arquitectura y comercialización'],
  },
  {
    slug: 'colfi',
    client: 'COLFI',
    field: 'Colegio Colombiano de Fisioterapeutas',
    title: 'Ocho meses de estrategia digital',
    headline: { value: '+2.308 %', label: 'de interacciones en Instagram en un mes (110 en mayo, 2.649 en junio de 2026)' },
    points: [
      { value: '303.415', label: 'visualizaciones en Facebook' },
      { value: '53.668', label: 'impresiones en Google en julio por búsquedas de ReTHUS' },
      { value: '46', label: 'visitas al portal desde asistentes de IA como ChatGPT y Gemini' },
    ],
    story: 'Nuevo portal web, estrategia editorial con rostros reales de la profesión y posicionamiento en búsquedas de servicios como ReTHUS.',
    services: ['Comunicación científica', 'Portal web y SEO'],
    image: { src: colfi, alt: 'Publicación de COLFI con la presidenta del Colegio' },
  },
  {
    slug: 'acho-desafiando-el-cancer',
    client: 'ACHO',
    field: '8.º Simposio de Actualización en Cáncer de Pulmón · 2024',
    title: 'Desafiando el Cáncer',
    headline: { value: '1 pulmón', label: 'virtual en el escenario, resuelto en equipo desde cientos de celulares' },
    points: [
      { value: 'ASCO', label: 'Lanzamiento del programa con Conquer Cancer – ASCO Foundation' },
      { value: 'Gen.Pósters', label: 'Sala de pósters digitales con votación en vivo' },
    ],
    story: 'Los asistentes se conectaron desde su celular y, con cada respuesta, fueron desintegrando el cáncer de pulmón de células pequeñas mientras sus nombres aparecían en pantalla.',
    services: ['Experiencias interactivas', 'Gen.Pósters'],
    image: { src: desafiando, alt: 'Pulmón virtual con celulares y código QR' },
  },
  {
    slug: 'ace-endocrinologia',
    client: 'ACE',
    field: 'Asociación Colombiana de Endocrinología, Diabetes y Metabolismo',
    title: 'La base médica convertida en audiencia',
    headline: { value: '1.543', label: 'asistentes en vivo en una sola sesión: «Juntos, es posible alcanzar las metas»' },
    points: [
      { value: '602', label: 'profesionales de 22 países usaron EndoCampus' },
      { value: '132', label: 'certificados en el curso de ACE, con mediana de 8 días' },
    ],
    story: 'Eventos científicos en vivo con Gen.Live, EndoCampus sobre Gen.Campus y certificación con Gen.Cert.',
    services: ['Gen.Live', 'Gen.Campus', 'Gen.Cert'],
    image: { src: campus, alt: 'EndoCampus en la plataforma Gen.Campus' },
  },
];

export const casesHero = { src: salaPosters, alt: 'Sala de pósters digitales del congreso de ACHO' };

// Datos del proyecto más reciente que se muestra en la sección "Proyecto
// reciente" (client/src/components/LatestProject.jsx), usada en
// Home y en Proyectos.
//
// Campos:
//   title        (string, obligatorio) — nombre del proyecto. ~60-90 caracteres.
//   description  (string[], obligatorio) — qué se realizó, un string por párrafo.
//   date         (string, opcional)    — "Mes AAAA" o "AAAA" (p. ej. "Marzo 2025").
//   location     (string, opcional)    — municipio/zona (p. ej. "Barrancabermeja, Santander").
//   participants (string[], opcional)  — entidades/personas con quienes se realizó.
//   url          (string, opcional)    — enlace al sitio web del proyecto.
//   image        (import, obligatorio) — foto del proyecto en .webp, horizontal,
//                                        < 250 KB, en client/src/assets/images/.
//   imageAlt     (string, obligatorio si hay imagen) — descripción de la foto.
//
// Mientras `title` sea null, la sección renderiza un marcador visible en vez
// de contenido falso.

import latestProjectImage from '../assets/images/mercado-campesino-digital.webp';

export const latestProject = {
  title: 'Mercado Campesino Digital',
  description: [
    'Con el apoyo del Fondo DemocráTICa, la Corporación Paso a Paso desarrolló e implementó el Mercado Campesino Digital, una experiencia piloto orientada a fortalecer las capacidades digitales de pequeños productores rurales y facilitar la promoción de sus productos mediante una plataforma web sencilla.',
    'Durante el proyecto se trabajó con productores rurales de Yondó en el uso de herramientas digitales, publicación de productos y apropiación de la plataforma. La experiencia permitió realizar pruebas con usuarios reales, conocer barreras de conectividad y alfabetización digital, y generar las primeras interacciones entre productores y potenciales compradores.',
  ],
  date: '2026',
  location: 'Yondó (Antioquia) – Fondo DemocráTICa',
  participants: ['Comunidad campesina de Yondó'],
  url: 'https://mercado-campesino-digital.vercel.app/',
  image: latestProjectImage,
  imageAlt:
    'Campesino trabajando en un cultivo, imagen del proyecto Mercado Campesino Digital',
};

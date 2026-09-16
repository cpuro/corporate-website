// Datos del proyecto más reciente que se muestra en la sección "Últimos
// proyectos realizados" de la Home (client/src/components/LatestProject.jsx).
//
// ⚠️ CONTENIDO PENDIENTE: todos los campos están vacíos a propósito. Mientras
// `title` sea null, la sección renderiza un marcador visible en vez de contenido
// falso. Rellena los campos y añade la imagen para activarla.
//
// Qué tiene que aportar el cliente:
//   title       (string, obligatorio) — nombre del proyecto. ~60-90 caracteres.
//   description (string, obligatorio) — resumen en 1-2 frases. ~150-300 caracteres.
//   date        (string, opcional)    — "Mes AAAA" o "AAAA" (p. ej. "Marzo 2025").
//   location    (string, opcional)    — municipio/zona (p. ej. "Barrancabermeja, Santander").
//   image       (import, obligatorio) — foto del proyecto en .webp, horizontal,
//                                       ~1600×900 (16:9), < 250 KB. Colócala en
//                                       client/src/assets/images/ y arriba haz
//                                       `import latestProjectImage from
//                                       '../assets/images/<archivo>.webp'`.
//   imageAlt    (string, obligatorio si hay imagen) — descripción de la foto.

// import latestProjectImage from '../assets/images/proyecto-mas-reciente.webp';

export const latestProject = {
  title: null,
  description: null,
  date: null,
  location: null,
  image: null, // -> latestProjectImage
  imageAlt: null,
};

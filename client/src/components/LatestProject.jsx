import { motion } from 'framer-motion';
import BookmarkCheck from '../assets/icons/bookmark-check.svg?react';
import TitlePrincipal from '../components/TitlePrincipal';
import SectionCard from '../components/SectionCard';
import { latestProject } from '../data/latestProject';

// Sección "Últimos proyectos realizados" de la Home. Muestra UN solo proyecto:
// el más reciente. NO enlaza a /proyectos (esa página se mantiene aparte).
//
// No reutiliza ProjectsRealize: ese componente no acepta props, tiene sus datos
// incrustados y su forma es "lista de 8 bullets + columna decorativa de 4
// imágenes". Aquí hace falta una única ficha destacada (imagen + título +
// resumen), otra estructura. Sí comparte el lenguaje visual (TitlePrincipal,
// SectionCard, animación whileInView).

const hasContent = Boolean(latestProject.title);

export default function LatestProject() {
  return (
    <section
      className="py-4 px-4 text-center relative overflow-hidden"
      aria-label="Últimos proyectos realizados"
    >
      <SectionCard>
        <TitlePrincipal
          title="ÚLTIMOS PROYECTOS REALIZADOS"
          Icon={BookmarkCheck}
          align="left"
        />

        {hasContent ? (
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center px-2 text-left"
          >
            {latestProject.image && (
              <img
                src={latestProject.image}
                alt={latestProject.imageAlt || latestProject.title}
                loading="lazy"
                decoding="async"
                width="1600"
                height="900"
                className="w-full h-auto rounded-xl border-4 border-primary shadow-2xl"
              />
            )}

            <div className="flex flex-col gap-3">
              <h3 className="font-poppins text-xl md:text-2xl font-semibold text-primary">
                {latestProject.title}
              </h3>

              {(latestProject.date || latestProject.location) && (
                <p className="font-poppins text-sm text-gray-600">
                  {[latestProject.date, latestProject.location]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              )}

              <p className="font-poppins text-base text-black leading-relaxed">
                {latestProject.description}
              </p>
            </div>
          </motion.article>
        ) : (
          // Marcador visible: no hay contenido real todavía. Ver
          // src/data/latestProject.js para saber qué debe aportar el cliente.
          <div
            role="note"
            className="mx-2 rounded-xl border-4 border-dashed border-primary/50 p-8 text-center font-poppins text-primary"
          >
            <p className="text-lg font-semibold">Contenido pendiente</p>
            <p className="mt-1 text-sm text-gray-600">
              Falta la información y la foto del proyecto más reciente. Campos y
              formato en <code>src/data/latestProject.js</code>.
            </p>
          </div>
        )}
      </SectionCard>
    </section>
  );
}

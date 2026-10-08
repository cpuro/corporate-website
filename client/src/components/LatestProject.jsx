import { motion } from 'framer-motion';
import BookmarkCheck from '../assets/icons/bookmark-check.svg?react';
import TitlePrincipal from '../components/TitlePrincipal';
import SectionCard from '../components/SectionCard';
import { latestProject } from '../data/latestProject';

// Sección "Últimos proyectos realizados" (Home y Proyectos). Muestra UN solo
// proyecto: el más reciente, con participantes y enlace a su sitio web.
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
      aria-label="Proyecto reciente"
    >
      <SectionCard>
        <TitlePrincipal
          title="PROYECTO RECIENTE"
          Icon={BookmarkCheck}
          align="left"
        />

        {hasContent ? (
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start px-2 text-left"
          >
            <div className="flex flex-col items-center gap-4">
              {latestProject.image && (
                <img
                  src={latestProject.image}
                  alt={latestProject.imageAlt || latestProject.title}
                  loading="lazy"
                  decoding="async"
                  width="916"
                  height="611"
                  className="w-full h-auto rounded-xl border-4 border-primary shadow-2xl"
                />
              )}

              {latestProject.url && (
                <a
                  href={latestProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visitar el sitio web de ${latestProject.title} (abre en una pestaña nueva)`}
                  className="px-6 py-3 text-white bg-primary font-poppins rounded-lg hover:bg-[#F16139] transition"
                >
                  Visitar sitio web
                </a>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-poppins text-xl md:text-2xl font-semibold text-primary">
                {[latestProject.title, latestProject.date]
                  .filter(Boolean)
                  .join(' - ')}
              </h3>

              {latestProject.location && (
                <p className="font-poppins text-sm text-gray-600">
                  {latestProject.location}
                </p>
              )}

              {latestProject.description.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-poppins text-base text-black leading-relaxed text-justify"
                >
                  {paragraph}
                </p>
              ))}

              {latestProject.participants?.length > 0 && (
                <div>
                  <h4 className="font-poppins text-base font-semibold text-primary mb-2">
                    Participantes
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {latestProject.participants.map((participant) => (
                      <li key={participant} className="flex items-start gap-3">
                        <BookmarkCheck className="text-primary mt-1 flex-shrink-0 w-5 h-5" />
                        <span className="text-base font-poppins text-black">
                          {participant}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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

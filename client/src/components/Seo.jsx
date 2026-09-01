// Metadatos por ruta usando el soporte nativo de React 19 para <title>/<meta>/
// <link> (se elevan a <head> automáticamente). No requiere dependencias.
//
// Limitación conocida: los scrapers sociales (Facebook, WhatsApp, Twitter…) NO
// ejecutan JS, así que solo ven las etiquetas Open Graph/Twitter ESTÁTICAS de
// index.html (valores de la home). Estas etiquetas por ruta solo las aprovechan
// los buscadores que renderizan JS (Googlebot). Para OG por ruta haría falta
// prerender/SSR — pendiente.

const SITE_URL = 'https://www.corporacionpasoapaso.com';
const SITE_NAME = 'Corporación Paso a Paso';

export default function Seo({ title, description, path = '/' }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonical = SITE_URL + path;

  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />
    </>
  );
}

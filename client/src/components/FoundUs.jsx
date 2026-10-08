  import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
  import L from 'leaflet';
  import { motion } from 'framer-motion';
  import MapPin  from '../assets/icons/map-pin.svg?react';
  import TitlePrincipal from '../components/TitlePrincipal';
  import 'leaflet/dist/leaflet.css';
  import { Link } from "react-router-dom";
  import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
  import markerIcon from 'leaflet/dist/images/marker-icon.png';
  import markerShadow from 'leaflet/dist/images/marker-shadow.png';



  // Corrige los íconos predeterminados de Leaflet. Se sirven desde el paquete
  // local (bundleados por Vite) en vez de https://unpkg.com, para no depender
  // de un CDN de terceros en runtime ni de una versión clavada a mano.
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });


  
  const FoundUs = ({ showButton = true }) => {
    const position = [7.061143497133173, -73.84913368503388];
    
    return (
      <section
       className="py-4 px-4 text-center relative overflow-hidden"
        aria-label="Encuéntranos"
      >
          {/* Contenido principal */}
          <div className="bg-white p-4 rounded-xl shadow-2xl border-4 border-primary  relative z-10 max-w-6xl mx-auto">
          {/* Título principal + icono */}
          <TitlePrincipal title="ENCUÉNTRANOS" Icon={MapPin}/>
            <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-justify text-black mb-12 max-w-3xl mx-auto font-poppins "
          >
                      <span className="text-primary text-center jus align-middle font-semibold">CORPORACIÓN PASO A PASO</span>
                <span className="text-black">
                  {" "}tiene sus instalaciones en la ciudad de Barrancabermeja, Santander. Puedes ubicarnos en el mapa. Si deseas más información, nuestro equipo estará listo para atender tus inquietudes.
                </span>
          </motion.p>

            {/* Mapa */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-[350px] max-w-[600px] mx-auto rounded-lg overflow-hidden shadow-2xl mb-8 border-4 border-primary"
              aria-label="Mapa con la ubicación de la organización"
            >
              <MapContainer
                center={position}
                zoom={16}
                scrollWheelZoom={false}
                touchZoom
                className="h-full w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    Corporación Paso a Paso<br />Barrancabermeja, Santander
                  </Popup>
                </Marker>
              </MapContainer>
            </motion.div>

            {/* Sedes */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg text-center text-black mb-8 max-w-3xl mx-auto font-poppins flex flex-col gap-2"
            >
              <p>
                <span className="text-primary font-semibold">Domicilio principal:</span>{" "}
                Carrera 55A No. 56-06, Barrio El Paraíso, Yondó, Antioquia
              </p>
              <p>
                <span className="text-primary font-semibold">Punto de Gestión Institucional:</span>{" "}
                Cra 31 #48-29, Barrancabermeja, Santander
              </p>
            </motion.div>

            {/* Botón de contacto */}
            {showButton && (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                to={"/contacto"}
                //  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F16139]"
              className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base text-white border border-white bg-primary font-poppins rounded-lg hover:bg-[#F16139]  transition text-center"
                >
                CONTÁCTENOS
                </Link>
              </motion.div>
            )}
          </div>
        </section>
    );
  };

  export default FoundUs;

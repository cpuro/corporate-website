import { Link } from "react-router-dom";
import Facebook from '../assets/icons/facebook.svg?react';
import PhoneIncoming from '../assets/icons/phone-incoming.svg?react';
import MailCheck  from '../assets/icons/mail-check.svg?react';
import MapPin  from '../assets/icons/map-pin.svg?react';
import footerBg from "../assets/images/footer-background.webp";
import logo from "../assets/images/logo-paso-a-paso.webp";

const navigationLinks = [
  { label: "Inicio", to: "/" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "Servicios", to: "/servicios" },
  { label: "Proyectos", to: "/proyectos" },
  { label: "Documentación Legal", to: "/regimen-tributario-especial" },
];

function Footer() {
  return (
      <footer
        className="bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${footerBg})` }}
      >
        <div className="font-poppins max-w-screen-xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Logo */}
          <div className="flex justify-center sm:justify-start">
            <Link to="/" aria-label="Ir al inicio">
              <img
                src={logo}
                alt="Logo de Corporación Paso a Paso"
                loading="eager"
                decoding="async"
                fetchpriority="high"
                width="80"
                height="80"
                className="h-16 sm:h-20 w-auto my-4 sm:my-10"
              />
            </Link>
          </div>

          {/* Navegación */}
          <div className="sm:text-left text-sm">
            <h2 className="text-base ml-20 mb-4 font-semibold text-[#3E4095]">Navegación</h2>
            <ul className="ml-20 space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-[#F16139] transition-colors text-[#3E4095]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>




          </div>

                    {/* Contacto */}
          <address className="not-italic text-center sm:text-left text-sm space-y-2 text-[#3E4095]">
            <h2 className="text-base font-semibold mb-4">Ubícanos en:</h2>
            <p className="flex items-center justify-center sm:justify-start gap-2">
              <PhoneIncoming className="text-[#F16139] w-4 h-4" /> 315 675 6556 - 312 403 6429
            </p>
            <p className="flex items-center justify-center sm:justify-start gap-2">
              <MapPin className="text-[#F16139] w-4 h-4" /> Cra 31 #48-29, Barrancabermeja, Santander
            </p>
            <p className="flex items-center justify-center sm:justify-start gap-2">
              <MailCheck className="text-[#F16139] w-4 h-4" />corpasoapaso@hotmail.com
            </p>
            <p  className="flex items-center justify-center sm:justify-start">
              <MailCheck className="text-[#F16139] w-4 h-4 mb-2" />contacto@corporacionpasoapaso.com</p>

                      {/* Redes sociales */}
          <div className="text-center sm:text-left text-sm ">
            <h2 className="text-base font-semibold mb-2 text-[#3E4095]">Síguenos</h2>
            <div className="flex justify-center sm:justify-start text-xl">
              <a
                href="https://www.facebook.com/share/15tYgfGiN4/?mibextid=qi2Omg"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mx-4 text-[#3E4095] hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <Facebook />
              </a>
            </div>
          </div>

          </address>





        </div>
        {/* Copyright */}
        <div className=" py-4 text-center text-xs text-black">
          <small className="block">
            © {new Date().getFullYear()} Corporación Paso a Paso. Todos los derechos reservados.
          </small>
          <span className="block sm:inline font-medium">Desarrollado por: ING. Cristhian Andres Puello Rojas</span>
        </div>
      </footer>
  );
}

export default Footer;

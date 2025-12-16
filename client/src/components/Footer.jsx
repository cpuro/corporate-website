import { Link } from "react-router-dom";
import footerBg from "../assets/images/footer-background.webp";
import logo from "../assets/images/logo-paso-a-paso.webp";
import FooterNav from "./FooterNav";
import FooterContact from "./FooterContact";
import FooterSocial from "./FooterSocial";

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
              fetchPriority="high"
              width="80"
              height="80"
              className="h-16 sm:h-20 w-auto my-4 sm:my-10"
            />
          </Link>
        </div>

        {/* Navegación */}
        <FooterNav links={navigationLinks} />

        {/* Contacto */}
        <FooterContact />

        {/* Redes sociales */}
        <FooterSocial />
      </div>

      {/* Copyright */}
      <div className="py-4 text-center text-xs text-black font-semibold">
        <small className="block">
          © {new Date().getFullYear()} Corporación Paso a Paso.
        </small>
        <span className="block sm:inline font-semibold">
          Desarrollado por: ING. Cristhian Andres Puello Rojas
        </span>
      </div>
    </footer>
  );
}

export default Footer;

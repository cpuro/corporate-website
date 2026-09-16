import { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/images/logo-paso-a-paso.webp';
import fondoBarras from '../assets/images/navbar-pattern.webp';
import Facebook from '../assets/icons/facebook.svg?react';
import { NAV_ITEMS } from '../config/constants';

const SocialLinks = ({ className = '', textColor = '' }) => (
  <div className={className}>
    <h2 className={`text-md font-poppins mb-2 font-semibold ${textColor}`}>
      Síguenos
    </h2>
    <div className="flex justify-center space-x-4 text-xl">
      <a
        href="https://www.facebook.com/share/15tYgfGiN4/?mibextid=qi2Omg"
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label="Facebook Corporación Paso a Paso"
        className="transition-transform hover:scale-110"
      >
        <Facebook />
      </a>
    </div>
  </div>
);

export default function Navbar({ isVisible }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <nav
      aria-label="Navegación principal"
      className={`fixed top-[26px] left-0 w-full z-40 bg-white bg-no-repeat bg-cover bg-bottom transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-[200px]'
      }`}
      style={{ backgroundImage: `url(${fondoBarras})`, height: '150px' }}
    >
      <div
        ref={menuRef}
        className="mx-auto px-4 lg:px-8 max-w-screen-xl h-full flex items-center justify-between relative"
      >
        {/* Logo */}
        <Link to="/" aria-label="Ir al inicio">
          <img
            src={logo}
            alt="Logo Corporación Paso a Paso"
            width="64"
            height="64"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="h-16 w-auto"
          />
        </Link>

        {/* Botón hamburguesa */}
        <button
          onClick={toggleMenu}
          aria-label="Abrir menú de navegación"
          aria-expanded={menuOpen}
          className="lg:hidden z-50 bg-white bg-opacity-90 rounded p-2 shadow-md text-primary"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Menú */}
        <div
          className={`absolute top-full left-0 w-full lg:static lg:w-auto
            transition-all duration-300 ease-in-out
            ${menuOpen ? 'block' : 'hidden'}
            lg:flex lg:items-center lg:space-x-8`}
          style={{
            background: menuOpen
              ? 'linear-gradient(to top left, #bfdbfe, #3E4095, #bfdbfe)'
              : 'transparent',
          }}
        >
          <ul className="flex flex-col lg:flex-row px-6 py-4 lg:py-0 font-poppins font-semibold text-primary">
            {NAV_ITEMS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 px-4 border-b-2 lg:border-b-0 transition-all ${
                      isActive
                        ? 'text-[#F16139] border-orange-400'
                        : 'border-transparent hover:text-orange-300 hover:border-orange-300'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Redes sociales (mobile) */}
          <SocialLinks className="block lg:hidden text-center mt-4" textColor="text-white" />
        </div>

        {/* Redes sociales (desktop) */}
        <SocialLinks className="hidden lg:flex flex-col items-center text-center text-primary" />
      </div>
    </nav>
  );
}

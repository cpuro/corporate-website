import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const MENU_ITEMS = ['Inicio', 'Servicios', 'Contacto'];

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative z-50 lg:hidden">
      {/* Botón hamburguesa */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded-md text-blue-700 bg-white shadow-md"
        aria-label="Abrir menú"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <nav
          id="mobile-menu"
          role="menu"
          className="absolute top-full right-0 w-64 shadow-lg rounded-bl-lg p-6 space-y-6
                     bg-white animate-fade-in"
        >
          <ul className="flex flex-col gap-4 font-semibold">
            {MENU_ITEMS.map((label) => (
              <li key={label} role="none">
                <button
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-left hover:text-orange-500 transition"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default MobileMenu;

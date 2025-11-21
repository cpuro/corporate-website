import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react"; // iconos hamburguesa

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50 lg:hidden">
      {/* Botón hamburguesa */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-blue-700 bg-white shadow-md"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-0 right-0 w-64 h-1/2 300 shadow-lg rounded-bl-lg p-6 space-y-6 animate-fade-in flex flex-col justify-start"
        >
          <ul className="flex flex-col gap-4 font-semibold">
            {["Inicio", "Servicios", "Contacto"].map((label, index) => (
              <li key={index}>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full text-left hover:text-orange-500 transition"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;

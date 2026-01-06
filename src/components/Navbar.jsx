import { useEffect } from "react";
import { Link } from "react-router-dom";      // <-- viktiga ändringen

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/#home" className="font-mono text-xl font-bold text-white" onClick={close}>
            Pierre<span className="text-blue-500">.Lundqvist</span>
          </Link>

          <button
            className="w-7 h-5 relative cursor-pointer z-50 md:hidden"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Öppna/stäng meny"
          >
            &#9776;
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/#home" className="text-gray-300 hover:text-white transition-colors" onClick={close}>
              Hem
            </Link>
            <Link to="/#about" className="text-gray-300 hover:text-white transition-colors" onClick={close}>
              Om mig
            </Link>
            <Link to="/#projects" className="text-gray-300 hover:text-white transition-colors" onClick={close}>
              Projekt
            </Link>
            <Link to="/#contact" className="text-gray-300 hover:text-white transition-colors" onClick={close}>
              Kontakta mig
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
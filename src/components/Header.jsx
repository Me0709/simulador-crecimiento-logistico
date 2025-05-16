import React from "react";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-indigo-50/80 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-indigo-700">
          Simulador de Crecimiento Logístico
        </h1>
        <nav className="flex space-x-6">
          <a
            href="#hero"
            className="text-indigo-600 hover:text-indigo-700 font-medium transition"
          >
            Inicio
          </a>
          <a
            href="#simulador"
            className="text-indigo-600 hover:text-indigo-700 font-medium transition"
          >
            Simulador
          </a>
          <a
            href="#contact"
            className="text-indigo-600 hover:text-indigo-700 font-medium transition"
          >
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

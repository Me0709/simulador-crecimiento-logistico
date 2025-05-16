import React from "react";
import { Rocket } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="h-screen flex items-center justify-center relative bg-gradient-to-br from-indigo-600 to-indigo-800 text-white"
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 text-center px-4">
        <div className="flex justify-center mb-6">
          <Rocket size={48} className="text-indigo-200" />
        </div>
        <h1 className="text-5xl font-extrabold mb-4">
          Bienvenido al Simulador
        </h1>
        <p className="text-xl mb-8">
          Calcula el crecimiento poblacional fácilmente en las principales
          ciudades de la costa Colombiana.
        </p>
        <a
          href="#simulador"
          className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full hover:bg-indigo-100 transition"
        >
          Empezar
        </a>
      </div>
    </section>
  );
};

export default Hero;

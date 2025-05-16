import React from "react";
import { Mail, User, MessageSquare } from "lucide-react";

const Contacto = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Contáctanos</h2>
          <p className="mt-4 text-indigo-100">¿Tienes preguntas? Estamos aquí para ayudarte.</p>
        </div>

        <div className="max-w-lg mx-auto">
          <form className="bg-white/10 backdrop-blur-md p-8 rounded-2xl space-y-6">
            <div className="flex items-center bg-white/20 rounded-md p-2">
              <User className="text-white mr-2" />
              <input
                type="text"
                placeholder="Tu Nombre"
                className="bg-transparent w-full text-white placeholder-white/80 focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center bg-white/20 rounded-md p-2">
              <Mail className="text-white mr-2" />
              <input
                type="email"
                placeholder="Tu Correo"
                className="bg-transparent w-full text-white placeholder-white/80 focus:outline-none"
                required
              />
            </div>
            <div className="flex bg-white/20 rounded-md p-2">
              <MessageSquare className="text-white mr-2 mt-1" />
              <textarea
                rows="4"
                placeholder="Tu Mensaje"
                className="bg-transparent w-full text-white placeholder-white/80 focus:outline-none resize-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-white text-indigo-700 font-semibold py-2 rounded-full hover:bg-indigo-100 transition"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacto;

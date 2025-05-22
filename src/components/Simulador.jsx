import { useState, useEffect, useRef } from "react";
import { Building2, Calendar, LineChart } from "lucide-react";
import Select from "react-select";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

const ciudades = {
  cartagena: {
    p0: 850000,
    capacidadDiaria: 272160000,
    pobs: 1066000,
    tobs: 25,
    observacion: "Datos aproximados de Cartagena en 2000 y 2025.",
  },
  santa_marta: {
    p0: 386000,
    capacidadDiaria: 81561600,
    pobs: 567000,
    tobs: 25,
    observacion: "Datos aproximados de Santa Marta en 2000 y 2025.",
  },
  barranquilla: {
    p0: 1111000,
    capacidadDiaria: 648000000,
    pobs: 1340000,
    tobs: 25,
    observacion: "Datos aproximados de Barranquilla en 2000 y 2025.",
  },
  valledupar: {
    p0: 308000,
    capacidadDiaria: 673920000,
    pobs: 558000,
    tobs: 23,
    observacion: "Datos aproximados de Valledupar en 2000 y 2023.",
  },
  monteria: {
    p0: 352000,
    capacidadDiaria: 120096000,
    pobs: 523000,
    tobs: 23,
    observacion: "Datos aproximados de Monteria en 2000 y 2023.",
  },
  sincelejo: {
    p0: 220000,
    capacidadDiaria: 98000000,
    pobs: 310000,
    tobs: 23,
    observacion: "Datos aproximados de Sincelejo 2000 y 2023.",
  },
};

function Simulador() {
  const [ciudad, setCiudad] = useState("");
  const [anio, setAnio] = useState(2000);
  const [resultado, setResultado] = useState(null);
  const canvasRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ciudad || anio < 2000) {
      setResultado(
        "Por favor selecciona una ciudad y un año válido (>= 2000)."
      );
      return;
    }

    const consumoDiarioPersona = 70;
    const datosCiudad = ciudades[ciudad];
    const { p0, capacidadDiaria, pobs, tobs, observacion } = datosCiudad;

    const k = capacidadDiaria / consumoDiarioPersona;
    const a = -Math.log((k / pobs - 1) / ((k - p0) / p0)) / (k * tobs);
    const t = anio - 2000;
    const Pt = k / (1 + ((k - p0) / p0) * Math.exp(-a * k * t));

    let anioLimite = null;
    const toleranciaRelativa = 0.00001;
    const maxAnios = 5000;

    for (let tAprox = 0; tAprox <= maxAnios; tAprox++) {
      const Ptest = k / (1 + ((k - p0) / p0) * Math.exp(-a * k * tAprox));
      if (Math.abs(Ptest - k) / k < toleranciaRelativa) {
        anioLimite = 2000 + tAprox;
        break;
      }
    }

    if (anioLimite !== null && anio > anioLimite) {
      alert(
        `El año ingresado (${anio}) excede el límite poblacional estimado para esta ciudad, que es aproximadamente el año ${anioLimite}.`
      );
      return;
    }

    setResultado({
      ciudad: ciudad,
      anio: anio,
      poblacion: Pt.toFixed(0),
      observacion,
    });

    const labels = [];
    const datos = [];

    for (let year = 2000; year <= anio; year++) {
      const tYear = year - 2000;
      const P = k / (1 + ((k - p0) / p0) * Math.exp(-a * k * tYear));
      labels.push(year);
      datos.push(Math.round(P));
    }

    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Población estimada",
            data: datos,
            borderColor: "rgba(99, 102, 241, 1)", // indigo-500
            backgroundColor: "rgba(99, 102, 241, 0.3)",
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Habitantes" },
          },
          x: {
            title: { display: true, text: "Año" },
          },
        },
      },
    });

    setChartInstance(newChart);
  };

  const ciudadOptions = Object.keys(ciudades).map((key) => ({
    value: key,
    label: key.replace("_", " ").toUpperCase(),
  }));

  return (
    <section
      id="simulador"
      className="py-24 bg-gradient-to-br from-indigo-50 to-indigo-100"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <LineChart size={48} className="mx-auto text-indigo-600 mb-4" />
          <h2 className="text-4xl font-bold text-gray-800">
            Simulador de Crecimiento Poblacional
          </h2>
          <p className="text-gray-600 mt-4">
            Selecciona una ciudad y el año para calcular la población
            proyectada.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="ciudad"
                className="block mb-2 text-gray-700 font-semibold"
              >
                Ciudad
              </label>
              <Select
                id="ciudad"
                options={ciudadOptions}
                value={ciudadOptions.find((option) => option.value === ciudad)}
                onChange={(selected) => setCiudad(selected?.value || "")}
                className="react-select-container"
                placeholder="Selecciona una ciudad..."
                classNamePrefix="react-select"
                required
              />
            </div>

            <div>
              <label
                htmlFor="anio"
                className="block mb-2 text-gray-700 font-semibold"
              >
                Año
              </label>
              <div className="flex items-center bg-white border border-indigo-200 rounded-md p-2">
                <Calendar className="text-indigo-400 mr-2" />
                <input
                  type="number"
                  id="anio"
                  value={anio}
                  onChange={(e) => setAnio(parseInt(e.target.value))}
                  min="2000"
                  required
                  className="w-full bg-transparent focus:outline-none text-gray-700"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full font-semibold transition"
            >
              Calcular Población
            </button>
          </form>

          {resultado && typeof resultado !== "string" && (
            <div className="mt-10 bg-indigo-50 p-6 rounded-lg text-center">
              <h5 className="text-2xl font-bold mb-2 text-indigo-700">
                {resultado.ciudad.replace("_", " ").toUpperCase()}
              </h5>
              <p className="text-gray-700">
                En el año <strong>{resultado.anio}</strong> la población
                estimada será de:
              </p>
              <p className="text-3xl font-extrabold text-indigo-600 my-2">
                {resultado.poblacion} habitantes
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {resultado.observacion}
              </p>
            </div>
          )}

          {typeof resultado === "string" && (
            <p className="mt-6 text-center text-red-500">{resultado}</p>
          )}

          <div className="mt-12">
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Simulador;

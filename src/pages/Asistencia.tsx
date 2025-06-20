import React, { useEffect, useState } from "react";

interface Empleado {
  id: string;
  nombre: string;
  puesto: string;
  oficina: string;
  horaEntrada: string;
  horaSalida: string;
  estado: "Presente" | "Ausente" | "Retardo";
}

const Asistencia: React.FC = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/empleados/asistencia");
        const data = await res.json();
        setEmpleados(data);
      } catch (error) {
        console.error("Error al cargar asistencia:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Asistencia del Personal</h1>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Puesto</th>
              <th className="px-4 py-2 border">Oficina</th>
              <th className="px-4 py-2 border">Hora Entrada</th>
              <th className="px-4 py-2 border">Hora Salida</th>
              <th className="px-4 py-2 border">Estado</th>
            </tr>
          </thead>
          <tbody>
            {empleados.length > 0 ? (
              empleados.map((emp) => (
                <tr key={emp.id} className="text-sm text-gray-800">
                  <td className="px-4 py-2 border">{emp.nombre}</td>
                  <td className="px-4 py-2 border">{emp.puesto}</td>
                  <td className="px-4 py-2 border">{emp.oficina}</td>
                  <td className="px-4 py-2 border">{emp.horaEntrada}</td>
                  <td className="px-4 py-2 border">{emp.horaSalida}</td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        emp.estado === "Presente"
                          ? "bg-green-100 text-green-700"
                          : emp.estado === "Retardo"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {emp.estado}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-4 text-center text-gray-500" colSpan={6}>
                  Cargando datos o no hay registros...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Asistencia;

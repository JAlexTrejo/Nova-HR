
import React, { useEffect, useState } from 'react';

const Registros = () => {
  const [registros, setRegistros] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/asistencias/historial?userId=usuario123`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setRegistros(data))
      .catch(err => console.error('Error al obtener registros:', err));
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <img src="/logo.png" alt="Logo" className="w-24 mx-auto mb-4" />
      <h2 className="text-xl font-bold mb-4 text-center">Mis registros anteriores</h2>
      <table className="w-full table-auto border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className="border px-2">Fecha</th>
            <th className="border px-2">Entrada</th>
            <th className="border px-2">Salida Comida</th>
            <th className="border px-2">Regreso Comida</th>
            <th className="border px-2">Salida</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((r, idx) => (
            <tr key={idx} className="text-center">
              <td className="border px-2">{r.fecha}</td>
              <td className="border px-2">{r.clockIn}</td>
              <td className="border px-2">{r.comidaInicio}</td>
              <td className="border px-2">{r.comidaFin}</td>
              <td className="border px-2">{r.clockOut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Registros;

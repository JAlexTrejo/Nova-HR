
import React, { useState, useEffect } from 'react';

const ReporteNomina = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/nomina/semana?semana=2025-06-09`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(json => setData(json.detalles || []));
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Reporte de Nómina Semanal</h2>
<div className='text-center mb-4'>
  <a href={`${import.meta.env.VITE_API_BASE_URL}/excel/nomina`} target='_blank' className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'>
    Descargar Excel
  </a>
</div>
      <table className="w-full table-auto border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border px-2">Día</th>
            <th className="border px-2">Horas Trabajadas</th>
            <th className="border px-2">Retardo</th>
            <th className="border px-2">Exceso Comida</th>
            <th className="border px-2">Deducción</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, idx) => (
            <tr key={idx} className="text-center">
              <td className="border px-2">{r.dia}</td>
              <td className="border px-2">{r.horasTrabajadas}</td>
              <td className="border px-2">{r.retardo ? 'Sí' : 'No'}</td>
              <td className="border px-2">{r.excesoComida || 0}</td>
              <td className="border px-2">{r.deduccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReporteNomina;


import React, { useState } from 'react';

const Incidencias = () => {
  const [incidencia, setIncidencia] = useState({ userId: '', descripcion: '', fecha: '' });
  const [mensaje, setMensaje] = useState('');
  const token = localStorage.getItem('token');

  const enviar = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/incidencias`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(incidencia)
    });
    const data = await res.json();
    if (res.ok) {
      setMensaje('Incidencia registrada');
      setIncidencia({ userId: '', descripcion: '', fecha: '' });
    } else {
      setMensaje(data.message || 'Error al registrar');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Registrar Incidencia</h2>
      {mensaje && <p className="text-green-600 text-center mb-2">{mensaje}</p>}
      <form onSubmit={enviar} className="space-y-2">
        <input required placeholder="ID del trabajador" className="w-full p-2 border rounded"
          value={incidencia.userId} onChange={e => setIncidencia({ ...incidencia, userId: e.target.value })} />
        <input required placeholder="Fecha (YYYY-MM-DD)" className="w-full p-2 border rounded"
          value={incidencia.fecha} onChange={e => setIncidencia({ ...incidencia, fecha: e.target.value })} />
        <textarea required placeholder="Descripción" className="w-full p-2 border rounded"
          value={incidencia.descripcion} onChange={e => setIncidencia({ ...incidencia, descripcion: e.target.value })} />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Guardar</button>
      </form>
    </div>
  );
};

export default Incidencias;

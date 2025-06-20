
import React, { useState } from 'react';

const AgregarUsuario = () => {
  const [datos, setDatos] = useState({
    nombre: '', email: '', puesto: '', obra: '', residente: '',
    rol: 'User', sueldoHora: 0, sueldoSemanal: 0
  });
  const [mensaje, setMensaje] = useState('');
  const token = localStorage.getItem('token');

  const enviar = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(datos)
    });
    const data = await res.json();
    if (res.ok) {
      setMensaje('Usuario creado exitosamente');
      setDatos({ nombre: '', email: '', puesto: '', obra: '', residente: '', rol: 'User', sueldoHora: 0, sueldoSemanal: 0 });
    } else {
      setMensaje(data.message || 'Error al crear usuario');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Agregar nuevo trabajador</h2>
      {mensaje && <p className="text-green-600 text-center mb-2">{mensaje}</p>}
      <form onSubmit={enviar} className="space-y-2">
        {Object.entries(datos).map(([key, value]) => (
          <input key={key} required className="w-full p-2 border rounded" placeholder={key}
            type={typeof value === 'number' ? 'number' : 'text'}
            value={value} onChange={e => setDatos({ ...datos, [key]: e.target.value })} />
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Guardar</button>
      </form>
    </div>
  );
};

export default AgregarUsuario;

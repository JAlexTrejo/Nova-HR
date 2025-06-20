
import React, { useState } from 'react';

const Perfil = () => {
  const [perfil, setPerfil] = useState({
    nombre: 'Nombre de Ejemplo',
    email: 'correo@ejemplo.com',
    telefono: '',
    cumple: '',
    foto: ''
  });
  const [mensaje, setMensaje] = useState('');

  const actualizar = (e) => {
    e.preventDefault();
    setMensaje('Perfil actualizado (simulado)');
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <img src="/logo.png" alt="Logo" className="w-24 mx-auto mb-4" />
      <h2 className="text-xl font-bold mb-4 text-center">Mi Perfil</h2>
      {mensaje && <p className="text-green-600 text-center">{mensaje}</p>}
      <form onSubmit={actualizar} className="space-y-2">
        <input type="text" className="w-full p-2 border rounded" value={perfil.nombre}
          onChange={e => setPerfil({ ...perfil, nombre: e.target.value })} />
        <input type="email" className="w-full p-2 border rounded" value={perfil.email}
          onChange={e => setPerfil({ ...perfil, email: e.target.value })} />
        <input type="tel" className="w-full p-2 border rounded" placeholder="Teléfono"
          value={perfil.telefono} onChange={e => setPerfil({ ...perfil, telefono: e.target.value })} />
        <input type="date" className="w-full p-2 border rounded"
          value={perfil.cumple} onChange={e => setPerfil({ ...perfil, cumple: e.target.value })} />
        <input type="url" className="w-full p-2 border rounded" placeholder="URL de foto"
          value={perfil.foto} onChange={e => setPerfil({ ...perfil, foto: e.target.value })} />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Guardar cambios</button>
      </form>
    </div>
  );
};

export default Perfil;

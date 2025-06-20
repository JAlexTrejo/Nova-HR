import React, { useEffect, useState } from 'react';

// Definimos la interfaz para el tipado fuerte del usuario
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  puesto: string;
  obra: string;
  rol: string;
}

const AdminUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [token] = useState(localStorage.getItem('token') || '');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Usamos la variable de entorno de Vite
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!token) {
        setError("No se ha encontrado el token de autenticación.");
        setIsLoading(false);
        return;
    }

    const fetchUsuarios = async () => {
        try {
            const res = await fetch(`${API_URL}/usuarios`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Error al cargar usuarios');
            }
            const data: Usuario[] = await res.json();
            setUsuarios(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    fetchUsuarios();
  }, [token, API_URL]);

  const eliminarUsuario = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        return;
    }
    
    try {
        const res = await fetch(`${API_URL}/usuarios/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const data = await res.json();

        if (res.ok) {
          setUsuarios(prevUsuarios => prevUsuarios.filter(u => u.id !== id));
          setMensaje('Usuario eliminado con éxito');
          setError('');
        } else {
          throw new Error(data.message || 'No tienes permisos para eliminar este usuario.');
        }
    } catch(err: any) {
        setError(err.message);
        setMensaje('');
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Cargando usuarios...</div>
  }

  if (error) {
    return <p className="mb-4 text-center text-red-600">{error}</p>
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Administración de Trabajadores</h1>
      {mensaje && <p className="mb-4 text-center text-green-600">{mensaje}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1 border">ID</th>
              <th className="px-2 py-1 border">Nombre</th>
              <th className="px-2 py-1 border">Email</th>
              <th className="px-2 py-1 border">Puesto</th>
              <th className="px-2 py-1 border">Obra</th>
              <th className="px-2 py-1 border">Rol</th>
              <th className="px-2 py-1 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(usuario => (
              <tr key={usuario.id} className="text-center">
                <td className="border px-2">{usuario.id}</td>
                <td className="border px-2">{usuario.nombre}</td>
                <td className="border px-2">{usuario.email}</td>
                <td className="border px-2">{usuario.puesto}</td>
                <td className="border px-2">{usuario.obra}</td>
                <td className="border px-2">{usuario.rol}</td>
                <td className="border px-2 space-x-1">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600">
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarUsuario(usuario.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsuarios;
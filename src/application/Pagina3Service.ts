// src/application/Pagina3Service.ts

import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

interface Usuarios {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  telefono: string;
  fecha_nacimiento: string;
  rol: string | null;
  id_proyecto?: number | null;
}

export async function obtenerUsuarios(): Promise<Usuarios[]> {
  try {
    const response = await axios.get('http://localhost:4000/usuarios/datos', {
      headers: {
        'Authorization': `Bearer ${cookies.get('token')}`
      }
    });

    if (Array.isArray(response.data.rows)) {
      // Filtrar solo los usuarios con rol 'cliente'
      const usuariosFiltrados = response.data.rows.filter((usuario: Usuarios) => usuario.rol === 'cliente');
      return usuariosFiltrados;
    } else {
      console.error('La respuesta de la API no es un arreglo de usuario:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return [];
  }
}

export async function eliminarUsuario(id: number): Promise<void> {
  try {
    await axios.delete(`http://localhost:4000/usuEliminar/${id}`, {
      headers: {
        'Authorization': `Bearer ${cookies.get('token')}`
      }
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw new Error('Cancelación: El usuario tiene un proyecto asociado');
  }
}

// src/application/UsuarioService.ts
/*import axios from 'axios';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  fecha_nacimiento: string;
  username: string;
}

export const actualizarUsuario = async (usuario: Usuario): Promise<void> => {
  try {
    const usuarioFormateado = {
      ...usuario,
      fecha_nacimiento: formatearFecha(usuario.fecha_nacimiento)
    };
    await axios.put(`http://localhost:4000/usuarios/modificar/${usuario.id}`, usuarioFormateado);
    console.log('Usuario actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw new Error('Error al actualizar el usuario');
  }
};

const formatearFecha = (fecha: string): string => {
  const date = new Date(fecha);
  const year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};*/


// DIRECTUS
//UsuarioService.ts
import axios from 'axios';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  telefono: number;
  fecha_nacimiento: string;
  username: string;
  password: string;
  id_proyecto: number | null;
  rol: string;
}

export const obtenerUsuariosPorRol = async (rolId: string): Promise<Usuario[]> => {
  try {
    const response = await axios.get(`http://localhost:8055/users?filter[role]=8e86c02e-1ef4-4765-aba9-537923a19ffb&fields=first_name`);
    
    // Verificar si la respuesta contiene los datos esperados
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      throw new Error('La respuesta no contiene los datos esperados');
    }
  } catch (error) {
    console.error('Error al obtener los usuarios por rol:', error);
    throw new Error('Error al obtener los usuarios por rol');
  }
};


export const actualizarUsuario = async (usuario: Usuario): Promise<void> => {
  try {
    const usuarioFormateado = {
      ...usuario,
      fecha_nacimiento: formatearFecha(usuario.fecha_nacimiento)
    };
    await axios.put(`http://localhost:4000/usuarios/modificar/${usuario.id}`, usuarioFormateado);
    console.log('Usuario actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw new Error('Error al actualizar el usuario');
  }
};


const formatearFecha = (fecha: string): string => {
  const date = new Date(fecha);
  const year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
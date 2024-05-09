// src/application/UsuarioService.ts
import axios from 'axios';

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
};


export const quitarProjUsuario = async (usuario: Usuario): Promise<void> => {
  try {
    await axios.put(`http://localhost:4000/usuarios/quitar/${usuario.id}`, usuario);
    console.log('Usuario actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw new Error('Error al actualizar el usuario');
  }
};

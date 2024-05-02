// src/application/ProyectoService.ts
import axios from 'axios';

export interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  cuantia: string;
  fecha_inicio: string;
  fecha_fin: string;
  id_staff: string;
}

export interface Usuario {
  id: string;
  nombre: string;
}

export const obtenerUsuarios = async (): Promise<Usuario[]> => {
  try {
    const response = await axios.get('http://localhost:4000/usuarios/ids-nombres');
    return response.data.rows;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw new Error('Error al obtener usuarios');
  }
};

export const actualizarProyecto = async (proyecto: Proyecto): Promise<void> => {
  try {
    const proyectoFormateado = {
      ...proyecto,
      fecha_inicio: formatearFecha(proyecto.fecha_inicio),
      fecha_fin: formatearFecha(proyecto.fecha_fin)
    };
    await axios.put(`http://localhost:4000/proyecto/${proyecto.id}`, proyectoFormateado);
    console.log('Proyecto actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el proyecto:', error);
    throw new Error('Error al actualizar el proyecto');
  }
};

const formatearFecha = (fecha: string): string => {
  const date = new Date(fecha);
  const year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

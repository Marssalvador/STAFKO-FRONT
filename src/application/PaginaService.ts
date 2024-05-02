import axios from 'axios';
import { Proyecto, Staff } from '../domain/types';

export const PaginaService = {
  obtenerProyectosUsuario: async (token: string | undefined): Promise<Proyecto[]> => {
    try {
      const response = await axios.get('http://localhost:4000/proyecto', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.rows;
    } catch (error) {
      console.error('Error al obtener proyectos del usuario:', error);
      throw new Error('Error al obtener proyectos del usuario');
    }
  },

  obtenerUsuariosPorProyecto: async (proyectoId: number): Promise<Staff[]> => {
    try {
      const response = await axios.get(`http://localhost:4000/usuarios/datos2/${proyectoId}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener usuarios del proyecto ${proyectoId}:`, error);
      throw new Error(`Error al obtener usuarios del proyecto ${proyectoId}`);
    }
  },

  actualizarProyecto: async (proyecto: Proyecto): Promise<void> => {
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
  },

  eliminarProyecto: async (id: number, token: string | undefined): Promise<void> => {
    try {
      await axios.delete(`http://localhost:4000/proyectoEliminar/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Proyecto eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
      throw new Error('Error al eliminar proyecto');
    }
  }
};

const formatearFecha = (fecha: string): string => {
  const date = new Date(fecha);
  const year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

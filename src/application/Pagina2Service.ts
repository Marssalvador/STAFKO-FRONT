// application/Pagina2Service.ts
import axios from 'axios';
import { Staff } from '../domain/types';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const obtenerStaffs = async (): Promise<Staff[]> => {
  try {
    const response = await axios.get('http://localhost:4000/usuarios/datos', {
      headers: {
        'Authorization': `Bearer ${cookies.get('token')}`
      }
    });

    if (Array.isArray(response.data.rows)) {
      const staffFiltrado = response.data.rows.filter((staff: Staff) => staff.rol === 'staff');
      return staffFiltrado;
    } else {
      console.error('La respuesta de la API no es un arreglo de staff:', response.data);
      throw new Error('La respuesta de la API no es un arreglo de staff');
    }
  } catch (error) {
    console.error('Error al obtener staff:', error);
    throw new Error('Error al obtener staff');
  }
};

export const eliminarStaff = async (id: number): Promise<void> => {
  try {
    await axios.delete(`http://localhost:4000/usuEliminar/${id}`, {
      headers: {
        'Authorization': `Bearer ${cookies.get('token')}`
      }
    });
  } catch (error) {
    console.error('Error al eliminar staff:', error);
    throw new Error('Error al eliminar staff');
  }
};

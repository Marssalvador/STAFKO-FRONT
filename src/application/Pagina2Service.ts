// application/Pagina2Service.ts
// DIRECTUS

import axios from 'axios';
import { Staff } from '../domain/types';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const obtenerStaffs = async (): Promise<Staff[]> => {
  const accessToken = cookies.get('access_token');
  
  // Antes de realizar la solicitud
  console.log('Token de acceso incluido en la solicitud:', accessToken); // Agregar esta línea para imprimir el token de acceso incluido en la solicitud

  if (!accessToken) {
    throw new Error('Token de acceso no encontrado en las cookies');
  }

  const response = await axios.get('http://localhost:8055/users?filter[role]=a68f33cb-127c-45da-92e9-ea1ddb4ac7fd&fields=first_name', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (Array.isArray(response.data.data)) {
    return response.data.data;
  } else {
    console.error('La respuesta de la API no es un arreglo de staff:', response.data);
    throw new Error('La respuesta de la API no es un arreglo de staff');
  }
};


export const eliminarStaff = async (id: number): Promise<void> => {
  try {
    const accessToken = cookies.get('access_token');
    if (!accessToken) {
      throw new Error('Token de acceso no encontrado en las cookies');
    }

    await axios.delete(`http://localhost:8055/usuarios/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
  } catch (error) {
    console.error('Error al eliminar staff:', error);
    throw new Error('Error al eliminar staff');
  }
};


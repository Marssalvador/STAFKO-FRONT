// src/application/Pagina3Service.ts
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

  const response = await axios.get('http://localhost:8055/users?filter[role]=8e86c02e-1ef4-4765-aba9-537923a19ffb&fields=first_name', {
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


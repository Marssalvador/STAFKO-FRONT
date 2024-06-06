// src/application/Pagina3Service.ts
// DIRECTUS

import axios from 'axios';
import { Staff } from '../domain/types';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const obtenerStaffs = async (): Promise<Staff[]> => {
  const accessToken = cookies.get('access_token');
  
  //antes de realizar la solicitud
  console.log('Token de acceso incluido en la solicitud:', accessToken); 

  //comprobamos si existe el token en las cookies
  if (!accessToken) {
    throw new Error('Token de acceso no encontrado en las cookies');
  }

  //hacemos la llamada al rol que corresponde
  const response = await axios.get('http://localhost:8055/users?filter[role]=2290deb2-f0ed-4502-9ff9-013fdcbcae0c&fields=first_name', {
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


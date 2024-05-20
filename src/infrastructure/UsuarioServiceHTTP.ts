// src/infrastructure/UsuarioServiceHTTP.ts

/*const API_URL = 'http://localhost:4000/usuarios/insertar';

export async function agregarNuevoUsuario(nuevoUsuario: any): Promise<any> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoUsuario),
    });

    if (!response.ok) {
      throw new Error('Error al agregar usuario');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al agregar usuario:', error.message);
    throw error;
  }
}*/


//Directus
// src/infrastructure/UsuarioServiceHTTP.ts

const API_URL = 'http://localhost:8055/items/usuarios/'; // La URL de la API de Directus para usuarios
import Cookies from 'universal-cookie';

export async function agregarNuevoUsuario(nuevoUsuario: any): Promise<any> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${new Cookies().get('access_token')}`,
      },
      body: JSON.stringify({
        ...nuevoUsuario,
        // Asegúrate de que los nombres de las propiedades coincidan con los campos de tu colección de usuarios en Directus
        // Si las propiedades no coinciden, deberás mapearlas adecuadamente
      }),
    });

    if (!response.ok) {
      throw new Error('Error al agregar usuario');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al agregar usuario:', error.message);
    throw error;
  }
}


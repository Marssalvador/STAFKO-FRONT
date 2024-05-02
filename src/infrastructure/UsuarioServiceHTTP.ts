// src/infrastructure/UsuarioServiceHTTP.ts

const API_URL = 'http://localhost:4000/usuarios/insertar';

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
}

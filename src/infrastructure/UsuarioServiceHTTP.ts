import Cookies from 'universal-cookie';

const API_URL = 'http://localhost:8055/items/usuarios/';

export async function agregarNuevoUsuario(nuevoUsuario: any): Promise<any> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${new Cookies().get('access_token')}`,
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

export async function actualizarUsuario(usuarioActualizado: any): Promise<any> {
  try {
    const response = await fetch(`${API_URL}${usuarioActualizado.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${new Cookies().get('access_token')}`,
      },
      body: JSON.stringify(usuarioActualizado),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar usuario');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al actualizar usuario:', error.message);
    throw error;
  }
}

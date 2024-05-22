import { Proyecto, Staff } from '../domain/types';
import Cookies from 'universal-cookie';

export class ProyectoServiceHTTP {

  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async añadirProyecto(nuevoProyecto: Proyecto): Promise<void> {
    try {
      const response = await fetch(`${this.baseURL}/items/proyecto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${new Cookies().get('access_token')}`,
        },
        body: JSON.stringify(nuevoProyecto),
      });

      if (!response.ok) {
        const errorDetail = await response.json();  // Capturar los detalles del error
        console.error('Detalles del error:', errorDetail);
        throw new Error('Error al agregar el nuevo proyecto');
      }

      console.log('Nuevo proyecto agregado correctamente');
    } catch (error) {
      console.error('Error al agregar el nuevo proyecto:', error);
      throw error;
    }
  }

  async actualizarProyecto(proyectoActualizado: Proyecto): Promise<void> {
    try {
      const response = await fetch(`${this.baseURL}/items/proyecto/${proyectoActualizado.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${new Cookies().get('access_token')}`,
        },
        body: JSON.stringify(proyectoActualizado),
      });

      if (!response.ok) {
        const errorDetail = await response.json();  // Capturar los detalles del error
        console.error('Detalles del error:', errorDetail);
        throw new Error('Error al actualizar el proyecto');
      }

      console.log('Proyecto actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error);
      throw error;
    }
  }

  async obtenerStaffs(): Promise<Staff[]> {
    const response = await fetch(`${this.baseURL}/items/usuarios?fields=nombre&fields=id`, {
      headers: {
        'Authorization': `Bearer ${new Cookies().get('access_token')}`,
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }

    const data = await response.json();

    if (data && Array.isArray(data.data)) {
      return data.data.map((usuario: any) => ({
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: "",
        username: "",
        telefono: "",
        fecha_nacimiento: "",
        rol: "staff"
      }));
    } else {
      throw new Error('La respuesta de la API no contiene un arreglo de usuarios en la propiedad "data"');
    }
  }
}

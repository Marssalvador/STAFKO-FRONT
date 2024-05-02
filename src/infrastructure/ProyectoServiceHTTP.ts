// src/infrastructure/ProyectoServiceHTTP.ts

import { Proyecto, Staff } from '../domain/types'; // Suponiendo que tienes definidos los tipos en otro archivo

export class ProyectoServiceHTTP {
  async añadirProyecto(proyecto: Proyecto): Promise<void> {
    // Implementación para enviar solicitud HTTP para añadir proyecto
    const response = await fetch('http://localhost:4000/proyecto/insertar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proyecto),
    });
    if (!response.ok) {
      throw new Error('Error al añadir proyecto');
    }
  }

  async obtenerStaffs(): Promise<Staff[]> {
    const response = await fetch('http://localhost:4000/usuarios/ids-nombres');
    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }
    const data = await response.json();
    if (data && Array.isArray(data.rows)) {
      return data.rows;
    } else {
      throw new Error('La respuesta de la API no contiene un arreglo de usuarios en la propiedad "rows"');
    }
  }
}

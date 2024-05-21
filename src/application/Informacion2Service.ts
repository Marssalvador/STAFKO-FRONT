// src/application/Informacion2Service.ts
import axios from 'axios';

export class Informacion2Service {
  async obtenerNombreProyecto(idProyecto: string): Promise<string> {
    try {
      const response = await axios.get(`http://localhost:4000/proyectos/datos/${idProyecto}`);
      return response.data; // Suponiendo que el nombre está en el cuerpo de la respuesta
    } catch (error) {
      console.error('Error al obtener nombre del proyecto:', error);
      throw new Error('Error al obtener nombre del proyecto');
    }
  }
}

export default Informacion2Service;


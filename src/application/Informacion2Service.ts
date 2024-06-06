import axios from 'axios';

export class Informacion2Service {
  async obtenerNombreProyecto(idProyecto: string): Promise<string> {
    try {
      //solicitud GET al servidor para obtener el nombre del proyecto
      const response = await axios.get(`http://localhost:8055/items/proyectos/${idProyecto}`);
      
      //devuelve el nombre del proyecto si está disponible, de lo contrario, devuelve 'No disponible'
      return response.data?.nombre || 'No disponible'; 

    } catch (error) {
      console.error('Error al obtener nombre del proyecto:', error);
      throw new Error('Error al obtener nombre del proyecto');
    }
  }
}

export default Informacion2Service;

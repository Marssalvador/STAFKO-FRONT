// Servicio (Puerto)
import axios from 'axios';

export class StaffService {
  async obtenerNombreStaff(idStaff: string): Promise<string> {
    try {
      const response = await axios.get(`http://localhost:4000/usuarios/datos/${idStaff}`);
      return response.data; // Suponiendo que el nombre está en el cuerpo de la respuesta
    } catch (error) {
      throw new Error('Error al obtener nombre del staff');
    }
  }
}

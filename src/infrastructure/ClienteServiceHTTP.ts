// En el archivo InformacionService.ts
import axios from 'axios';
import { Staff } from '../domain/types';

export class StaffService {
  static async actualizarCliente(cliente: Staff): Promise<void> {
    try {
      // Hacer la llamada a la API para actualizar el cliente en la base de datos
      await axios.put(`/usuarios/quitar/${cliente.id}`, cliente);
    } catch (error) {
      throw new Error(`Error al quitar el proyecto asignado al cliente: ${error.message}`);
    }
  }
}

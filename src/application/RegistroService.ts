import { Staff } from '../domain/types';
import axios from 'axios';

interface Registroervice {
  agregarStaff(nuevoStaff: Staff): Promise<void>;
}

const Registroervice: Registroervice = {
  async agregarStaff(nuevoStaff: Staff): Promise<void> {
    try {
      await axios.post('http://localhost:4000/usuarios/insertar', nuevoStaff);
    } catch (error) {
      throw new Error('Error al agregar staff');
    }
  }
};

export default Registroervice;

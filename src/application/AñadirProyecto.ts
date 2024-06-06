// AñadirProyecto.ts

import { Proyecto, Staff } from '../domain/types';
import { ProyectoServiceHTTP } from '../infrastructure/ProyectoServiceHTTP';

//definición de la interfaz del servicio de proyecto
interface ProyectoService {
  añadirProyecto(proyecto: Proyecto): Promise<void>;
  obtenerStaffs(): Promise<Staff[]>;
}

//URL base de la API
const API_BASE_URL = 'http://localhost:8055';

export const useAñadirProyecto = (proyectoService: ProyectoService = new ProyectoServiceHTTP(API_BASE_URL)): {
  añadir: (proyecto: Proyecto) => Promise<void>,
  obtenerStaffs: () => Promise<Staff[]>
} => {
  const añadir = async (proyecto: Proyecto) => {
    await proyectoService.añadirProyecto(proyecto);
  };

  const obtenerStaffs = async () => {
    return await proyectoService.obtenerStaffs();
  };

  return {
    añadir,
    obtenerStaffs
  };
};

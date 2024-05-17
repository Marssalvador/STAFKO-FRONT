// src/application/AñadirProyecto.ts

import { Proyecto, Staff } from '../domain/types'; // Suponiendo que tienes definidos los tipos en otro archivo
import { ProyectoServiceHTTP } from '../infrastructure/ProyectoServiceHTTP';

interface ProyectoService {
  añadirProyecto(proyecto: Proyecto): Promise<void>;
  obtenerStaffs(): Promise<Staff[]>;
}

export const useAñadirProyecto = (proyectoService: ProyectoService = new ProyectoServiceHTTP()): {
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

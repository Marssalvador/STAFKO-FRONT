// src/application/AñadirUsuarios.ts

import { agregarNuevoUsuario as agregarUsuarioHTTP } from "../infrastructure/UsuarioServiceHTTP";

export async function agregarNuevoUsuario(nuevoUsuario: any): Promise<any> {
  try {
    const response = await agregarUsuarioHTTP(nuevoUsuario); // Cambiado el nombre de la función aquí
    return response;
  } catch (error) {
    throw error;
  }
}

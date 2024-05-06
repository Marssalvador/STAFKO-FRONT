// src/application/AñadirUsuarios.ts

import { agregarNuevoUsuario as agregarUsuarioHTTP } from "../infrastructure/UsuarioServiceHTTP";

export async function agregarNuevoUsuario(nuevoUsuario: any): Promise<any> {
  try {
    const response = await agregarUsuarioHTTP(nuevoUsuario); 
    return response;
  } catch (error) {
    throw error;
  }
}

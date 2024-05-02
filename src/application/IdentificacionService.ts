// src/application/IdentificacionService.ts
import { IdentificacionService } from '../infrastructure/IdentificacionService';

export const IdentificacionAppService = {
  iniciarSesion: async (username: string, password: string) => {
    return await IdentificacionService.iniciarSesion(username, password);
  }
};

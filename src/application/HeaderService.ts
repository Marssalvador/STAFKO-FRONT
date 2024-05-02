// src/application/HeaderService.ts
import { HeaderService } from '../infrastructure/HeaderService';

export const HeaderAppService = {
  cerrarSesion: async () => {
    await HeaderService.cerrarSesion();
  }
};

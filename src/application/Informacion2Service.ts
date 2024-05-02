// src/application/Informacion2Service.ts

import { Staff, Proyecto } from '../domain/types';

class Informacion2Service {
  static obtenerNombreProyecto(usuario: Staff, proyectos: Proyecto[]): string | null {
    if (usuario.id !== undefined) {
      const nombreProyecto = proyectos.find(proyecto => proyecto.id === usuario.id)?.nombre || null;
      return nombreProyecto;
    }
    return null;
  }
}

export default Informacion2Service;

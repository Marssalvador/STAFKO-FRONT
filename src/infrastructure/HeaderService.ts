// HeaderService.ts

import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
let intervaloInicioSesion: NodeJS.Timeout | null = null;

export const HeaderService = {
  cerrarSesion: async () => {
    const loggedInUsername = cookies.get('username');

    if (!loggedInUsername) {
      console.error('No se pudo obtener el nombre de usuario');
      return;
    }

    // Detener el contador de inicio de sesión cuando se cierre la sesión
    await detenerContadorSesion(); // Esperamos a que se detenga el contador

    cookies.remove('id', { path: "/" });
    cookies.remove("apellido", { path: "/" });
    cookies.remove("nombre", { path: "/" });
    cookies.remove("username", { path: "/" });
    cookies.remove("rol", { path: "/" });

    window.location.href = './';
  }
};


export const enviarRegistroDeTiempo = async (description: string) => {
  try {
    const userId = cookies.get('id');

    if (!userId) {
      console.error('No se pudo obtener el ID del usuario');
      return;
    }

    const projectId = await obtenerIdProyecto();

    if (projectId) {
      const response = await axios.post(
        `https://api.clockify.me/api/v1/workspaces/6630a84256361a516299a6a5/time-entries`,
        {
          start: new Date().toISOString(),
          description: description,
          projectId: projectId,
          userId: userId,
        },
        {
          headers: {
            'X-Api-Key': 'NGMyODhkMjItNDNiMi00MWY1LWI1YTctNGU4MDRjNzZkMDVi',
          },
        }
      );
      console.log('Registro de tiempo enviado correctamente:', response.data);
    } else {
      console.error('No se pudo obtener el ID del proyecto "STAFKO"');
    }
  } catch (error) {
    console.error('Error al enviar el registro de tiempo a Clockify:', error);
  }
};

export const iniciarContadorSesion = () => {
  // Verificar si ya hay un intervalo activo
  if (!intervaloInicioSesion) {
    intervaloInicioSesion = setInterval(() => {
      console.log("Contador de inicio de sesión activo");
    }, 1000); // Intervalo de actualización (en milisegundos)
  }
};

export const detenerContadorSesion = () => {
  console.log("Deteniendo contador de sesión...");
  if (intervaloInicioSesion) {
    clearInterval(intervaloInicioSesion);
    intervaloInicioSesion = null; // Reiniciar la variable de intervalo
    console.log("Contador de sesión detenido.");
  } else {
    console.log("El contador de sesión no estaba activo.");
  }
};



const obtenerIdProyecto = async () => {
  try {
    const response = await axios.get(
      `https://api.clockify.me/api/v1/workspaces/6630a84256361a516299a6a5/projects`,
      {
        headers: {
          'X-Api-Key': 'NGMyODhkMjItNDNiMi00MWY1LWI1YTctNGU4MDRjNzZkMDVi',
        },
      }
    );

    const projects = response.data;
    const stafkoProject = projects.find((project: any) => project.name === "STAFKO");
    if (stafkoProject) {
      return stafkoProject.id;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al obtener los proyectos de Clockify:', error);
    return null;
  }
};

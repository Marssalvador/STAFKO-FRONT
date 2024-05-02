// src/infrastructure/HeaderService.ts
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const HeaderService = {
  cerrarSesion: async () => {
    cookies.remove('id', { path: "/" });
    cookies.remove("apellido", { path: "/" });
    cookies.remove("nombre", { path: "/" });
    cookies.remove("username", { path: "/" });

    await enviarRegistroDeTiempo("Cierre de sesión en la aplicación");

    window.location.href = './';
  }
};

const enviarRegistroDeTiempo = async (description: string) => {
  try {
    const projectId = await obtenerIdProyecto();

    if (projectId) {
      const response = await axios.post(
        `https://api.clockify.me/api/v1/workspaces/6630a84256361a516299a6a5/time-entries`,
        {
          start: new Date().toISOString(),
          description: description,
          projectId: projectId
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

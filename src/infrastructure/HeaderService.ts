import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
let intervaloInicioSesion: boolean = false; 

export const cerrarSesion = async (setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>) => {
  const loggedInUsername = cookies.get('username');

  if (!loggedInUsername) {
    console.error('No se pudo obtener el nombre de usuario');
    return;
  }

  detenerContadorSesion();

  // Limpiar cookies y redirigir a la página de inicio
  cookies.remove('id', { path: "/" });
  cookies.remove("apellido", { path: "/" });
  cookies.remove("nombre", { path: "/" });
  cookies.remove("username", { path: "/" });
  cookies.remove("rol", { path: "/" });

  setIsLoggedIn(false);
  window.location.href = './';
};


export const detenerContadorSesion = async () => {
  console.log("Deteniendo contador de sesión...");
  
  if (intervaloInicioSesion) {
    // Si el contador está activo, lo detenemos
    intervaloInicioSesion = false;

    try {
      // Enviar una solicitud para terminar el seguimiento del tiempo en Clockify
      const response = await axios.post(
        `https://api.clockify.me/api/v1/workspaces/6630a84256361a516299a6a5/time-entries`,
        {
          end: new Date().toISOString()
        },
        {
          headers: {
            'X-Api-Key': 'NGMyODhkMjItNDNiMi00MWY1LWI1YTctNGU4MDRjNzZkMDVi',
          },
        }
      );
      console.log('Contador de sesión pausado correctamente:', response.data);
    } catch (error) {
      console.error('Error al pausar el contador de sesión en Clockify:', error);
    }

  } else {
    console.log("El contador de sesión no estaba activo.");
  }
};



export const iniciarContadorSesion = async (description: string) => {
  console.log("Iniciando contador de sesión...");
  
  try {
    const userId = cookies.get('id');

    if (!userId) {
      console.error('No se pudo obtener el ID del usuario');
      return;
    }

    const projectId = await obtenerIdProyecto();

    if (projectId) {
      // Si el contador ya está activo, no hacemos nada
      if (intervaloInicioSesion) {
        console.log("El contador de sesión ya está iniciado.");
        return;
      }

      // Enviar una solicitud para iniciar el seguimiento del tiempo en Clockify
      const response = await axios.post(
        `https://api.clockify.me/api/v1/workspaces/6630a84256361a516299a6a5/time-entries`,
        {
          start: new Date().toISOString(),
          description: description, // Utiliza la descripción proporcionada por el usuario
          projectId: projectId,
          userId: userId,
        },
        {
          headers: {
            'X-Api-Key': 'NGMyODhkMjItNDNiMi00MWY1LWI1YTctNGU4MDRjNzZkMDVi',
          },
        }
      );
      console.log('Contador de sesión iniciado correctamente:', response.data);

      // Establecer intervaloInicioSesion a true cuando se inicie el contador
      intervaloInicioSesion = true;
    } else {
      console.error('No se pudo obtener el ID del proyecto "STAFKO"');
    }
  } catch (error) {
    console.error('Error al iniciar el contador de sesión en Clockify:', error);
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

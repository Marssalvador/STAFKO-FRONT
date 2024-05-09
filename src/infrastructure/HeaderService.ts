import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
let intervaloInicioSesion: boolean = false; 

//Cuando iniciamos sesion en nuestra web el usuario introduce la tarea en la que va a trabajar
// y se inicia el contador en Clockify poniendo en la descripción dicha tarea junto al nombre del usuario que ha iniciado sesión.
//Al Cerrar Sesión en nuestra web automáticamente se detiene el contador y se guarda en el registro de tiempo junto con los datos insertados.

export const cerrarSesion = async (setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>) => {
  const loggedInUsername = cookies.get('username');

  if (!loggedInUsername) {
    console.error('No se pudo obtener el nombre de usuario');
    return;
  }

  detenerContadorSesion();

  //Limpiamos cookies y redirigimos a la página de inicio
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
  
  try {
    const workspaceId = '6630a84256361a516299a6a5'; //ID de tu espacio de trabajo en Clockify

    //Enviar una solicitud para detener el seguimiento del tiempo en Clockify
    const response = await axios.patch(
      `https://api.clockify.me/api/v1/workspaces/${workspaceId}/user/6630a84256361a516299a6a4/time-entries`,
      {
        end: new Date().toISOString(),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'NGMyODhkMjItNDNiMi00MWY1LWI1YTctNGU4MDRjNzZkMDVi',
        }
      }
    );
    console.log('Contador de sesión pausado correctamente:', response.data);
    clearInterval('6630a84256361a516299a6a4');
    setTimeout;
    
    
  } catch (error) {
    console.error('Error al pausar el contador de sesión en Clockify:', error);
  }
};


export const iniciarContadorSesion = async (description: string) => {
  console.log("Iniciando contador de sesión...");
  
  try {
    const projectId = await obtenerIdProyecto();

    if (projectId) {

      //Si el contador ya está activo, no hacemos nada
      if (intervaloInicioSesion) {
        console.log("El contador de sesión ya está iniciado.");
        return;
      }

      //Enviar solicitud para iniciar el seguimiento del tiempo en Clockify
      const response = await axios.post(
        `https://api.clockify.me/api/v1/workspaces/6630a84256361a516299a6a5/time-entries`,
        {
          start: new Date().toISOString(),
          description: description, 
          projectId: projectId,
        },
        {
          headers: {
            'X-Api-Key': 'NGMyODhkMjItNDNiMi00MWY1LWI1YTctNGU4MDRjNzZkMDVi',
          },
        }
      );
      console.log('Contador de sesión iniciado correctamente:', response.data);

      //Lo pone a true cuando se inicie el contador
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

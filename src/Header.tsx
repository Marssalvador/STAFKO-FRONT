import React from 'react';
import './Header.css'; 
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const staff = () => {
  window.location.href = './pagina2';
};

const proyectos = () => {
  window.location.href = './pagina';
};

const clientes = () => {
  window.location.href = './pagina3';
};

const cerrarSesion = async () => {
  cookies.remove('id', { path: "/" });
  cookies.remove("apellido", { path: "/" });
  cookies.remove("nombre", { path: "/" });
  cookies.remove("username", { path: "/" });

  await enviarRegistroDeTiempo("Cierre de sesión en la aplicación");

  window.location.href = './';
};

const enviarRegistroDeTiempo = async (description: string) => {
    try {
        //obtener el ID del proyecto "STAFKO" de Clockify
        const projectId = await obtenerIdProyecto();

        //verificar si se obtuvo el ID del proyecto
        if (projectId) {
            //enviar la solicitud para registrar el tiempo con el ID del proyecto
            const response = await axios.post(
                `https://api.clockify.me/api/v1/workspaces/6630a84256361a516299a6a5/time-entries`,
                {
                    start: new Date().toISOString(),
                    description: description,
                    projectId: projectId //incluir el ID del proyecto
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
        //realizar una solicitud para obtener todos los proyectos de Clockify
        const response = await axios.get(
            `https://api.clockify.me/api/v1/workspaces/6630a84256361a516299a6a5/projects`,
            {
                headers: {
                    'X-Api-Key': 'NGMyODhkMjItNDNiMi00MWY1LWI1YTctNGU4MDRjNzZkMDVi',
                },
            }
        );

        //buscar el ID del proyecto con nombre "STAFKO"
        const projects = response.data;
        const stafkoProject = projects.find((project: any) => project.name === "STAFKO");
        if (stafkoProject) {
            return stafkoProject.id; //devolver el ID del proyecto "STAFKO"
        } else {
            return null; //si no se encuentra el proyecto "STAFKO", devolver null
        }
    } catch (error) {
        console.error('Error al obtener los proyectos de Clockify:', error);
        return null;
    }
};

const Header: React.FC = () => {
  const isLoggedIn = cookies.get('username') !== undefined;

  if (!isLoggedIn){
    return null; //si el usuario no está autenticado, no renderizar el header
  }

  return (
    <header className="header">
      <img src="/logo.png" alt="Logo" className="logo" />
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <a href="#" onClick={staff}>Staff</a>
          </li>  
          <li>
            <a href="#" onClick={proyectos}>Proyectos</a>
          </li>
          <li>
            <a href="#" onClick={clientes}>Clientes</a>
          </li>
        </ul>
      </nav>
      <button onClick={cerrarSesion} className='cerrarSesion'>Cerrar sesión</button>
    </header>

  );
};

export default Header;


/*

VERSION SIN CLOCKIFY

import React from 'react';
import './Header.css'; 
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const staff = () => {
  window.location.href = './pagina2';
};

const proyectos = () => {
  window.location.href = './pagina';
};

const clientes = () => {
  window.location.href = './pagina3';
};

const cerrarSesion = () => {
  cookies.remove('id', { path: "/" });
  cookies.remove("apellido", { path: "/" });
  cookies.remove("nombre", { path: "/" });
  cookies.remove("username", { path: "/" });

  window.location.href = './';
};

const Header: React.FC = () => {
  const isLoggedIn = cookies.get('username') !== undefined;

  if (!isLoggedIn) {
    return null; //si el usuario no está autenticado, no renderizar el header
  }

  return (
    <header className="header">
      <img src="/logo.png" alt="Logo" className="logo" />
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <a href="#" onClick={staff}>Staff</a>
          </li>  
          <li>
            <a href="#" onClick={proyectos}>Proyectos</a>
          </li>
          <li>
            <a href="#" onClick={clientes}>Clientes</a>
          </li>
        </ul>
      </nav>
      <button onClick={cerrarSesion} className='cerrarSesion'>Cerrar sesión</button>
    </header>

  );
};

export default Header;*/

// Header.tsx

import React, { useState, useEffect } from 'react';
import { cerrarSesion } from '../infrastructure/HeaderService'; 
import './Header.css'; 
import Reloj from './Reloj';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Estado para el inicio de sesión
  const [isPagina, setIsPagina] = useState(false); // Estado para verificar si estamos en /pagina

  // Maneja el cierre de sesión
  const cerrarSesionHandler = async () => {
    await cerrarSesion(setIsLoggedIn); // Llama a la función de cierre de sesión pasando setIsLoggedIn como argumento

    // Envía un evento de cierre de sesión
    window.dispatchEvent(new Event('logout'));
  };
  
  const currentPath = window.location.pathname; // Obtiene la ruta actual del navegador

  // Verifica si estamos en /pagina
  useEffect(() => {
    setIsPagina(currentPath === '/pagina' || currentPath === '/pagina2' || currentPath === '/pagina3');
  }, [currentPath]);

  // Si no hay un usuario logueado o la ruta actual es '/', no muestra el encabezado
  if (!isLoggedIn || currentPath === '/' || currentPath === '/registro') {
    return null;
  }


  // Renderiza el encabezado si hay un usuario logueado y la ruta actual no es '/'
  return (
    <header className="header">
      <img src="/logo.png" alt="Logo" className="logo" />
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <a href="./pagina2">Staff</a>
          </li>
          <li>
            <a href="./pagina">Proyectos</a>
          </li>
          <li>
            <a href="./pagina3">Clientes</a>
          </li>
        </ul>
      </nav>

      <Reloj style={{ display: isPagina ? 'none' : 'block', marginLeft: isPagina ? 0 : '15rem' }} />


      <button onClick={cerrarSesionHandler} className='cerrarSesion'>Cerrar sesión</button>
    </header>
  );
};

export default Header;

// Header.tsx

import React, { useState, useEffect } from 'react';
import { cerrarSesion } from '../infrastructure/HeaderService'; 
import './Header.css'; 

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); //Estado para el inicio de sesión

  //Maneja el cierre de sesión
  const cerrarSesionHandler = async () => {
    await cerrarSesion(setIsLoggedIn); //Llama a la función de cierre de sesión pasando setIsLoggedIn como argumento
  };
  
  const currentPath = window.location.pathname; //Obtiene la ruta actual del navegador

  //Si no hay un usuario logueado o la ruta actual es '/', no muestra el encabezado
  if (!isLoggedIn || currentPath === '/') {
    return null;
  }

  //Renderiza el encabezado si hay un usuario logueado y la ruta actual no es '/'
  return (
    <header className="header">
      <img src="/logo.png" alt="Logo" className="logo" />
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <a href="#">Staff</a>
          </li>
          <li>
            <a href="#">Proyectos</a>
          </li>
          <li>
            <a href="#">Clientes</a>
          </li>
        </ul>
      </nav>
      <button onClick={cerrarSesionHandler} className='cerrarSesion'>Cerrar sesión</button>
    </header>
  );
};

export default Header;

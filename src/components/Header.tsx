// Header.tsx

import React, { useState, useEffect } from 'react';
import { cerrarSesion } from '../infrastructure/HeaderService';
import './Header.css';
import Cookies from 'universal-cookie';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Estado para el inicio de sesión
  const cookies = new Cookies();

  const cerrarSesionHandler = async () => {
    await cerrarSesion(setIsLoggedIn); // Pasar setIsLoggedIn como argumento
  };
  
  const currentPath = window.location.pathname;

  if (!isLoggedIn || currentPath === '/') {
    return null;
  }

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

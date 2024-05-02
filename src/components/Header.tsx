// src/components/Header.tsx
import React, { useState } from 'react';
import { HeaderAppService } from '../application/HeaderService';
import './Header.css';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Cambiar esto según la lógica de tu aplicación

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
    await HeaderAppService.cerrarSesion();
  };

  if (!isLoggedIn) {
    return null;
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

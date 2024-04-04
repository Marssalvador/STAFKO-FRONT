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
    return null; // Si el usuario no está autenticado, no renderizar el header
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
        </ul>
      </nav>
      <button onClick={cerrarSesion} className='cerrarSesion'>Cerrar sesión</button>
    </header>
  );
};

export default Header;

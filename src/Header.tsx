import React from 'react';
import './Header.css'; 

const Header: React.FC = () => {
  return (
    <header className="header">

      <img src="/logo.png" alt="Logo" className="logo" />

      <nav className="nav">
        <ul className="nav-list">
          <li>
            <a href="./Pagina2.jsx">Staff</a>
          </li>  
          
          <li>
            <a href="#">Proyectos</a>
          </li>
        </ul>
      </nav>

    </header>
    
  );
};

export default Header;

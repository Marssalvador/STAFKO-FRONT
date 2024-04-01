import React from 'react';
import './Footer.css'; 

const Footer: React.FC = () => {
  return (
    <footer className='footer'>

      <p>© 2024 Todos los derechos reservados.</p>

      <div className="footer-links">
        <a href="#">Politica de privacidad</a>
        <a href="#">Contacto</a>
      </div>
      
    </footer>
  );
}

export default Footer;

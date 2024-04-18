import React from 'react';
import './Footer.css'; 

const politicaPrivacidad = () => {
  window.location.href = './poliPriv';
};

const contacto = () => {
  window.location.href = './contacto';
};

const Footer: React.FC = () => {
  return (
    <footer className='footer'>

      <p>© 2024 Todos los derechos reservados.</p>

      <div className="footer-links">
        <a href="#" onClick={politicaPrivacidad}>Politica de privacidad</a>
        <a href="#" onClick={contacto}>Contacto</a>
      </div>
      
    </footer>
  );
}

export default Footer;

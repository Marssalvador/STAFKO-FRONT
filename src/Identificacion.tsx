import { useState } from 'react';
import './Identificacion.css'; 
import axios from 'axios';
import React from 'react';

const Identificacion = () => {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5432/api/login', {
        nombre,
        contraseña,
      });

      const token = response.data.token;

      // Guardar el token en el almacenamiento local o de sesión
      localStorage.setItem('token', token);

      // Redirigir a la página de inicio después de iniciar sesión exitosamente
      window.location.href = '/home';
    } catch (error) {
      setError('Credenciales inválidas'); // Utiliza la función setError para manejar errores
    }
  };

  const loginNombre = (e) => {
    setNombre(e.target.value);
  };

  const loginContraseña = (e) => {
    setContraseña(e.target.value);
  };

  return (
    <>
      {error && <p>{error}</p>}

      <img src="/panal.png" alt="Panal" className='panal-superior-derecho'/>
      <img src="/panal.png" alt="Panal" className='panal-inferior-izquierdo'/> 
      <main>
        <h1 className='jump-animation'>STAFKO</h1>
        <form onSubmit={handleSubmit} className="login-container">
          <h2 className="login-header">Iniciar sesión</h2>

          <div className="login-input-container">
            <label htmlFor="nombre" className="login-input-label">Nombre de usuario:</label>
            <input type="text" id="nombre" value={nombre} onChange={loginNombre} className="login-input"/>
          </div>

          <div className="login-input-container"> 
            <label htmlFor="contraseña" className="login-input-label">Contraseña:</label>
            <input type="contraseña" id="contraseña" value={contraseña} onChange={loginContraseña} className="login-input"/>
          </div>

          <button type="submit" className="login-button">Iniciar sesión</button>
        </form>
      </main>
    </>

  );
};


export default Identificacion;


//Intento de dividir las pantallas

/*import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Importa useHistory para redireccionar
import './Identificacion.css'; // Importa los estilos CSS

const Identificacion = () => {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const history = useHistory(); // Obtiene el objeto history para redireccionar

  const loginNombre = (event) => {
    setNombre(event.target.value);
  };

  const loginContraseña = (event) => {
    setContraseña(event.target.value);
  };

  const enviar = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos de inicio de sesión al servidor para su autenticación
    console.log('Nombre de usuario:', nombre);
    console.log('Contraseña:', contraseña);
    // Lógica de autenticación aquí

    // Redirecciona a la página deseada
    history.push('/pagina');
  };

  // Resto del código...

  return (
    <>
      <Header />
      <main className="main">
        <form onSubmit={enviar} className="login-container">
          {}
        </form>
      </main>
    </>
  );
};

export default Identificacion;*/

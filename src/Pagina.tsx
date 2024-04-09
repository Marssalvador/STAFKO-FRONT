import React, { useState, useEffect } from 'react';
import './Pagina.css';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

interface Proyecto {
  id: number;
  nombre: string;
}

const modificarProyecto = () => {
  window.location.href = './modificarProject';
};

const eliminarProyecto = () => {
  window.location.href = './editarProj';
};

const Proyecto: React.FC<Proyecto> = ({ id, nombre }) => (
  <div key={id} className="proyecto">
    <div className="nombre-proyecto">{nombre}</div>
    <div className="espacio"></div>
    <div className="ed-button">
      <button className="button" onClick={modificarProyecto}>Editar</button>
      <button className="button" onClick={eliminarProyecto}>Eliminar</button>
    </div>
  </div>
);

const Pagina: React.FC = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);

  useEffect(() => {
    const obtenerProyectosUsuario = async () => {
      try {
        //realizar la solicitud GET al backend para obtener los proyectos del usuario actual
        const response = await axios.get('http://localhost:4000/proyecto', {
          headers: {
            'Authorization': `Bearer ${cookies.get('token')}` // Suponiendo que hay un token de autenticación en la cookie
          }
        });
        setProyectos(response.data);
      } catch (error) {
        console.error('Error al obtener proyectos del usuario:', error);
      }
    };

    if (!cookies.get('username')) {
      window.location.href = "./";
    } else {
      obtenerProyectosUsuario();
    }
  }, []);

  const añadirProyecto = () => {
    window.location.href = './añadirProj';
  };

  return (
    <>
      <main className="main">
        <h1 className="jump-animation">STAFKO</h1>

        <div className="space">Proyectos</div><br />

        <div className="add-button">
          <button className="button4" onClick={añadirProyecto}>+</button>
        </div>
        <br />

        {proyectos.map((proyecto) => (
          <Proyecto key={proyecto.id} id={proyecto.id} nombre={proyecto.nombre} />
        ))}
      </main>
    </>
  )
}

export default Pagina;

import React, { useState, useEffect } from 'react';
import './Pagina.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import ModificarProject from './ModificarProject';

const cookies = new Cookies(); 

interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  cuantia: string;
  fecha_inicio: string;
  fecha_fin: string;
  id_staff: string;
}


const ProyectoComponente: React.FC<{
  proyecto: Proyecto;
  onEditar: (proyecto: Proyecto) => void;
}> = ({ proyecto, onEditar }) => (
  <div key={proyecto.id} className="proyecto">
    <div className="nombre-proyecto">{proyecto.nombre}</div>
    <div className="espacio"></div>

    <div className="ed-button">
      <button className="button" onClick={() => onEditar(proyecto)}>Editar</button>
      <button className="button">Eliminar</button>
    </div>

  </div>
);

const Pagina: React.FC = () => {

  //hacemos uso del useState para guardar el estado del proyecto y del proyecto seleccionado
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null);

  useEffect(() => {
    const obtenerProyectosUsuario = async () => {
      try {
        const response = await axios.get('http://localhost:4000/proyecto', {
          headers: {
            'Authorization': `Bearer ${cookies.get('token')}`
          }
        });
        setProyectos(response.data);
      } catch (error) {
        console.error('Error al obtener proyectos del usuario:', error);
      }
    };


    //usamos los datos de la cookie creada al hacer el login
    if (!cookies.get('username')) {
      window.location.href = "./";
    } else {
      obtenerProyectosUsuario();
    }
  }, []);

  const añadirProyecto = () => {
    window.location.href = './añadirProj';  //para redirigir a la pagina añadirProj
  };

  const editarProyecto = (proyecto: Proyecto) => {
    setProyectoSeleccionado(proyecto);  //cogemos el estado
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
          <ProyectoComponente
            key={proyecto.id}
            proyecto={proyecto}
            onEditar={editarProyecto}
          />
        ))}
      </main>
      
      {proyectoSeleccionado && (
        <ModificarProject
          proyecto={proyectoSeleccionado}
          onGuardar={(proyectoEditado) => {
            console.log('Guardar cambios:', proyectoEditado);
            setProyectoSeleccionado(null);
          }}
        />
      )}
    </>
  )
}

export default Pagina;

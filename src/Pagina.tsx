import React, { useState, useEffect } from 'react';
import './Pagina.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import ModificarProject from './ModificarProject'; // Importación del componente ModificarProject

import { Button } from 'primereact/button'; 

const cookies = new Cookies();

//definición de la interfaz Proyecto
interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  cuantia: string;
  fecha_inicio: string;
  fecha_fin: string;
  id_staff: string;
}

//componente ProyectoComponente
const ProyectoComponente: React.FC<{
  proyecto: Proyecto;
  onEditar: (proyecto: Proyecto) => void;
  onEliminar: (id: number) => void; 
}> = ({ proyecto, onEditar, onEliminar }) => (
  <div key={proyecto.id} className="proyecto">
    <div className="nombre-proyecto">{proyecto.nombre}</div>
    <div className="espacio"></div>

    <div className="ed-button">
      <Button label="Editar" className="p-button-raised p-button-info" onClick={() => onEditar(proyecto)} />
      <Button label="Eliminar" className="p-button-raised p-button-danger" onClick={() => onEliminar(proyecto.id)} />
    </div>
  </div>
);


const Pagina: React.FC = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]); // Estado para almacenar proyectos
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null); // Estado para almacenar el proyecto seleccionado

  useEffect(() => {
    //función para obtener los proyectos del usuario
    const obtenerProyectosUsuario = async () => {
      try {
        const response = await axios.get('http://localhost:4000/proyecto', {
          headers: {
            'Authorization': `Bearer ${cookies.get('token')}`
          }
        });
  
        //verificar si response.data.rows es un arreglo
        if (Array.isArray(response.data.rows)) {
          //si es un arreglo, actualizar el estado proyectos
          setProyectos(response.data.rows);
        } else {
          //si no es un arreglo, mostramos un mensaje de error
          console.error('La propiedad rows de la respuesta de la API no es un arreglo:', response.data.rows);
        }
      } catch (error) {
        console.error('Error al obtener proyectos del usuario:', error);
      }
    };
  
    //verificar si hay un usuario autenticado
    if (!cookies.get('username')) {
      window.location.href = "./"; //redireccionamos a la página de inicio de sesión si no hay usuario autenticado
    } else {
      obtenerProyectosUsuario(); //obtenemos proyectos del usuario
    }
  }, []);

  //función para añadir un proyecto
  const añadirProyecto = () => {
    window.location.href = './añadirProj'; //redireccionamos a la página de añadir proyecto
  };

  //función para editar un proyecto
  const editarProyecto = (proyecto: Proyecto) => {
    setProyectoSeleccionado(proyecto); //establecer el proyecto seleccionado para editar
  };

  //función para eliminar un proyecto
  const eliminarProyecto = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/proyectoEliminar/${id}`, {
        headers: {
          'Authorization': `Bearer ${cookies.get('token')}`
        }
      });
      //si la eliminación es exitosa, actualizar la lista de proyectos
      setProyectos(proyectos.filter(proyecto => proyecto.id !== id));
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
    }
  };

  return (
    <>
      <main className="main">
        <h1 className="jump-animation">STAFKO</h1>

        <div className="space">Proyectos</div><br />

        <div className="add-button">
          {/*botón para añadir proyecto*/}
          <Button label="+" className="p-button-raised p-button-success custom-orange-button" onClick={añadirProyecto} />
        </div>
        <br />

        {/*renderizar cada proyecto*/}
        {Array.isArray(proyectos) && proyectos.map((proyecto) => (
          <ProyectoComponente
            key={proyecto.id}
            proyecto={proyecto}
            onEditar={editarProyecto}
            onEliminar={eliminarProyecto} 
          />
        ))}

        {/*renderizar el componente ModificarProject si hay un proyecto seleccionado */}
        {proyectoSeleccionado && (
          <ModificarProject
            proyecto={proyectoSeleccionado}
            onGuardar={(proyectoEditado) => {
              console.log('Guardar cambios:', proyectoEditado);
              setProyectoSeleccionado(null);
            }}
          />
        )}

      </main>
    </>
  )
}

export default Pagina;

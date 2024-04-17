import React, { useState, useEffect } from 'react';
import './Pagina.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import ModificarProject from './ModificarProject'; 

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
  const [mensaje, setMensaje] = useState<string>(''); // Estado para almacenar el mensaje de edición exitosa
  const [filtrarActivado, setFiltrarActivado] = useState<boolean>(false); // Estado para controlar el switch de filtrado
  const userId = cookies.get('id'); // Obtener el id del usuario logueado desde la cookie

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
          // Filtrar proyectos según el id_staff igual al id del usuario logueado si el filtrado está activado
          if (filtrarActivado) {
            setProyectos(response.data.rows.filter(proyecto => proyecto.id_staff === userId));
          } else {
            setProyectos(response.data.rows);
          }
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
  }, [filtrarActivado]); //se ejecuta nuevamente cuando cambia el estado de filtrarActivado

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

  //función para cambiar el estado del switch de filtrado
  const toggleFiltrar = () => {
    setFiltrarActivado(!filtrarActivado);
  };

  return (
    <>
      <main className="main">
        <h1 className="jump-animation">STAFKO</h1>

        <div className="space">Proyectos</div><br />

        <div className="filtrar-switch">
          {/*Switch para filtrar proyectos*/}
          <label className="toggle-label">
          <input
            type="checkbox"
            checked={filtrarActivado}
            onChange={toggleFiltrar}
          />
          <span className="toggle-button"></span>
          <span className="toggle-text">
            {filtrarActivado ? "Mis proyectos" : "Todos los proyectos"}
          </span>
        </label>


        </div>
        
        <div className="add-button">
          {/*botón para añadir proyecto*/}
          <Button label="+" className="p-button-raised p-button-success custom-orange-button botoncin" onClick={añadirProyecto} />
        </div>
        <br />

        <div className="proyectos-container">
          {/*renderizar cada proyecto*/}
            {Array.isArray(proyectos) &&
              proyectos
                .filter(proyecto => !filtrarActivado || proyecto.id_staff === userId)
                .map(proyecto => (
                  <ProyectoComponente
                    key={proyecto.id}
                    proyecto={proyecto}
                    onEditar={editarProyecto}
                    onEliminar={eliminarProyecto}
                  />
            ))}
        </div>

        {/*renderizar el componente ModificarProject si hay un proyecto seleccionado */}
          {proyectoSeleccionado && (
            <ModificarProject
              proyecto={proyectoSeleccionado}
              onGuardar={(proyectoEditado) => {
                console.log('Guardar cambios:', proyectoEditado);
                setMensaje('¡Proyecto editado correctamente!'); //actualizamos el mensaje de edición exitosa
                setProyectoSeleccionado(null);
              }}
            />
          )}

        {/*mostramos el mensaje de edición exitosa */}
          {mensaje && (
            <div className="mensaje-exito">{mensaje}</div>
          )}

      </main>
    </>
  )
}

export default Pagina;

import React, { useState, useEffect } from 'react';
import './Pagina.css';
import Cookies from 'universal-cookie';
import axios from 'axios';

import { Button } from 'primereact/button';
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

const Pagina: React.FC = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null);
  const [mensaje, setMensaje] = useState<string>('');
  const [filtrarActivado, setFiltrarActivado] = useState<boolean>(false);
  const userId = cookies.get('id');

  useEffect(() => {
    const obtenerProyectosUsuario = async () => {
      try {
        const response = await axios.get('http://localhost:4000/proyecto', {
          headers: {
            'Authorization': `Bearer ${cookies.get('token')}`
          }
        });

        if (Array.isArray(response.data.rows)) {
          if (filtrarActivado) {
            setProyectos(response.data.rows.filter(proyecto => proyecto.id_staff === userId));
          } else {
            setProyectos(response.data.rows);
          }
        } else {
          console.error('La propiedad rows de la respuesta de la API no es un arreglo:', response.data.rows);
        }
      } catch (error) {
        console.error('Error al obtener proyectos del usuario:', error);
      }
    };

    if (!cookies.get('username')) {
      window.location.href = "./";
    } else {
      obtenerProyectosUsuario();
    }
  }, [filtrarActivado]);

  const añadirProyecto = () => {
    window.location.href = './añadirProj';
  };

  const editarProyecto = (proyecto: Proyecto) => {
    setProyectoSeleccionado(proyecto);
  };

  const eliminarProyecto = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/proyectoEliminar/${id}`, {
        headers: {
          'Authorization': `Bearer ${cookies.get('token')}`
        }
      });
      setProyectos(proyectos.filter(proyecto => proyecto.id !== id));
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
    }
  };

  const toggleFiltrar = () => {
    setFiltrarActivado(!filtrarActivado);
  };

  return (
    <>
      <main className="main">
        <h1 className="jump-animation">STAFKO</h1>
        <div className="space">Proyectos</div><br />
        <div className="filtrar-switch">
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
          <Button label="+" className="p-button-raised p-button-success custom-orange-button botoncin" onClick={añadirProyecto} />
        </div>
        <br />
        <div className="proyectos-container">
          {Array.isArray(proyectos) &&
            proyectos
              .filter(proyecto => !filtrarActivado || proyecto.id_staff === userId)
              .map(proyecto => (
                <div key={proyecto.id} className="proyecto">
                  <div className="nombre-proyecto">{proyecto.nombre}</div>
                  <div className="espacio"></div>
                  <div className="ed-button">
                    <Button label="Editar" className="p-button-raised p-button-info" onClick={() => editarProyecto(proyecto)} />
                    <Button label="Eliminar" className="p-button-raised p-button-danger" onClick={() => eliminarProyecto(proyecto.id)} />
                  </div>
                </div>
          ))}
        </div>
        {proyectoSeleccionado && (
          <div className="modal ">
            <div className="modal-content flex flex-col items-center justify-center bg-gradient-to-r from-orange-200 p-5 rounded-lg shadow-lg mb-6 max-w-md w-full">
              <ModificarProject
                proyecto={proyectoSeleccionado}
                onGuardar={(proyectoEditado) => {
                  console.log('Guardar cambios:', proyectoEditado);
                  setMensaje('¡Proyecto editado correctamente!');
                  setProyectoSeleccionado(null);
                }}
              />
              <button className="close-modal" onClick={() => setProyectoSeleccionado(null)}>Cerrar sin guardar</button>
            </div>
          </div>
        )}
        {mensaje && (
          <div className="mensaje-exito">{mensaje}</div>
        )}
      </main>
    </>
  )
}

export default Pagina;

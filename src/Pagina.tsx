import React, { useState, useEffect } from 'react';
import './Pagina.css';
import Cookies from 'universal-cookie';
import axios from 'axios';

import { Button } from 'primereact/button';
import ModificarProject from './ModificarProject';
import VerInformacion from './VerInformacion';

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

interface Usuario {
  id: number;
  nombre: string;
}

const Pagina: React.FC = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [usuariosPorProyecto, setUsuariosPorProyecto] = useState<{ [key: number]: Usuario[] }>({});
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null);
  const [mensaje, setMensaje] = useState<string>('');
  const [filtrarActivado, setFiltrarActivado] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [clientesProyecto, setClientesProyecto] = useState<Usuario[]>([]); // Estado para almacenar la lista de clientes del proyecto
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
          const userIdNumber = parseInt(userId);
          const proyectosUsuario = response.data.rows.filter(proyecto => {
            const idStaffNumber = parseInt(proyecto.id_staff);
            return idStaffNumber === userIdNumber;
          });
    
          setProyectos(filtrarActivado ? proyectosUsuario : response.data.rows);
          
          // Obtener los nombres de los usuarios asociados a cada proyecto
          const usuariosPorProyectoMap: { [key: number]: Usuario[] } = {};
          await Promise.all(response.data.rows.map(async (proyecto: Proyecto) => {
            try {
              const responseUsuarios = await axios.get(`http://localhost:4000/usuarios/datos2/${proyecto.id}`);
              
              // Verifica la estructura de la respuesta recibida
              if (Array.isArray(responseUsuarios.data)) {
                usuariosPorProyectoMap[proyecto.id] = responseUsuarios.data;
                setUsuariosPorProyecto(usuariosPorProyectoMap);
              } else {
                console.error('La respuesta no es un arreglo:', responseUsuarios.data);
              }
            } catch (error) {
              console.error(`Error al obtener usuarios del proyecto ${proyecto.id}:`, error);
            }
          }));
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
  }, [filtrarActivado, userId]);

  const añadirProyecto = () => {
    window.location.href = './añadirProj';
  };

  const editarProyecto = (proyecto: Proyecto) => {
    setProyectoSeleccionado(proyecto);
    setModalContent(
      <>
        <ModificarProject
          proyecto={proyecto}
          onGuardar={(proyectoEditado) => {
            console.log('Guardar cambios:', proyectoEditado);
            setMensaje('¡Proyecto editado correctamente!');
            setProyectoSeleccionado(null);
            setModalVisible(false);
          }}
        />
        
        <button className="close-modal" onClick={() => {
          setProyectoSeleccionado(null);
          setModalVisible(false);
        }}>Cerrar sin guardar</button>
      </>
    );
    setModalVisible(true);
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

  const verInformacion = (proyecto: Proyecto) => {
    setProyectoSeleccionado(proyecto);
    setModalContent(
      <VerInformacion
        proyecto={proyecto}
        onClose={() => setModalVisible(false)}
      />
    );
    setModalVisible(true);
  };

  const toggleFiltrar = () => {
    setFiltrarActivado(!filtrarActivado);
  };

  const verClientes = (idProyecto: number) => {
    /*const clientes = usuariosPorProyecto[idProyecto] || []; // Obtener la lista de clientes del proyecto o un array vacío si no hay clientes
    setClientesProyecto(clientes); // Actualizar el estado con la lista de clientes del proyecto
    setModalContent(
      <div className="clientes-modal">
        <h2>Clientes del Proyecto</h2>
        <ul>
          {clientes.map(cliente => (
            <li key={cliente.id}>{cliente.nombre}</li>
          ))}
        </ul>
        <button onClick={() => setClientesProyecto([])}>Cerrar</button>
      </div>
    );
    setModalVisible(true);*/

    console.log("Mostrar clientes del proyecto con ID:", idProyecto);
    console.log("Clientes del proyecto:", usuariosPorProyecto[idProyecto]);
  };

  const handleVerClientes = async (idProyecto: number) => {
    try {
      const responseUsuarios = await axios.get(`http://localhost:4000/usuarios/datos2/${idProyecto}`);
      if (Array.isArray(responseUsuarios.data)) {
        const usuarios = responseUsuarios.data;
        verClientes(idProyecto);
      } else {
        console.error('La respuesta no es un arreglo:', responseUsuarios.data);
      }
    } catch (error) {
      console.error(`Error al obtener usuarios del proyecto ${idProyecto}:`, error);
    }
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
          <Button label="+" className="p-button-raised p-button-success custom-orange-button1 botoncin" onClick={añadirProyecto} />
        </div>
        <br />
        <div className="proyectos-container">
          {Array.isArray(proyectos) &&
            proyectos.map(proyecto => (
              <div key={proyecto.id} className="proyecto">
                <div className="nombre-proyecto">{proyecto.nombre}</div>
                <div className="espacio"></div>
                <div className="ed-button">
                <Button
                  label="Clientes"
                  className="p-button-raised p-button-info"
                  onClick={() => handleVerClientes(proyecto.id)}
                />


                  {filtrarActivado && parseInt(proyecto.id_staff) === parseInt(userId) && (
                    <>
                      <Button
                        label="Editar"
                        className="p-button-raised p-button-info"
                        onClick={() => editarProyecto(proyecto)}
                      />
                      <Button
                        label="Eliminar"
                        className="p-button-raised p-button-danger"
                        onClick={() => eliminarProyecto(proyecto.id)}
                      />
                    </>
                  )}
                  {!filtrarActivado && (
                    <Button
                      label="Ver más"
                      className="p-button-raised p-button-info custom-button"
                      onClick={() => verInformacion(proyecto)}
                    />
                  )}
                </div>
              </div>
            ))
          }
        </div>
        {modalVisible && (
          <div className="modal">
            <div className="modal-content flex flex-col items-center justify-center bg-gradient-to-r from-orange-200 p-5 rounded-lg shadow-lg mb-6 max-w-md w-full">
              {modalContent}
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

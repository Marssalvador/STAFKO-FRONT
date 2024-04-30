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
  const userId = cookies.get('id');

  const [clientesProyecto, setClientesProyecto] = useState<{ [key: number]: Usuario[] | null }>({});


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
          
          const usuariosPorProyectoMap: { [key: number]: Usuario[] } = {};
          await Promise.all(response.data.rows.map(async (proyecto: Proyecto) => {
            try {
              const responseUsuarios = await axios.get(`http://localhost:4000/usuarios/datos2/${proyecto.id}`);
              
              if (Array.isArray(responseUsuarios.data)) {
                const usuarios = responseUsuarios.data;
                usuariosPorProyectoMap[proyecto.id] = usuarios;
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
    console.log("ID del proyecto:", idProyecto);
    // Si ya hay clientes cargados para este proyecto, limpiar los datos
    if (clientesProyecto[idProyecto]) {
      setClientesProyecto(prevState => ({
        ...prevState,
        [idProyecto]: null
      }));
    } else {
      // Si no hay clientes cargados, cargarlos
      const clientes = usuariosPorProyecto[idProyecto] || [];
      console.log("Clientes cargados:", clientes);
    
      setClientesProyecto(prevState => ({
        ...prevState,
        [idProyecto]: clientes
      }));
    
      // Actualizar usuariosPorProyecto si no se ha actualizado previamente
      if (!usuariosPorProyecto[idProyecto]) {
        console.log("Actualizando usuariosPorProyecto...");
        setUsuariosPorProyecto(prevState => ({
          ...prevState,
          [idProyecto]: clientes
        }));
      }
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
                    onClick={() => verClientes(proyecto.id)}
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

                {/* Mostrar la lista de clientes del proyecto */}
                {clientesProyecto[proyecto.id] !== undefined && (
                  <div className="clientes-info">
                    <h3>Clientes del proyecto:</h3>
                    <ul>
                      {clientesProyecto[proyecto.id]?.length ?
                        clientesProyecto[proyecto.id]?.map((cliente, index) => (
                          <li key={`${proyecto.id}-${cliente.id || index}`}>{JSON.stringify(cliente) || "Sin nombre"}</li>
                        )) :
                        <li>Sin clientes</li>
                      }
                    </ul>
                  </div>
                )}
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

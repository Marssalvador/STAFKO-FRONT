import React, { useState, useEffect } from 'react';
import './Pagina.css';
import Cookies from 'universal-cookie';
import { Button } from 'primereact/button';
import ModificarProject from './ModificarProject';
import VerInformacion from './VerInformacion';
import { Proyecto, Staff } from '../domain/types';
import { PaginaService } from '../application/PaginaService';
import { StaffService } from '../application/InformacionService'; // Importamos StaffService
import Reloj from './Reloj';

const cookies = new Cookies();

const Pagina: React.FC = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [usuariosPorProyecto, setUsuariosPorProyecto] = useState<{ [key: number]: Staff[] }>({});
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null);
  const [mensaje, setMensaje] = useState<string>('');
  const [filtrarActivado, setFiltrarActivado] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const userId = cookies.get('id');
  const [clientesProyecto, setClientesProyecto] = useState<{ [key: number]: Staff[] | null }>({});
  const [clientesVisible, setClientesVisible] = useState<{ [key: number]: boolean }>({});
  
  // Creamos una instancia de StaffService
  const staffService = new StaffService();

  useEffect(() => {
    const obtenerProyectosUsuario = async () => {
      try {
        // Obtener proyectos del usuario
        const proyectos = await PaginaService.obtenerProyectosUsuario(cookies.get('token'));
        
        // Filtrar proyectos asociados al usuario logueado
        const proyectosUsuario = proyectos.filter(p => parseInt(p.id_staff) === parseInt(userId));
        setProyectos(filtrarActivado ? proyectosUsuario : proyectos);
  
        const usuariosPorProyectoMap: { [key: number]: Staff[] } = {};
        await Promise.all(proyectos.map(async (proyecto: Proyecto) => {
          try {
            // Obtener usuarios por proyecto
            const usuarios = await PaginaService.obtenerUsuariosPorProyecto(proyecto.id);
            usuariosPorProyectoMap[proyecto.id] = usuarios;
            setUsuariosPorProyecto(usuariosPorProyectoMap);
          } catch (error) {
            console.error(`Error al obtener usuarios del proyecto ${proyecto.id}:`, error);
          }
        }));
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

  const editarProyecto = async (proyecto: Proyecto) => {
    setProyectoSeleccionado(proyecto);
    setModalContent(
      <>
        <ModificarProject
          proyecto={proyecto}
          onGuardar={async (proyectoEditado) => {
            await PaginaService.actualizarProyecto(proyectoEditado);
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
      await PaginaService.eliminarProyecto(id, cookies.get('token'));
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
        staffService={staffService} 
      />
    );
    setModalVisible(true);
  };

  const toggleFiltrar = () => {
    setFiltrarActivado(!filtrarActivado);
  };

  const verClientes = async (idProyecto: number) => {
    setClientesVisible(prevState => ({
      ...prevState,
      [idProyecto]: !prevState[idProyecto]
    }));
    
    if (clientesProyecto[idProyecto]){
      setClientesProyecto(prevState => ({
        ...prevState,
        [idProyecto]: null
      }));
    } else {
      try {
        const clientes = await PaginaService.obtenerUsuariosPorProyecto(idProyecto);
        console.log("Clientes cargados:", clientes);
        setClientesProyecto(prevState => ({
          ...prevState,
          [idProyecto]: clientes
        }));
        if (!usuariosPorProyecto[idProyecto]){
          console.log("Actualizando usuariosPorProyecto...");
          setUsuariosPorProyecto(prevState => ({
            ...prevState,
            [idProyecto]: clientes
          }));
        }
      } catch (error) {
        console.error(`Error al obtener clientes del proyecto ${idProyecto}:`, error);
      }
    }
  };
  
  return (
    <>
      <main className="main">
        <Reloj /> 
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
                    label={clientesVisible[proyecto.id] ? "Ocultar Clientes" : "Clientes"}
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

                {clientesVisible[proyecto.id] && clientesProyecto[proyecto.id] !== undefined && (
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

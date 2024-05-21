//Pagina.tsx
//DIRECTUS

import React, { useState, useEffect } from 'react';
import './Pagina.css';
import Cookies from 'universal-cookie';
import { Button } from 'primereact/button';
import ModificarProject from './ModificarProject';
import VerInformacion from './VerInformacion';
import { Proyecto, Staff } from '../domain/types';
import { StaffService } from '../application/InformacionService';
import Reloj from './Reloj';

const cookies = new Cookies();

const Pagina: React.FC = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [usuarios, setUsuarios] = useState<Staff[]>([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null);
  const [mensaje, setMensaje] = useState<string>('');
  const [filtrarActivado, setFiltrarActivado] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const userId = cookies.get('userId');

  // Creamos una instancia de StaffService
  const staffService = new StaffService();

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const token = cookies.get('access_token');
        if (!token) {
          window.location.href = "./";
          return;
        }

        // Obtener todos los proyectos
        const responseProyectos = await fetch('http://localhost:8055/items/proyecto/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const proyectosJSON = await responseProyectos.json();
        const proyectosData = proyectosJSON.data; // Acceder al array de proyectos dentro de 'data'

        // Obtener todos los usuarios
        const responseUsuarios = await fetch('http://localhost:8055/items/usuarios/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const usuariosJSON = await responseUsuarios.json();
        const usuariosData = usuariosJSON.data;

        // Establecer los usuarios y proyectos en el estado
        setUsuarios(usuariosData);
        if (filtrarActivado) {
          // Filtrar los proyectos por el staff igual al usuario logueado
          const proyectosFiltrados = proyectosData.filter(p => {
            const staffUsuario = usuariosData.find((usuario: Staff) => usuario.id === parseInt(p.id_staff));
            return staffUsuario && staffUsuario.id === parseInt(userId);
          });
          setProyectos(proyectosFiltrados);
        } else {
          setProyectos(proyectosData);
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    obtenerDatos();
  }, [filtrarActivado, userId]);

  const añadirProyecto = () => {
    window.location.href = './añadirProj';
  };

  const editarProyecto = (proyecto: Proyecto) => {
    setProyectoSeleccionado(proyecto);
    setModalContent(
      <ModificarProject
        proyecto={proyecto}
        onClose={() => {
          setModalVisible(false);
          setProyectoSeleccionado(null); // Limpiar el proyecto seleccionado
        }}
        onSave={(proyectoEditado: Proyecto) => actualizarProyecto(proyectoEditado)}
      />
    );
    setModalVisible(true);
  };

  const actualizarProyecto = async (proyecto: Proyecto) => {
    try {
      // Realizar la solicitud de actualización al backend
      const token = cookies.get('access_token');
      if (!token) {
        window.location.href = "./";
        return;
      }

      const response = await fetch(`http://localhost:8055/items/proyecto/${proyecto.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(proyecto)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el proyecto');
      }

      // Si la actualización fue exitosa, actualizar el estado local de proyectos
      setProyectos(prevProyectos => {
        const index = prevProyectos.findIndex(p => p.id === proyecto.id);
        if (index !== -1) {
          const updatedProyectos = [...prevProyectos];
          updatedProyectos[index] = proyecto;
          return updatedProyectos;
        }
        return prevProyectos;
      });

      setMensaje('¡Proyecto editado correctamente!');
      setModalVisible(false);
    } catch (error) {
      console.error('Error al editar el proyecto:', error);
      setMensaje('Error al editar el proyecto');
    }
  };

  const eliminarProyecto = async (id: number) => {
    try {
      const token = cookies.get('access_token');
      if (!token) {
        window.location.href = "./";
        return;
      }

      const response = await fetch(`http://localhost:8055/items/proyecto/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el proyecto');
      }

      // Si la eliminación fue exitosa, actualizar el estado local de proyectos
      setProyectos(prevProyectos => prevProyectos.filter(p => p.id !== id));

      setMensaje('¡Proyecto eliminado correctamente!');
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
      setMensaje('Error al eliminar el proyecto');
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


  return (
    <>
      <main className="main">
        <Reloj/>
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
            proyectos.map(proyecto => (
              <div key={proyecto.id} className="proyecto">
                <div className="nombre-proyecto">{proyecto.nombre}</div>
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
  );
}

export default Pagina;


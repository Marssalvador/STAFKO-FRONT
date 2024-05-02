import React, { useEffect, useState } from 'react';
import './Pagina3.css';
import Cookies from 'universal-cookie';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { obtenerUsuarios, eliminarUsuario } from '../application/Pagina3Service';
import axios from 'axios';
import ModificarUsuarios from './ModificarUsuarios'; 
import VerInformacion2 from './VerInformacion2';

const cookies = new Cookies();

interface Usuarios {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  telefono: string;
  fecha_nacimiento: string;
  rol: string | null;
  id_proyecto?: number | null;
}

interface UsuariosProps {
  usuario: Usuarios;
}

const Pagina3: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuarios[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuarios | null>(null);
  const [mostrarEditar, setMostrarEditar] = useState<boolean>(false);
  const [mostrarModalProyectos, setMostrarModalProyectos] = useState<boolean>(false); // Estado para controlar la visibilidad del modal
  const [proyectosUsuario, setProyectosUsuario] = useState<any[]>([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<any | null>(null);

  useEffect(() => {
    const cargarUsuarios = async () => {
      const usuarios = await obtenerUsuarios();
      setUsuarios(usuarios);
    };

    if (!cookies.get('username')) {
      window.location.href = "./";
    } else {
      cargarUsuarios();
    }
  }, []);

  useEffect(() => {
    const obtenerProyectosUsuario = async () => {
      try {
        const idStaff = parseInt(cookies.get('id'));
        const response = await axios.get('http://localhost:4000/proyecto', {
          headers: {
            'Authorization': `Bearer ${cookies.get('token')}`
          }
        });

        if (Array.isArray(response.data.rows)) {
          const proyectosStaffLogueado = response.data.rows.filter((proyecto: any) => parseInt(proyecto.id_staff) === idStaff);
          setProyectosUsuario(proyectosStaffLogueado);
        } else {
          console.error('La respuesta de la API no contiene un arreglo de proyectos:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener proyectos del usuario:', error);
      }
    };

    obtenerProyectosUsuario();
  }, []);

  const eliminarUsuarioConfirmado = async (id: number) => {
    try {
      await eliminarUsuario(id);
      const nuevosUsuarios = usuarios.filter(usuario => usuario.id !== id);
      setUsuarios(nuevosUsuarios);
    } catch (error) {
      alert('Cancelación: El usuario tiene un proyecto asociado');
    }
  };

  const confirmarEliminarUsuario = (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      eliminarUsuarioConfirmado(id);
    }
  };

  const UsuarioComponent: React.FC<UsuariosProps> = ({ usuario }) => {
    const username = cookies.get('username');
    const isUsuarioLogueado = usuario.username === username;
    const mostrarAsignar = !usuario.id_proyecto;
    const esStaff = cookies.get('rol') === 'staff';

    return (
      <div key={usuario.id} className="usuario" style={{ order: isUsuarioLogueado ? 0 : 1 }}>
        <div className={usuario.username === username ? "nombre-usuario usuario-logueado" : "nombre-usuario"}>{usuario.nombre}</div>
        <div className="espacio"></div>
        <div className="ed-button">
          {isUsuarioLogueado && (
            <>
              <Button label="Editar" className="p-button-raised2 p-button-primary" onClick={() => setMostrarEditar(true)} />
              <Button label="Eliminar" className="p-button-raised2 p-button-danger" onClick={() => confirmarEliminarUsuario(usuario.id)} />
            </>
          )}

          {!isUsuarioLogueado && (
            <>
              {mostrarAsignar && (
                <Button
                  label="Asignar"
                  className="p-button-raised2 p-button-success"
                  onClick={() => {
                    setUsuarioSeleccionado(usuario); //selecciona el usuario antes de abrir el modal de proyectos
                    setMostrarModalProyectos(true);
                  }}
                />
              )}
              {esStaff && (
                <Button label="Eliminar" className="p-button-raised2 p-button-danger" onClick={() => confirmarEliminarUsuario(usuario.id)} />
              )}
              <Button label="Ver más" className="p-button-raised2 p-button-info" onClick={() => setUsuarioSeleccionado(usuario)} />
            </>
          )}
        </div>
      </div>
    );
  };

  const seleccionarProyecto = async (proyecto: any, usuario: Usuarios | null) => {
    try {
      if (!usuario) {
        console.error('Usuario no seleccionado');
        return;
      }

      //actualizar el campo id_proyecto del usuario seleccionado
      const usuarioActualizado = { ...usuario, id_proyecto: proyecto.id };

      //realizar una solicitud para actualizar el usuario con el ID del proyecto seleccionado
      // await axios.put(`http://localhost:4000/usuarios/modificar/${usuario.id}`, usuarioActualizado, {
      //   headers: {
      //     'Authorization': `Bearer ${cookies.get('token')}`
      //   }
      // });

      //actualizar el estado del usuario con el proyecto seleccionado
      setUsuarioSeleccionado(usuarioActualizado);
      //cerrar el modal después de seleccionar el proyecto
      setMostrarModalProyectos(false);
    } catch (error) {
      console.error('Error al asignar proyecto al usuario:', error);
    }
  };

  const añadirUsuario = async () => {
    window.location.href = './añadirUsuarios';
  };

  return (
    <div className="pagina3-container">
      <main className="main">
        <h1 className="jump-animation">STAFKO</h1><br />

        <div className="space">Clientes</div><br />

        <div className="add-button">
          <Button label="+" className="p-button-raised p-button-success custom-orange-button botoncin" onClick={añadirUsuario} />
        </div>
        <br />

        {usuarios.map((usuario) => (
          <UsuarioComponent key={usuario.id} usuario={usuario} />
        ))}

        {usuarioSeleccionado && (
          mostrarEditar ? (
            <ModificarUsuarios
              usuario={usuarioSeleccionado}
              onGuardar={() => {
                console.log('Guardar cambios');
                setUsuarioSeleccionado(null);
                setMostrarEditar(false);
              }}
            />
          ) : (
            <VerInformacion2
              usuario={usuarioSeleccionado}
              proyectos={proyectosUsuario}
              onClose={() => {
                console.log('Cerrar VerInformacion2');
                setUsuarioSeleccionado(null);
              }}
            />
          )
        )}

      </main>

      {proyectosUsuario.length > 0 && (
        <Dialog
          visible={mostrarModalProyectos}
          onHide={() => setMostrarModalProyectos(false)}
          header="Lista de Proyectos"
          modal
        >
          <div className="lista-proyectos">
            <h2>Proyectos Disponibles</h2>
            <ul>
              {proyectosUsuario.map(proyecto => (
                <li key={proyecto.id}>
                  {proyecto.nombre}{' '}
                  <Button
                    label="Seleccionar"
                    className="p-button-raised p-button-success"
                    onClick={() => seleccionarProyecto(proyecto, usuarioSeleccionado)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Dialog>
      )}

    </div>
  );
};

export default Pagina3;

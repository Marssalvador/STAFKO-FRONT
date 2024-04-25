import React, { useEffect, useState } from 'react';
import './Pagina3.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import ModificarUsuarios from './ModificarUsuarios'; 
import VerInformacion2 from './VerInformacion2';
import { Button } from 'primereact/button'; 
import { Dialog } from 'primereact/dialog'; // Importa el componente Dialog

const cookies = new Cookies();

interface Usuarios {
  id: number;
  nombre: string;
  apellido: string; 
  username: string;
  telefono: string; 
  fecha_nacimiento: string;
  rol: string | null; // Agregar el tipo de la columna "rol"
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

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:4000/usuarios/datos', {
          headers: {
            'Authorization': `Bearer ${cookies.get('token')}` 
          }
        });

        if (Array.isArray(response.data.rows)) {
          // Filtrar solo los usuarios con rol 'cliente'
          const usuariosFiltrados = response.data.rows.filter((usuario: Usuarios) => usuario.rol === 'cliente');
          setUsuarios(usuariosFiltrados);
        } else {
          console.error('La respuesta de la API no es un arreglo de usuario:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener usuario:', error);
      }
    };

    if (!cookies.get('username')) {
      window.location.href = "./";
    } else {
      obtenerUsuarios();
    }
  }, []);

  useEffect(() => {
    const obtenerProyectosUsuario = async () => {
        try {
          const idStaff = parseInt(cookies.get('id')); // Convertir a número
          const response = await axios.get('http://localhost:4000/proyecto', {
            headers: {
              'Authorization': `Bearer ${cookies.get('token')}`
            }
          });
      
          if (Array.isArray(response.data.rows)) {
            // Filtrar solo los proyectos que tienen el id_staff del staff logueado
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
      await axios.delete(`http://localhost:4000/usuEliminar/${id}`, {
        headers: {
          'Authorization': `Bearer ${cookies.get('token')}`
        }
      });

      //eliminar la cookie de inicio de sesión
      cookies.remove('id', { path: "/" });
      cookies.remove("apellido", { path: "/" });
      cookies.remove("nombre", { path: "/" });
      cookies.remove("username", { path: "/" });

      //redirigir al usuario a la página de inicio de sesión
      window.location.href = "./";
    } catch (error) {
      alert('Cancelación: El usuario tiene un proyecto asociado');
    }
  };

  //antes de eliminar la cuenta del usuario, se deberá confirmar la acción
  const confirmarEliminarUsuario = (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      eliminarUsuarioConfirmado(id);
    }
  };

  const editarUsuario = (usuario: Usuarios) => {
    setUsuarioSeleccionado(usuario);
    setMostrarEditar(true);
  };

  const verInformacion = (usuario: Usuarios) => {
    setUsuarioSeleccionado(usuario);
    setMostrarEditar(false);
  };
  
  const UsuarioComponent: React.FC<UsuariosProps> = ({ usuario }) => {
    const username = cookies.get('username');
    const isUsuarioLogueado = usuario.username === username;
  
    //si el usuario es el que se ha logueado podrá editar sus datos y eliminar su cuenta
    //sin embargo, del resto de usuarios solo podrá ver la información
    return (
      <div key={usuario.id} className="usuario" style={{ order: isUsuarioLogueado ? 0 : 1 }}> 
        <div className={usuario.username === username ? "nombre-usuario usuario-logueado" : "nombre-usuario"}>{usuario.nombre}</div>
        <div className="espacio"></div>
        <div className="ed-button">
          {isUsuarioLogueado && (
            <>
              <Button label="Editar" className="p-button-raised2 p-button-primary" onClick={() => editarUsuario(usuario)} />
              <Button label="Eliminar" className="p-button-raised2 p-button-danger" onClick={() => confirmarEliminarUsuario(usuario.id)}  />
            </>
          )}

          {!isUsuarioLogueado && (
            <>
              <Button label="Ver más" className="p-button-raised2 p-button-info" onClick={() => verInformacion(usuario)} />
              <Button label="Asignar" className="p-button-raised2 p-button-success" onClick={() => setMostrarModalProyectos(true)} />
            </>
          )}
        </div>
      </div>
    );
  };

  const añadirUsuario = () => {
    window.location.href = './añadirUsuarios';
  };

  return (
    <>
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
              onClose={() => {
                console.log('Cerrar VerInformacion2');
                setUsuarioSeleccionado(null);
              }}
            />
          )
        )}

      </main>

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
              <li key={proyecto.id}>{proyecto.nombre}</li>
            ))}
          </ul>
        </div>
      </Dialog>
    </>
  );
};

export default Pagina3;

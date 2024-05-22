// Pagina3.tsx
// Directus

import React, { useEffect, useState } from 'react';
import './Pagina3.css';
import Cookies from 'universal-cookie';
import { Button } from 'primereact/button';
import ModificarUsuarios from './ModificarUsuarios';
import VerInformacion2 from './VerInformacion2';
import Reloj from './Reloj';
import { Usuario } from '../application/UsuarioService';

const cookies = new Cookies();
const rol = cookies.get('rol');

const Pagina3: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [mostrarEditar, setMostrarEditar] = useState<boolean>(false);
  const [mostrarProyectos, setMostrarProyectos] = useState<boolean>(false);
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<any | null>(null);
  const email = cookies.get('email');

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const token = cookies.get('access_token');
        if (!token) {
          window.location.href = "./";
          return;
        }

        const response = await fetch('http://localhost:8055/items/usuarios/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Unauthorized');
        }

        const usuariosData = await response.json();
        const usuariosFiltrados = usuariosData.data.filter((usuario: Usuario) => usuario.rol === 'cliente'); // Filtrar usuarios por rol 'cliente'
        setUsuarios(usuariosFiltrados);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };

    cargarUsuarios();
    console.log('email almacenado en las cookies:', email);
  }, [email]);

  useEffect(() => {
    const cargarProyectos = async () => {
      try {
        const token = cookies.get('access_token');
        if (!token) {
          window.location.href = "./";
          return;
        }

        const response = await fetch('http://localhost:8055/items/proyecto/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Unauthorized');
        }

        const proyectosData = await response.json();
        setProyectos(proyectosData.data);
      } catch (error) {
        console.error('Error al cargar proyectos:', error);
      }
    };

    if (mostrarProyectos) {
      cargarProyectos();
    }
  }, [mostrarProyectos]);

  const eliminarUsuarioConfirmado = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        // Actualizamos la lista de usuarios después de eliminar
        setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.id !== id));
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('Ocurrió un error al intentar eliminar al usuario. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  };

  const editarUsuario = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarEditar(true);
  };

  const verInformacion = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarEditar(false);
  };

  const añadirUsuarios = () => {
    window.location.href = './añadirUsuarios';
  };  

  const handleSeleccionarUsuario = (usuario: Usuario) => {
    console.log("Usuario seleccionado:", usuario); // Registrar el usuario seleccionado
    console.log("ID del usuario seleccionado:", usuario.id); // Registrar el ID del usuario seleccionado
    setUsuarioSeleccionado(usuario);
    setMostrarEditar(true); 
    setMostrarProyectos(true);
  };
  
  
  const handleSeleccionarProyecto = (proyecto: any) => {
    setProyectoSeleccionado(proyecto);
    console.log("Proyecto seleccionado:", proyecto.id);
  };
  
  const asignarProyecto = async () => {
    try {

      console.log('Usuario seleccionado:', usuarioSeleccionado);
      console.log('Proyecto seleccionado:', proyectoSeleccionado);
      
      if (!usuarioSeleccionado || !proyectoSeleccionado) {
        console.error('Usuario o proyecto no seleccionado');
        return;
      }
  
      const token = cookies.get('access_token');
      if (!token) {
        window.location.href = "./";
        return;
      }
  
      const usuarioActualizado = {
        ...usuarioSeleccionado,
        id_proyecto: proyectoSeleccionado.id
      };
  
      const response = await fetch(`http://localhost:8055/items/usuarios/${usuarioSeleccionado.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioActualizado)
      });
  
      if (!response.ok) {
        throw new Error('Error al asignar proyecto al usuario');
      }else{
        alert("Proyecto asignado");
      }
  
      // Actualizar el estado de usuarioSeleccionado
      setUsuarioSeleccionado(usuarioActualizado);
  
      // Limpiar el proyecto seleccionado después de asignarlo al usuario
      setProyectoSeleccionado(null);
    } catch (error) {
      console.error('Error al asignar proyecto al usuario:', error);
    }
  };
  
  return (
    <>
      <main className="main">
        <Reloj />

        <h1 className="jump-animation">STAFKO</h1><br />

        <div className="space">Clientes</div><br />

        {rol === 'staff' && (
          <div className="add-button">
            <Button label="+" className="p-button-raised p-button-success custom-orange-button botoncin" onClick={añadirUsuarios} />
          </div>
        )}

        {usuarios && usuarios.map((staff) => (
          <div key={staff.id} className="staff">
            <div className={staff.email === email ? "nombre-staff usuario-logueado" : "nombre-staff"}>
              {staff.nombre}
            </div>
            <div className="espacio"></div>
            <div className="ed-button">
              {staff.email === email && (
                <>
                  <Button key={`edit_${staff.id}`} label="Editar" className="p-button-raised p-button-primary" onClick={() => editarUsuario(staff)} style={{ width: '8rem' }}/>
                  <Button key={`delete_${staff.id}`} label="Eliminar" className="p-button-raised p-button-danger" onClick={() => eliminarUsuarioConfirmado(staff.id)} style={{ width: '8rem' }}/>
                </>
              )}

              {/* Si el usuario no tiene proyecto asignado, mostrar el botón de "Asignar Proyecto" */}
              {staff.id_proyecto === null && (
                <Button key={`assign_${staff.id}`} label="Asignar" className="p-button-raised p-button-success" onClick={() => handleSeleccionarUsuario(staff)} style={{ width: '6rem' }}/>
              )}
              
              {/* Si el usuario no es el logueado, mostrar el botón de "Ver más" */}
              {staff.nombre !== email && (
                <Button key={`view_${staff.id}`} label="Ver más" className="p-button-raised p-button-info" onClick={() => verInformacion(staff)} style={{ width: '8rem' }}/>
              )}
            </div>
          </div>
        ))}

        {mostrarProyectos && (
          <div className="proyectos-lista">
            <h2>Selecciona un proyecto</h2>
            <ul>
              {proyectos.map((proyecto) => (
                <li key={proyecto.id} onClick={() => handleSeleccionarProyecto(proyecto)}>
                  {proyecto.nombre}
                </li>
              ))}
            </ul>
            <Button label="Asignar" className="p-button-raised p-button-success" onClick={asignarProyecto} />
          </div>
        )}

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
              proyectosDisponibles={[]}
            />
          )
        )}

      </main>
    </>
  );
};

export default Pagina3;


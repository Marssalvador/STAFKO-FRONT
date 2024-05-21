//Pagina3.tsx
//Directus

import React, { useEffect, useState } from 'react';
import './Pagina2.css';
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

  const asignarProyecto = async () => {
    try {
      if (!usuarioSeleccionado || !proyectoSeleccionado) {
        console.error('Usuario o proyecto no seleccionado');
        return;
      }

      // Actualizar el campo id_proyecto del usuario seleccionado
      const usuarioActualizado = { ...usuarioSeleccionado, id_proyecto: proyectoSeleccionado.id };

      // Realizar una solicitud para actualizar el usuario con el ID del proyecto seleccionado
      const token = cookies.get('access_token');
      if (!token) {
        window.location.href = "./";
        return;
      }

      const response = await fetch(`http://localhost:8055/items/usuarios/${usuarioSeleccionado.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioActualizado)
      });

      if (!response.ok) {
        throw new Error('Error al asignar proyecto al usuario');
      }

      // Actualizar el estado del usuario con el proyecto seleccionado
      setUsuarioSeleccionado(usuarioActualizado);
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
              
              {/* Si el usuario no es el logueado, mostrar el botón de "Ver más" */}
              {staff.nombre !== email && (
                <Button key={`view_${staff.id}`} label="Ver más" className="p-button-raised p-button-info" onClick={() => verInformacion(staff)} style={{ width: '8rem' }}/>
              )}

              {/* Si el usuario no tiene proyecto asignado, mostrar el botón de "Asignar Proyecto" */}
              {staff.id_proyecto === null && (
                <Button key={`assign_${staff.id}`} label="Asignar Proyecto" className="p-button-raised p-button-success" onClick={() => asignarProyecto()} style={{ width: '12rem' }}/>
              )}
            </div>
          </div>
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
              proyectosDisponibles={[]}
            />
          )
        )}

      </main>
    </>
  );
};

export default Pagina3;



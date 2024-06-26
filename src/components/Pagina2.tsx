import React, { useEffect, useState } from 'react';
import './Pagina2.css';
import Cookies from 'universal-cookie';
import { Button } from 'primereact/button';
import { Staff } from '../domain/types';
import { eliminarStaff } from '../application/Pagina2Service';
import ModificarUsuarios from './ModificarUsuarios';
import VerInformacion2 from './VerInformacion2';
import Reloj from './Reloj';

const cookies = new Cookies();

const Pagina2: React.FC = () => {
  //definicion de estados para usuarios, usuario seleccionado y mostrarEditar
  const [usuarios, setUsuarios] = useState<Staff[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Staff | null>(null);
  const [mostrarEditar, setMostrarEditar] = useState<boolean>(false);

  //obtener email y rol desde las cookies
  const email = cookies.get('email');
  const rol = cookies.get('rol');

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
        const usuariosFiltrados = usuariosData.data.filter((usuario: Staff) => usuario.rol === 'staff');

        // Ordenar usuarios: el usuario logueado primero
        usuariosFiltrados.sort((a: Staff, b: Staff) => {
          if (a.email === email) return -1;
          if (b.email === email) return 1;
          return 0;
        });

        setUsuarios(usuariosFiltrados);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };

    cargarUsuarios();
    console.log('email almacenado en las cookies:', email);
  }, [email]);


  //funcion para eliminar 
  const eliminarUsuarioConfirmado = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await eliminarStaff(id);
        setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.id !== id));
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('Ocurrió un error al intentar eliminar al usuario. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  };

  //funcion para editar
  const editarUsuario = (usuario: Staff) => {
    setUsuarioSeleccionado(usuario);
    setMostrarEditar(true);
  };

  //funcion para verInformacion
  const verInformacion = (usuario: Staff) => {
    setUsuarioSeleccionado(usuario);
    setMostrarEditar(false);
  };

  //funcion para añadir nuevo usuario
  const añadirUsuarios = () => {
    window.location.href = './añadirUsuarios';
  };

  return (
    <>
      <main className="main">
        <Reloj />

        <h1 className="jump-animation">STAFKO</h1><br />

        <div className="space">Usuarios</div><br />

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
              {staff.email !== email && (
                <Button key={`view_${staff.id}`} label="Ver más" className="p-button-raised p-button-info" onClick={() => verInformacion(staff)} style={{ width: '8rem' }}/>
              )}
            </div>
          </div>
        ))}
        
        {usuarioSeleccionado && (
          mostrarEditar ? (
            <ModificarUsuarios
              usuario={usuarioSeleccionado}
              onGuardar={(usuarioActualizado) => {
                console.log('Guardar cambios');
                setUsuarios(prevUsuarios => prevUsuarios.map(u => u.id === usuarioActualizado.id ? usuarioActualizado : u));
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

export default Pagina2;

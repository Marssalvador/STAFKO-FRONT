import React, { useEffect, useState } from 'react';
import './Pagina2.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import ModificarUsuarios from './ModificarUsuarios'; 
import VerInformacion2 from './VerInformacion2';
import { Button } from 'primereact/button'; 

const cookies = new Cookies();

interface Staff{
  id: number;
  nombre: string;
  apellido: string; 
  username: string;
  telefono: string; 
  fecha_nacimiento: string; 
  rol: string;
}

interface StaffProps{
  staff: Staff;
}

const Pagina2: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [staffSeleccionado, setStaffSeleccionado] = useState<Staff | null>(null);
  const [mostrarEditar, setMostrarEditar] = useState<boolean>(false);

  useEffect(() => {
    const obtenerStaffs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/usuarios/datos', {
          headers: {
            'Authorization': `Bearer ${cookies.get('token')}` 
          }
        });

        if (Array.isArray(response.data.rows)) {
          const staffFiltrado = response.data.rows.filter((staff: Staff) => staff.rol === 'staff');
          setStaffs(staffFiltrado);
        } else {
          console.error('La respuesta de la API no es un arreglo de staff:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener staff:', error);
      }
    };

    if (!cookies.get('username')){
      window.location.href = "./";
    }else{
      obtenerStaffs();
    }
  }, []);

  const eliminarStaffConfirmado = async (id: number) => {
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
      alert('Cancelación: El Staff tiene un proyecto asociado');
    }
  };

  //antes de eliminar la cuenta del usuario, se deberá confirmar la acción
  const confirmarEliminarStaff = (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este staff?")) {
      eliminarStaffConfirmado(id);
    }
  };

  const editarStaff = (staff: Staff) => {
    setStaffSeleccionado(staff);
    setMostrarEditar(true);
  };

  const verInformacion = (staff: Staff) => {
    setStaffSeleccionado(staff);
    setMostrarEditar(false);
  };
  
  const StaffComponent: React.FC<StaffProps> = ({ staff }) => {
    const username = cookies.get('username');
    const isUsuarioLogueado = staff.username === username;
  
    //si el usuario es el que se ha logueado podrá editar sus datos y eliminar su cuenta
    //sin embargo, del resto de usuarios solo podrá ver la información
    return (
      <div key={staff.id} className="staff" style={{ order: isUsuarioLogueado ? 0 : 1 }}> 
        <div className={staff.username === username ? "nombre-staff usuario-logueado" : "nombre-staff"}>{staff.nombre}</div>
        <div className="espacio"></div>
        <div className="ed-button">
          {isUsuarioLogueado && (
            <>
              <Button label="Editar" className="p-button-raised p-button-primary" onClick={() => editarStaff(staff)} />
              <Button label="Eliminar" className="p-button-raised p-button-danger" onClick={() => confirmarEliminarStaff(staff.id)}  />
            </>
          )}

          {!isUsuarioLogueado && (
            <Button label="Ver más" className="p-button-raised p-button-info" onClick={() => verInformacion(staff)} />
          )}
        </div>
      </div>
    );
  };

  const añadirStaff = () => {
    window.location.href = './añadirUsuarios';
  };

  return (
    <>
      <main className="main">
        <h1 className="jump-animation">STAFKO</h1><br />

        <div className="space">Staffs</div><br />

        <div className="add-button">
          <Button label="+" className="p-button-raised p-button-success custom-orange-button botoncin" onClick={añadirStaff} />
        </div>
        <br />

        {staffs.map((staff) => (
          <StaffComponent key={staff.id} staff={staff} />
        ))}

        {staffSeleccionado && (
          mostrarEditar ? (
            <ModificarUsuarios
              usuario={staffSeleccionado}
              onGuardar={() => {
                console.log('Guardar cambios');
                setStaffSeleccionado(null);
                setMostrarEditar(false);
              }}
            />
          ) : (
            <VerInformacion2
              usuario={staffSeleccionado}
              proyectos={[]} 
              onClose={() => {
                console.log('Cerrar VerInformacion2');
                setStaffSeleccionado(null);
              }}
            />
          )
        )}

      </main>
    </>
  );
};

export default Pagina2;

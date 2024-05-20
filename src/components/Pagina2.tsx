/*import React, { useEffect, useState } from 'react';
import './Pagina2.css';
import Cookies from 'universal-cookie';
import { Button } from 'primereact/button';
import { obtenerStaffs, eliminarStaff } from '../application/Pagina2Service';
import ModificarUsuarios from './ModificarUsuarios';
import VerInformacion2 from './VerInformacion2';
import Reloj from './Reloj';

const cookies = new Cookies();

interface Staff {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  telefono: string;
  fecha_nacimiento: string;
  rol: string;
}

interface StaffProps {
  staff: Staff;
}

const Pagina2: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [staffSeleccionado, setStaffSeleccionado] = useState<Staff | null>(null);
  const [mostrarEditar, setMostrarEditar] = useState<boolean>(false);

  useEffect(() => {
    const cargarStaffs = async () => {
      try {
        const staffs = await obtenerStaffs();
        setStaffs(staffs);
      } catch (error) {
        console.error('Error al cargar staffs:', error);
      }
    };

    cargarStaffs();
  }, []);

  const eliminarStaffConfirmado = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este staff?")) {
      try {
        await eliminarStaff(id);
        // Actualizamos la lista de staffs después de eliminar
        setStaffs(prevStaffs => prevStaffs.filter(staff => staff.id !== id));
        // Cerramos la sesión después de eliminar al usuario
        cerrarSesionHandler();
      } catch (error) {
        console.error('Error al eliminar staff:', error);
        alert('Ocurrió un error al intentar eliminar al staff. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  };

  // Define la función para cerrar la sesión
  const cerrarSesionHandler = () => {
    // Aquí debes implementar la lógica para cerrar la sesión del usuario
    console.log('Cerrando sesión...');
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

    // Si el usuario es el que se ha logueado podrá editar sus datos y eliminar su cuenta
    // sin embargo, del resto de usuarios solo podrá ver la información
    return (
      <div key={staff.id} className="staff" style={{ order: isUsuarioLogueado ? 0 : 1 }}>
        <div className={staff.username === username ? "nombre-staff usuario-logueado" : "nombre-staff"}>{staff.nombre}</div>
        <div className="espacio"></div>
        <div className="ed-button">
          {isUsuarioLogueado && (
            <>
              <Button label="Editar" className="p-button-raised p-button-primary" onClick={() => editarStaff(staff)} />
              <Button label="Eliminar" className="p-button-raised p-button-danger" onClick={() => eliminarStaffConfirmado(staff.id)} />
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
        <Reloj />

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
            onClose={() => {
              console.log('Cerrar VerInformacion2');
              setStaffSeleccionado(null);
            }}
            proyectosDisponibles={[]}
          />

          )
        )}

      </main>
    </>
  );
};

export default Pagina2;*/



// DIRECTUS
import React, { useEffect, useState } from 'react';
import './Pagina2.css';
import Cookies from 'universal-cookie';
import { Button } from 'primereact/button';
import { obtenerStaffs, eliminarStaff } from '../application/Pagina2Service';
import ModificarUsuarios from './ModificarUsuarios';
import VerInformacion2 from './VerInformacion2';
import Reloj from './Reloj';

const cookies = new Cookies();

interface Staff {
  id: number;
  first_name: string;
  apellido: string;
  username: string;
  telefono: string;
  fecha_nacimiento: string;
}

interface StaffProps {
  staff: Staff;
}

const AñadirUsuario = () => {
  window.location.href = './añadirUsuarios';
};

const Pagina2: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [staffSeleccionado, setStaffSeleccionado] = useState<Staff | null>(null);
  const [mostrarEditar, setMostrarEditar] = useState<boolean>(false);
  const username = cookies.get('firstname');

  useEffect(() => {
    const cargarStaffs = async () => {
      try {
        const staffs = await obtenerStaffs();
        console.log('Staffs recibidos:', staffs);
        setStaffs(staffs);
      } catch (error) {
        console.error('Error al cargar staffs:', error);
      }
    };

    cargarStaffs();
    console.log('Username almacenado en las cookies:', username);
  }, [username]);

  const eliminarStaffConfirmado = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este staff?")) {
      try {
        await eliminarStaff(id);
        // Actualizamos la lista de staffs después de eliminar
        setStaffs(prevStaffs => prevStaffs.filter(staff => staff.id !== id));
      } catch (error) {
        console.error('Error al eliminar staff:', error);
        alert('Ocurrió un error al intentar eliminar al staff. Por favor, inténtalo de nuevo más tarde.');
      }
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

  return (
    <>
      <main className="main">
        <Reloj />

        <h1 className="jump-animation">STAFKO</h1><br />

        <div className="space">Staffs</div><br />

        <div className="add-button">
          <Button label="+" className="p-button-raised p-button-success custom-orange-button botoncin" onClick={AñadirUsuario} />
        </div>

        {staffs.map((staff) => (
          <div key={staff.id} className="staff">
            <div className={staff.first_name.toLowerCase() === username.toLowerCase() ? "nombre-staff usuario-logueado" : "nombre-staff"}>
              {staff.first_name}
            </div>
            <div className="espacio"></div>
            <div className="ed-button">
              {staff.first_name.toLowerCase() === username.toLowerCase() && (
                <>
                  <Button key={`edit_${staff.id}`} label="Editar" className="p-button-raised p-button-primary" onClick={() => editarStaff(staff)} />
                  <Button key={`delete_${staff.id}`} label="Eliminar" className="p-button-raised p-button-danger" onClick={() => eliminarStaffConfirmado(staff.id)} />
                </>
              )}
              {staff.first_name !== username && (
                <Button key={`view_${staff.id}`} label="Ver más" className="p-button-raised p-button-info" onClick={() => verInformacion(staff)} />
              )}
            </div>
          </div>
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
              onClose={() => {
                console.log('Cerrar VerInformacion2');
                setStaffSeleccionado(null);
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






import React, { useEffect, useState } from 'react';
import './Pagina2.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import ModificarStaff from './ModificarStaff'; 

import { Button } from 'primereact/button'; 

const cookies = new Cookies();

interface Staff {
  id: number;
  nombre: string;
  apellido: string; 
  telefono: string; 
  fechaNacimiento: string; 
}

const StaffComponent: React.FC<Staff> = ({ id, nombre }) => (
  <div key={id} className="staff">
    <div className="nombre-staff">{nombre}</div>
    <div className="espacio"></div>
  </div>
);


export const Pagina2: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]); //estado para almacenar el listado de staffs
  const [staffSeleccionado, setStaffSeleccionado] = useState<Staff | null>(null); //estado para almacenar el staff seleccionado

  useEffect(() => {
    //función para obtener el listado de staffs
    const obtenerStaffs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/usuarios/datos', {
          headers: {
            'Authorization': `Bearer ${cookies.get('token')}` 
          }
        });

        if (Array.isArray(response.data.rows)) {
          setStaffs(response.data.rows); //actualizar el estado staffs con la respuesta de la API
        } else {
          console.error('La respuesta de la API no es un arreglo de staff:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener staff:', error);
      }
    };

    //verificar si hay un usuario autenticado
    if (!cookies.get('username')) {
      window.location.href = "./"; //redireccionar a la página de inicio de sesión si no hay usuario autenticado
    } else {
      obtenerStaffs(); //obtener el listado de staffs
    }
  }, []);

  //función para añadir un nuevo staff
  const añadirStaff = () => {
    window.location.href = './añadirStaff'; //redireccionar a la página de añadir staff
  };

  //función para eliminar un staff
  const eliminarStaff = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/usuEliminar/${id}`, {
        headers: {
          'Authorization': `Bearer ${cookies.get('token')}`
        }
      });
      setStaffs(staffs.filter(staff => staff.id !== id)); // filtramos para actualizar el estado staffs excluyendo el staff eliminado
    } catch (error) {
      console.error('Error al eliminar staff:', error);
    }
  };

  //función para editar un staff
  const editarStaff = (staff: Staff) => {
    setStaffSeleccionado(staff); //establecemos el staff seleccionado para editar
  };

  return (
    <>
      <main className="main">
        <h1 className="jump-animation">STAFKO</h1><br />

        <div className="space">Staffs</div><br />

        <div className="add-button">
          {/*botón para añadir un nuevo staff */}
          <Button label="+" className="p-button-raised p-button-success custom-orange-button" onClick={añadirStaff} />
        </div>
        <br />

        {/*renderizar cada staff */}
        {staffs.map((staff) => (
          <div key={staff.id} className="staff">
            <div className="nombre-staff">{staff.nombre}</div>
            <div className="espacio"></div>
            <div className="ed-button">
              {/* Botón para eliminar el staff */}
              <Button label="Eliminar" className="p-button-raised p-button-danger" onClick={() => eliminarStaff(staff.id)} />
            </div>
          </div>
        ))}

        {/*renderizar el componente ModificarStaff si hay un staff seleccionado */}
        {staffSeleccionado && (
          <ModificarStaff
            staff={staffSeleccionado}
            onGuardar={() => {
              console.log('Guardar cambios');
              setStaffSeleccionado(null);
            }}
          />
        )}

      </main>
    </>
  );
};

export default Pagina2;

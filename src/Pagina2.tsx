import React, { useEffect, useState } from 'react';
import './Pagina2.css';
import Cookies from 'universal-cookie';
import axios from 'axios';

import { Button } from 'primereact/button'; 

const cookies = new Cookies();

interface Staff {
  id: number;
  nombre: string;
}

const StaffComponent: React.FC<Staff> = ({ id, nombre }) => (
  <div key={id} className="staff">
    <div className="nombre-staff">{nombre}</div>
    <div className="espacio"></div>
  </div>
);

export const Pagina2: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);

  useEffect(() => {
    const obtenerStaffs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/usuarios/datos', {
          headers: {
            'Authorization': `Bearer ${cookies.get('token')}` 
          }
        });

        if (Array.isArray(response.data.rows)) {
          setStaffs(response.data.rows);
        } else {
          console.error('La respuesta de la API no es un arreglo de staff:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener staff:', error);
      }
    };

    if (!cookies.get('username')) {
      window.location.href = "./";
    } else {
      obtenerStaffs();
    }
  }, []);

  const añadirStaff = () => {
    window.location.href = './añadirStaff';
  };

  const eliminarStaff = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/usuEliminar/${id}`, {
        headers: {
          'Authorization': `Bearer ${cookies.get('token')}`
        }
      });
      setStaffs(staffs.filter(staff => staff.id !== id));
    } catch (error) {
      console.error('Error al eliminar staff:', error);
    }
  };

  const editarStaff = (staff: Staff) => {
    // Aquí puedes implementar la lógica para editar un staff
    console.log('Editar staff:', staff);
  };

  return (
    <>
      <main className="main">
        <h1 className="jump-animation">STAFKO</h1><br />

        <div className="space">Staffs</div><br />

        <div className="add-button">
          <Button label="+" className="p-button-raised p-button-success custom-orange-button" onClick={añadirStaff} />
        </div>
        <br />

        {staffs.map((staff) => (
          <div key={staff.id} className="staff">
            <div className="nombre-staff">{staff.nombre}</div>
            <div className="espacio"></div>
            <div className="ed-button">
              <Button label="Editar" className="p-button-raised p-button-info" onClick={() => editarStaff(staff)} />
              <Button label="Eliminar" className="p-button-raised p-button-danger" onClick={() => eliminarStaff(staff.id)} />
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default Pagina2;

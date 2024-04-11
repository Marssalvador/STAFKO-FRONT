import React, { useEffect, useState } from 'react';
import './Pagina2.css';
import AñadirStaff from './AñadirStaff';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

interface Staff {
  id: number;
  nombre: string;
}

const modificarStaff = () => {
  window.location.href = './modificarStaff';
};

const eliminarStaff = () => {
  window.location.href = './editarStaff';
};

const Staff: React.FC<Staff> = ({ nombre }) => (
  <div key={nombre} className="staff">
    <div className="nombre-staff">{nombre}</div>
    <div className="espacio"></div>
  </div>
);


/*const Staff: React.FC<Staff> = ({ nombre }) => (
  <div key={nombre} className="staff">
    <div className="nombre-staff">{nombre}</div>
    <div className="espacio"></div>
    <div className="ed-button">
      <button className="button" onClick={modificarStaff}>Editar</button>
      <button className="button" onClick={eliminarStaff}>Eliminar</button>
    </div>
  </div>
);*/


export const Pagina2: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);

  useEffect(() => {
    const obtenerStaffs = async () => {
      try {
        // Realizar la solicitud GET al backend para obtener los proyectos del usuario actual
        const response = await axios.get('http://localhost:4000/usuarios/datos', {
          headers: {
            'Authorization': `Bearer ${cookies.get('token')}` // Suponiendo que hay un token de autenticación en la cookie
          }
        });
        setStaffs(response.data);
      } catch (error) {
        console.error('Error al obtener proyectos del usuario:', error);
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


  return (
    <>
        <main className="main">
          <h1 className="jump-animation">STAFKO</h1><br />

          <div className="space">Staffs</div><br />

          <div className="add-button">
            <button className="button4" onClick={añadirStaff}>+</button>
          </div>
          <br />

          {staffs.map((staff) => (
            <Staff key={staff.id} id={staff.id} nombre={staff.nombre}/>
          ))}
        </main>
    </>
  );
};

export default Pagina2;





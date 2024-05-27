import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

interface Usuarios {
  id: number;
  nombre: string;
  apellido: string;
  telefono: number;
  fecha_nacimiento: string;
  email: string;
  username: string;
  password: string;
  rol: string;
  id_proyecto?: number | null | undefined; 
}

interface Props {
  usuario: Usuarios;
  onClose: () => void;
}

const VerInformacion2: React.FC<Props> = ({ usuario, onClose }) => {
  const [nombreProyecto, setNombreProyecto] = useState<string>('No hay proyecto asignado');

  useEffect(() => {
    const cargarProyectosDisponibles = async () => {
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
        const proyectosDisponibles = proyectosData.data.map((proyecto: any) => ({
          id: proyecto.id,
          nombre: proyecto.nombre
        }));
  
        // Buscar el nombre del proyecto asociado al usuario
        const proyectoAsociado = proyectosDisponibles.find(proyecto => proyecto.id === usuario.id_proyecto);
        if (proyectoAsociado) {
          setNombreProyecto(proyectoAsociado.nombre);
        } else {
          setNombreProyecto('No se encuentra el proyecto asignado.');
        }
      } catch (error) {
        console.error('Error al cargar proyectos disponibles:', error);
      }
    };

    cargarProyectosDisponibles();
  }, [usuario.id_proyecto]);

  // Formateamos la fecha para que tenga formato español
  const formatFecha = (fecha: string): string => {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth() + 1;
    const año = fechaObj.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  // Mostrar los datos en un modal
  return (
    <div className="modal">
      <div className="modal-content flex flex-col items-center justify-center bg-gradient-to-r from-yellow-600 to-orange-400 p-5 rounded-lg shadow-lg mb-6 max-w-md w-full">
        <div>
          <label>Nombre:</label>
          <input type="text" value={usuario.nombre} readOnly />
          <br />
          <label>Apellido:</label>
          <textarea value={usuario.apellido} readOnly />
          <br />
          <label>Usuario:</label>
          <input type="text" value={usuario.username} readOnly />
          <br />
          <label>Teléfono:</label>
          <textarea value={usuario.telefono} readOnly />
          <br />
          <label>Fecha de nacimiento:</label>
          <input type="text" value={formatFecha(usuario.fecha_nacimiento)} readOnly />
          <br />
          {/* Mostrar el nombre del proyecto */}
          <label>Proyecto asociado:</label>
          <input type="text" value={nombreProyecto} readOnly />
        </div>
        <button className="close-modal" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default VerInformacion2;

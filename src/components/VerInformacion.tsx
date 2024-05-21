// Adaptador (Componente React)
import React, { useEffect, useState } from 'react';
import './VerInformacion.css';
import { StaffService } from '../application/InformacionService'; // Servicio
import { Proyecto } from '../domain/types'; // Tipos

interface VerInformacionProps {
  proyecto: Proyecto;
  onClose: () => void;
  staffService: StaffService; 
}

const VerInformacion: React.FC<VerInformacionProps> = ({ proyecto, onClose, staffService }) => {
  const [nombreStaff, setNombreStaff] = useState("");

  useEffect(() => {
    const obtenerNombreStaff = async () => {
      try {
        // Realizar la solicitud para obtener todos los usuarios
        const response = await fetch('http://localhost:8055/items/usuarios');
        const usuariosJSON = await response.json();
  
        // Buscar el usuario cuyo ID coincide con id_staff del proyecto
        const usuarioEncontrado = usuariosJSON.data.find((usuario: any) => usuario.id === proyecto.id_staff);
  
        // Si se encuentra el usuario, obtener su nombre
        if (usuarioEncontrado) {
          const nombre = usuarioEncontrado.nombre;
          setNombreStaff(nombre);
        } else {
          console.error('No se encontró el usuario correspondiente');
        }
      } catch (error) {
        console.error('Error al obtener nombre del staff:', error);
      }
    };
  
    obtenerNombreStaff();
  }, [proyecto.id_staff]); // Agregar proyecto.id_staff como dependencia para volver a ejecutar si cambia
  
  // Función para formatear la fecha
  const formatFecha = (fecha: string): string => {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth() + 1;
    const año = fechaObj.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  return (
    <div className="modal">
      <div className="modal-content flex flex-col items-center justify-center bg-gradient-to-r from-yellow-600 to-orange-400 p-5 rounded-lg shadow-lg mb-6 max-w-md w-full">
        <div>
          <label>Nombre:</label>
          <input type="text" value={proyecto.nombre} readOnly />
          <br />
          <label>Descripción:</label>
          <textarea value={proyecto.descripcion} readOnly />
          <br />
          <label>Cuantía:</label>
          <input type="text" value={proyecto.cuantia} readOnly />
          <br />
          <label>Fecha de inicio:</label>
          <input type="text" value={formatFecha(proyecto.fecha_inicio)} readOnly />
          <br />
          <label>Fecha de fin:</label>
          <input type="text" value={formatFecha(proyecto.fecha_fin)} readOnly />
          <br />
          <label>Nombre del Staff:</label>
          <input type="text" value={nombreStaff} readOnly />
        </div>
        <button className="close-modal" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default VerInformacion;


// Adaptador (Componente React)
import React, { useEffect, useState } from 'react';
import './VerInformacion.css';
import { StaffService } from '../application/InformacionService'; // Servicio
import { Proyecto } from '../domain/types'; // Tipos

interface VerInformacionProps {
  proyecto: Proyecto;
  onClose: () => void;
  staffService: StaffService; // Inyectamos el servicio
}

const VerInformacion: React.FC<VerInformacionProps> = ({ proyecto, onClose, staffService }) => {
  const [nombreStaff, setNombreStaff] = useState("");

  useEffect(() => {
    const obtenerNombreStaff = async () => {
      try {
        const nombre = await staffService.obtenerNombreStaff(proyecto.id_staff);
        setNombreStaff(nombre);
      } catch (error) {
        console.error('Error al obtener nombre del staff:', error);
      }
    };
  
    obtenerNombreStaff();
  }, []);

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

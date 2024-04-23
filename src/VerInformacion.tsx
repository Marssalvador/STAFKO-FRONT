import React, { useEffect, useState } from 'react';
import './VerInformacion.css';
import axios from 'axios';

interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  cuantia: string;
  fecha_inicio: string;
  fecha_fin: string;
  id_staff: string;
}

interface Props {
  proyecto: Proyecto;
  onClose: () => void;
}

const VerInformacion: React.FC<Props> = ({ proyecto, onClose }) => {
  const [nombreStaff, setNombreStaff] = useState("");

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/usuarios/datos/${proyecto.id_staff}`);
        if (response) {
          setNombreStaff(response.data); //sacamos solo el nombre del Staff
        } else {
          setNombreStaff(""); 
        }
      } catch (error) {
        console.error('Error al obtener nombre usuario:', error);
      }
    };
  
    obtenerUsuarios();
  }, []);


  //formateamos la fecha para que sea formato español
  const formatFecha = (fecha: string): string => {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth() + 1;
    const año = fechaObj.getFullYear();
    return `${dia}/${mes}/${año}`;
  };


  return (
    <div className="modal">
      <div className="modal-content flex flex-col items-center justify-center bg-gradient-to-r from-orange-200 p-5 rounded-lg shadow-lg mb-6 max-w-md w-full">
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
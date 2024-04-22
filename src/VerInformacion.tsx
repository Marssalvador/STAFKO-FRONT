import React, { useEffect, useState } from 'react';
import './VerInformacion.css';

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


//modificacion
const VerInformacion: React.FC<Props> = ({ proyecto, onClose }) => {
  const [nombreStaff, setNombreStaff] = useState<string>('Cargando...');

  useEffect(() => {
    const fetchNombreStaff = async () => {
     
        const response = await fetch(`/usuarios/datos/${proyecto.id_staff}`);
        const data = await response.json();
        setNombreStaff(data.nombre);
  
    };

    fetchNombreStaff();
  }, [proyecto.id_staff]);

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
          <label>ID del Staff:</label>
          <input type="text" value={proyecto.id_staff} readOnly />
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





/*


import React from 'react';
import './VerInformacion.css'

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

    const formatFecha = (fecha: string): string => {
        // Convertir la cadena de fecha a objeto Date
        const fechaObj = new Date(fecha);
        // Obtener el día, mes y año
        const dia = fechaObj.getDate();
        const mes = fechaObj.getMonth() + 1; // Sumar 1 al mes ya que los meses van de 0 a 11
        const año = fechaObj.getFullYear();
        // Devolver la fecha en el formato d/m/y
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
          <label>ID del Staff:</label>
          <input type="text" value={proyecto.id_staff} readOnly />
        </div>
        <button className="close-modal" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default VerInformacion;





*/

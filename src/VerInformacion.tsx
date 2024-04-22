// VerInformacion.tsx

import React from 'react';

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
          <input type="text" value={proyecto.fecha_inicio} readOnly />
          <br />
          <label>Fecha de fin:</label>
          <input type="text" value={proyecto.fecha_fin} readOnly />
        </div>
        <button className="close-modal" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default VerInformacion;

// src/components/VerInformacion2.tsx

import React from 'react';
import { Staff, Proyecto } from '../domain/types';
import Informacion2Service from '../application/Informacion2Service';

interface Props {
  usuario: Staff;
  proyectos: Proyecto[];
  onClose: () => void;
}

const VerInformacion2: React.FC<Props> = ({ usuario, proyectos, onClose }) => {
  const nombreProyecto = Informacion2Service.obtenerNombreProyecto(usuario, proyectos);

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
          {nombreProyecto && (
            <>
              <label>Proyecto:</label>
              <input type="text" value={nombreProyecto} readOnly />
            </>
          )}
        </div>
        <button className="close-modal" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default VerInformacion2;

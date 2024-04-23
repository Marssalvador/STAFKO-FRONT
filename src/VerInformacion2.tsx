import React from 'react';

interface Staff {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  fecha_nacimiento: string;
}

interface Props {
  staff: Staff;
  onClose: () => void;
}

const VerInformacion2: React.FC<Props> = ({ staff, onClose }) => {

  //formateamos la fecha para que tenga formato español
  const formatFecha = (fecha: string): string => {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth() + 1;
    const año = fechaObj.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  //mostramos los datos en un modal
  return (
    <div className="modal">
      <div className="modal-content flex flex-col items-center justify-center bg-gradient-to-r from-orange-200 p-5 rounded-lg shadow-lg mb-6 max-w-md w-full">
        <div>
          <label>Nombre:</label>
          <input type="text" value={staff.nombre} readOnly />
          <br />
          <label>Apellido:</label>
          <textarea value={staff.apellido} readOnly />
          <br />
          <label>Usuario:</label>
          <input type="text" value={staff.username} readOnly />
          <br />
          <label>Fecha de nacimiento:</label>
          <input type="text" value={formatFecha(staff.fecha_nacimiento)} readOnly />
        </div>
        <button className="close-modal" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default VerInformacion2;
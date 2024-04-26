import React from 'react';

interface Usuarios {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  username: string;
  fecha_nacimiento: string;
  id_proyecto?: number | null | undefined; // Permitir undefined
}

interface Proyecto {
  id: number;
  nombre: string;
}

interface Props {
  usuario: Usuarios;
  proyectos: Proyecto[]; // Lista de proyectos
  onClose: () => void;
}

const VerInformacion2: React.FC<Props> = ({ usuario, proyectos, onClose }) => {
  // Buscar el nombre del proyecto correspondiente al id_proyecto del usuario
  const nombreProyecto = usuario.id_proyecto ? proyectos.find(proyecto => proyecto.id === usuario.id_proyecto)?.nombre : 'No hay proyecto asignado';

  // Formatear la fecha para que tenga formato español
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
          <label>Telefono:</label>
          <textarea value={usuario.telefono} readOnly />
          <br />
          <label>Fecha de nacimiento:</label>
          <input type="text" value={formatFecha(usuario.fecha_nacimiento)} readOnly />
          <br />
          <label>Proyecto:</label>
          <input type="text" value={nombreProyecto} readOnly />
        </div>
        <button className="close-modal" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default VerInformacion2;

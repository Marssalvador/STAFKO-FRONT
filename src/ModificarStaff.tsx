import React, { useState } from 'react';
import './ModificarStaff.css';

interface Staff {
  nombre: string;
  apellidos: string;
  telefono: string;
  fechaNacimiento: string;
}

interface Props {
  staff: Staff;
  onGuardar: (staff: Staff) => void;
}

const ModificarStaff: React.FC<Props> = ({ staff, onGuardar }) => {
  const [datosStaff, setDatosStaff] = useState<Staff>(staff);

  const cambiar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatosStaff({ ...datosStaff, [name]: value });
  };

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onGuardar(datosStaff);
  };

  return (
    <div className="modificar-staff-container">

      <h2>Modificar Staff</h2>

      <form onSubmit={enviar} className="modificar-staff-form">
        <div className="input-group">
          <label>Nombre:</label>
          <input type="text" name="nombre" value={datosStaff.nombre} onChange={cambiar} />
        </div>

        <div className="input-group">
          <label>Apellidos:</label>
          <input type="text" name="apellidos" value={datosStaff.apellidos} onChange={cambiar} />
        </div>

        <div className="input-group">
          <label>Teléfono:</label>
          <input type="text" name="telefono" value={datosStaff.telefono} onChange={cambiar} />
        </div>

        <div className="input-group">
          <label>Fecha de Nacimiento:</label>
          <input type="date" name="fechaNacimiento" value={datosStaff.fechaNacimiento} onChange={cambiar} />
        </div>

        <button type="submit" className="button">Guardar Cambios</button>
        
      </form>
    </div>
  );
};

export default ModificarStaff;

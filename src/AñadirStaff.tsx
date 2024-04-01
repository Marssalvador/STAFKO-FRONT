import React, { useState } from 'react';
import './AñadirStaff.css';

interface Staff {
  nombre: string;
  apellidos: string;
  telefono: string;
  fechaNacimiento: string;
}

interface Props {
  onAgregarStaff: (nuevoStaff: Staff) => void;
}

const NuevoStaff: React.FC<Props> = ({ onAgregarStaff }) => {
  const [nuevoStaff, setNuevoStaff] = useState<Staff>({
    nombre: '',
    apellidos: '',
    telefono: '',
    fechaNacimiento: ''
  });

  const cambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoStaff({ ...nuevoStaff, [name]: value });
  };

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAgregarStaff(nuevoStaff);
    setNuevoStaff({
      nombre: '',
      apellidos: '',
      telefono: '',
      fechaNacimiento: ''
    });
  };

  return (
    <div className="nuevo-staff-container">
      <img src="/panal2.png" alt="Panal" className='panal-superior-derecho'/>
      <img src="/panal2.png" alt="Panal" className='panal-inferior-izquierdo'/> 
      
      <h2>Agregar Nuevo Staff</h2>

      <form onSubmit={enviar} className="nuevo-staff-form">
        <div className="input-group">
          <label>Nombre:</label>
          <input type="text" name="nombre" value={nuevoStaff.nombre} onChange={cambio} />
        </div>

        <div className="input-group">
          <label>Apellidos:</label>
          <input type="text" name="apellidos" value={nuevoStaff.apellidos} onChange={cambio} />
        </div>

        <div className="input-group">
          <label>Teléfono:</label>
          <input type="text" name="telefono" value={nuevoStaff.telefono} onChange={cambio} />
        </div>

        <div className="input-group">
          <label>Fecha de Nacimiento:</label>
          <input type="date" name="fechaNacimiento" value={nuevoStaff.fechaNacimiento} onChange={cambio} />
        </div>

        <button type="submit" className="button3">Agregar Staff</button>
      </form>
    </div>
  );
};

export default NuevoStaff;

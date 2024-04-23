import React, { useState } from 'react';
import './ModificarStaff.css';
import axios from 'axios';

interface Staff {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  fechaNacimiento: string;
  username: string;
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

  const formatearFecha = (fecha: string): string => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const proyectoFormateado = {
        ...datosStaff,
        fecha_nacimiento: formatearFecha(datosStaff.fechaNacimiento)
      };

      await axios.put(`http://localhost:4000/usuarios/modificar/${datosStaff.id}`, proyectoFormateado);
      alert('¡Proyecto actualizado correctamente!'); //alerta de éxito
      onGuardar(proyectoFormateado);
    } catch (error) {
      alert('Error al actualizar el proyecto. Por favor, intenta de nuevo más tarde.'); 
    }
  };

  return (
    <div className="modificar-staff-container">
      <h2>Edita tus datos</h2>
      <form onSubmit={enviar} className="modificar-staff-form">
        <div className="input-group">
          <label>Nombre:</label>
          <input type="text" name="nombre" value={datosStaff.nombre} onChange={cambiar} />
        </div>
        <div className="input-group">
          <label>Apellidos:</label>
          <input type="text" name="apellido" value={datosStaff.apellido} onChange={cambiar} />
        </div>
        <div className="input-group">
          <label>Usuario:</label>
          <input type="text" name="username" value={datosStaff.username} onChange={cambiar} />
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

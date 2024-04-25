import React, { useState } from 'react';
import './ModificarUsuarios.css';
import axios from 'axios';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  fecha_nacimiento: string;
  username: string;
}

interface Props {
  usuario: Usuario;
  onGuardar: (usuario: Usuario) => void;
}

const Modificarusuario: React.FC<Props> = ({ usuario, onGuardar }) => {
  const [datosusuario, setDatosusuario] = useState<Usuario>(usuario);

  const cambiar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatosusuario({ ...datosusuario, [name]: value });
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
        ...datosusuario,
        fecha_nacimiento: formatearFecha(datosusuario.fecha_nacimiento)
      };

      await axios.put(`http://localhost:4000/usuarios/modificar/${datosusuario.id}`, proyectoFormateado);
      alert('¡Proyecto actualizado correctamente!'); //alerta de éxito
      onGuardar(proyectoFormateado);
    } catch (error) {
      alert('Error al actualizar el proyecto. Por favor, intenta de nuevo más tarde.'); 
    }
  };

  return (
    <div className="modificar-usuario-container">
      <h2>Edita tus datos</h2>
      <form onSubmit={enviar} className="modificar-usuario-form">
        <div className="input-group">
          <label>Nombre:</label>
          <input type="text" name="nombre" value={datosusuario.nombre} onChange={cambiar} />
        </div>
        <div className="input-group">
          <label>Apellidos:</label>
          <input type="text" name="apellido" value={datosusuario.apellido} onChange={cambiar} />
        </div>
        <div className="input-group">
          <label>Usuario:</label>
          <input type="text" name="username" value={datosusuario.username} onChange={cambiar} />
        </div>
        <div className="input-group">
          <label>Teléfono:</label>
          <input type="text" name="telefono" value={datosusuario.telefono} onChange={cambiar} />
        </div>
        <div className="input-group">
          <label>Fecha de Nacimiento:</label>
          <input type="date" name="fecha_nacimiento" value={datosusuario.fecha_nacimiento} onChange={cambiar} />
        </div>
        <button type="submit" className="button">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default Modificarusuario;

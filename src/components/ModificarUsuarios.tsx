import React, { useState } from 'react';
import './ModificarUsuarios.css';
import { Staff } from '../domain/types';
import { actualizarUsuario } from '../infrastructure/UsuarioServiceHTTP';

interface Props {
  usuario: Staff;
  onGuardar: (usuario: Staff) => void;
}

const ModificarUsuarios: React.FC<Props> = ({ usuario, onGuardar }) => {
  const [datosUsuario, setDatosUsuario] = useState<Staff>(usuario);

  const cambiar = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDatosUsuario({ ...datosUsuario, [name]: value });
  };

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await actualizarUsuario(datosUsuario);
      alert('¡Usuario actualizado correctamente!');
      onGuardar(datosUsuario);
    } catch (error) {
      alert('Error al actualizar el usuario. Por favor, intenta de nuevo más tarde.');
    }
  };

  return (
    <div className="modificar-usuario-container">
      <h2>Edita los datos</h2>
      <form onSubmit={enviar} className="modificar-usuario-form">
        <div className="input-group">
          <label>Nombre:</label>
          <input type="text" name="nombre" value={datosUsuario.nombre} onChange={cambiar} />
        </div>
        <div className="input-group">
          <label>Apellidos:</label>
          <input type="text" name="apellido" value={datosUsuario.apellido} onChange={cambiar} />
        </div>
        <div className="input-group">
          <label>Usuario:</label>
          <input type="text" name="username" value={datosUsuario.username} onChange={cambiar} />
        </div>
        <div className="input-group">
          <label>Teléfono:</label>
          <input type="text" name="telefono" value={datosUsuario.telefono} onChange={cambiar} />
        </div>
        <div className="input-group">
          <label>Fecha de Nacimiento:</label>
          <input type="date" name="fecha_nacimiento" value={datosUsuario.fecha_nacimiento} onChange={cambiar} />
        </div>
        <button type="submit" className="button">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default ModificarUsuarios;

// src/components/Modificarusuario.tsx
import React, { useState } from 'react';
import './ModificarUsuarios.css';
import { Usuario, actualizarUsuario } from '../application/UsuarioService';

interface Props {
  usuario: Usuario;
  onGuardar: (usuario: Usuario) => void;
}

const Modificarusuario: React.FC<Props> = ({ usuario, onGuardar }) => {
  const [datosusuario, setDatosusuario] = useState<Usuario>(usuario);

  const cambiar = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDatosusuario({ ...datosusuario, [name]: value });
  };

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await actualizarUsuario(datosusuario);
      alert('¡Usuario actualizado correctamente!');
      onGuardar(datosusuario);
    } catch (error) {
      alert('Error al actualizar el usuario. Por favor, intenta de nuevo más tarde.');
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

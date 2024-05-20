// src/components/ModificarProject.tsx
import React, { useState } from 'react';
import { Proyecto } from '../domain/types';

interface ModificarProjectProps {
  proyecto: Proyecto;
  onClose: () => void;
  onSave: (proyecto: Proyecto) => void;
}

const ModificarProject: React.FC<ModificarProjectProps> = ({ proyecto, onClose, onSave }) => {
  const [nombre, setNombre] = useState(proyecto.nombre);

  const handleSave = () => {
    const updatedProject = { ...proyecto, nombre };
    onSave(updatedProject);
  };

  return (
    <div>
      <h2>Modificar Proyecto</h2>
      <input
        type="text"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />
      <button onClick={handleSave}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
}

export default ModificarProject;


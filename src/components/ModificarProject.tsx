// src/components/ModificarProject.tsx
//Directus

import React, { useState } from 'react';
import { Proyecto } from '../domain/types';

interface ModificarProjectProps {
  proyecto: Proyecto;
  onClose: () => void;
  onSave: (proyectoEditado: Proyecto) => void;
}

const ModificarProject: React.FC<ModificarProjectProps> = ({ proyecto, onClose, onSave }) => {
  const [nombre, setNombre] = useState<string>(proyecto.nombre);
  const [descripcion, setDescripcion] = useState<string>(proyecto.descripcion);

  const handleSave = () => {
    const proyectoEditado: Proyecto = {
      ...proyecto,
      nombre,
      descripcion
    };
    onSave(proyectoEditado);
  };

  return (
    <div className="modificar-project">
      <h2>Modificar Proyecto</h2>
      <label>Nombre</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <label>Descripción</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button onClick={handleSave}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default ModificarProject;



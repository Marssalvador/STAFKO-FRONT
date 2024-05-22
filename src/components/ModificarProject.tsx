import React, { useState } from 'react';
import { Proyecto } from '../domain/types';
import { ProyectoServiceHTTP } from '../infrastructure/ProyectoServiceHTTP';

interface ModificarProjectProps {
  proyecto: Proyecto;
  onClose: () => void;
  onSave: (proyectoEditado: Proyecto) => void;
}

const ModificarProject: React.FC<ModificarProjectProps> = ({ proyecto, onClose, onSave }) => {
  const [nombre, setNombre] = useState<string>(proyecto.nombre);
  const [descripcion, setDescripcion] = useState<string>(proyecto.descripcion);

  const handleSave = async () => {
    const proyectoEditado: Proyecto = {
      ...proyecto,
      nombre,
      descripcion
    };

    const proyectoService = new ProyectoServiceHTTP('http://localhost:8055');
    
    try {
      await proyectoService.actualizarProyecto(proyectoEditado);
      onSave(proyectoEditado);
    } catch (error) {
      console.error('Error al guardar el proyecto:', error);
      // Manejar el error aquí
    }
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

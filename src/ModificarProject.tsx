import React, { useState } from 'react';
import './ModificarProject.css';

interface Proyecto {
  nombre: string;
  descripcion: string;
  cuantia: string;
  fecha_inicio: string;
  fecha_fin: string;
}

interface Props {
  proyecto: Proyecto;
  onGuardar: (proyecto: Proyecto) => void;
}

const ModificarProject: React.FC<Props> = ({ proyecto, onGuardar }) => {
  const [datosProyecto, setDatosProyecto] = useState<Proyecto>(proyecto);

  const cambiar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatosProyecto({ ...datosProyecto, [name]: value });
  };

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onGuardar(datosProyecto);
  };

  return (
    <div className="modificar-proyecto-container">

      <h2>Modificar Proyecto</h2>

      <form onSubmit={enviar} className="modificar-proyecto-form">
        <div className="input-group">
          <label>Nombre:</label>
          <input type="text" name="nombre" value={datosProyecto.nombre} onChange={cambiar} />
        </div>

        <div className="input-group">
          <label>Descripción:</label>
          <input type="text" name="descripcion" value={datosProyecto.descripcion} onChange={cambiar} />
        </div>

        <div className="input-group">
          <label>Cuantía:</label>
          <input type="text" name="cuantia" value={datosProyecto.cuantia} onChange={cambiar} />
        </div>

        <div className="input-group">
          <label>Fecha de inicio:</label>
          <input type="date" name="fecha_inicio" value={datosProyecto.fecha_inicio} onChange={cambiar} />
        </div>

        <div className="input-group">
          <label>Fecha de fin:</label>
          <input type="date" name="fecha_fin" value={datosProyecto.fecha_fin} onChange={cambiar} />
        </div>

        <button type="submit" className="button">Guardar Cambios</button>
        
      </form>
    </div>
  );
};

export default ModificarProject;

import React, { useState, useEffect } from 'react';
import './ModificarProject.css';
import axios from 'axios';

interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  cuantia: string;
  fecha_inicio: string;
  fecha_fin: string;
  id_staff: string;
}

interface Usuario {
  id: string;
  nombre: string;
}

interface Props {
  proyecto: Proyecto;
  onGuardar: (proyectoEditado: Proyecto) => void;
}

const ModificarProject: React.FC<Props> = ({ proyecto, onGuardar }) => {
  const [datosProyecto, setDatosProyecto] = useState<Proyecto>(proyecto);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); // Estado para almacenar la lista de usuarios

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:4000/usuarios/ids-nombres'); // Endpoint para obtener los usuarios
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []);

  const cambiar = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDatosProyecto({ ...datosProyecto, [name]: value });
  };

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const proyectoFormateado = {
        ...datosProyecto,
        fecha_inicio: formatearFecha(datosProyecto.fecha_inicio),
        fecha_fin: formatearFecha(datosProyecto.fecha_fin)
      };

      await axios.put(`http://localhost:4000/proyecto/${datosProyecto.id}`, proyectoFormateado);
      console.log('Proyecto actualizado correctamente');
      onGuardar(proyectoFormateado);
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error);
    }
  };

  const formatearFecha = (fecha: string): string => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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
        <div className="input-group">
        <label>Staff:</label>
        <select name="id_staff" value={datosProyecto.id_staff} onChange={cambiar}>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
          ))}
        </select>
      </div>
        <button type="submit" className="button4">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default ModificarProject;

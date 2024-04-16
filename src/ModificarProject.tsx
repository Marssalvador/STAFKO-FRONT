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
        setUsuarios(response.data.rows); // Corrección aquí: Acceder a response.data.rows en lugar de solo response.data
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
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-orange-200 to-orange-100 p-5 rounded-lg shadow-lg mb-6 max-w-md w-full">
      <h2 className="text-3xl font-semibold mb-6">Modificar Proyecto</h2>
      <form onSubmit={enviar} className="space-y-6 w-full">
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Nombre:</label>
          <input type="text" name="nombre" value={datosProyecto.nombre} onChange={cambiar} className="input-group" placeholder="Ingrese el nombre del proyecto" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Descripción:</label>
          <textarea name="descripcion" value={datosProyecto.descripcion} onChange={cambiar} className="input-group resize-none h-32" placeholder="Ingrese la descripción del proyecto"></textarea>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Cuantía:</label>
          <input type="text" name="cuantia" value={datosProyecto.cuantia} onChange={cambiar} className="input-group" placeholder="Ingrese la cuantía del proyecto" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Fecha de inicio:</label>
          <input type="date" name="fecha_inicio" value={datosProyecto.fecha_inicio} onChange={cambiar} className="input-group" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Fecha de fin:</label>
          <input type="date" name="fecha_fin" value={datosProyecto.fecha_fin} onChange={cambiar} className="input-group" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Staff:</label>
          <select name="id_staff" value={datosProyecto.id_staff} onChange={cambiar} className="input-group">
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-orange-600 transition duration-300 w-full">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default ModificarProject;

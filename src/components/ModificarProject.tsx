// src/components/ModificarProject.tsx
import React, { useState, useEffect } from 'react';
import './ModificarProject.css';
import { Proyecto, Usuario, obtenerUsuarios, actualizarProyecto } from '../application/ProyectoService';

interface Props {
  proyecto: Proyecto;
  onGuardar: (proyectoEditado: Proyecto) => void;
}

const ModificarProject: React.FC<Props> = ({ proyecto, onGuardar }) => {
  const [datosProyecto, setDatosProyecto] = useState<Proyecto>(proyecto);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuariosData = await obtenerUsuarios();
        setUsuarios(usuariosData);
      } catch (error) {
        console.log("Error el obtener usuario");
      }
    };

    fetchUsuarios();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDatosProyecto({ ...datosProyecto, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await actualizarProyecto(datosProyecto);
      onGuardar(datosProyecto);
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error);
    }
  };

  return (
    <div className="">
      <h2 className="text-3xl font-semibold mb-6">Información</h2>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Nombre:</label>
          <input type="text" name="nombre" value={datosProyecto.nombre} onChange={handleChange} className="input-group" placeholder="Ingrese el nombre del proyecto" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Descripción:</label>
          <textarea name="descripcion" value={datosProyecto.descripcion} onChange={handleChange} className="input-group resize-none h-32" placeholder="Ingrese la descripción del proyecto"></textarea>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Cuantía:</label>
          <input type="text" name="cuantia" value={datosProyecto.cuantia} onChange={handleChange} className="input-group" placeholder="Ingrese la cuantía del proyecto" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Fecha de inicio:</label>
          <input type="date" name="fecha_inicio" value={datosProyecto.fecha_inicio} onChange={handleChange} className="input-group" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Fecha de fin:</label>
          <input type="date" name="fecha_fin" value={datosProyecto.fecha_fin} onChange={handleChange} className="input-group" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Staff:</label>
          <select name="id_staff" value={datosProyecto.id_staff} onChange={handleChange} className="input-group">
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

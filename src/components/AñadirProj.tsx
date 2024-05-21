// src/components/AñadirProj.tsx
//Directus

import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useAñadirProyecto } from '../application/AñadirProyecto';
import { Proyecto, Staff } from '../domain/types';
import Cookies from 'universal-cookie';

const AñadirProj: React.FC = () => {
  const { añadir, obtenerStaffs } = useAñadirProyecto();
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [proyecto, setProyecto] = useState<Proyecto>({
    nombre: '',
    descripcion: '',
    cuantia: '',
    fecha_inicio: '',
    fecha_fin: '',
    id_staff: ''
  });

  useEffect(() => {
    obtenerStaffs().then(data => setStaffs(data)).catch(error => console.error('Error al obtener usuarios:', error));
  }, [obtenerStaffs]);

  const cambiar = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProyecto({ ...proyecto, [name]: value });
  };

  const añadirProyecto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cookies = new Cookies();
    const token = cookies.get('access_token');
    if (!token) {
      window.location.href = "./";
      return;
    }

    añadir(proyecto).then(() => {
      alert('¡Proyecto añadido con éxito!');
      setProyecto({
        nombre: '',
        descripcion: '',
        cuantia: '',
        fecha_inicio: '',
        fecha_fin: '',
        id_staff: ''
      });
    }).catch(error => {
      console.error('Error al añadir proyecto:', error);
    });
  };

  return (
    <>
      <img src="/panal2.png" alt="Panal" className="panal-superior-derecho" />
      <img src="/panal2.png" alt="Panal" className="panal-inferior-izquierdo" />

      <main className='formu'>
        <div className="añadir-proyecto-container bg-gradient-to-r from-orange-200 to-orange-100 p-8 rounded-lg shadow-lg mb-6 max-w-md w-full">
          <h2 className="text-3xl font-semibold mb-6">Añadir Proyecto</h2>

          <form onSubmit={añadirProyecto} className="space-y-6 w-full">
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Nombre:</label>
              <input type="text" name="nombre" value={proyecto.nombre} onChange={cambiar} className="input-group" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Descripción:</label>
              <input type="text" name="descripcion" value={proyecto.descripcion} onChange={cambiar} className="input-group" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Cuantía:</label>
              <input type="text" name="cuantia" value={proyecto.cuantia} onChange={cambiar} className="input-group" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Fecha de inicio:</label>
              <input type="date" name="fecha_inicio" value={proyecto.fecha_inicio} onChange={cambiar} className="input-group" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Fecha de fin:</label>
              <input type="date" name="fecha_fin" value={proyecto.fecha_fin} onChange={cambiar} className="input-group" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Staff: </label>
              <select name="id_staff" value={proyecto.id_staff} onChange={cambiar} className="input-group">
                <option value="">Selecciona un staff</option>
                {staffs.map((staff: Staff) => (
                  <option key={staff.id} value={staff.id}>{staff.nombre}</option>
                ))}
              </select>
            </div>

            <Button type="submit" label="Añadir Proyecto" className="p-button-outlined naranja" />
          </form>
        </div>
      </main>
    </>
  );
};

export default AñadirProj;



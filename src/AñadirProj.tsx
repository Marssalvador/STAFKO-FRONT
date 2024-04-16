import React, { useState, useEffect } from 'react';
import './AñadirProj.css';

interface Staff {
  id: string;
  nombre: string;
}

interface Proyecto {
  nombre: string;
  descripcion: string;
  cuantia: string;
  fecha_inicio: string;
  fecha_fin: string;
  id_staff: string;
}

const AñadirProj: React.FC = () => {
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
    // Realizar solicitud HTTP para obtener los usuarios del backend
    fetch('http://localhost:4000/usuarios/ids-nombres') // Cambiar la URL según la configuración de tu backend
      .then(response => response.json())
      .then(data => {
        // Verificar si la respuesta contiene la propiedad 'rows'
        if (data && Array.isArray(data.rows)) {
          setStaffs(data.rows); // Almacena los usuarios en el estado
        } else {
          console.error('La respuesta de la API no contiene un arreglo de usuarios en la propiedad "rows":', data);
        }
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
      });
  }, []);
  
  

  const cambiar = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProyecto({ ...proyecto, [name]: value });
  };

  const añadir = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Verificar si todos los campos del proyecto están llenos
    if (
      proyecto.nombre.trim() === '' ||
      proyecto.descripcion.trim() === '' ||
      proyecto.cuantia.trim() === '' ||
      proyecto.fecha_inicio.trim() === '' ||
      proyecto.fecha_fin.trim() === '' ||
      proyecto.id_staff.trim() === ''
    ) {
      // Mostrar un mensaje de error si algún campo está vacío
      alert('¡Todos los campos son obligatorios!');
      return; // Detener el proceso de añadir el proyecto
    }
  
    // Si todos los campos están llenos, enviar la solicitud para añadir el proyecto
    fetch('http://localhost:4000/proyecto/insertar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proyecto),
    })
      .then(response => response.json())
      .then(data => {
        alert('¡Proyecto añadido con éxito!');
      })
      .catch(error => {
        console.error('Error al añadir proyecto:', error);
      });
  
    // Limpiar el formulario después de enviar la solicitud
    setProyecto({
      nombre: '',
      descripcion: '',
      cuantia: '',
      fecha_inicio: '',
      fecha_fin: '',
      id_staff: ''
    });
  };
  

  return (
    <div className="añadir-proyecto-container bg-gradient-to-r from-orange-200 to-orange-100 p-8 rounded-lg shadow-lg mb-6 max-w-md w-full">
    
      <img src="/panal2.png" alt="Panal" className='panal-superior-derecho'/>
      <img src="/panal2.png" alt="Panal" className='panal-inferior-izquierdo'/> 

      <h2 className="text-3xl font-semibold mb-6">Añadir Proyecto</h2>

      <form onSubmit={añadir} className="space-y-6 w-full">
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

        <button type="submit" className='button2'>Añadir Proyecto</button>
      </form>
    </div>
  );
};

export default AñadirProj;



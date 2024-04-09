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
        setStaffs(data); // Almacena los usuarios en el estado
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
    fetch('http://localhost:4000/proyecto/insertar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proyecto),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message); // Muestra el mensaje de éxito
    })
    .catch(error => {
      console.error('Error al añadir proyecto:', error);
    });
  
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
    <div className="añadir-proyecto-container">
    
      <img src="/panal2.png" alt="Panal" className='panal-superior-derecho'/>
      <img src="/panal2.png" alt="Panal" className='panal-inferior-izquierdo'/> 

      <h2>Añadir Proyecto</h2>

      <form onSubmit={añadir}>
        <div className="input-group">
          <label>Nombre:</label>
          <input type="text" name="nombre" value={proyecto.nombre} onChange={cambiar} />
        </div>

        <div className="input-group">
          <label>Descripción:</label>
          <input type="text" name="descripcion" value={proyecto.descripcion} onChange={cambiar} />
        </div>

        <div className="input-group">
          <label>Cuantía:</label>
          <input type="text" name="cuantia" value={proyecto.cuantia} onChange={cambiar} />
        </div>

        <div className="input-group">
          <label>Fecha de inicio:</label>
          <input type="date" name="fecha_inicio" value={proyecto.fecha_inicio} onChange={cambiar} />
        </div>

        <div className="input-group">
          <label>Fecha de fin:</label>
          <input type="date" name="fecha_fin" value={proyecto.fecha_fin} onChange={cambiar} />
        </div>

        <div className="input-group">
          <label>Staff: </label>
          <select name="id_staff" value={proyecto.id_staff} onChange={cambiar}>
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



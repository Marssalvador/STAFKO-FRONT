import React, { useState } from 'react';
import './AñadirStaff.css';
import md5 from 'md5';

interface Staff {
  nombre: string;
  apellidos: string;
  telefono: string;
  username: string;
  password: string;
  fechaNacimiento: string;
}

const NuevoStaff: React.FC = () => {
  const [nuevoStaff, setNuevoStaff] = useState<Staff>({
    nombre: '',
    apellidos: '',
    telefono: '',
    username: '',
    password: '',
    fechaNacimiento: ''
  });

  const [staffs, setStaffs] = useState<Staff[]>([]);

  const cambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoStaff({ ...nuevoStaff, [name]: value });
  };

  const agregarStaff = () => {
    // Agregar campos faltantes al objeto nuevoStaff
    const hashedPassword = md5(md5(nuevoStaff.password));
    const nuevoStaffCompleto = {
      ...nuevoStaff,
      apellido: nuevoStaff.apellidos, // Asignamos el valor de 'apellidos' a 'apellido'
      fecha_nacimiento: nuevoStaff.fechaNacimiento, // Cambiamos el nombre del campo a 'fecha_nacimiento'
      password: hashedPassword
    };
  
    fetch('http://localhost:4000/usuarios/insertar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoStaffCompleto), // Enviamos el objeto completo con todos los campos
    })
    .then(response => response.json())
    .then(data => {
      // Si la solicitud fue exitosa, agregamos el nuevo staff a la lista
      setStaffs([...staffs, nuevoStaff]);
      // Y limpiamos los campos del formulario
      setNuevoStaff({
        nombre: '',
        apellidos: '',
        telefono: '',
        username: '',
        password: '',
        fechaNacimiento: ''
      });
    })
    .catch(error => {
      console.error('Error al agregar staff:', error);
    });
  };

  return (
    <div className="nuevo-staff-container">
      <img src="/panal2.png" alt="Panal" className='panal-superior-derecho'/>
      <img src="/panal2.png" alt="Panal" className='panal-inferior-izquierdo'/> 
      
      <h2>Agregar Nuevo Staff</h2>

      <div className="nuevo-staff-form">
        <div className="input-group">
          <label>Nombre:</label>
          <input type="text" name="nombre" value={nuevoStaff.nombre} onChange={cambio} />
        </div>

        <div className="input-group">
          <label>Apellidos:</label>
          <input type="text" name="apellidos" value={nuevoStaff.apellidos} onChange={cambio} />
        </div>

        <div className="input-group">
          <label>Teléfono:</label>
          <input type="text" name="telefono" value={nuevoStaff.telefono} onChange={cambio} />
        </div>

        <div className="input-group">
          <label>Username:</label>
          <input type="text" name="username" value={nuevoStaff.username} onChange={cambio} />
        </div>

        <div className="input-group">
          <label>Password:</label>
          <input type="password" name="password" value={nuevoStaff.password} onChange={cambio} />
        </div>

        <div className="input-group">
          <label>Fecha de Nacimiento:</label>
          <input type="date" name="fechaNacimiento" value={nuevoStaff.fechaNacimiento} onChange={cambio} />
        </div>

        <button type="button" className="button3" onClick={agregarStaff}>Agregar Staff</button>
      </div>

      <h2>Staffs Agregados</h2>
      <ul>
        {staffs.map((staff, index) => (
          <li key={index}>
            <strong>{staff.nombre} {staff.apellidos}</strong> - Teléfono: {staff.telefono}, Fecha de Nacimiento: {staff.fechaNacimiento}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NuevoStaff;

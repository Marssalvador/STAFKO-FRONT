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
    const hashedPassword = md5(nuevoStaff.password);
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
    <div className="flex justify-center items-center w-full h-full">
  <div className="nuevo-staff-container bg-gradient-to-r from-orange-200 to-orange-100 p-8 rounded-lg shadow-lg mb-6">
    <img src="/panal2.png" alt="Panal" className="panal-superior-derecho" />
    <img src="/panal2.png" alt="Panal" className="panal-inferior-izquierdo" />
    
    <h2 className="text-3xl font-semibold mb-6">Agregar Nuevo Staff</h2>

    <div className="nuevo-staff-form space-y-4">
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Nombre:</label>
        <input type="text" name="nombre" value={nuevoStaff.nombre} onChange={cambio} className="input-group" />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Apellidos:</label>
        <input type="text" name="apellidos" value={nuevoStaff.apellidos} onChange={cambio} className="input-group" />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Teléfono:</label>
        <input type="text" name="telefono" value={nuevoStaff.telefono} onChange={cambio} className="input-group" />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Username:</label>
        <input type="text" name="username" value={nuevoStaff.username} onChange={cambio} className="input-group" />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Password:</label>
        <input type="password" name="password" value={nuevoStaff.password} onChange={cambio} className="input-group" />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Fecha de Nacimiento:</label>
        <input type="date" name="fechaNacimiento" value={nuevoStaff.fechaNacimiento} onChange={cambio} className="input-group" />
      </div>

      <button type="button" className="button3 w-full" onClick={agregarStaff}>Agregar Staff</button>
    </div>

    <h2 className="text-3xl font-semibold mb-4 mt-6">Staffs Agregados</h2>
    <ul className="space-y-2">
      {staffs.map((staff, index) => (
        <li key={index} className="text-sm">
          <strong>{staff.nombre} {staff.apellidos}</strong> - Teléfono: {staff.telefono}, Fecha de Nacimiento: {staff.fechaNacimiento}
        </li>
      ))}
    </ul>
  </div>
</div>

  );
};

export default NuevoStaff;

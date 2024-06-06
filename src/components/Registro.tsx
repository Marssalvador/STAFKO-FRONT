import React, { useState } from 'react';
import md5 from 'md5';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { agregarNuevoUsuario } from '../application/AñadirUsuarios';

import './Registro.css';

interface Staff {
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  username: string;
  password: string;
  fechaNacimiento: string;
  rol: string | null;
}

const NuevoStaff: React.FC = () => {
  const [nuevoStaff, setNuevoStaff] = useState<Staff>({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    username: '',
    password: '',
    fechaNacimiento: '',
    rol: null,
  });

  const [mensaje, setMensaje] = useState<string>('');
  const [esCliente, setEsCliente] = useState<boolean>(false);
  const navigate = useNavigate();

  const cambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoStaff({ ...nuevoStaff, [name]: value });
  };

  const mostrarAlerta = (mensaje: string) => {
    alert(mensaje);
  };

  const enviarDatosPorRol = async (usuarioDatos: any, url: string) => {
    try {
      console.log('Enviando datos a URL:', url);
      console.log('Datos del usuario:', JSON.stringify(usuarioDatos));

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioDatos)
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      console.log('Datos enviados correctamente:', usuarioDatos);
    } catch (error) {
      console.error('Error al enviar datos:', error.message);
    }
  };

  const agregarStaff = async () => {
    if (
      nuevoStaff.nombre.trim() === '' ||
      nuevoStaff.apellidos.trim() === '' ||
      nuevoStaff.telefono.trim() === '' ||
      nuevoStaff.email.trim() === '' ||
      nuevoStaff.username.trim() === '' ||
      nuevoStaff.password.trim() === '' ||
      nuevoStaff.fechaNacimiento.trim() === ''
    ) {
      mostrarAlerta('¡Todos los campos son obligatorios!');
      return;
    }

    const fechaActual = new Date().toISOString().split('T')[0];

    if (nuevoStaff.fechaNacimiento > fechaActual) {
      mostrarAlerta('La fecha de nacimiento no puede ser mayor que la fecha actual.');
      return;
    }

    const hashedPassword = md5(nuevoStaff.password);
    const nuevoStaffCompleto = {
      ...nuevoStaff,
      apellido: nuevoStaff.apellidos,
      fecha_nacimiento: nuevoStaff.fechaNacimiento,
      password: hashedPassword,
      rol: esCliente ? 'cliente' : 'staff',
    };

    const usuarioDatos = {
      first_name: nuevoStaff.nombre,
      last_name: nuevoStaff.apellidos,
      email: nuevoStaff.email,
      password: hashedPassword,
      role: esCliente ? '8e86c02e-1ef4-4765-aba9-537923a19ffb' : 'e5fd067e-362e-471c-8aa8-e7201c1c8411',
      status: 'active',
      provider: 'default',
      email_notifications: true,
    };

    //comprobamos el tipo de cliente que es 
    const url = esCliente
      ? 'http://localhost:8055/users?filter[role]=8e86c02e-1ef4-4765-aba9-537923a19ffb'
      : 'http://localhost:8055/users?filter[role]=e5fd067e-362e-471c-8aa8-e7201c1c8411';

    try {
      await agregarNuevoUsuario(usuarioDatos);
      await enviarDatosPorRol(usuarioDatos, url);
      setMensaje('¡Staff añadido con éxito! Redirigiendo...');

      // Limpiamos los campos del formulario y el mensaje
      setNuevoStaff({
        nombre: '',
        apellidos: '',
        telefono: '',
        email: '',
        username: '',
        password: '',
        fechaNacimiento: '',
        rol: null,
      });

      // Esperar 2 segundos y luego redirigir
      setTimeout(() => {
        navigate('/pagina');
      }, 2000);
      
    } catch (error) {
      console.error('Error al agregar staff:', error);
      mostrarAlerta('Error al agregar staff. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <>
      <img src="/panal.png" alt="Panal" className='panal-superior-derecho' />
      <img src="/panal.png" alt="Panal" className='panal-inferior-izquierdo' />

      <main className="formu">
        {mensaje && (
          <div className="text-orange-500 text-center mt-2">{mensaje}</div>
        )}
        <div className="nuevo-staff-form space-y-4 bg-gradient-to-r from-orange-200 to-orange-100 p-8 rounded-lg shadow-lg mb-6">
          <h2 className="text-3xl font-semibold mb-6">¡Regístrate aquí!</h2>
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
            <label className="text-sm font-semibold mb-1">Email:</label>
            <input type="text" name="email" value={nuevoStaff.email} onChange={cambio} className="input-group" />
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

          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">¿Cliente?:</label>
            <input type="checkbox" checked={esCliente} onChange={() => setEsCliente(!esCliente)} />
          </div>

          <div className="flex justify-center mt-4">
            <Button type="button" label="Añadir Staff" className="p-button-outlined naranja" onClick={agregarStaff} />
          </div>
        </div>
      </main>
    </>
  );
};

export default NuevoStaff;

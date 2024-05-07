import React, { useState } from 'react';
import md5 from 'md5';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom'; 
import { agregarNuevoUsuario } from '../application/AñadirUsuarios';

import './Registro.css';

interface Usuario {
  nombre: string;
  apellidos: string;
  telefono: string;
  username: string;
  password: string;
  fechaNacimiento: string;
  rol: string | null; 
}

const AñadirUsuarios: React.FC = () => {
  const [nuevoUsuario, setNuevoUsuario] = useState<Usuario>({
    nombre: '',
    apellidos: '',
    telefono: '',
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
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
  };

  const showAlert = (message: string) => {
    alert(message);
  };

  const agregarUsuario = async () => {
    console.log('Nuevo Usuario:', nuevoUsuario);

    if (
      nuevoUsuario.nombre.trim() === '' ||
      nuevoUsuario.apellidos.trim() === '' ||
      nuevoUsuario.telefono.trim() === '' ||
      nuevoUsuario.username.trim() === '' ||
      nuevoUsuario.password.trim() === '' ||
      nuevoUsuario.fechaNacimiento.trim() === ''
    ) {
      showAlert('¡Todos los campos son obligatorios!');
      return;
    }

    const fechaActual = new Date().toISOString().split('T')[0];

    if (nuevoUsuario.fechaNacimiento > fechaActual) {
      showAlert('La fecha de nacimiento no puede ser mayor que la fecha actual.');
      return;
    }

    const hashedPassword = md5(nuevoUsuario.password);
    const nuevoUsuarioCompleto = {
      ...nuevoUsuario,
      apellido: nuevoUsuario.apellidos,
      fecha_nacimiento: nuevoUsuario.fechaNacimiento,
      password: hashedPassword,
      rol: esCliente ? 'cliente' : 'staff',
    };

    try {
      const response = await agregarNuevoUsuario(nuevoUsuarioCompleto);
      showAlert('¡Usuario añadido con éxito!');
    } catch (error) {
      console.error('Error al agregar usuario:', error.message);
      showAlert('Error al agregar usuario. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <>
      <img src="/panal2.png" alt="Panal" className="panal-superior-derecho" />
      <img src="/panal2.png" alt="Panal" className="panal-inferior-izquierdo" />

      <main className="formu">
        <div className="nuevo-usuario-form space-y-4 bg-gradient-to-r from-orange-200 to-orange-100 p-8 rounded-lg shadow-lg mb-6">
          <h2 className="text-3xl font-semibold mb-6">Añadir usuario</h2>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Nombre:</label>
              <input type="text" name="nombre" value={nuevoUsuario.nombre} onChange={cambio} className="input-group" />
            </div>
          
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Apellidos:</label>
              <input type="text" name="apellidos" value={nuevoUsuario.apellidos} onChange={cambio} className="input-group" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Teléfono:</label>
              <input type="text" name="telefono" value={nuevoUsuario.telefono} onChange={cambio} className="input-group" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Username:</label>
              <input type="text" name="username" value={nuevoUsuario.username} onChange={cambio} className="input-group" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Password:</label>
              <input type="password" name="password" value={nuevoUsuario.password} onChange={cambio} className="input-group" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Fecha de Nacimiento:</label>
              <input type="date" name="fechaNacimiento" value={nuevoUsuario.fechaNacimiento} onChange={cambio} className="input-group" />
            </div>

            <div className="flex items-center"> 
                <label className="text-sm font-semibold mb-1 mr-2">¿Cliente?:</label> 
                <input type="checkbox" checked={esCliente} onChange={() => setEsCliente(!esCliente)} />
            </div>

            <div className="flex justify-center mt-4">
              <Button type="button" label="Añadir Usuario" className="p-button-outlined naranja" onClick={agregarUsuario}/>        
            </div>
        </div>
      </main>
    </>
  );
};

export default AñadirUsuarios;

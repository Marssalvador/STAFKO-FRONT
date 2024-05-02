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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
  };

  const showAlert = (message: string) => {
    alert(message);
  };

  const agregarUsuario = async () => {
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
      setMensaje('¡Usuario añadido con éxito!');
      // Aquí podrías hacer cualquier otra cosa con la respuesta si es necesario
    } catch (error) {
      console.error('Error al agregar usuario:', error.message);
      showAlert('Error al agregar usuario. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="nuevo-usuario-container">
      <div className="nuevo-usuario-form space-y-4 bg-gradient-to-r from-orange-200 to-orange-100 p-8 rounded-lg shadow-lg mb-6">
        <h2 className="text-3xl font-semibold mb-6">Añadir usuario</h2>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Nombre:</label>
          <input type="text" name="nombre" value={nuevoUsuario.nombre} onChange={handleChange} className="input-group" />
        </div>
        {/* Resto de los campos del formulario */}
        <div className="flex justify-center mt-4">
          <Button type="button" label="Añadir Usuario" className="p-button-outlined naranja" onClick={agregarUsuario}/>        
        </div>
      </div>
    </div>
  );
};

export default AñadirUsuarios;

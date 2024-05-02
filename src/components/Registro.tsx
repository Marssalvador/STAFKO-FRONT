import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom'; 
import StaffService from '../application/RegistroService'; // Capa de aplicación

import './Registro.css';

interface RegistroProps {
  staffService: StaffService;
}

const Registro: React.FC<RegistroProps> = ({ staffService }) => {
  const [nuevoStaff, setNuevoStaff] = useState({
    id: 0,
    nombre: '',
    apellidos: '',
    telefono: '',
    username: '',
    password: '',
    fechaNacimiento: '',
    rol: '', // Valor predeterminado
  });
  
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const cambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoStaff({ ...nuevoStaff, [name]: value });
  };

  const mostrarAlerta = (mensaje: string) => {
    alert(mensaje);
  };

  const agregarStaff = async () => {
    try {
      // Validaciones
      if (
        nuevoStaff.nombre.trim() === '' ||
        nuevoStaff.apellidos.trim() === '' ||
        nuevoStaff.telefono.trim() === '' ||
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

      // Limpiar campos y mostrar mensaje
      setNuevoStaff({
        id: 0,
        nombre: '',
        apellidos: '',
        telefono: '',
        username: '',
        password: '',
        fechaNacimiento: '',
        rol: '',
      });
      setMensaje('¡Staff añadido con éxito! Redirigiendo...');

      setTimeout(() => {
        navigate('/pagina');
      }, 2000);
    } catch (error) {
      console.error('Error al agregar staff:', error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="registro-container">
        {/* Contenido del formulario */}
      </div>
    </div>
  );
};

export default Registro;

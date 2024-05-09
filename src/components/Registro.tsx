import React, { useState } from 'react';
import md5 from 'md5';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom'; 

import './Registro.css';

interface Staff{
  nombre: string;
  apellidos: string;
  telefono: string;
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
    username: '',
    password: '',
    fechaNacimiento: '',
    rol: null,
  });

  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [mensaje, setMensaje] = useState<string>('');
  const [esCliente, setEsCliente] = useState<boolean>(false); //Estado del checkbox
  const navigate = useNavigate(); //Obtener la función de navegación

  const cambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoStaff({ ...nuevoStaff, [name]: value });
  };

  const mostrarAlerta = (mensaje: string) => {
    alert(mensaje);
  };

  const agregarStaff = () => {
    //Comprobación de datos vacíos 
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

    //Fecha actual en formato ISO (YYYY-MM-DD)
    const fechaActual = new Date().toISOString().split('T')[0];

    //Verificación si la fecha de nacimiento es mayor que la fecha actual
    if (nuevoStaff.fechaNacimiento > fechaActual) {
      mostrarAlerta('La fecha de nacimiento no puede ser mayor que la fecha actual.');
      return;
    }

    //Hash de la contraseña
    const hashedPassword = md5(nuevoStaff.password);
    const nuevoStaffCompleto = {
      ...nuevoStaff,
      apellido: nuevoStaff.apellidos,
      fecha_nacimiento: nuevoStaff.fechaNacimiento,
      password: hashedPassword,
      rol: esCliente ? 'cliente' : 'staff', //Establecer el rol según el estado del checkbox
    };

    //Enviar solicitud para agregar el staff
    fetch('http://localhost:4000/usuarios/insertar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoStaffCompleto),
    })
    .then(response => response.json())
    .then(data => {
      //Si la solicitud fue exitosa, agregar el nuevo staff a la lista
      setStaffs([...staffs, nuevoStaff]);

      //Limpiamos los campos del formulario y el mensaje
      setNuevoStaff({
        nombre: '',
        apellidos: '',
        telefono: '',
        username: '',
        password: '',
        fechaNacimiento: '',
        rol: null, //Restablecer el estado del rol a null
      });
     
      setMensaje('¡Staff añadido con éxito! Redirigiendo...');

      //Esperar 5 segundos y luego redirigir
      setTimeout(() => {
        navigate('/pagina');
      }, 2000);
    })
    .catch(error => {
      console.error('Error al agregar staff:', error);
    });
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
              <Button type="button" label="Añadir Staff" className="p-button-outlined naranja" onClick={agregarStaff}/>        
            </div>
          </div>
        </main>
      </>
  );
};

export default NuevoStaff;

        
import React, { useEffect, useState } from 'react';
import './Pagina2.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import ModificarStaff from './ModificarStaff'; 
import { Button } from 'primereact/button'; 

const cookies = new Cookies();

interface Staff {
  id: number;
  nombre: string;
  apellido: string; 
  username: string;
  telefono: string; 
  fechaNacimiento: string; 
}

interface StaffProps {
  staff: Staff;
}


export const Pagina2: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]); //estado para almacenar el listado de staffs
  const [staffSeleccionado, setStaffSeleccionado] = useState<Staff | null>(null); //estado para almacenar el staff seleccionado

  useEffect(() => {
    //función para obtener el listado de staffs
    const obtenerStaffs = async () => {
      try{
        const response = await axios.get('http://localhost:4000/usuarios/datos', {
          headers: {
            'Authorization': `Bearer ${cookies.get('token')}` 
          }
        });

        if(Array.isArray(response.data.rows)){
          setStaffs(response.data.rows); //actualizar el estado staffs con la respuesta de la API
        }else{
          console.error('La respuesta de la API no es un arreglo de staff:', response.data);
        }
      }catch (error){
        console.error('Error al obtener staff:', error);
      }
    };

    //verificar si hay un usuario autenticado
    if(!cookies.get('username')){
      window.location.href = "./"; //redireccionar a la página de inicio de sesión si no hay usuario autenticado
    }else{
      obtenerStaffs(); //obtener el listado de staffs
    }
  }, []);


    //función para eliminar el staff después de la confirmación
    const eliminarStaffConfirmado = async (id: number) => {
      try {
        await axios.delete(`http://localhost:4000/usuEliminar/${id}`, {
          headers: {
            'Authorization': `Bearer ${cookies.get('token')}`
          }
        });
        setStaffs(staffs.filter(staff => staff.id !== id)); // filtramos para actualizar el estado staffs excluyendo el staff eliminado
      } catch (error) {
        alert('Cancelación: El Staff tiene un proyecto asociado');
      }
    };
  

    //función para mostrar la alerta y luego eliminar el staff
    const confirmarEliminarStaff = (id: number) => {
      //mostrar una confirmación antes de eliminar el staff
      if (window.confirm("¿Estás seguro de que deseas eliminar este staff?")) {
        //si se confirma la eliminación, verificar si tiene proyectos asociados y luego eliminar el staff
        eliminarStaffConfirmado(id);
      }
    };

  //función para editar un staff
  const editarStaff = (staff: Staff) => {
    setStaffSeleccionado(staff); //establecemos el staff seleccionado para editar
  };
  
  const StaffComponent: React.FC<StaffProps> = ({ staff }) => {
    const username = cookies.get('username');
    const isUsuarioLogueado = staff.username === username;
  
    return (
      <div key={staff.id} className="staff" style={{ order: isUsuarioLogueado ? 0 : 1 }}> 
        <div className={staff.username === username ? "nombre-staff usuario-logueado" : "nombre-staff"}>{staff.nombre}</div>
        <div className="espacio"></div>
        <div className="ed-button">
          {isUsuarioLogueado && (
            <Button label="Editar" className="p-button-raised p-button-primary" onClick={() => editarStaff(staff)} />
          )}
          <Button label="Eliminar" className="p-button-raised p-button-danger" onClick={() => confirmarEliminarStaff(staff.id)}  />
        </div>
      </div>
    );
  };

  //función para añadir un nuevo staff
  const añadirStaff = () => {
    window.location.href = './añadirStaff'; //redireccionar a la página de añadir staff
  };

  return (
    <>
      <main className="main">
        <h1 className="jump-animation">STAFKO</h1><br />

        <div className="space">Staffs</div><br />

        <div className="add-button">
          {/*botón para añadir un nuevo staff */}
          <Button label="+" className="p-button-raised p-button-success custom-orange-button botoncin" onClick={añadirStaff} />
        </div>
        <br />

        {/*renderizar cada staff */}
        {staffs.map((staff) => (
          <StaffComponent key={staff.id} staff={staff} />
        ))}

        {/*renderizar el componente ModificarStaff si hay un staff seleccionado */}
        {staffSeleccionado && (
          <ModificarStaff
            staff={staffSeleccionado}
            onGuardar={() => {
              console.log('Guardar cambios');
              setStaffSeleccionado(null);
            }}
          />
        )}

      </main>
    </>
  );
};

export default Pagina2;




/*Código para el futuro administrador donde todos los Staff tienen la opción de eliminar


import React, { useEffect, useState } from 'react';
import './Pagina2.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import ModificarStaff from './ModificarStaff'; 
import { Button } from 'primereact/button'; 

const cookies = new Cookies();

interface Staff {
  id: number;
  nombre: string;
  apellido: string; 
  username: string;
  telefono: string; 
  fechaNacimiento: string; 
}

interface StaffProps {
  staff: Staff;
}


export const Pagina2: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]); //estado para almacenar el listado de staffs
  const [staffSeleccionado, setStaffSeleccionado] = useState<Staff | null>(null); //estado para almacenar el staff seleccionado

  useEffect(() => {
    //función para obtener el listado de staffs
    const obtenerStaffs = async () => {
      try{
        const response = await axios.get('http://localhost:4000/usuarios/datos', {
          headers: {
            'Authorization': `Bearer ${cookies.get('token')}` 
          }
        });

        if(Array.isArray(response.data.rows)){
          setStaffs(response.data.rows); //actualizar el estado staffs con la respuesta de la API
        }else{
          console.error('La respuesta de la API no es un arreglo de staff:', response.data);
        }
      }catch (error){
        console.error('Error al obtener staff:', error);
      }
    };

    //verificar si hay un usuario autenticado
    if(!cookies.get('username')){
      window.location.href = "./"; //redireccionar a la página de inicio de sesión si no hay usuario autenticado
    }else{
      obtenerStaffs(); //obtener el listado de staffs
    }
  }, []);


    //función para eliminar el staff después de la confirmación
    const eliminarStaffConfirmado = async (id: number) => {
      try {
        await axios.delete(`http://localhost:4000/usuEliminar/${id}`, {
          headers: {
            'Authorization': `Bearer ${cookies.get('token')}`
          }
        });
        setStaffs(staffs.filter(staff => staff.id !== id)); // filtramos para actualizar el estado staffs excluyendo el staff eliminado
      } catch (error) {
        alert('Cancelación: El Staff tiene un proyecto asociado');
      }
    };
  

    //función para mostrar la alerta y luego eliminar el staff
    const confirmarEliminarStaff = (id: number) => {
      //mostrar una confirmación antes de eliminar el staff
      if (window.confirm("¿Estás seguro de que deseas eliminar este staff?")) {
        //si se confirma la eliminación, verificar si tiene proyectos asociados y luego eliminar el staff
        eliminarStaffConfirmado(id);
      }
    };
  

  const StaffComponent: React.FC<StaffProps> = ({ staff }) => {
    const username = cookies.get('username');
    const isUsuarioLogueado = staff.username === username;
  
    console.log('Nombre del usuario:', username);
    console.log('Nombre del staff:', staff.nombre);
  
    return (
      <div key={staff.id} className="staff" style={{ order: isUsuarioLogueado ? 0 : 1 }}> 
        <div className={staff.username === username ? "nombre-staff usuario-logueado" : "nombre-staff"}>{staff.nombre}</div>
        <div className="espacio"></div>
        <div className="ed-button">
          <Button label="Eliminar" className="p-button-raised p-button-danger" onClick={() => confirmarEliminarStaff(staff.id)}  />
        </div>
      </div>
    );
  };

  //función para añadir un nuevo staff
  const añadirStaff = () => {
    window.location.href = './añadirStaff'; //redireccionar a la página de añadir staff
  };

  //función para editar un staff
  const editarStaff = (staff: Staff) => {
    setStaffSeleccionado(staff); //establecemos el staff seleccionado para editar
  };

  return (
    <>
      <main className="main">
        <h1 className="jump-animation">STAFKO</h1><br />

        <div className="space">Staffs</div><br />

        <div className="add-button">
          <Button label="+" className="p-button-raised p-button-success custom-orange-button botoncin" onClick={añadirStaff} />
        </div>
        <br />

        {staffs.map((staff) => (
          <StaffComponent key={staff.id} staff={staff} />
        ))}

        {staffSeleccionado && (
          <ModificarStaff
            staff={staffSeleccionado}
            onGuardar={() => {
              console.log('Guardar cambios');
              setStaffSeleccionado(null);
            }}
          />
        )}

      </main>
    </>
  );
};

export default Pagina2;

*/
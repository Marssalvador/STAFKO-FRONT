import React, { useEffect } from 'react';
import './Pagina.css';
import AñadirProj from './AñadirProj';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

interface ProyectoProps {
  id: number;
}

const Proyecto: React.FC<ProyectoProps> = ({ id }) => (
  <div key={id} className="proyecto">
    <div className="nombre-proyecto">Proyecto {id}</div>
    <div className="espacio"></div>
    <div className="ed-button">
      <button className="button">Editar</button>
      <button className="button">Eliminar</button>
    </div>
  </div>
);

const Pagina: React.FC = () => {
  useEffect(() => {
    if (!cookies.get('username')) {
      window.location.href = "./";
    }
  }, []);

  const proyectos: number[] = [1, 2, 3, 4, 5]; // Lista de proyectos con un ID único

  const cerrarSesion = () => {
    cookies.remove('id', { path: "/" });
    cookies.remove("apellido", { path: "/" });
    cookies.remove("nombre", { path: "/" });
    cookies.remove("username", { path: "/" });

    window.location.href = './';
  }

  console.log('id: ' + cookies.get('id'));
  console.log('apellido: ' + cookies.get('apellido'));
  console.log('nombre: ' + cookies.get('nombre'));
  console.log('username: ' + cookies.get('username'));

  return (
    <>
      <main className="main">
        <h1 className="jump-animation">STAFKO</h1>
        <div className="space">Proyectos</div><br />
        <div className="add-button">
          <button className="button4">+</button>
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        </div>
        <br />
        {proyectos.map((proyectoId) => (
          <Proyecto key={proyectoId} id={proyectoId} />
        ))}
      </main>
    </>
  )
}

export default Pagina;





//se pondria debajo del map
//<AñadirProj proyectos={proyectos} />

//Con todo lo asociado a editar   PRUEBA
/*
import React, { useState } from 'react';
import './Pagina.css';
import AñadirProj from './AñadirProj';
import ModificarProject from './ModificarProject';

const Proyecto = ({ id }) => (
    <div key={id} className="proyecto">
    <div className="nombre-proyecto">Proyecto {id}</div>
    <div className="espacio"></div>
    <div className="ed-button">
      <button className="button" onClick={() => onEditar(id)}>Editar</button>
      <button className="button">Eliminar</button>
    </div>
  </div>
);

const Pagina = () => {

  const proyectos = [1, 2, 3, 4, 5]; // Lista de proyectos (ID único)


  const [proyectoEditadoId, setProyectoEditadoId] = useState(null); // Estado para almacenar el ID del proyecto editado

  const handleEditar = (id) => {
    setProyectoEditadoId(id); // Actualiza el estado con el ID del proyecto editado
  };

  /*Si en algun momento queremos quitar el envio de datos a la hora de editar, dejamos el proyectos.map solo con la key, y de los const 
  solo dejamos proyectos más la eliminacion del click en editar y lo que hay debajo del .map*/

  /*return (
    <>
      <body>
        <main className="main">
        <h1 className="jump-animation">STAFKO</h1>
          <div className="add-button">
            <button className="button">+</button>
          </div>

          <br />
          <div className="space">Proyectos</div>
          <br />

          {proyectos.map((proyectoId) => (
            <Proyecto key={proyectoId} id={proyectoId} onEditar={handleEditar} />
          ))}

          {/*proyectoEditadoId && <ModificarProject proyectoId={proyectoEditadoId} />} 
       
          <AñadirProj staffs={staffs} />
        </main>
      </body>
    </>
  );
};

export default Pagina;*/
import React from 'react';
import './Pagina2.css';
import AñadirStaff from './AñadirStaff';

interface StaffProps {
  id: number;
}

const Staff: React.FC<StaffProps> = ({ id }) => (
  <div key={id} className="staff">
    <div className="nombre-staff">Staff {id}</div>
    <div className="espacio"></div>
    <div className="ed-button">
      <button className="button">Editar</button>
      <button className="button">Eliminar</button>
    </div>
  </div>
);

export const Pagina2: React.FC = () => {
  const staffs: number[] = [1, 2, 3, 4, 5]; // Lista de staffs (ID)

  return (
    <>
      <body>
        <main className="main">
          <h1 className="jump-animation">STAFKO</h1><br />
          <div className="space">Staffs</div><br />
          <div className="add-button">
            <button className="button5">+</button>
          </div>
          <br />
          {staffs.map((staffId) => (
            <Staff key={staffId} id={staffId} />
          ))}
        </main>
      </body>
    </>
  );
};

export default Pagina2;


//Se pondria debajo del map
//<AñadirStaff staffs={staffs} />


//Con todo lo asociado a editar   PRUEBA
/*
import React, { useState } from 'react'
import './Pagina2.css';
import AñadirStaff from './AñadirStaff';

const Staff = ({ id }) => (
    <div key={id} className="staff">
    <div className="nombre-staff">Staff {id}</div>
    <div className="espacio"></div>
    <div className="ed-button">
    <button className="button" onClick={() => onEditar(id)}>Editar</button>
      <button className="button">Eliminar</button>
    </div>
  </div>
);


export const Pagina2 = () => {

    const [staffEditadoId, setStaffEditadoId] = useState(null); // Estado para almacenar el ID del miembro del personal editado

    const staffs = [1, 2, 3, 4, 5]; // Lista de miembros del personal (ID único)
  
    const handleEditar = (id) => {
      setStaffEditadoId(id); // Actualiza el estado con el ID del miembro del personal editado
    };
  
    return (
        <>

            <body>
                <main className="main">
                    <h1 className="jump-animation">STAFKO</h1>
                    <div className="add-button">
                        <button className="button">+</button>
                    </div>

                    <br />
                    <div className="space">Staffs</div>
                    <br />

                    {staffs.map((staffId) => (
                        <Staff key={staffId} id={staffId} onEditar={handleEditar} />
                    ))}

                    {staffEditadoId && <ModificarStaff staffId={staffEditadoId} />
        

                    <AñadirStaff staffs={staffs} />
                    
                </main>
            </body>

        </>
    )
}*/



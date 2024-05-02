import React from 'react'
import Identificacion from './Identificacion'
import AñadirUsuarios from './AñadirUsuarios'
import AñadirProj from './AñadirProj'
import Footer from './Footer'
import Header from './Header'
import ModificarProject from './ModificarProject'
import ModificarUsuarios from './ModificarUsuarios'
import Pagina from './Pagina'
import Pagina2 from './Pagina2'
import Pagina3 from './Pagina3'
import Registro from './Registro'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PoliticaPrivacidad } from './PoliticaPrivacidad'
import { Contacto } from './Contacto'

import 'tailwindcss/tailwind.css';

import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


const App = () => {
  return (
    <>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Identificacion />} />
          <Route path='/pagina' element={<Pagina />} />
          <Route path='/pagina2' element={<Pagina2 />} />
          <Route path='/pagina3' element={<Pagina3 />} />
          <Route path='/añadirProj' element={<AñadirProj />} />
          <Route path='/añadirUsuarios' element={<AñadirUsuarios />} />
          <Route path='/modificarProject' element={<ModificarProject />} />
          <Route path='/modificarUsuarios' element={<ModificarUsuarios />} />
          <Route path='/poliPriv' element={<PoliticaPrivacidad />} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path='/registro' element={<Registro />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

export default App

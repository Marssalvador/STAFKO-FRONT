import React from 'react'
import Identificacion from './Identificacion'
import AñadirStaff from './AñadirStaff'
import AñadirProj from './AñadirProj'
import Footer from './Footer'
import Header from './Header'
import ModificarProject from './ModificarProject'
import ModificarStaff from './ModificarStaff'
import Pagina from './Pagina'
import Pagina2 from './Pagina2'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Identificacion />} />
          <Route path='/pagina' element={<Pagina />} />
          <Route path='/pagina2' element={<Pagina2 />} />
          <Route path='/añadirProj' element={<AñadirProj />} />
          <Route path='/añadirStaff' element={<AñadirStaff />} />
          <Route path='/modificarProject' element={<ModificarProject />} />
          <Route path='/modificarStaff' element={<ModificarStaff />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

export default App

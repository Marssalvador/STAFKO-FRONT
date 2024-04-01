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
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Header/>
      <Pagina/>
      <Footer/>
    </>
  )
}

export default App

//Posible solución para que se conecte una pagina con otra
/*<Switch>
<Route exact path="/" component={Pagina2} />
<Route path="/añadir-proyecto" component={AñadirProj} />
</Switch>*/


//Dividir las pantallas
/*import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Identificacion from './Identificacion';
import Pagina from './Pagina';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Identificacion} />
        <Route path="/pagina" component={Pagina} />
      </Switch>
    </Router>
  );
};

export default App;*/
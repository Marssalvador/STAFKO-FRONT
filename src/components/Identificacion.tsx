// Identificacion.tsx

/*import React, { Component, ChangeEvent, FormEvent } from 'react';
import { IdentificacionAppService } from '../application/IdentificacionService'; 
import './Identificacion.css'; 
import { Button } from 'primereact/button'; 
import Cookies from 'universal-cookie'; 
import { iniciarContadorSesion } from '../infrastructure/HeaderService'; 

const cookies = new Cookies(); 

interface FormState {
  username: string;
  password: string;
}

interface IdentificacionState {
  form: FormState;
}

//Obtiene el nombre de usuario y la contraseña 
class Identificacion extends Component<{}, IdentificacionState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      form: {
        username: '',
        password: ''
      }
    };
  }

  //Maneja el cambio en los campos del formulario
  handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    await this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value
      }
    }));
  };

  //Maneja el envío del formulario de inicio de sesión
  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = this.state.form;
    try {
      const response = await IdentificacionAppService.iniciarSesion(username, password); //Llama al servicio de aplicación para iniciar sesión
      if (response.length > 0) {
        const respuesta = response[0];

        //Establece las cookies con la información del usuario
        cookies.set('id', respuesta.id, { path: "/" });
        cookies.set('apellido', respuesta.apellido, { path: "/" });
        cookies.set('nombre', respuesta.nombre, { path: "/" });
        cookies.set('username', respuesta.username, { path: "/" });
        cookies.set('rol', respuesta.rol, { path: "/" });
  
        //Le pregunta al usuario sobre qué va a trabajar y lo inserta en la descripción de Clockify
        const descripcion = prompt(`¿En qué vas a trabajar, ${respuesta.username}?)`);
        if (descripcion) {
          await iniciarContadorSesion(descripcion+" - "+respuesta.username); //Inicia el contador de sesión con la descripción proporcionada
        }
  
        window.location.href = "./pagina"; // Redirige a la página principal
      } else {
        alert('El usuario o la contraseña no son correctos');
      }
    } catch (error) {
      alert(error.message); //Muestra un mensaje de error si ocurre un error durante el inicio de sesión
    }
  };

  //Verifica si ya hay un usuario logueado cuando se monta el componente
  componentDidMount() {
    if (cookies.get('username')) {
      window.location.href = "./pagina"; //Redirige a la página principal si ya hay un usuario logueado
    }
  }

  render() {
    const { form } = this.state;

    return (
      <>
        <img src="/panal.png" alt="Panal" className='panal-superior-derecho' />
        <img src="/panal.png" alt="Panal" className='panal-inferior-izquierdo' />

        <main className="formu">
          <div className="bg-gradient-to-r from-orange-200 to-orange-99 p-12 rounded-lg shadow-lg mb-6 max-w-md w-full">
            <h1 className='text-4xl font-bold mb-4 text-center jump-animation'>STAFKO</h1>
            
            <form onSubmit={this.handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">Iniciar sesión</h2>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de usuario:</label>
                <input type="text" name="username" id="username" value={form.username} onChange={this.handleChange} className="login-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña:</label>
                <input type="password" name="password" id="password" value={form.password} onChange={this.handleChange} className="login-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" />
              </div>

              <Button label="Iniciar sesión" type="submit" className="p-button-outlined custom-orange-button w-full" /> 

              <p className="text-center text-black mt-4"><a href="/registro" className="text-orange-500">Regístrate aquí</a></p>
            </form>
          </div>
        </main>
      </>
    );
  };
}

export default Identificacion;*/




// DIRECTUS
// Identificacion.tsx
import React, { Component, ChangeEvent, FormEvent } from 'react';
import { IdentificacionService } from '../infrastructure/IdentificacionService'; 
import './Identificacion.css'; 
import { Button } from 'primereact/button'; 
import Cookies from 'universal-cookie'; 
import { iniciarContadorSesion } from '../infrastructure/HeaderService'; 
import axios from 'axios';

const cookies = new Cookies(); 

interface FormState {
  email: string;
  password: string;
}

interface IdentificacionState {
  form: FormState;
}

class Identificacion extends Component<{}, IdentificacionState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      form: {
        email: '',
        password: ''
      }
    };
  }

  handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    await this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value
      }
    }));
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = this.state.form;
    try {
      const response = await IdentificacionService.iniciarSesion(email, password);
      
      if (response && response.access_token) {
        cookies.set('access_token', response.access_token, { path: "/", sameSite: 'lax' });
        cookies.set('refresh_token', response.refresh_token, { path: "/", sameSite: 'lax' });
        cookies.set('expires', response.expires, { path: "/", sameSite: 'lax' });
        
        const userNameFromEmail = email.split('@')[0].toLowerCase().trim();
  
        cookies.set('email', email, { path: "/", sameSite: 'lax' });
  
        // Buscar el ID del usuario en /items/usuarios
        const usuarioResponse = await axios.get('http://localhost:8055/items/usuarios', {
          params: {
            filter: {
              email: {
                _icontains: email
              }
            }
          }
        });

        console.log("Usuario response:", usuarioResponse.data); // Registrar la respuesta para ver qué datos se obtienen

        // Verificar si se encontró un usuario con ese nombre
        if (usuarioResponse.data.data.length > 0) {
          console.log("Usuario encontrado:", usuarioResponse.data.data[0]); // Registrar el primer usuario encontrado
          // Obtener el ID del primer usuario encontrado
          const userId = usuarioResponse.data.data[0].id;
          console.log("ID del usuario:", userId); // Registrar el ID del usuario
          // Guardar el ID del usuario en una cookie
          cookies.set('userId', userId, { path: "/", sameSite: 'lax' });

          // Guardar el rol del usuario en una cookie
          const userRole = usuarioResponse.data.data[0].rol;
          cookies.set('rol', userRole, { path: "/", sameSite: 'lax' });
        } else {
          console.log("Usuario no encontrado"); // Registrar si no se encontró ningún usuario con ese nombre
        }
  
        const descripcion = prompt(`¿En qué vas a trabajar, ${email}?`);
          if (descripcion) {
            await iniciarContadorSesion(descripcion + " - " + email);
          }
          window.location.href = "./pagina";
      }
    } catch (error) {
      alert(error.message);
    }
  };

  componentDidMount() {
    const token = cookies.get('access_token');
    if (token) {
      window.location.href = "./pagina";
    }
  }

  render() {
    const { form } = this.state;

    return (
      <>
        <img src="/panal.png" alt="Panal" className='panal-superior-derecho' />
        <img src="/panal.png" alt="Panal" className='panal-inferior-izquierdo' />

        <main className="formu">
          <div className="bg-gradient-to-r from-orange-200 to-orange-99 p-12 rounded-lg shadow-lg mb-6 max-w-md w-full">
            <h1 className='text-4xl font-bold mb-4 text-center jump-animation'>STAFKO</h1>
            
            <form onSubmit={this.handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">Iniciar sesión</h2>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico:</label>
                <input type="email" name="email" id="email" value={form.email} onChange={this.handleChange} className="login-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña:</label>
                <input type="password" name="password" id="password" value={form.password} onChange={this.handleChange} className="login-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" />
              </div>

              <Button label="Iniciar sesión" type="submit" className="p-button-outlined custom-orange-button w-full" /> 
            </form>
          </div>
        </main>
      </>
    );
  };
}

export default Identificacion;








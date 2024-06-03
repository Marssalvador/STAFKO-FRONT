import React, { Component, ChangeEvent, FormEvent } from 'react';
import { Button } from 'primereact/button';
import Cookies from 'universal-cookie';
import axios from 'axios';
import md5 from 'md5';
import './Identificacion.css';
import { iniciarContadorSesion } from '../infrastructure/HeaderService';


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

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value
      }
    }));
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = this.state.form;
    const hashedPassword = md5(password);
  
    try {
      const response = await axios.post('http://localhost:4000/usuarios', {
        username: email,
        password: hashedPassword,
      });
  
      if (response && response.data.access_token) {
        cookies.set('access_token', response.data.access_token, { path: "/", sameSite: 'lax' });
        cookies.set('refresh_token', response.data.refresh_token, { path: "/", sameSite: 'lax' });
        cookies.set('expires', response.data.expires, { path: "/", sameSite: 'lax' });
  
        const userNameFromEmail = email.split('@')[0].toLowerCase().trim();
  
        cookies.set('email', email, { path: "/", sameSite: 'lax' });
  
        const usuarioResponse = await axios.get('http://localhost:4000/usuarios', {
          params: {
            username: email,
            password: hashedPassword
          }
        });
  
        if (usuarioResponse.data.length > 0) {
          const userId = usuarioResponse.data[0].id;
          cookies.set('userId', userId, { path: "/", sameSite: 'lax' });
  
          const userRole = usuarioResponse.data[0].rol;
          cookies.set('rol', userRole, { path: "/", sameSite: 'lax' });
        }
  
        const descripcion = prompt(`¿En qué vas a trabajar, ${email}?`);
        if (descripcion) {
          await iniciarContadorSesion(descripcion + " - " + email);
        }
        window.location.href = "./pagina";
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al iniciar sesión. Verifique sus credenciales.');
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
          <div className="bg-gradient-to-r from-orange-200 to-orange-99 p-20 rounded-lg shadow-lg mb-6 max-w-5xl w-full">
            <h1 className='text-5xl font-bold mb-6 text-center jump-animation'>STAFKO</h1>
            <form onSubmit={this.handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Iniciar sesión</h2>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">Correo electrónico:</label>
                <input type="email" name="email" id="email" value={form.email} onChange={this.handleChange} className="login-input mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="password" className="block text-lg font-medium text-gray-700">Contraseña:</label>
                <input type="password" name="password" id="password" value={form.password} onChange={this.handleChange} className="login-input mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" />
              </div>
              <Button label="Iniciar sesión" type="submit" className="p-button-outlined custom-orange-button w-full" />
            </form>
          </div>
        </main>
      </>
    );
  }
}

export default Identificacion;

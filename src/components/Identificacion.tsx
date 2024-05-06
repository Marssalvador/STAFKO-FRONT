// src/components/Identificacion.tsx
import React, { Component, ChangeEvent, FormEvent } from 'react';
import { IdentificacionAppService } from '../application/IdentificacionService';
import './Identificacion.css';
import { Button } from 'primereact/button';
import Cookies from 'universal-cookie'; 
import { enviarRegistroDeTiempo } from '../infrastructure/HeaderService';

const cookies = new Cookies();

interface FormState {
  username: string;
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
        username: '',
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
    const { username, password } = this.state.form;
    try {
      const response = await IdentificacionAppService.iniciarSesion(username, password);
      if (response.length > 0) {
        const respuesta = response[0];
        cookies.set('id', respuesta.id, { path: "/" });
        cookies.set('apellido', respuesta.apellido, { path: "/" });
        cookies.set('nombre', respuesta.nombre, { path: "/" });
        cookies.set('username', respuesta.username, { path: "/" });
        cookies.set('rol', respuesta.rol, { path: "/" });

        // Llama a enviarRegistroDeTiempo aquí al iniciar sesión
        await enviarRegistroDeTiempo("Inicio de sesión en la aplicación");

        window.location.href = "./pagina";
      } else {
        alert('El usuario o la contraseña no son correctos');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  componentDidMount() {
    if (cookies.get('username')) {
      window.location.href = "./pagina";
    }
  }

  render() {
    const { form } = this.state;

    return (
      <>
        <img src="/panal.png" alt="Panal" className='panal-superior-derecho' />
        <img src="/panal.png" alt="Panal" className='panal-inferior-izquierdo' />

        <main className="flex items-center justify-center h-screen">
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

              <Button label="Iniciar sesión" type="submit" className="p-button-outlined custom-orange-button w-full" /> {}

              <p className="text-center text-black mt-4">Si no estás registrado, <a href="/registro" className="text-orange-500">regístrate aquí</a>.</p>
            </form>
          </div>
        </main>
      </>
    );
  };
}

export default Identificacion;

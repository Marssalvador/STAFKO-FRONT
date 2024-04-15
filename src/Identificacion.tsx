import React, { Component, ChangeEvent, FormEvent } from 'react';
import './Identificacion.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const baseUrl = "http://localhost:4000/usuarios";
const cookies = new Cookies();

interface FormState {
    username: string;
    password: string;
}

interface IdentificacionState {
    form: FormState;
    error: string;
}

class Identificacion extends Component<{}, IdentificacionState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            form: {
                username: '',
                password: ''
            },
            error: ''
        };
    }

    handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        await this.setState((prevState) => ({
            form: {
                ...prevState.form,
                [name]: value
            },
            error: prevState.error //Conserva el error si lo hay
        }));
        console.log(this.state.form);
    };

    handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await this.iniciarSesion();
    };

    iniciarSesion = async () => {
        const { username, password } = this.state.form;
        await axios.get(baseUrl, {
            params: {
                username,
                password: md5(password) 
            }
        })
        .then(response => {
                return response.data;
        })
        .then(response => {
            if (response.length > 0) {
                var respuesta = response[0];
                cookies.set('id', respuesta.id, { path: "/" });
                cookies.set('apellido', respuesta.apellido, { path: "/" });
                cookies.set('nombre', respuesta.nombre, { path: "/" });
                cookies.set('username', respuesta.username, { path: "/" });

                window.location.href = "./pagina";
            } else {
                this.setState({ error: 'El usuario o la contraseña no son correctos' });
                console.log('Datos enviados:', { username, password }); // Mostrar los datos enviados en la consola
            }
        })
        .catch(error => {
            console.log(error);
            this.setState({ error: 'Error en la conexión' });
        });
    }

    componentDidMount() {
        if (cookies.get('username')) {
            window.location.href = "./pagina";
        }
    }

    render() {
        const { form, error } = this.state;

        return (
            <>
                {error && <p>{error}</p>}

                <img src="/panal.png" alt="Panal" className='panal-superior-derecho' />
                <img src="/panal.png" alt="Panal" className='panal-inferior-izquierdo' />
                <main className="flex items-center justify-center h-screen">
                    <div className="bg-gradient-to-r from-orange-200 to-orange-100 p-8 rounded-lg shadow-lg mb-6 max-w-md w-full">
                        <h1 className='text-4xl font-bold mb-4 text-center jump-animation'>STAFKO</h1>
                        <form onSubmit={this.handleSubmit} className="space-y-4">
                        <h2 className="text-xl font-semibold mb-2">Iniciar sesión</h2>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de usuario:</label>
                            <input type="text" name="username" id="username" value={form.username} onChange={this.handleChange} className=" login-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña:</label>
                            <input type="password" name="password" id="password" value={form.password} onChange={this.handleChange} className="login-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" />
                        </div>
                        <button type="submit" className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300">Iniciar sesión</button>
                        </form>
                    </div>
                </main>
            </>
        );
    };
}

export default Identificacion;
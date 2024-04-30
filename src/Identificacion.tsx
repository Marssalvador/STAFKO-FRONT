import React, { Component, ChangeEvent, FormEvent } from 'react';
import './Identificacion.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import { Button } from 'primereact/button';

const baseUrl = "http://localhost:4000/usuarios";
const cookies = new Cookies();

//definición de tipos de estado para el formulario y la identificación
interface FormState {
    username: string;
    password: string;
}

interface IdentificacionState {
    form: FormState;
    error: string;
}

//componente de clase para la identificación
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

    //manejador para el cambio en los campos del formulario
    handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        //actualización el estado del formulario con los nuevos valores
        await this.setState((prevState) => ({
            form: {
                ...prevState.form,
                [name]: value
            },
            error: prevState.error 
        }));
        console.log(this.state.form);
    };

    //manejador para el envío del formulario
    handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //iniciar sesión al enviar el formulario
        await this.iniciarSesion();
    };

    //función para iniciar sesión
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
            //verificar la respuesta de la API
            if (response.length > 0) {
                var respuesta = response[0];

                //establecer cookies de sesión
                cookies.set('id', respuesta.id, { path: "/" });
                cookies.set('apellido', respuesta.apellido, { path: "/" });
                cookies.set('nombre', respuesta.nombre, { path: "/" });
                cookies.set('username', respuesta.username, { path: "/" });
                cookies.set('rol', respuesta.rol, { path: "/" });
    
                //redireccionar a la página principal después de iniciar sesión
                window.location.href = "./pagina";
            } else {
                console.log('Datos enviados:', { username, password });
                alert('El usuario o la contraseña no son correctos'); 
            }
        })
        .catch(error => {
            console.log(error);
            alert('Error en la conexión'); 
        });
    }

    //método de ciclo de vida que se ejecuta después de montar el componente
    componentDidMount() {
        if (cookies.get('username')) {
            window.location.href = "./pagina";
        }
    }

    //método de renderizado del componente
    render(){
        const { form, error } = this.state;

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
                                <input type="text" name="username" id="username" value={form.username} onChange={this.handleChange} className=" login-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" />
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

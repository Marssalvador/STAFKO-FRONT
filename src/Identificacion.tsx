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
            error: prevState.error // Conserva el error si lo hay
        }));
        console.log(this.state.form);
    };

    handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await this.iniciarSesion();
    };

    iniciarSesion = async () => {
        await axios.get(baseUrl, {
            params: {
                username: this.state.form.username,
                password: md5(this.state.form.password)
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

                    alert(`Bienvenido ${respuesta.nombre} ${respuesta.apellido}`);

                    window.location.href = "./pagina";
                } else {
                    this.setState({ error: 'El usuario o la contraseña no son correctos' });
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
                <main>
                    <h1 className='jump-animation'>STAFKO</h1>
                    <form onSubmit={this.handleSubmit} className="login-container">
                        <h2 className="login-header">Iniciar sesión</h2>

                        <div className="login-input-container">
                            <label htmlFor="username" className="login-input-label">Nombre de usuario:</label>
                            <input type="text" name="username" id="username" value={form.username} onChange={this.handleChange} className="login-input" />
                        </div>

                        <div className="login-input-container">
                            <label htmlFor="password" className="login-input-label">Contraseña:</label>
                            <input type="password" name="password" id="password" value={form.password} onChange={this.handleChange} className="login-input" />
                        </div>

                        <button type="submit" className="login-button">Iniciar sesión</button>
                    </form>
                </main>
            </>
        );
    };
}



export default Identificacion;


//Intento de dividir las pantallas

/*import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Importa useHistory para redireccionar
import './Identificacion.css'; // Importa los estilos CSS

const Identificacion = () => {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const history = useHistory(); // Obtiene el objeto history para redireccionar

  const loginNombre = (event) => {
    setNombre(event.target.value);
  };

  const loginContraseña = (event) => {
    setContraseña(event.target.value);
  };

  const enviar = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos de inicio de sesión al servidor para su autenticación
    console.log('Nombre de usuario:', nombre);
    console.log('Contraseña:', contraseña);
    // Lógica de autenticación aquí

    // Redirecciona a la página deseada
    history.push('/pagina');
  };

  // Resto del código...

  return (
    <>
      <Header />
      <main className="main">
        <form onSubmit={enviar} className="login-container">
          {}
        </form>
      </main>
    </>
  );
};

export default Identificacion;*/

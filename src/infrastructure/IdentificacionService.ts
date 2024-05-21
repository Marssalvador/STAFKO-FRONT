// src/infrastructure/IdentificacionService.ts
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';


/*const baseUrl = "http://localhost:4000/usuarios";
const cookies = new Cookies();

export const IdentificacionService = {
  iniciarSesion: async (username: string, password: string) => {
    try {
      const response = await axios.get(baseUrl, {
        params: {
          username,
          password: md5(password)
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error en la conexión:', error);
      throw new Error('Error en la conexión');
    }
  }
};*/



//DIRECTUS
// src/infrastructure/IdentificacionService.ts
const baseUrl = "http://localhost:8055/auth/login";
const cookies = new Cookies();

export const IdentificacionService = {
  iniciarSesion: async (email: string, password: string) => {
    try {
      const response = await axios.post(baseUrl, {
        email: email,
        password: password
      });

      if (response.status === 200 && response.data.data) {
        const { access_token, refresh_token, expires } = response.data.data;
        if (!access_token || !refresh_token || !expires) {
          throw new Error('Error en la respuesta del servidor: falta información de tokens');
        }

        cookies.set('access_token', access_token, { path: '/' });
        cookies.set('refresh_token', refresh_token, { path: '/' });
        cookies.set('expires', expires, { path: '/' });

        return response.data.data;
      } else {
        throw new Error('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error en la conexión:', error.response ? error.response.data : error.message);
      throw new Error(error.response ? error.response.data.errors[0].message : 'Error en la conexión');
    }
  }
};





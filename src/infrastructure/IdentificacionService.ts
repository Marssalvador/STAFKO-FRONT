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


//Con directus
const baseUrl = "http://localhost:8055/items/usuarios";
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
};

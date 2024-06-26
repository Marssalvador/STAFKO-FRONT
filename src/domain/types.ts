// src/domain/types.ts

export interface Staff {
    id: number;
    nombre: string;
    apellido:string;
    email:string;
    username:string;
    password:string;
    telefono:number;
    fecha_nacimiento:string;
    rol: string;
  }
  
  export interface Proyecto {
    id?:number;
    nombre: string;
    descripcion: string;
    cuantia: string;
    fecha_inicio: string;
    fecha_fin: string;
    id_staff: string;
  }
  
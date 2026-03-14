export interface User {
    id: number;
    email: string;
    nombre: string;
    roles: string[];
    fotoUrl?: string;

    dni?: string;
    telefono?: string;
    interests?: string[];
    favoriteClinics?: number[];
}

export interface Pet {
    id: number;
    nombre: string;
    chip: string;
    especie: 'PERRO' | 'GATO' | 'OTRO';
    raza: string;
    sexo: string;
    color: string;
    peso: number;
    fechaNacimiento: string; // ISO Date
    fotoUrl?: string;
    observaciones?: string;
}

export interface Clinic {
    id: number;
    nombre: string;
    latitud: number;
    longitud: number;
    esUrgencia24h: boolean;
    telefono: string;
    direccion: string;
    horario: string;
}

export interface Comment {
    id: number;
    autor: User;
    contenido: string;
    fecha: string;
}

export interface Post {
    id: number;
    autor: User;
    titulo: string;
    contenido: string;
    tipo: 'EVENTO' | 'ADOPCION' | 'PERDIDO' | 'DUDA';
    fecha: string;
    comments?: Comment[];
}

export interface AuthResponse {
    token: string;
    email: string;
    nombre: string;

    roles: string[];
    id: number;
    fotoUrl?: string;
    interests?: string[];
    favoriteClinics?: number[];
}

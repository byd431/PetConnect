import axios from 'axios';
import { AuthResponse } from '../../types';

const API_URL = 'http://localhost:8080/api/auth';

export const authService = {
    login: async (email: string, password: string): Promise<AuthResponse> => {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    },

    register: async (userData: {
        email: string;
        password: string;
        nombre: string;
        apellidos: string;
        dni: string;
        telefono: string;
        role?: string;
        interests?: string[];
        favoriteClinics?: number[];
    }): Promise<AuthResponse> => {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    }
};

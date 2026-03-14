import axios from 'axios';
import { Clinic } from '../../types';

const API_URL = 'http://localhost:8080/api/clinics';

export const clinicService = {
    getAll: async (): Promise<Clinic[]> => {
        const token = JSON.parse(localStorage.getItem('auth-storage-v2') || '{}').state?.token;
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};

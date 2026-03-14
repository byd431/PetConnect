
import api from '../../api/axios';
import { Pet } from '../../types';

export const petService = {
    getMyPets: async (): Promise<Pet[]> => {
        const response = await api.get('/pets');
        return response.data;
    },
    getPetById: async (id: number): Promise<Pet> => {
        const response = await api.get(`/pets/${id}`);
        return response.data;
    },
    addPet: async (petData: any): Promise<Pet> => {
        const response = await api.post('/pets', petData);
        return response.data;
    },
    updatePet: async (id: number, petData: Partial<Pet>): Promise<Pet> => {
        const response = await api.put(`/pets/${id}`, petData);
        return response.data;
    }
};

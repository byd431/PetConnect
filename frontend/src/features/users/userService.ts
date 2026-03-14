import axios from '../../api/axios';
import { User } from '../../types';

export const userService = {
    updateUser: async (id: number, userData: Partial<User>): Promise<User> => {
        const response = await axios.put(`/users/${id}`, userData);
        return response.data;
    }
};

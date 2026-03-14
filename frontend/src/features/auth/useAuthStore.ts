import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthResponse, User } from '../../types';

interface AuthState {

    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (data: AuthResponse) => void;
    logout: () => void;
    updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            login: (data) => set({ 
                token: data.token, 
                user: {
                    id: data.id,
                    email: data.email,

                    nombre: data.nombre,
                    roles: data.roles,
                    fotoUrl: data.fotoUrl,
                    interests: data.interests,
                    favoriteClinics: data.favoriteClinics
                }, 
                isAuthenticated: true 
            }),
            logout: () => set({ token: null, user: null, isAuthenticated: false }),
            updateUser: (user) => set({ user }),
        }),
        {
            name: 'auth-storage-v2',
        }
    )
);

import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface AppUser extends User {
  user_metadata: {
    role?: 'OWNER' | 'VET' | 'ADMIN';
    plan?: 'FREE' | 'PREMIUM';
    avatar_url?: string;
    full_name?: string;
    telefono?: string;
  };
}

interface AuthState {
  session: Session | null;
  user: AppUser | null;
  initialized: boolean;
  setSession: (session: Session | null) => void;
  initialize: () => void;
  loginMock: (plan?: 'FREE' | 'PREMIUM', role?: 'OWNER' | 'VET' | 'ADMIN') => void;
  logout: () => void;
}

// ── MOCK USER FACTORY ─────────────────────────────────────────────
const nameMap: Record<string, string> = {
  'OWNER-PREMIUM': 'Usuaria Premium',
  'OWNER-FREE': 'Usuario Free',
  'VET-PREMIUM': 'Dr. Veterinario',
  'VET-FREE': 'Dr. Veterinario',
  'ADMIN-PREMIUM': 'Admin PetConnect',
  'ADMIN-FREE': 'Admin PetConnect',
};

const createMockUser = (plan: 'FREE' | 'PREMIUM' = 'PREMIUM', role: 'OWNER' | 'VET' | 'ADMIN' = 'OWNER'): AppUser => ({
  id: '22222222-2222-2222-2222-222222222222',
  app_metadata: {},
  user_metadata: {
    role,
    plan,
    full_name: nameMap[`${role}-${plan}`] || 'Usuario',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
});

const createMockSession = (user: AppUser): Session => ({
  user,
  access_token: 'mock',
  refresh_token: 'mock',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: 'bearer',
});

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  initialized: false,
  setSession: (session) => set({ session, user: session?.user as AppUser | null }),

  initialize: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        set({ session, user: session.user as AppUser, initialized: true });
      } else {
        set({ session: null, user: null, initialized: true });
      }
    }).catch(() => {
      set({ session: null, user: null, initialized: true });
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        set({ session, user: session.user as AppUser });
      } else {
        set({ session: null, user: null });
      }
    });
  },

  loginMock: (plan = 'PREMIUM', role = 'OWNER') => {
    const user = createMockUser(plan, role);
    const session = createMockSession(user);
    set({ session, user, initialized: true });
  },

  logout: () => {
    supabase.auth.signOut().catch(() => {});
    set({ session: null, user: null });
  },
}));

import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface AppUser extends User {
  user_metadata: {
    role?: 'OWNER' | 'VET';
    plan?: 'FREE' | 'PREMIUM';
    avatar_url?: string;
    full_name?: string;
    telefono?: string;
  };
}

interface AuthState {
  session: Session | null;
  user: AppUser | null;
  setSession: (session: Session | null) => void;
  initialize: () => void;
}

// ── MOCK SESSION FOR V5 TESTING SINCE SUPABASE IS UNLINKED ──
const MOCK_USER: AppUser = {
  id: '22222222-2222-2222-2222-222222222222',
  app_metadata: {},
  user_metadata: { role: 'OWNER', plan: 'PREMIUM', full_name: 'Usuaria Premium', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
};

const MOCK_SESSION: Session = { 
  user: MOCK_USER, 
  access_token: 'mock', 
  refresh_token: 'mock', 
  expires_in: 3600, 
  expires_at: Math.floor(Date.now() / 1000) + 3600, 
  token_type: 'bearer' 
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  setSession: (session) => set({ session, user: session?.user as AppUser | null }),
  initialize: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      // If no real session, inject mock premium user for testing v5 features
      if (session) {
        set({ session, user: session.user as AppUser });
      } else {
        console.warn('Using Local Mock Premium Session for v5 Testing');
        set({ session: MOCK_SESSION, user: MOCK_USER });
      }
    }).catch(() => {
        console.warn('Supabase Error: Using Local Mock Premium Session for v5 Testing');
        set({ session: MOCK_SESSION, user: MOCK_USER });
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        set({ session, user: session.user as AppUser });
      }
    });
  },
}));

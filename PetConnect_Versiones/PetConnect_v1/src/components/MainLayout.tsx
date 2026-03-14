import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { supabase } from '../lib/supabase';
import { Map, Users, LogOut } from 'lucide-react';

export const MainLayout = () => {
  const { session } = useAuthStore();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <nav className="bg-primary text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold font-play flex items-center gap-2">
            PetConnect
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/mapa" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Map size={20} /> Mapa
            </Link>
            <Link to="/comunidad" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Users size={20} /> Comunidad
            </Link>
            {session ? (
              <button onClick={handleLogout} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <LogOut size={20} /> Salir
              </button>
            ) : (
              <div className="flex gap-4">
                <Link to="/login" className="bg-accent hover:bg-orange-500 text-white px-4 py-2 rounded-md font-semibold transition-colors">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="bg-accent hover:bg-orange-500 text-white px-4 py-2 rounded-md font-semibold transition-colors">
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

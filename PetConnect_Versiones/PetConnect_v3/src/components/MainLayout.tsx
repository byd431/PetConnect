import { Outlet, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { supabase } from '../lib/supabase';
import { Map, Users, LogOut, User, ShoppingBag, MessageSquare } from 'lucide-react';

export const MainLayout = () => {
  const { session } = useAuthStore();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <nav className="bg-primary text-white p-4 shadow-md z-[500]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold font-play flex items-center gap-2">
            🐾 PetConnect
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/mapa" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Map size={18} /> Mapa
            </Link>
            <Link to="/social" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <MessageSquare size={18} /> Comunidad
            </Link>
            <Link to="/store" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <ShoppingBag size={18} /> Tienda NFC
            </Link>
            {session ? (
              <>
                <Link to="/profile" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                  <User size={18} /> Mi Perfil
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                  <LogOut size={18} /> Salir
                </button>
              </>
            ) : (
              <div className="flex gap-3">
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
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
};

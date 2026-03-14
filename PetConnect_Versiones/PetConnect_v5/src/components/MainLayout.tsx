import { Outlet, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import type { AppUser } from '../store/useAuthStore';
import { supabase } from '../lib/supabase';
import { Map, LogOut, User, ShoppingBag, MessageSquare, Crown, Stethoscope } from 'lucide-react';
import { ChatBot } from './ui/ChatBot';

export const MainLayout = () => {
  const { session, user } = useAuthStore();
  
  const meta = (user as AppUser)?.user_metadata || {};
  const isFree = meta.plan === 'FREE';
  const isVet = meta.role === 'VET';

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
              <ShoppingBag size={18} /> Tienda
            </Link>
            
            {session ? (
              <>
                {isVet && (
                  <Link to="/clinic-dashboard" className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors">
                    <Stethoscope size={16} /> Vet Dashboard
                  </Link>
                )}
                {isFree && !isVet && (
                  <button className="hidden sm:flex items-center gap-1 bg-[#f29933] px-3 py-1 rounded-full font-bold hover:bg-orange-500 transition-colors animate-pulse text-xs uppercase tracking-wide">
                    <Crown size={14} /> Hazte Premium 39,90€/año
                  </button>
                )}
                <Link to="/profile" className="flex items-center gap-1 hover:opacity-80 transition-opacity ml-2 border-l border-white/20 pl-4">
                  <User size={18} /> {meta.full_name || 'Perfil'}
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-1 hover:opacity-80 transition-opacity ml-2">
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
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>
      
      {/* ── Global Vet-AI ChatBot ──────────────────────────── */}
      <ChatBot />
    </div>
  );
};


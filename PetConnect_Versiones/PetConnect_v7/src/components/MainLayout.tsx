import { useState, useRef, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import type { AppUser } from '../store/useAuthStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { Map, LogOut, User, ShoppingBag, MessageSquare, Crown, Stethoscope, LifeBuoy, Bell, Shield } from 'lucide-react';
import { ChatBot } from './ui/ChatBot';

export const MainLayout = () => {
  const { session, user, logout } = useAuthStore();
  const { notifications, unreadCount, markAllRead } = useNotificationStore();
  const [bellOpen, setBellOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

  const meta = (user as AppUser)?.user_metadata || {};
  const isFree = meta.plan === 'FREE';
  const isVet = meta.role === 'VET';
  const isAdmin = meta.role === 'ADMIN';

  const handleLogout = () => {
    logout();
  };

  // Close bell dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setBellOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleBellClick = () => {
    if (!bellOpen) markAllRead();
    setBellOpen(!bellOpen);
  };

  const borderColorMap: Record<string, string> = {
    alert: 'border-l-red-500',
    info: 'border-l-[#4682ca]',
    success: 'border-l-[#41b7a1]',
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
                  <Link to="/vet-panel" className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors">
                    <Stethoscope size={16} /> Vet Panel
                  </Link>
                )}
                {isAdmin && (
                  <Link to="/admin-panel" className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors">
                    <Shield size={16} /> Admin
                  </Link>
                )}
                {isFree && !isVet && !isAdmin && (
                  <button className="hidden sm:flex items-center gap-1 bg-[#f29933] px-3 py-1 rounded-full font-bold hover:bg-orange-500 transition-colors animate-pulse text-xs uppercase tracking-wide">
                    <Crown size={14} /> Hazte Premium 39,90€/año
                  </button>
                )}

                {/* ── Notification Bell ──────────────────────────── */}
                <div className="relative" ref={bellRef}>
                  <button
                    onClick={handleBellClick}
                    className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold animate-pulse shadow-md">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Dropdown */}
                  {bellOpen && (
                    <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden z-[1000] border border-gray-100">
                      <div className="px-4 py-3 bg-[#4682ca] text-white flex items-center justify-between">
                        <span className="font-bold text-sm">Notificaciones</span>
                        <span className="text-xs opacity-70">{notifications.length} total</span>
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="p-6 text-center text-gray-400 text-sm">No hay notificaciones</p>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              className={`px-4 py-3 border-b border-gray-50 border-l-4 ${borderColorMap[n.type] || 'border-l-gray-200'} ${
                                !n.read ? 'bg-blue-50/50' : 'bg-white'
                              } hover:bg-gray-50 transition-colors`}
                            >
                              <p className="text-sm text-gray-800 leading-snug">{n.message}</p>
                              <p className="text-[10px] text-gray-400 mt-1">
                                {n.timestamp.toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

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

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span>🐾</span>
            <span className="font-play font-bold">PetConnect</span>
            <span className="text-gray-400">© 2026</span>
          </div>
          <div className="flex gap-6 text-gray-300">
            <Link to="/contact" className="hover:text-white hover:underline transition-colors flex items-center gap-1">
              <LifeBuoy size={14} /> Contacto y Soporte
            </Link>
            <Link to="/mapa" className="hover:text-white hover:underline transition-colors">Mapa</Link>
            <Link to="/social" className="hover:text-white hover:underline transition-colors">Comunidad</Link>
          </div>
        </div>
      </footer>

      {/* ── Global Vet-AI ChatBot ──────────────────────────── */}
      <ChatBot />
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';
import { Stethoscope, Shield, Crown, UserIcon } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { session, loginMock } = useAuthStore();

  if (session) {
    navigate('/');
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  const handleMockLogin = (role: 'OWNER' | 'VET' | 'ADMIN', plan: 'FREE' | 'PREMIUM' = 'PREMIUM') => {
    loginMock(plan, role);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-play font-bold mb-6 text-center text-primary">Iniciar Sesión</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">{error}</div>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
          <input
            type="password"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors disabled:opacity-50"
        >
          {loading ? 'Cargando...' : 'Entrar'}
        </button>
      </form>

      {/* Mock login for QA testing */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center mb-3">Acceso rápido (Testing)</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleMockLogin('OWNER', 'PREMIUM')}
            id="btn-mock-premium"
            className="flex items-center justify-center gap-1 bg-[#f29933] hover:bg-orange-500 text-white font-bold py-2 rounded-md text-sm transition-colors"
          >
            <Crown size={14} /> Premium
          </button>
          <button
            onClick={() => handleMockLogin('OWNER', 'FREE')}
            id="btn-mock-free"
            className="flex items-center justify-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 rounded-md text-sm transition-colors"
          >
            <UserIcon size={14} /> Gratis
          </button>
          <button
            onClick={() => handleMockLogin('VET')}
            id="btn-mock-vet"
            className="flex items-center justify-center gap-1 bg-[#2faaaf] hover:bg-teal-600 text-white font-bold py-2 rounded-md text-sm transition-colors"
          >
            <Stethoscope size={14} /> Veterinario
          </button>
          <button
            onClick={() => handleMockLogin('ADMIN')}
            id="btn-mock-admin"
            className="flex items-center justify-center gap-1 bg-[#2c3e50] hover:bg-gray-800 text-white font-bold py-2 rounded-md text-sm transition-colors"
          >
            <Shield size={14} /> Admin
          </button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          ¿No tienes cuenta? <Link to="/register" className="text-secondary hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
};

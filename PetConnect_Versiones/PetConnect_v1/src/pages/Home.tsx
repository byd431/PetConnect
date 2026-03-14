import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { session, user } = useAuthStore();

  return (
    <div className="text-center mt-20">
      <h1 className="text-5xl font-play font-bold text-primary mb-6">Bienvenido a PetConnect</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        La plataforma ideal para conectar mascotas, encontrar veterinarias en el mapa y unirte a una comunidad increíble.
      </p>
      
      {session ? (
        <div className="bg-white p-8 rounded-lg shadow-md inline-block">
          <h2 className="text-2xl font-bold mb-2">¡Hola, {user?.user_metadata?.full_name || user?.email}!</h2>
          <p className="text-gray-600">Ya estás conectado. Explora el mapa y la comunidad.</p>
        </div>
      ) : (
        <div className="space-x-4">
          <Link to="/register" className="bg-accent hover:bg-orange-500 text-white px-8 py-3 rounded-lg font-bold text-lg inline-block transition-transform hover:scale-105">
            Únete Ahora
          </Link>
          <Link to="/login" className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-bold text-lg inline-block transition-colors">
            Iniciar Sesión
          </Link>
        </div>
      )}
    </div>
  );
};

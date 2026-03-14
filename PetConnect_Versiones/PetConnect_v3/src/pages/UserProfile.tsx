import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { supabase } from '../lib/supabase';
import { User, PawPrint, Phone, Mail, IdCard, Plus } from 'lucide-react';

interface Pet {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  foto_url: string;
}

export const UserProfile = () => {
  const { user, session } = useAuthStore();
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    const fetchPets = async () => {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('owner_id', user?.id);
      if (!error && data) setPets(data);
      setLoading(false);
    };

    fetchPets();
  }, [session, user, navigate]);

  const meta = user?.user_metadata || {};

  return (
    <div className="min-h-full bg-background p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* ── User Card ────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-28 h-28 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {meta.avatar_url ? (
              <img src={meta.avatar_url} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={48} className="text-primary" />
            )}
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-3xl font-play font-bold text-gray-900">{meta.full_name || 'Usuario'}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-600 text-sm">
              <span className="flex items-center gap-1"><IdCard size={16} /> {meta.dni || '—'}</span>
              <span className="flex items-center gap-1"><Phone size={16} /> {meta.telefono || '—'}</span>
              <span className="flex items-center gap-1"><Mail size={16} /> {user?.email}</span>
            </div>
          </div>
        </div>

        {/* ── Pets Section ─────────────────────────────────── */}
        <h2 className="text-2xl font-play font-bold text-gray-900 mb-4 flex items-center gap-2">
          <PawPrint size={24} className="text-secondary" /> Mis Mascotas
        </h2>

        {loading ? (
          <p className="text-gray-500 text-center py-10">Cargando...</p>
        ) : pets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <p className="text-[#666666] mb-6 text-lg">Aún no has registrado ninguna mascota.</p>
            <button className="bg-[#4682ca] hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center gap-2">
              <Plus size={20} /> Añadir Mascota
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <Link
                key={pet.id}
                to={`/pet/${pet.id}`}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group cursor-pointer"
              >
                <div className="h-48 bg-gray-100 overflow-hidden">
                  {pet.foto_url ? (
                    <img src={pet.foto_url} alt={pet.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <PawPrint size={64} className="text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900">{pet.nombre}</h3>
                  <p className="text-gray-500 text-sm">{pet.especie} · {pet.raza}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

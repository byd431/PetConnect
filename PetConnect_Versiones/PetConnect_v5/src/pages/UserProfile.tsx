import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import type { AppUser } from '../store/useAuthStore';
import { supabase } from '../lib/supabase';
import { User, PawPrint, Phone, Mail, IdCard, Plus, X } from 'lucide-react';

interface Pet {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  foto_url: string;
}

const SPECIES_OPTIONS = ['Perro', 'Gato', 'Hurón', 'Conejo', 'Nutria', 'Ave', 'Reptil', 'Roedor', 'Exótico'];

export const UserProfile = () => {
  const { user, session } = useAuthStore();
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  // New Pet Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPet, setNewPet] = useState({ nombre: '', especie: 'Perro', raza: '', foto_url: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    const fetchPets = async () => {
      // Allow testing without real supabase login using our mock id
      const fetchId = user?.id || '22222222-2222-2222-2222-222222222222';
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('owner_id', fetchId);
        
      if (!error && data) setPets(data);
      setLoading(false);
    };

    fetchPets();
  }, [session, user, navigate]);

  const handleAddPet = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Fallback ID for v5 mock testing
    const ownerId = user?.id || '22222222-2222-2222-2222-222222222222';

    const { data, error } = await supabase
      .from('pets')
      .insert([{ 
        ...newPet, 
        owner_id: ownerId, 
        foto_url: newPet.foto_url || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=80' // Default fallback
      }])
      .select()
      .single();

    if (!error && data) {
      setPets([...pets, data]);
      setIsModalOpen(false);
      setNewPet({ nombre: '', especie: 'Perro', raza: '', foto_url: '' });
    }
    setIsSubmitting(false);
  };

  const meta = (user as AppUser)?.user_metadata || {};

  return (
    <div className="min-h-full bg-background p-6 md:p-10 relative">
      <div className="max-w-5xl mx-auto">
        {/* ── User Card ────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          {/* Badge Premium */}
          {meta.plan === 'PREMIUM' && (
            <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold px-6 py-2 rounded-bl-xl shadow-md flex items-center gap-1">
              ✨ Usuario Premium
            </div>
          )}

          <div className="w-28 h-28 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 overflow-hidden border-4 border-white shadow-sm">
            {meta.avatar_url ? (
              <img src={meta.avatar_url} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={48} className="text-primary" />
            )}
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-3xl font-play font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
              {meta.full_name || 'Usuario'}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-600 text-sm">
              <span className="flex items-center gap-1"><IdCard size={16} /> Dueño de Mascotas</span>
              <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"><Phone size={14} /> {meta.telefono || '—'}</span>
              <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"><Mail size={14} /> {user?.email || 'test@petconnect.com'}</span>
            </div>
          </div>
        </div>

        {/* ── Pets Header ─────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-play font-bold text-gray-900 flex items-center gap-2">
            <PawPrint size={24} className="text-secondary" /> Mis Mascotas
          </h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#4682ca] hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-md w-full sm:w-auto justify-center"
          >
            <Plus size={20} /> Añadir Mascota
          </button>
        </div>

        {/* ── Pets Grid ─────────────────────────────────── */}
        {loading ? (
          <p className="text-gray-500 text-center py-10 animate-pulse">Cargando...</p>
        ) : pets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center border-dashed border-2 border-gray-300">
            <PawPrint size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-[#666666] mb-6 text-lg">Aún no has registrado ninguna mascota.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <Link
                key={pet.id}
                to={`/pet/${pet.id}`}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group cursor-pointer"
              >
                <div className="h-48 bg-gray-100 overflow-hidden relative">
                  {/* Etiqueta de especie */}
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded shadow-sm z-10 text-gray-700">
                    {pet.especie}
                  </div>
                  {pet.foto_url ? (
                    <img src={pet.foto_url} alt={pet.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <PawPrint size={64} className="text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="p-5 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{pet.nombre}</h3>
                    <p className="text-gray-500 text-sm">{pet.raza || 'Mestizo'}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Plus size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ── Add Pet Modal ────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative">
            <div className="bg-[#4682ca] p-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-lg flex items-center gap-2"><PawPrint size={20} /> Nueva Mascota</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:bg-blue-600 p-1 rounded transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddPet} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre</label>
                <input 
                  type="text" required 
                  value={newPet.nombre} onChange={e => setNewPet({...newPet, nombre: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                  placeholder="Ej: Rex"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Especie</label>
                <select 
                  value={newPet.especie} onChange={e => setNewPet({...newPet, especie: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white cursor-pointer"
                >
                  {SPECIES_OPTIONS.map(sp => <option key={sp} value={sp}>{sp}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Raza</label>
                <input 
                  type="text" 
                  value={newPet.raza} onChange={e => setNewPet({...newPet, raza: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                  placeholder="Ej: Golden Retriever"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">URL de Foto (Opcional)</label>
                <input 
                  type="url" 
                  value={newPet.foto_url} onChange={e => setNewPet({...newPet, foto_url: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                  placeholder="https://images.unsplash.com/..."
                />
                <p className="text-xs text-gray-400 mt-1">Si dejas esto en blanco usaremos una foto por defecto.</p>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#f29933] hover:bg-orange-500 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 mt-4 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Guardando...' : 'Añadir Mascota'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

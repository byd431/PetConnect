import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import type { AppUser } from '../store/useAuthStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { supabase } from '../lib/supabase';
import { Power, Search, Syringe, Building2, Phone, MapPin, Shield, CheckCircle, AlertTriangle } from 'lucide-react';

export const VetDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const addNotification = useNotificationStore((s) => s.addNotification);
  const meta = (user as AppUser)?.user_metadata || {};

  // Redirect non-VET users
  useEffect(() => {
    if (meta.role !== 'VET') {
      navigate('/');
    }
  }, [meta.role, navigate]);

  // ── Toggle state ───────────────────────────────────────────────
  const [isOpen, setIsOpen] = useState(true);
  const [toggleLoading, setToggleLoading] = useState(false);

  // ── Cartilla search ────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [showVaccineSuccess, setShowVaccineSuccess] = useState(false);

  // Mock clinic data
  const clinicName = 'Clínica Veterinaria PetConnect';
  const clinicId = 1;

  const handleToggle = async () => {
    setToggleLoading(true);
    // Try to update Supabase, gracefully handle errors (mock env)
    try {
      await supabase
        .from('clinics')
        .update({ es_urgencia24h: !isOpen })
        .eq('id', clinicId);
    } catch (e) {
      // Silently handle in mock environment
    }
    setIsOpen(!isOpen);
    setToggleLoading(false);
    addNotification(
      `Estado de la clínica actualizado: ${!isOpen ? '🟢 Abierto (Urgencias 24h)' : '🔴 Cerrado'}`,
      !isOpen ? 'success' : 'alert'
    );
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    // Mock search result
    setSearchResult({
      owner: 'Carlos Martinez',
      dni: '12345678A',
      pet: {
        name: 'Rex',
        species: 'Perro',
        breed: 'Pastor Alemán',
        chip: '941000012345678',
        birthDate: '2022-03-15',
        vaccines: [
          { name: 'Rabia', date: '2024-01-15', vet: 'Dr. García' },
          { name: 'Polivalente', date: '2024-06-20', vet: 'Dra. López' },
          { name: 'Leptospirosis', date: '2024-09-10', vet: 'Dr. García' },
        ],
      },
    });
  };

  const handleAddVaccine = () => {
    setShowVaccineSuccess(true);
    addNotification('Vacuna registrada correctamente en la cartilla de Rex.', 'success');
    setTimeout(() => setShowVaccineSuccess(false), 4000);
  };

  if (meta.role !== 'VET') return null;

  return (
    <div className="min-h-full" style={{ backgroundColor: '#1a2332' }}>
      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="bg-[#2c3e50] text-white p-8 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 bg-[#4682ca] rounded-2xl flex items-center justify-center">
              <Building2 size={28} />
            </div>
            <div>
              <h1 className="font-play text-3xl font-bold">{clinicName}</h1>
              <p className="text-gray-300 text-sm flex items-center gap-2 mt-1">
                <MapPin size={14} /> Calle Veterinaria 42, Málaga
                <span className="mx-2">•</span>
                <Phone size={14} /> 952 123 456
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-8">
        {/* ── Module 1: Toggle Status ─────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="font-play text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Power size={22} className="text-[#4682ca]" />
            Actualizar Estado en Mapa
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Cambia el estado de tu clínica en el mapa principal de PetConnect. Los usuarios verán si estás disponible para urgencias.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={handleToggle}
              disabled={toggleLoading}
              className={`relative w-28 h-14 rounded-full transition-all duration-300 shadow-lg ${
                isOpen
                  ? 'bg-gradient-to-r from-green-400 to-green-600'
                  : 'bg-gradient-to-r from-red-400 to-red-600'
              }`}
            >
              <span
                className={`absolute top-1.5 w-11 h-11 bg-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center text-lg ${
                  isOpen ? 'left-[60px]' : 'left-1.5'
                }`}
              >
                {isOpen ? '🟢' : '🔴'}
              </span>
            </button>
            <div>
              <p className={`text-2xl font-bold ${isOpen ? 'text-green-600' : 'text-red-600'}`}>
                {isOpen ? '🟢 Abierto (Urgencias 24h)' : '🔴 Cerrado'}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Último cambio: {new Date().toLocaleString('es-ES')}
              </p>
            </div>
          </div>
        </div>

        {/* ── Module 2: Validate Cartilla ──────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="font-play text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Shield size={22} className="text-[#4682ca]" />
            Validar Cartilla
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Busca un paciente por DNI del dueño o número de chip de la mascota.
          </p>

          {/* Search bar */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="DNI del dueño o chip de la mascota..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4682ca] focus:border-[#4682ca]"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-[#4682ca] hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2"
            >
              <Search size={18} /> Buscar
            </button>
          </div>

          {/* Search result */}
          {searchResult && (
            <div className="border-2 border-gray-100 rounded-2xl overflow-hidden">
              {/* Pet info header */}
              <div className="bg-[#ecf0f9] p-5 flex items-center gap-4">
                <div className="w-16 h-16 bg-[#4682ca] rounded-2xl flex items-center justify-center text-white text-2xl">
                  🐕
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{searchResult.pet.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {searchResult.pet.species} • {searchResult.pet.breed} • Chip: {searchResult.pet.chip}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Propietario: {searchResult.owner} (DNI: {searchResult.dni})
                  </p>
                </div>
              </div>

              {/* Vaccine table */}
              <div className="p-5">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Syringe size={16} className="text-[#2faaaf]" />
                  Historial de Vacunas
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 border-b border-gray-100">
                        <th className="pb-2 font-semibold">Vacuna</th>
                        <th className="pb-2 font-semibold">Fecha</th>
                        <th className="pb-2 font-semibold">Veterinario</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {searchResult.pet.vaccines.map((v: any, i: number) => (
                        <tr key={i} className="text-gray-700">
                          <td className="py-3 flex items-center gap-2">
                            <CheckCircle size={14} className="text-[#41b7a1]" />
                            {v.name}
                          </td>
                          <td className="py-3">{v.date}</td>
                          <td className="py-3 text-gray-500">{v.vet}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add vaccine button */}
                <button
                  onClick={handleAddVaccine}
                  className="mt-4 w-full bg-[#41b7a1] hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Syringe size={18} /> Añadir Vacuna Oficial
                </button>

                {showVaccineSuccess && (
                  <div className="mt-3 bg-green-50 border border-green-200 text-green-700 rounded-xl p-3 text-sm flex items-center gap-2 animate-slide-up">
                    <CheckCircle size={16} />
                    Vacuna registrada correctamente en el historial de {searchResult.pet.name}.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

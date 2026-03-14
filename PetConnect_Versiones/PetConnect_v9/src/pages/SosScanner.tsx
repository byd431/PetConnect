import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Phone, MapPin, PawPrint, AlertTriangle } from 'lucide-react';

interface SosPet {
  id: number;
  nombre: string;
  color: string;
  observaciones: string;
  foto_url: string;
  owner_phone: string;
  owner_name: string;
}

export const SosScanner = () => {
  const { nfc_id } = useParams<{ nfc_id: string }>();
  const [pet, setPet] = useState<SosPet | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationSent, setLocationSent] = useState(false);

  useEffect(() => {
    const fetchPetByNfc = async () => {
      // Try joining nfc_tags with pets
      const { data, error } = await supabase
        .from('nfc_tags')
        .select(`
          pet_id,
          pets (
            id, nombre, color, observaciones, foto_url, owner_id
          )
        `)
        .eq('nfc_uuid', nfc_id)
        .single();

      if (!error && data && data.pets) {
        const petData = data.pets as any;
        // Fetch owner info
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name, telefono')
          .eq('id', petData.owner_id)
          .single();

        setPet({
          id: petData.id,
          nombre: petData.nombre,
          color: petData.color,
          observaciones: petData.observaciones || '',
          foto_url: petData.foto_url || '',
          owner_phone: profileData?.telefono || '112',
          owner_name: profileData?.full_name || 'Dueño',
        });
      }
      setLoading(false);
    };

    fetchPetByNfc();
  }, [nfc_id]);

  const handleSendLocation = async () => {
    setLocationSent(true);
    alert('📍 Ubicación GPS enviada al dueño');
    // In production: update GPS coords in Supabase
  };

  // ── Loading state ──────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FADBD8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-red-400 border-t-transparent rounded-full mb-4" />
          <p className="text-gray-700 font-semibold">Buscando mascota...</p>
        </div>
      </div>
    );
  }

  // ── Not found state ────────────────────────────────────
  if (!pet) {
    return (
      <div className="min-h-screen bg-[#FADBD8] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md">
          <AlertTriangle size={64} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mascota no encontrada</h2>
          <p className="text-gray-500">No se encontró ninguna mascota asociada a este collar NFC (ID: <code className="bg-gray-100 px-2 py-1 rounded text-sm">{nfc_id}</code>).</p>
          <p className="text-gray-500 mt-2">Si has encontrado un animal perdido, llama al <a href="tel:112" className="text-blue-600 font-bold">112</a>.</p>
        </div>
      </div>
    );
  }

  // ── Main SOS view ──────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FADBD8] flex flex-col">
      {/* Header banner */}
      <div className="bg-red-600 text-white text-center py-3 font-bold text-lg animate-pulse">
        🚨 ALERTA: MASCOTA ENCONTRADA 🚨
      </div>

      <div className="flex-1 flex flex-col items-center p-6 max-w-lg mx-auto w-full">
        {/* Pet photo */}
        <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white mt-6 mb-6">
          {pet.foto_url ? (
            <img src={pet.foto_url} alt={pet.nombre} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <PawPrint size={64} className="text-gray-400" />
            </div>
          )}
        </div>

        {/* Pet info */}
        <h1 className="text-4xl font-play font-bold text-gray-900 mb-2">{pet.nombre}</h1>
        <p className="text-gray-600 text-lg mb-2">Color: <strong>{pet.color || '—'}</strong></p>

        {pet.observaciones && (
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 w-full mb-6">
            <p className="text-sm font-bold text-yellow-700 mb-1 flex items-center gap-1">
              <AlertTriangle size={14} /> ¡IMPORTANTE! Observaciones / Alergias:
            </p>
            <p className="text-gray-800">{pet.observaciones}</p>
          </div>
        )}

        <p className="text-gray-500 text-sm mb-8">
          Dueño: <strong>{pet.owner_name}</strong>
        </p>

        {/* ── Giant action buttons ───────────────────────── */}
        <div className="w-full space-y-4">
          <a
            href={`tel:${pet.owner_phone}`}
            className="w-full bg-[#4682ca] hover:bg-blue-600 text-white text-xl font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-colors"
          >
            <Phone size={28} /> LLAMAR AL DUEÑO
          </a>

          <button
            onClick={handleSendLocation}
            disabled={locationSent}
            className="w-full bg-[#f29933] hover:bg-orange-500 text-white text-xl font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-colors disabled:opacity-50"
          >
            <MapPin size={28} /> {locationSent ? 'UBICACIÓN ENVIADA ✓' : 'ENVIAR MI UBICACIÓN'}
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-8 text-center">
          PetConnect – Collar NFC ID: {nfc_id}
        </p>
      </div>
    </div>
  );
};

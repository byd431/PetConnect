import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PawPrint, Edit, Wifi, ArrowLeft, Calendar, Palette, Weight, FileText, AlertTriangle } from 'lucide-react';

interface PetData {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  color: string;
  peso: number;
  fecha_nacimiento: string;
  chip: string;
  observaciones: string;
  foto_url: string;
  owner_id: string;
}

export const PetProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<PetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [nfcLinked, setNfcLinked] = useState(false);
  const [showNfcSuccess, setShowNfcSuccess] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('id', id)
        .single();
      if (!error && data) setPet(data);
      setLoading(false);
    };
    fetchPet();
  }, [id]);

  const handleLinkNfc = async () => {
    const fakeUuid = crypto.randomUUID();
    // Simulate linking NFC tag
    const { error } = await supabase
      .from('nfc_tags')
      .upsert({ pet_id: pet?.id, nfc_uuid: fakeUuid, linked_at: new Date().toISOString() });

    if (!error) {
      setNfcLinked(true);
      setShowNfcSuccess(true);
      setTimeout(() => setShowNfcSuccess(false), 3000);
    }
  };

  if (loading) {
    return <div className="min-h-full bg-background flex items-center justify-center"><p className="text-gray-500">Cargando perfil...</p></div>;
  }

  if (!pet) {
    return <div className="min-h-full bg-background flex items-center justify-center"><p className="text-red-500">Mascota no encontrada.</p></div>;
  }

  return (
    <div className="min-h-full bg-background">
      {/* ── Hero image ──────────────────────────────────────── */}
      <div className="relative h-72 md:h-96 bg-gray-200 overflow-hidden">
        {pet.foto_url ? (
          <img src={pet.foto_url} alt={pet.nombre} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-secondary/30">
            <PawPrint size={100} className="text-white/60" />
          </div>
        )}
        <Link to="/profile" className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
          <ArrowLeft size={24} className="text-gray-700" />
        </Link>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h1 className="text-4xl font-play font-bold text-white">{pet.nombre}</h1>
          <p className="text-white/80 text-lg">{pet.especie} · {pet.raza}</p>
        </div>
      </div>

      {/* ── Data cards ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto p-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-3">Datos Físicos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoRow icon={<FileText size={18} />} label="Chip (DNI)" value={pet.chip || '—'} />
            <InfoRow icon={<Palette size={18} />} label="Color" value={pet.color || '—'} />
            <InfoRow icon={<Weight size={18} />} label="Peso" value={pet.peso ? `${pet.peso} kg` : '—'} />
            <InfoRow icon={<Calendar size={18} />} label="F. Nacimiento" value={pet.fecha_nacimiento || '—'} />
          </div>

          {pet.observaciones && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <p className="flex items-center gap-2 text-sm font-semibold text-yellow-700 mb-1">
                <AlertTriangle size={16} /> Observaciones Médicas
              </p>
              <p className="text-gray-700">{pet.observaciones}</p>
            </div>
          )}

          {/* ── Action buttons ─────────────────────────────── */}
          <div className="flex flex-wrap gap-4 pt-4 border-t">
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              <Edit size={18} /> Editar Datos
            </button>
            <button
              onClick={handleLinkNfc}
              disabled={nfcLinked}
              className="flex items-center gap-2 px-6 py-3 bg-[#2faaaf] hover:bg-teal-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <Wifi size={18} /> {nfcLinked ? 'Collar Vinculado ✓' : 'Vincular Collar NFC'}
            </button>
          </div>
        </div>
      </div>

      {/* ── NFC success toast ──────────────────────────────── */}
      {showNfcSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#41b7a1] text-white px-6 py-4 rounded-xl shadow-2xl animate-bounce text-sm font-semibold">
          ✅ Collar NFC vinculado correctamente
        </div>
      )}
    </div>
  );
};

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
    <span className="text-primary">{icon}</span>
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  </div>
);

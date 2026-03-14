import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PawPrint, Edit, Wifi, ArrowLeft, Calendar, Palette, Weight, FileText, AlertTriangle, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

const mockVaccines = [
  { fecha: '10/01/2023', vacuna: 'Rabia', veterinario: 'Clínica Centro' },
  { fecha: '15/02/2023', vacuna: 'Parvovirus', veterinario: 'Clínica Centro' },
  { fecha: '20/08/2023', vacuna: 'Desparasitación Interna', veterinario: 'Hospital 24h' },
  { fecha: '12/01/2024', vacuna: 'Rabia (Refuerzo)', veterinario: 'Clínica Centro' },
];

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
    const { error } = await supabase
      .from('nfc_tags')
      .upsert({ pet_id: pet?.id, nfc_uuid: fakeUuid, linked_at: new Date().toISOString() });

    if (!error) {
      setNfcLinked(true);
      setShowNfcSuccess(true);
      setTimeout(() => setShowNfcSuccess(false), 3000);
    }
  };

  const handleDownloadPdf = () => {
    if (!pet) return;

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(70, 130, 202); // #4682ca
    doc.text('🐾 PetConnect', 14, 20);
    
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text('Cartilla Veterinaria Digital', 14, 30);
    
    // Pet Info
    doc.setFontSize(12);
    doc.text(`Nombre: ${pet.nombre}`, 14, 45);
    doc.text(`Especie/Raza: ${pet.especie} - ${pet.raza}`, 14, 52);
    doc.text(`Chip (DNI): ${pet.chip || 'No registrado'}`, 14, 59);
    doc.text(`Color: ${pet.color || 'N/A'}`, 14, 66);
    doc.text(`Peso: ${pet.peso ? pet.peso + ' kg' : 'N/A'}`, 14, 73);

    // Medical History Table
    doc.setFontSize(14);
    doc.setTextColor(70, 130, 202);
    doc.text('Historial de Vacunación', 14, 90);

    autoTable(doc, {
      startY: 95,
      head: [['Fecha', 'Vacuna/Tratamiento', 'Clínica/Veterinario']],
      body: mockVaccines.map(v => [v.fecha, v.vacuna, v.veterinario]),
      theme: 'grid',
      headStyles: { fillColor: [70, 130, 202] },
    });

    // Save
    doc.save(`Cartilla_${pet.nombre.replace(/\s+/g, '_')}.pdf`);
  };

  if (loading) {
    return <div className="min-h-full bg-background flex items-center justify-center"><p className="text-gray-500">Cargando perfil...</p></div>;
  }

  if (!pet) {
    return <div className="min-h-full bg-background flex items-center justify-center"><p className="text-red-500">Mascota no encontrada.</p></div>;
  }

  return (
    <div className="min-h-full bg-background pb-12">
      {/* ── Hero image ──────────────────────────────────────── */}
      <div className="relative h-72 md:h-96 bg-gray-200 overflow-hidden">
        {pet.foto_url ? (
          <img src={pet.foto_url} alt={pet.nombre} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-secondary/30">
            <PawPrint size={100} className="text-white/60" />
          </div>
        )}
        <div className="absolute top-4 w-full px-4 flex justify-between items-center z-10">
          <Link to="/profile" className="bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
            <ArrowLeft size={24} className="text-gray-700" />
          </Link>
          <button
            onClick={handleDownloadPdf}
            className="bg-[#4682ca] hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Download size={20} /> Descargar Cartilla PDF
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h1 className="text-4xl font-play font-bold text-white">{pet.nombre}</h1>
          <p className="text-white/80 text-lg">{pet.especie} · {pet.raza}</p>
        </div>
      </div>

      {/* ── Data cards ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto p-6 -mt-8 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Physical Data & Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 border-b pb-3 mb-4">Datos Físicos</h2>
            <div className="space-y-3">
              <InfoRow icon={<FileText size={18} />} label="Chip (DNI)" value={pet.chip || '—'} />
              <InfoRow icon={<Palette size={18} />} label="Color" value={pet.color || '—'} />
              <InfoRow icon={<Weight size={18} />} label="Peso" value={pet.peso ? `${pet.peso} kg` : '—'} />
              <InfoRow icon={<Calendar size={18} />} label="F. Nacimiento" value={pet.fecha_nacimiento || '—'} />
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full flex justify-center items-center gap-2 px-4 py-3 border-2 border-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                <Edit size={18} /> Editar Datos
              </button>
              <button
                onClick={handleLinkNfc}
                disabled={nfcLinked}
                className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-[#2faaaf] hover:bg-teal-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                <Wifi size={18} /> {nfcLinked ? 'Collar Vinculado ✓' : 'Vincular Collar NFC'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Medical History */}
        <div className="lg:col-span-2 space-y-6">
          {pet.observaciones && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-r-2xl shadow-sm">
              <p className="flex items-center gap-2 text-sm font-bold text-yellow-700 mb-2">
                <AlertTriangle size={18} /> Observaciones Médicas / Alergias
              </p>
              <p className="text-gray-800">{pet.observaciones}</p>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 border-b pb-3 mb-4 flex items-center gap-2">
              <FileText size={20} className="text-primary" /> Historial de Vacunación
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600 border-collapse">
                <thead className="bg-gray-50 text-gray-700 font-bold">
                  <tr>
                    <th className="p-3 rounded-tl-lg">Fecha</th>
                    <th className="p-3">Vacuna / Tratamiento</th>
                    <th className="p-3 rounded-tr-lg">Clínica</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockVaccines.map((v, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 whitespace-nowrap">{v.fecha}</td>
                      <td className="p-3 font-medium text-gray-800">{v.vacuna}</td>
                      <td className="p-3">{v.veterinario}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
  <div className="flex items-center gap-4 p-2">
    <span className="text-primary bg-primary/10 p-2 rounded-lg">{icon}</span>
    <div>
      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{label}</p>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  </div>
);

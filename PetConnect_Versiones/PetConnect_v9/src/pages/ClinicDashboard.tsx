import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';
import type { AppUser } from '../store/useAuthStore';
import { Stethoscope, Save, MapPin, Clock } from 'lucide-react';

interface Clinic {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  es_urgencia24h: boolean;
}

export const ClinicDashboard = () => {
  const { user } = useAuthStore();
  const meta = (user as AppUser)?.user_metadata || {};
  
  // En v5 de simulación, asumiremos que si eres VET editas la clínica ID 1.
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const fetchClinic = async () => {
      const { data } = await supabase.from('clinics').select('*').eq('id', 1).single();
      if (data) setClinic(data);
      setLoading(false);
    };
    fetchClinic();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clinic) return;
    setSaving(true);
    
    const { error } = await supabase.from('clinics').update({
      nombre: clinic.nombre,
      direccion: clinic.direccion,
      telefono: clinic.telefono,
      es_urgencia24h: clinic.es_urgencia24h
    }).eq('id', clinic.id);

    if (!error) {
      setMsg('Datos de la clínica actualizados correctamente.');
      setTimeout(() => setMsg(''), 3000);
    } else {
      setMsg('Error al guardar datos.');
    }
    setSaving(false);
  };

  if (meta.role !== 'VET') {
    return <div className="p-10 text-center text-red-500 font-bold">Acceso Denegado. Solo para Veterinarios.</div>;
  }

  if (loading) return <div className="p-10 text-center">Cargando dashboard...</div>;

  return (
    <div className="min-h-full bg-background p-6 md:p-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#4682ca] p-6 text-white flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Stethoscope size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-play">Portal Veterinario</h1>
            <p className="text-blue-100">Gestiona los datos de tu clínica mostrados en PetConnect</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="p-8 space-y-6">
          {msg && (
            <div className={`p-4 rounded-lg font-bold ${msg.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {msg}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Nombre de la Clínica</label>
            <input 
              type="text" required 
              value={clinic?.nombre || ''} onChange={e => setClinic(prev => prev ? {...prev, nombre: e.target.value} : null)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4682ca] outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1"><MapPin size={16}/> Dirección Física</label>
            <input 
              type="text" required 
              value={clinic?.direccion || ''} onChange={e => setClinic(prev => prev ? {...prev, direccion: e.target.value} : null)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4682ca] outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 text-gray-700">Teléfono de Contacto</label>
            <input 
              type="text" required 
              value={clinic?.telefono || ''} onChange={e => setClinic(prev => prev ? {...prev, telefono: e.target.value} : null)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4682ca] outline-none" 
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <input 
              type="checkbox" 
              id="urgency"
              checked={clinic?.es_urgencia24h || false} 
              onChange={e => setClinic(prev => prev ? {...prev, es_urgencia24h: e.target.checked} : null)}
              className="w-5 h-5 text-[#f29933] rounded focus:ring-[#f29933]"
            />
            <label htmlFor="urgency" className="font-bold flex items-center gap-1 cursor-pointer">
              <Clock size={18} className="text-[#f29933]" /> ¿Es un centro con Urgencias 24h?
            </label>
          </div>

          <p className="text-sm text-gray-500">
            Los cambios guardados aquí se reflejarán instantáneamente en el mapa público interactivo para todos los usuarios.
          </p>

          <button 
            type="submit" 
            disabled={saving}
            className="w-full bg-[#2faaaf] hover:bg-teal-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors disabled:opacity-50"
          >
            <Save size={20} /> {saving ? 'Guardando cambios...' : 'Guardar Información Pública'}
          </button>
        </form>
      </div>
    </div>
  );
};

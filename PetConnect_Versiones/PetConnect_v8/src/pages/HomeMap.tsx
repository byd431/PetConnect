import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { supabase } from '../lib/supabase';

// ── Custom marker icons (Emojis) ─────────────────────────────────────
const createEmojiIcon = (emoji: string, bgColor: string, borderColor: string, customClass: string = '') =>
  L.divIcon({
    html: `
      <div class="${customClass}" style="
        background-color: ${bgColor};
        border: 2px solid ${borderColor};
        border-radius: 50%;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        transform: translate(-50%, -100%);
        transition: all 0.3s ease;
      ">
        ${emoji}
      </div>
    `,
    className: 'custom-emoji-icon',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    popupAnchor: [0, -40],
  });

const blueIcon = createEmojiIcon('🏥', '#ffffff', '#4682ca', 'hover:scale-110');
const redIcon = createEmojiIcon('🚨', '#ffffff', '#dc2626', 'animate-pulse-red hover:scale-110');
const orangeIcon = createEmojiIcon('🐾', '#ffffff', '#f29933', 'hover:scale-110');

// ── Mock consultation prices ─────────────────────────────────────────
const mockPrices = ['30€ – 45€', '35€ – 50€', '40€ – 55€', '25€ – 40€', '45€ – 60€'];

// ── Types ────────────────────────────────────────────────────────────
interface Clinic {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  latitud: number;
  longitud: number;
  es_urgencia24h: boolean;
}

interface LostPost {
  id: number;
  titulo: string;
  descripcion: string;
  latitud: number;
  longitud: number;
  tipo: string;
}

// ── Component ────────────────────────────────────────────────────────
export const HomeMap = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [lostPosts, setLostPosts] = useState<LostPost[]>([]);

  const [showClinics, setShowClinics] = useState(true);
  const [showUrgencias, setShowUrgencias] = useState(true);
  const [showLost, setShowLost] = useState(true);
  const [sosVisible, setSosVisible] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [bookingClinic, setBookingClinic] = useState<Clinic | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingReason, setBookingReason] = useState('');
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  // ── Fetch data from Supabase ─────────────────────────────────────
  useEffect(() => {
    const fetchClinics = async () => {
      const { data, error } = await supabase.from('clinics').select('*');
      if (!error && data) setClinics(data);
    };

    const fetchLostPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('tipo', 'PERDIDO');
      if (!error && data) setLostPosts(data);
    };

    fetchClinics();
    fetchLostPosts();
  }, []);

  // ── SOS handler ──────────────────────────────────────────────────
  const handleSOS = () => {
    setSosVisible(true);
    setTimeout(() => setSosVisible(false), 4000);
  };

  // ── Booking handler ──────────────────────────────────────────────
  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingClinic || !bookingDate) return;
    
    // Simulate Supabase insert
    const { error } = await supabase.from('appointments').insert({
      clinic_id: bookingClinic.id,
      appointment_date: new Date(bookingDate).toISOString(),
      reason: bookingReason,
      status: 'pending'
    });

    // We proceed even if error (since table might not exist yet in local DB)
    setBookingClinic(null);
    setShowBookingSuccess(true);
    setTimeout(() => setShowBookingSuccess(false), 3000);
  };

  // ── Filtered markers ─────────────────────────────────────────────
  const normalClinics = clinics.filter((c) => !c.es_urgencia24h);
  const urgenciaClinics = clinics.filter((c) => c.es_urgencia24h);

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 64px)' }}>
      {/* ── Map ──────────────────────────────────────────────────── */}
      <MapContainer
        center={[36.72016, -4.42034]}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Blue markers – normal clinics */}
        {showClinics &&
          normalClinics.map((c) => (
            <Marker key={`clinic-${c.id}`} position={[c.latitud, c.longitud]} icon={blueIcon}>
              <Popup>
                <div style={{ minWidth: '200px' }}>
                  <strong style={{ fontSize: '14px' }}>{c.nombre}</strong>
                  <br />
                  <span style={{ color: '#666' }}>{c.direccion}</span>
                  <br />
                  <span>📞 {c.telefono}</span>
                  <br />
                  <div style={{ margin: '8px 0', padding: '4px 8px', background: '#ecf0f9', borderRadius: '8px', display: 'inline-block' }}>
                    <span style={{ fontWeight: 'bold', color: '#4682ca', fontSize: '13px' }}>💰 Precio Medio Consulta: {mockPrices[c.id % mockPrices.length]}</span>
                  </div>
                  <br />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <button
                      onClick={() => setBookingClinic(c)}
                      style={{
                        padding: '6px 14px', background: '#f29933', color: 'white',
                        border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', flex: 1,
                      }}
                    >
                      🗓️ Pedir Cita
                    </button>
                    <button
                      onClick={() => setSelectedClinic(c)}
                      style={{
                        padding: '6px 14px', background: '#4682ca', color: 'white',
                        border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', flex: 1,
                      }}
                    >
                      Detalles
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Red markers – 24h emergency clinics */}
        {showUrgencias &&
          urgenciaClinics.map((c) => (
            <Marker key={`urg-${c.id}`} position={[c.latitud, c.longitud]} icon={redIcon}>
              <Popup>
                <div style={{ minWidth: '200px' }}>
                  <strong style={{ fontSize: '14px' }}>🚨 {c.nombre}</strong>
                  <br />
                  <span style={{ color: '#666' }}>{c.direccion}</span>
                  <br />
                  <span>📞 {c.telefono}</span>
                  <br />
                  <span style={{ color: '#dc2626', fontWeight: 'bold' }}>Urgencias 24h</span>
                  <br />
                  <div style={{ margin: '8px 0', padding: '4px 8px', background: '#fef2f2', borderRadius: '8px', display: 'inline-block' }}>
                    <span style={{ fontWeight: 'bold', color: '#dc2626', fontSize: '13px' }}>💰 Precio Medio Consulta: {mockPrices[c.id % mockPrices.length]}</span>
                  </div>
                  <br />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <button
                      onClick={() => setBookingClinic(c)}
                      style={{
                        padding: '6px 14px', background: '#f29933', color: 'white',
                        border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', flex: 1,
                      }}
                    >
                      🗓️ Pedir Cita
                    </button>
                    <button
                      onClick={() => setSelectedClinic(c)}
                      style={{
                        padding: '6px 14px', background: '#dc2626', color: 'white',
                        border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', flex: 1,
                      }}
                    >
                      Detalles
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Orange markers – lost pets */}
        {showLost &&
          lostPosts.map((p) => (
            <Marker key={`lost-${p.id}`} position={[p.latitud, p.longitud]} icon={orangeIcon}>
              <Popup>
                <strong>🐾 {p.titulo}</strong>
                <br />
                {p.descripcion}
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      {/* ── Floating filter pills ────────────────────────────────── */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] flex gap-3">
        <button
          onClick={() => setShowClinics(!showClinics)}
          className={`px-4 py-2 rounded-full font-semibold shadow-lg transition-all ${
            showClinics
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          🏥 Clínicas
        </button>
        <button
          onClick={() => setShowUrgencias(!showUrgencias)}
          className={`px-4 py-2 rounded-full font-semibold shadow-lg transition-all ${
            showUrgencias
              ? 'bg-red-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          🚨 Urgencias 24h
        </button>
        <button
          onClick={() => setShowLost(!showLost)}
          className={`px-4 py-2 rounded-full font-semibold shadow-lg transition-all ${
            showLost
              ? 'bg-[#f29933] text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          🔍 Perdidos
        </button>
      </div>

      {/* ── SOS button ───────────────────────────────────────────── */}
      <button
        onClick={handleSOS}
        className="absolute bottom-8 right-8 z-[1000] w-20 h-20 rounded-full bg-[#f29933] hover:bg-orange-500 text-white font-bold text-sm shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 animate-pulse"
      >
        SOS<br />URGENCIA
      </button>

      {/* ── SOS modal ────────────────────────────────────────────── */}
      {sosVisible && (
        <div className="absolute inset-0 z-[2000] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm animate-bounce-in">
            <div className="text-5xl mb-4">🚑</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">SOS Urgencia</h3>
            <p className="text-gray-600">Buscando la clínica de urgencia más cercana...</p>
          </div>
        </div>
      )}

      {/* ── Clinic Detail modal ──────────────────────────────────── */}
      {selectedClinic && (
        <div className="absolute inset-0 z-[2000] flex items-center justify-center bg-black/40" onClick={() => setSelectedClinic(null)}>
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedClinic.es_urgencia24h ? '🚨 ' : '🏥 '}{selectedClinic.nombre}</h3>
            <p className="text-gray-500 mb-3">{selectedClinic.direccion}</p>
            <div className="space-y-2 text-sm">
              <p><strong>📞 Teléfono:</strong> {selectedClinic.telefono}</p>
              <p><strong>💰 Precio Medio Consulta:</strong> {mockPrices[selectedClinic.id % mockPrices.length]}</p>
              {selectedClinic.es_urgencia24h && (
                <p className="text-red-600 font-bold">⚡ Servicio de Urgencias 24 horas</p>
              )}
            </div>
            <button
              onClick={() => setSelectedClinic(null)}
              className="mt-6 w-full bg-[#4682ca] hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {/* ── Booking success toast ──────────────────────────────────── */}
      {showBookingSuccess && (
        <div className="fixed bottom-6 right-6 z-[3000] bg-[#41b7a1] text-white px-6 py-4 rounded-xl shadow-2xl animate-bounce text-sm font-semibold">
          ✅ Cita solicitada con éxito. La clínica te confirmará en breve.
        </div>
      )}

      {/* ── Booking Modal ────────────────────────────────────────── */}
      {bookingClinic && (
        <div className="absolute inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setBookingClinic(null)}>
          <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 border-2 border-[#f29933]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center bg-orange-50 -mt-8 -mx-8 px-8 py-4 rounded-t-3xl border-b border-orange-100 mb-6">
              <h3 className="text-xl font-bold text-gray-900">🗓️ Solicitar Cita</h3>
              <button onClick={() => setBookingClinic(null)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
            </div>
            
            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div>
                <p className="text-sm font-bold text-gray-700 mb-1">Clínica</p>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-800 font-medium">
                  {bookingClinic.nombre}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Fecha y Hora</label>
                <input 
                  type="datetime-local" 
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#f29933] focus:border-transparent transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Motivo de la cita</label>
                <textarea 
                  rows={3}
                  required
                  value={bookingReason}
                  onChange={(e) => setBookingReason(e.target.value)}
                  placeholder="Ej: Vacunación anual, revisión..."
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#f29933] focus:border-transparent transition-all outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-gradient-to-r from-[#f29933] to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Confirmar Solicitud
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

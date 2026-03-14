import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { supabase } from '../lib/supabase';

// ── Custom marker icons ──────────────────────────────────────────────
const createIcon = (color: string) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const blueIcon = createIcon('blue');
const redIcon = createIcon('red');
const orangeIcon = createIcon('orange');

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
                <strong>{c.nombre}</strong>
                <br />
                {c.direccion}
                <br />
                📞 {c.telefono}
              </Popup>
            </Marker>
          ))}

        {/* Red markers – 24h emergency clinics */}
        {showUrgencias &&
          urgenciaClinics.map((c) => (
            <Marker key={`urg-${c.id}`} position={[c.latitud, c.longitud]} icon={redIcon}>
              <Popup>
                <strong>🚨 {c.nombre}</strong>
                <br />
                {c.direccion}
                <br />
                📞 {c.telefono}
                <br />
                <span className="text-red-600 font-bold">Urgencias 24h</span>
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
    </div>
  );
};

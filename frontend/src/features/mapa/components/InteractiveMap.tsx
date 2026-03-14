"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icons in Next.js
const fixLeafletIcons = () => {
  const L = require('leaflet');
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => {
    fixLeafletIcons();
    return mod.MapContainer;
  }),
  { ssr: false }
);
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

interface Clinic {
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
    is24h: boolean;
}

const MOCK_CLINICS: Clinic[] = [
    { id: 1, name: 'Clínica Veterinaria San Antón', address: 'Calle Mayor, 45, Madrid', lat: 40.4168, lng: -3.7038, is24h: true },
    { id: 2, name: 'Hospital Veterinario Sur', address: 'Av. de la Avenida, 12, Madrid', lat: 40.4000, lng: -3.6838, is24h: false },
    { id: 3, name: 'VetCare Center', address: 'Plaza de España, 3, Madrid', lat: 40.4230, lng: -3.7150, is24h: false },
];

export default function InteractiveMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">Cargando Mapa...</div>;
  }

  return (
    <div className="w-full h-full relative z-0">
        <MapContainer 
            center={[40.4168, -3.7038]} 
            zoom={13} 
            scrollWheelZoom={true} 
            style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {MOCK_CLINICS.map(clinic => (
                <Marker key={clinic.id} position={[clinic.lat, clinic.lng]}>
                    <Popup>
                        <div className="p-2">
                            <h3 className="font-bold text-sm">{clinic.name}</h3>
                            <p className="text-xs text-slate-500">{clinic.address}</p>
                            {clinic.is24h && <span className="text-[10px] bg-red-100 text-red-600 px-1 py-0.5 rounded font-bold mt-1 inline-block">Urgencias 24h</span>}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    </div>
  );
}

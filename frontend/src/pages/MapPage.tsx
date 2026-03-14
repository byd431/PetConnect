import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../api/axios';
import './MapPage.scss';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Emoji Marker
const createEmojiIcon = (emoji: string) => {
    return L.divIcon({
        html: `<div style="font-size: 2rem; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));">${emoji}</div>`,
        className: 'custom-emoji-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
    });
};


interface Clinic {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    isEmergency: boolean;
    phone: string;
    openHours: string;
}


interface Clinic {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    isEmergency: boolean;
    phone: string;
    openHours: string;
}

const MapPage = () => {
    const [clinics, setClinics] = useState<Clinic[]>([]);
    
    // Málaga coordinates
    const center: [number, number] = [36.721274, -4.421399];

    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const response = await api.get('/clinics');
                setClinics(response.data);
            } catch (error) {
                console.error('Failed to fetch clinics', error);
            }
        };
        fetchClinics();
    }, []);

    return (
        <div className="map-page">
            <h2>Veterinary Clinics Map</h2>
            <div className="map-container">
                <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {clinics.map(clinic => (
                        <Marker 
                            key={clinic.id} 
                            position={[clinic.latitude, clinic.longitude]}
                            icon={createEmojiIcon(clinic.isEmergency ? '🏥' : '🩺')}
                        >
                            <Popup>
                                <div className="clinic-popup">
                                    <h3>{clinic.name}</h3>
                                    <p><strong>Phone:</strong> {clinic.phone}</p>
                                    <p><strong>Hours:</strong> {clinic.openHours}</p>
                                    {clinic.isEmergency && <span className="badge emergency">24h Emergency</span>}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default MapPage;

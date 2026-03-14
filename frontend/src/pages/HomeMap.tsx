
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Clinic } from '../types';
import { clinicService } from '../features/clinic/clinicService';
import { useAuthStore } from '../features/auth/useAuthStore';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// Emoji Icons
const EmergencyIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="font-size: 2rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));" class="pulse">🏥</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

const ClinicIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="font-size: 2rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">🏨</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

const MyClinicIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="font-size: 2.5rem; filter: drop-shadow(0 0 10px gold);" class="pulse">⭐</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

L.Marker.prototype.options.icon = DefaultIcon;

export const HomeMap = () => {
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [filter, setFilter] = useState<'ALL' | '24H' | 'FAV'>('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [myClinicId, setMyClinicId] = useState<number | null>(null);
    const [showLinkModal, setShowLinkModal] = useState(false);

    const { user, updateUser } = useAuthStore(); 

    useEffect(() => {
        clinicService.getAll().then(setClinics).catch(console.error);
        
        // Simulating "My Clinic" from local storage or user favorites for now
        if (user?.favoriteClinics && user.favoriteClinics.length > 0) {
            setMyClinicId(user.favoriteClinics[0]);
        }
    }, [user]);

    const toggleFavorite = (clinicId: number) => {
        if (!user) return;
        const favorites = user.favoriteClinics || [];
        const newFavorites = favorites.includes(clinicId)
            ? favorites.filter(id => id !== clinicId)
            : [...favorites, clinicId];
        
        const updatedUser = { ...user, favoriteClinics: newFavorites };
        updateUser(updatedUser); 
    };

    const handleLinkClinic = (clinicId: number) => {
        setMyClinicId(clinicId);
        // Add to favorites automatically if linked
        if (user && !user.favoriteClinics?.includes(clinicId)) {
            toggleFavorite(clinicId);
        }
        setShowLinkModal(false);
        // Here we would call backend to "link" user to clinic formally
    };

    const filteredClinics = clinics.filter(c => {
        const matchesFilter = 
            filter === 'ALL' ? true :
            filter === '24H' ? c.esUrgencia24h :
            filter === 'FAV' ? user?.favoriteClinics?.includes(c.id) : true;
        
        const matchesSearch = c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              c.direccion.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const center: [number, number] = [36.7213, -4.4214]; // Málaga Center

    return (
        <div style={{ 
            height: isExpanded ? '90vh' : '60vh', 
            width: '100%', 
            position: 'relative',
            transition: 'all 0.3s ease',
            borderRadius: '24px',
            overflow: 'hidden',
             boxShadow: 'var(--shadow-md)'
        }}>
            {/* Search and Filter Bar Overlay */}
            <div style={{ 
                position: 'absolute', 
                top: '1rem', 
                left: '1rem', 
                right: '1rem',
                zIndex: 1000, 
                display: 'flex', 
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem',
                pointerEvents: 'none' // Let clicks pass through empty space
            }}>
                <div style={{ pointerEvents: 'auto', background: 'rgba(255, 255, 255, 0.95)', padding: '0.5rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', display: 'flex', gap: '0.5rem', alignItems: 'center', flex: 1, maxWidth: '400px' }}>
                     <span style={{ fontSize: '1.2rem', marginLeft: '0.5rem' }}>🔍</span>
                     <input 
                        type="text" 
                        placeholder="Buscar veterinaria..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ 
                            border: 'none', 
                            background: 'transparent', 
                            outline: 'none', 
                            width: '100%', 
                            fontSize: '1rem',
                            color: '#333'
                        }}
                     />
                </div>

                <div style={{ pointerEvents: 'auto', display: 'flex', gap: '0.5rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.95)', padding: '0.5rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => setFilter('ALL')} className={filter === 'ALL' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.4rem 1rem', borderRadius: '12px' }}>Todas</button>
                        <button onClick={() => setFilter('24H')} className={filter === '24H' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.4rem 1rem', borderRadius: '12px' }}>🚨 24h</button>
                        {user && <button onClick={() => setFilter('FAV')} className={filter === 'FAV' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.4rem 1rem', borderRadius: '12px' }}>⭐ Fav</button>}
                    </div>
                     <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        style={{ pointerEvents: 'auto', background: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', cursor: 'pointer', fontSize: '1.2rem' }}
                    >
                        {isExpanded ? '🔽' : '🔼'}
                    </button>
                </div>
            </div>

            {/* Link to Veterinary Prompt */}
            {!myClinicId && user && (
                <div style={{ 
                    position: 'absolute', 
                    bottom: '2rem', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    zIndex: 1000, 
                    background: 'rgba(70, 130, 202, 0.95)', 
                    color: 'white',
                    padding: '1rem 2rem', 
                    borderRadius: '50px', 
                    boxShadow: '0 10px 25px rgba(70, 130, 202, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    cursor: 'pointer',
                    backdropFilter: 'blur(5px)'
                }} onClick={() => setShowLinkModal(true)}>
                    <span style={{ fontSize: '1.5rem' }}>🏥</span>
                    <div>
                        <div style={{ fontWeight: 'bold' }}>¿Tienes una veterinaria de confianza?</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Vincúlala para emergencias rápidas</div>
                    </div>
                </div>
            )}

            {/* Map */}
            <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredClinics.map(clinic => (
                    <Marker 
                        key={clinic.id} 
                        position={[clinic.latitud, clinic.longitud]}
                        icon={myClinicId === clinic.id ? MyClinicIcon : (clinic.esUrgencia24h ? EmergencyIcon : ClinicIcon)}
                    >
                        <Popup>
                            <div style={{ minWidth: '220px', padding: '0.5rem' }}>
                                <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-blue)', fontSize: '1.2rem' }}>{clinic.nombre}</h3>
                                {clinic.esUrgencia24h && <div style={{background: 'var(--primary-orange)', padding: '0.3rem 0.6rem', borderRadius: '8px', color: 'white', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '0.5rem', textAlign: 'center'}}>🚨 URGENCIA 24H</div>}
                                
                                {myClinicId === clinic.id && <div style={{background: '#ffd700', padding: '0.3rem 0.6rem', borderRadius: '8px', color: '#8a6d3b', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '0.5rem', textAlign: 'center'}}>⭐ Tu Veterinaria</div>}

                                <p style={{ margin: '0.5rem 0', fontSize: '0.95rem' }}>📍 {clinic.direccion}</p>
                                <p style={{ margin: '0.5rem 0', fontSize: '0.95rem' }}>📞 <a href={`tel:${clinic.telefono}`} style={{fontWeight: 'bold', color: 'var(--text-main)', textDecoration: 'none'}}>{clinic.telefono}</a></p>
                                <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>⏰ {clinic.horario}</p>
                                
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                    {user && (
                                        <button 
                                            onClick={() => toggleFavorite(clinic.id)}
                                            style={{ 
                                                flex: 1,
                                                padding: '0.6rem', 
                                                borderRadius: '12px', 
                                                border: '1px solid var(--border-color)', 
                                                background: user.favoriteClinics?.includes(clinic.id) ? '#ffd700' : 'white',
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {user.favoriteClinics?.includes(clinic.id) ? '★ Fav' : '☆ Fav'}
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => handleLinkClinic(clinic.id)}
                                        className="btn-primary"
                                        style={{ flex: 1, padding: '0.6rem', fontSize: '0.9rem', borderRadius: '12px' }}
                                    >
                                        Vincular
                                    </button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>


            {/* Link Modal */}
            {showLinkModal && (
                 <div style={{ 
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
                    background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(5px)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '1rem'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto', padding: '2rem', borderRadius: '24px', background: 'white' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ margin: 0 }}>Vincular Veterinaria</h2>
                            <button onClick={() => setShowLinkModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Buscar por nombre..." 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #ddd', marginBottom: '1rem', background: '#f8fafc' }}
                        />
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {filteredClinics.map(clinic => (
                                <div key={clinic.id} onClick={() => handleLinkClinic(clinic.id)} style={{ 
                                    padding: '1rem', 
                                    borderRadius: '16px', 
                                    border: '2px solid transparent',
                                    background: '#f1f5f9',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = '#4682ca'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                                >
                                    <div>
                                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{clinic.nombre}</div>
                                        <div style={{ fontSize: '0.9rem', color: '#666' }}>{clinic.direccion}</div>
                                    </div>
                                    <div style={{ fontSize: '1.5rem' }}>🔗</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

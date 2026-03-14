import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../features/auth/authService';
import { clinicService } from '../features/clinic/clinicService';
import { useAuthStore } from '../features/auth/useAuthStore';
import { Clinic } from '../types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Reusing icons from HomeMap (should ideally be in a shared utils file)
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export const Register = () => {
    const navigate = useNavigate();
    const loginStore = useAuthStore((state) => state.login);
    const [step, setStep] = useState(1);
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [loading, setLoading] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        nombre: '',
        apellidos: '',
        dni: '',
        telefono: '',
        interests: [] as string[],
        favoriteClinics: [] as number[],
        // Optional Pet Data for immediate creation (handled post-register or separate endpoint?)
        // For simplicity, we will just register the user first, then redirect to add pet or handle it if backend supported composite.
        // The backend RegisterRequest doesn't support Pet details yet, so we'll skip actual pet creation here 
        // OR we'd need to chain calls. Let's chain calls if user wants to add pet.
        addPet: false
    });

    useEffect(() => {
        clinicService.getAll().then(setClinics).catch(console.error);
    }, []);

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const toggleInterest = (interest: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest) 
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const toggleClinic = (clinicId: number) => {
        setFormData(prev => ({
            ...prev,
            favoriteClinics: prev.favoriteClinics.includes(clinicId)
                ? prev.favoriteClinics.filter(id => id !== clinicId)
                : [...prev.favoriteClinics, clinicId] // Only allow one? prompt says "alguna veterinaria", maybe multiple favorites
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        setLoading(true);
        try {
            const data = await authService.register({
                email: formData.email,
                password: formData.password,
                nombre: formData.nombre,
                apellidos: formData.apellidos,
                dni: formData.dni,
                telefono: formData.telefono,
                interests: formData.interests,
                favoriteClinics: formData.favoriteClinics,
                role: 'OWNER'
            });
            
            loginStore(data);
            
            // If user wanted to add pet, we could redirect to Add Pet modal or profile
            if (formData.addPet) {
                // For now, redirect to profile where they can add it (since we didn't collect pet data in this wizard to keep it simple, or we could add step 5)
                navigate('/profile?openAddPet=true'); 
            } else {
                navigate('/map');
            }
        } catch (error) {
            console.error(error);
            alert('Error al registrar usuario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: '800px', padding: '2.5rem', borderRadius: '24px', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
                
                {/* Progress Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', position: 'relative' }}>
                    {[1, 2, 3, 4].map(s => (
                        <div key={s} style={{ 
                            width: '40px', height: '40px', borderRadius: '50%', 
                            background: step >= s ? 'var(--primary-gradient)' : '#e2e8f0',
                            color: step >= s ? 'white' : 'var(--text-secondary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',
                            zIndex: 2, transition: 'all 0.3s ease'
                        }}>
                            {s}
                        </div>
                    ))}
                    <div style={{ position: 'absolute', top: '20px', left: '0', right: '0', height: '2px', background: '#e2e8f0', zIndex: 1 }}>
                        <div style={{ width: `${((step - 1) / 3) * 100}%`, height: '100%', background: 'var(--primary-blue)', transition: 'all 0.3s ease' }}></div>
                    </div>
                </div>

                <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Crear Cuenta</h1>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    {step === 1 && 'Datos de Acceso'}
                    {step === 2 && 'Información Personal'}
                    {step === 3 && 'Tus Intereses'}
                    {step === 4 && 'Vincula tu Veterinaria'}
                </p>

                <form onSubmit={step === 4 ? handleSubmit : handleNext}>
                    
                    {/* STEP 1: LOGIN DATA */}
                    {step === 1 && (
                        <div className="slide-in">
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label>Correo Electrónico</label>
                                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="tu@email.com" />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label>Contraseña</label>
                                    <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="Mínimo 6 caracteres" />
                                </div>
                                <div>
                                    <label>Confirmar Contraseña</label>
                                    <input type="password" required value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} placeholder="Repite la contraseña" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: PERSONAL DATA */}
                    {step === 2 && (
                       <div className="slide-in">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label>Nombre</label>
                                    <input type="text" required value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
                                </div>
                                <div>
                                    <label>Apellidos</label>
                                    <input type="text" required value={formData.apellidos} onChange={e => setFormData({...formData, apellidos: e.target.value})} />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label>DNI</label>
                                    <input type="text" required value={formData.dni} onChange={e => setFormData({...formData, dni: e.target.value})} />
                                </div>
                                <div>
                                    <label>Teléfono</label>
                                    <input type="tel" required value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} />
                                </div>
                            </div>
                       </div>
                    )}

                    {/* STEP 3: INTERESTS */}
                    {step === 3 && (
                        <div className="slide-in">
                            <h3 style={{fontSize: '1.2rem', marginBottom: '1rem'}}>¿Qué buscas en PetConnect?</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                                {['ADOPCION', 'COMUNIDAD', 'VETERINARIO', 'PASEOS', 'EVENTOS'].map(interest => (
                                    <div 
                                        key={interest}
                                        onClick={() => toggleInterest(interest)}
                                        style={{
                                            padding: '1.5rem',
                                            borderRadius: '16px',
                                            border: `2px solid ${formData.interests.includes(interest) ? 'var(--primary-blue)' : '#eee'}`,
                                            background: formData.interests.includes(interest) ? '#f0f9ff' : 'white',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            color: formData.interests.includes(interest) ? 'var(--primary-blue)' : 'var(--text-secondary)',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {interest}
                                    </div>
                                ))}
                            </div>
                            
                            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                                <input 
                                    type="checkbox" 
                                    checked={formData.addPet} 
                                    onChange={e => setFormData({...formData, addPet: e.target.checked})}
                                    id="addPetCheck"
                                    style={{ width: '20px', height: '20px' }}
                                />
                                <label htmlFor="addPetCheck" style={{ cursor: 'pointer', fontSize: '1.1rem' }}>Quiero registrar una mascota ahora</label>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: VET LINKING */}
                    {step === 4 && (
                        <div className="slide-in">
                             <h3 style={{fontSize: '1.2rem', marginBottom: '1rem'}}>Selecciona tu veterinaria de confianza (Opcional)</h3>
                             <div style={{ height: '300px', borderRadius: '16px', overflow: 'hidden', marginBottom: '1rem', border: '2px solid #eee' }}>
                                <MapContainer center={[36.7213, -4.4214]} zoom={12} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    {clinics.map(clinic => (
                                        <Marker 
                                            key={clinic.id} 
                                            position={[clinic.latitud, clinic.longitud]}
                                            eventHandlers={{
                                                click: () => toggleClinic(clinic.id!)
                                            }}
                                        >
                                            <Popup>
                                                <div style={{ textAlign: 'center' }}>
                                                    <strong>{clinic.nombre}</strong><br/>
                                                    <button type="button" onClick={() => toggleClinic(clinic.id!)} style={{ 
                                                        marginTop: '0.5rem', 
                                                        background: formData.favoriteClinics.includes(clinic.id!) ? '#e53e3e' : 'var(--primary-blue)', 
                                                        color: 'white', border: 'none', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer' 
                                                    }}>
                                                        {formData.favoriteClinics.includes(clinic.id!) ? 'Desvincular' : 'Vincular'}
                                                    </button>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    ))}
                                </MapContainer>
                             </div>
                             <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Haz clic en un marcador para ver detalles y vincular.
                             </p>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                        {step > 1 ? (
                            <button type="button" onClick={handleBack} className="btn-secondary" style={{ padding: '0.8rem 2rem' }}>Atrás</button>
                        ) : (
                            <button type="button" onClick={() => navigate('/login')} className="btn-secondary" style={{ padding: '0.8rem 2rem' }}>Cancelar</button>
                        )}
                        
                        <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '0.8rem 2rem', minWidth: '140px' }}>
                            {loading ? 'Procesando...' : (step === 4 ? 'Finalizar Registro' : 'Siguiente')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

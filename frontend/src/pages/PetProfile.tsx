import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { petService } from '../features/pets/petService';
import { Pet } from '../types';

export const PetProfile = () => {
    const { id } = useParams<{ id: string }>();
    const [pet, setPet] = useState<Pet | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            petService.getPetById(Number(id))
                .then(setPet)
                .catch(() => navigate('/profile'));
        }
    }, [id, navigate]);

    const handleDownloadPdf = () => {
        alert(`Simulando descarga de PDF para: ${pet?.nombre}\nContiene todos los datos clínicos y vacunas.`);
    };

    if (!pet) return <div>Cargando...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
            <button onClick={() => navigate('/profile')} className="btn-secondary" style={{ marginBottom: '1rem' }}>&larr; Volver</button>
            
            <div className="card">
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ 
                        flex: '0 0 250px', 
                        height: '250px', 
                        backgroundColor: '#eee', 
                        borderRadius: '12px', 
                        overflow: 'hidden',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem'
                    }}>
                        {pet.fotoUrl ? <img src={pet.fotoUrl} alt={pet.nombre} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : (pet.especie === 'GATO' ? '🐱' : '🐶')}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h1 style={{ margin: 0, fontSize: '2.5rem' }}>{pet.nombre}</h1>
                            <span style={{ 
                                backgroundColor: 'var(--primary-blue)', 
                                color: 'white', 
                                padding: '0.4rem 1rem', 
                                borderRadius: '20px', 
                                fontWeight: 'bold' 
                            }}>
                                {pet.especie}
                            </span>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
                                <strong>Raza</strong>
                                <div>{pet.raza}</div>
                            </div>
                            <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
                                <strong>Chip (DNI)</strong>
                                <div style={{ fontFamily: 'monospace', fontSize: '1.2rem' }}>{pet.chip}</div>
                            </div>
                            <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
                                <strong>Sexo</strong>
                                <div>{pet.sexo}</div>
                            </div>
                            <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
                                <strong>Color</strong>
                                <div>{pet.color}</div>
                            </div>
                            <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
                                <strong>Peso</strong>
                                <div>{pet.peso} kg</div>
                            </div>
                            <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
                                <strong>Fecha Nacimiento</strong>
                                <div>{pet.fechaNacimiento}</div>
                            </div>
                        </div>

                        <div style={{ marginTop: '1.5rem' }}>
                            <strong>Observaciones Veterinarias:</strong>
                            <p style={{ marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                                {pet.observaciones || 'Sin observaciones registradas.'}
                            </p>
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                            <button onClick={handleDownloadPdf} className="btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                📄 Descargar Historial PDF
                            </button>
                            <button className="btn-secondary">Generar QR</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

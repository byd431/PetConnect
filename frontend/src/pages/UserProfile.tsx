
import { useEffect, useState } from 'react';
import { useAuthStore } from '../features/auth/useAuthStore';
import { petService } from '../features/pets/petService';
import { userService } from '../features/users/userService';
import { Pet } from '../types';
import { Link } from 'react-router-dom';

export const UserProfile = () => {
    const { user, updateUser } = useAuthStore();
    const [pets, setPets] = useState<Pet[]>([]);
    const [showAddPet, setShowAddPet] = useState(false);

    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showEditPet, setShowEditPet] = useState(false);
    const [currentPetId, setCurrentPetId] = useState<number | null>(null);

    const [editForm, setEditForm] = useState({
        nombre: '',
        telefono: '',
        dni: '',
        fotoUrl: '',
        interests: [] as string[]
    });

    const [newPet, setNewPet] = useState({ 
        nombre: '', raza: '', especie: 'PERRO' as 'PERRO' | 'GATO' | 'OTRO', 
        chip: '', peso: 0, 
        fechaNacimiento: '', sexo: 'MACHO', color: '' 
    });
    const [editPetForm, setEditPetForm] = useState({ 
        nombre: '', raza: '', especie: 'PERRO' as 'PERRO' | 'GATO' | 'OTRO', 
        chip: '', peso: 0, 
        fechaNacimiento: '', sexo: 'MACHO', color: '' 
    });


    useEffect(() => {
        loadPets();
    }, []);

    useEffect(() => {
        if (user) {
            setEditForm({
                nombre: user.nombre || '',
                telefono: user.telefono || '',
                dni: user.dni || '',
                fotoUrl: user.fotoUrl || '',
                interests: user.interests || []
            });
        }
    }, [user]);

    const loadPets = () => {
        petService.getMyPets().then(setPets).catch(console.error);
    }

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        try {
            // Optimistic update
            const updatedUser = { ...user, ...editForm };
            updateUser(updatedUser);
            setShowEditProfile(false);
            
            // Backend update (mocked service call - needs backend endpoint)
            userService.updateUser(user.id, editForm).then(serverUser => {
                updateUser(serverUser); // Update with server response
            }).catch(console.error);

        } catch (error) {
            console.error(error);
            alert('Error al actualizar perfil');
        }
    };


    const handleAddPet = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await petService.addPet(newPet);
            setShowAddPet(false);
            loadPets();
            setNewPet({ nombre: '', raza: '', especie: 'PERRO', chip: '', peso: 0, fechaNacimiento: '', sexo: 'MACHO', color: '' });
        } catch (error) {
            console.error(error);
        }
    }


    const startEditPet = (pet: Pet) => {
        console.log("Starting edit for pet:", pet);
        if (!pet.id) {
            console.error("Pet has no ID!");
            return;
        }
        setCurrentPetId(pet.id);
        setEditPetForm({
            nombre: pet.nombre || '',
            raza: pet.raza || '',
            especie: pet.especie || 'PERRO',
            chip: pet.chip || '',
            peso: pet.peso || 0,
            fechaNacimiento: pet.fechaNacimiento ? pet.fechaNacimiento.split('T')[0] : '',
            sexo: pet.sexo || 'MACHO',
            color: pet.color || ''
        });
        setShowEditPet(true);
    };

    const handleUpdatePet = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentPetId) return;
        try {
            await petService.updatePet(currentPetId, editPetForm);
            setShowEditPet(false);
            loadPets();
        } catch (error) {
            console.error(error);
            alert('Error al actualizar mascota');
        }
    };



    const calculateAge = (fechaNacimiento: string) => {
        if (!fechaNacimiento) return '';
        const today = new Date();
        const birthDate = new Date(fechaNacimiento);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age + ' años';
    };

    if (!user) return <div>Inicia sesión para ver tu perfil.</div>;


    return (
        <div style={{ maxWidth: '1000px', margin: '3rem auto', padding: '0 1.5rem' }}>
            {/* User Info Card */}
            <div className="card" style={{ 
                display: 'flex', 
                gap: '2.5rem', 
                alignItems: 'center', 
                marginBottom: '4rem', 
                flexWrap: 'wrap', 
                background: 'linear-gradient(to right, #ffffff, #f8fafc)',
            }}>
                <div style={{ 
                    width: '130px', 
                    height: '130px', 
                    borderRadius: '50%', 
                    background: 'var(--primary-gradient)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '4rem',
                    overflow: 'hidden',
                    color: 'white',
                    boxShadow: 'var(--shadow-md)',
                    border: '4px solid white',
                    flexShrink: 0
                }}>
                    {user.fotoUrl ? (
                        <img src={user.fotoUrl} alt={user.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span>{user.nombre.charAt(0).toUpperCase()}</span>
                    )}
                </div>
                
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <h1 style={{ margin: 0, fontSize: '2.5rem', background: 'linear-gradient(90deg, #2c3e50, #4682ca)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{user.nombre}</h1>
                        <button onClick={() => setShowEditProfile(true)} className="btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span>⚙</span> Configurar
                        </button>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>📧</span> {user.email}
                    </p>
                    
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '120px', background: 'white', padding: '1rem', borderRadius: '16px', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem' }}>🆔</div>
                            <div style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>{user.dni || '---'}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>DNI</div>
                        </div>
                        <div style={{ flex: 1, minWidth: '120px', background: 'white', padding: '1rem', borderRadius: '16px', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem' }}>📱</div>
                            <div style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>{user.telefono || '---'}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Teléfono</div>
                        </div>
                        <div style={{ flex: 1, minWidth: '120px', background: 'white', padding: '1rem', borderRadius: '16px', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem' }}>👤</div>
                            <div style={{ fontWeight: 'bold', marginTop: '0.5rem', color: 'var(--primary-blue)' }}>{user.roles.map(r => r.replace('ROLE_', '')).join(', ')}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Rol</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pets Grid */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                     <h2 style={{ margin: 0, fontSize: '2rem' }}>Mis Mascotas</h2>
                     <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Gestiona los perfiles de tus compañeros</p>
                </div>
                <button className="btn-primary" onClick={() => setShowAddPet(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>+</span> Añadir Mascota
                </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
                {pets.map(pet => (
                    <Link to={`/pets/${pet.id}`} key={pet.id} style={{ textDecoration: 'none' }}>
                        <div className="card" style={{ height: '100%', position: 'relative', overflow: 'hidden', padding: 0, border: 'none', transition: 'all 0.3s ease' }}>
                             <div style={{ 
                                 height: '240px', 
                                 backgroundColor: '#f1f5f9', 
                                 position: 'relative'
                             }}>
                                <img 
                                    src={pet.fotoUrl || (pet.especie === 'GATO' ? `https://placekitten.com/500/500?image=${pet.id}` : `https://placedog.net/500/500?id=${pet.id}`)} 
                                    alt={pet.nombre} 
                                    style={{width:'100%', height:'100%', objectFit:'cover'}} 
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${pet.nombre}&background=random&size=500`
                                    }}
                                />
                                <div style={{ 
                                    position: 'absolute', 
                                    top: '1rem', 
                                    right: '1rem', 
                                    background: 'rgba(255,255,255,0.9)', 
                                    padding: '0.3rem 0.8rem', 
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: 'bold',
                                    color: 'var(--text-main)',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}>
                                    {pet.especie}
                                </div>
                             </div>
                             <div style={{ padding: '1.5rem', paddingBottom: '3.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{pet.nombre}</h3>
                                    <span style={{ 
                                        padding: '0.4rem 1rem', 
                                        borderRadius: '20px', 
                                        background: '#ecf0f9', 
                                        color: 'var(--primary-blue)',
                                        fontSize: '0.85rem',
                                        fontWeight: '700',
                                        letterSpacing: '0.5px'
                                    }}>
                                        {pet.raza}
                                    </span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                    <span>{pet.sexo}</span>
                                    <span>{calculateAge(pet.fechaNacimiento)}</span>
                                </div>

                                <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        startEditPet(pet);
                                    }}
                                    className="btn-secondary"
                                    style={{
                                        position: 'absolute',
                                        bottom: '1rem',
                                        left: '1.5rem',
                                        right: '1.5rem',
                                        width: 'calc(100% - 3rem)',
                                        textAlign: 'center',
                                        padding: '0.5rem',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    ✏️ Editar
                                </button>
                             </div>
                        </div>
                    </Link>
                ))}
            
                {/* Empty State */}
                {pets.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem 2rem', color: 'var(--text-secondary)', background: 'white', borderRadius: '24px', border: '3px dashed var(--border-color)' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.5 }}>🦴</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No tienes mascotas registradas</h3>
                        <p style={{ fontSize: '1.1rem' }}>¡Añade a tu mejor amigo para empezar a gestionar su perfil!</p>
                    </div>
                )}
            </div>

            {showAddPet && (
                <div style={{ 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    background: 'rgba(0, 0, 0, 0.85)', 
                    backdropFilter: 'blur(8px)',
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    zIndex: 1000,
                    padding: '1rem',
                    animation: 'fadeIn 0.2s ease'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '3rem', borderRadius: '24px', position: 'relative', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                        <button onClick={() => setShowAddPet(false)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: 'var(--text-secondary)', lineHeight: 1 }}>✕</button>
                        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                            <h2 style={{ margin: 0, fontSize: '1.8rem' }}>Registrar Mascota</h2>
                        </div>
                        
                        <form onSubmit={handleAddPet} style={{ display: 'grid', gap: '2rem' }}>
                            <div>
                                <label>Nombre</label>
                                <input type="text" value={newPet.nombre} onChange={e => setNewPet({...newPet, nombre: e.target.value})} required style={{ width: '100%', padding: '0.5rem' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>

                                    <label>Especie</label>
                                    <select value={newPet.especie} onChange={e => setNewPet({...newPet, especie: e.target.value as 'PERRO' | 'GATO' | 'OTRO'})} style={{ width: '100%', padding: '0.5rem' }}>
                                        <option value="PERRO">Perro</option>
                                        <option value="GATO">Gato</option>
                                        <option value="OTRO">Otro</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Sexo</label>
                                    <select value={newPet.sexo} onChange={e => setNewPet({...newPet, sexo: e.target.value})} style={{ width: '100%', padding: '0.5rem' }}>
                                        <option value="MACHO">Macho</option>
                                        <option value="HEMBRA">Hembra</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label>Raza</label>
                                <input type="text" value={newPet.raza} onChange={e => setNewPet({...newPet, raza: e.target.value})} required style={{ width: '100%', padding: '0.5rem' }} />
                            </div>
                            <div>
                                <label>Chip / DNI</label>
                                <input type="text" value={newPet.chip} onChange={e => setNewPet({...newPet, chip: e.target.value})} required style={{ width: '100%', padding: '0.5rem' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label>Peso (kg)</label>
                                    <input type="number" step="0.1" value={newPet.peso} onChange={e => setNewPet({...newPet, peso: parseFloat(e.target.value)})} required style={{ width: '100%', padding: '0.5rem' }} />
                                </div>
                                <div>
                                    <label>Color</label>
                                    <input type="text" value={newPet.color} onChange={e => setNewPet({...newPet, color: e.target.value})} required style={{ width: '100%', padding: '0.5rem' }} />
                                </div>
                            </div>
                            <div>
                                <label>Fecha de Nacimiento</label>
                                <input type="date" value={newPet.fechaNacimiento} onChange={e => setNewPet({...newPet, fechaNacimiento: e.target.value})} required style={{ width: '100%', padding: '0.5rem' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>

                                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>

            )}


            {/* Edit Pet Modal */}
            {showEditPet && (
                <div style={{ 
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
                    background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem', borderRadius: '24px' }}>
                        <div style={{ display: 'flex', justifySelf: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ margin: 0, fontSize: '1.8rem' }}>Editar Mascota</h2>
                            <button onClick={() => setShowEditPet(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>✕</button>
                        </div>
                        
                        <form onSubmit={handleUpdatePet} style={{ display: 'grid', gap: '1.5rem' }}>
                            <div>
                                <label>Nombre</label>
                                <input type="text" value={editPetForm.nombre} onChange={e => setEditPetForm({...editPetForm, nombre: e.target.value})} required style={{ width: '100%', padding: '0.5rem' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>

                                    <label>Especie</label>
                                    <select value={editPetForm.especie} onChange={e => setEditPetForm({...editPetForm, especie: e.target.value as 'PERRO' | 'GATO' | 'OTRO'})} style={{ width: '100%', padding: '0.5rem' }}>
                                        <option value="PERRO">Perro</option>
                                        <option value="GATO">Gato</option>
                                        <option value="OTRO">Otro</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Sexo</label>
                                    <select value={editPetForm.sexo} onChange={e => setEditPetForm({...editPetForm, sexo: e.target.value})} style={{ width: '100%', padding: '0.5rem' }}>
                                        <option value="MACHO">Macho</option>
                                        <option value="HEMBRA">Hembra</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label>Raza</label>
                                <input type="text" value={editPetForm.raza} onChange={e => setEditPetForm({...editPetForm, raza: e.target.value})} required style={{ width: '100%', padding: '0.5rem' }} />
                            </div>
                            <div>
                                <label>Chip / DNI</label>
                                <input type="text" value={editPetForm.chip} onChange={e => setEditPetForm({...editPetForm, chip: e.target.value})} required style={{ width: '100%', padding: '0.5rem' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label>Peso (kg)</label>
                                    <input type="number" step="0.1" value={editPetForm.peso} onChange={e => setEditPetForm({...editPetForm, peso: parseFloat(e.target.value)})} required style={{ width: '100%', padding: '0.5rem' }} />
                                </div>
                                <div>
                                    <label>Color</label>
                                    <input type="text" value={editPetForm.color} onChange={e => setEditPetForm({...editPetForm, color: e.target.value})} required style={{ width: '100%', padding: '0.5rem' }} />
                                </div>
                            </div>
                            <div>
                                <label>Fecha de Nacimiento</label>
                                <input type="date" value={editPetForm.fechaNacimiento} onChange={e => setEditPetForm({...editPetForm, fechaNacimiento: e.target.value})} required style={{ width: '100%', padding: '0.5rem' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setShowEditPet(false)} className="btn-secondary" style={{ flex: 1 }}>Cancelar</button>
                                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Guardar Cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Profile Modal */}
            {showEditProfile && (
                <div style={{ 
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
                    background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem', borderRadius: '24px' }}>
                        <div style={{ display: 'flex', justifySelf: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ margin: 0, fontSize: '1.8rem' }}>Editar Perfil</h2>
                            <button onClick={() => setShowEditProfile(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>✕</button>
                        </div>
                        <form onSubmit={handleUpdateProfile} style={{ display: 'grid', gap: '1.5rem' }}>
                            <div>
                                <label>Nombre</label>
                                <input type="text" value={editForm.nombre} onChange={e => setEditForm({...editForm, nombre: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                            </div>
                            <div>
                                <label>DNI</label>
                                <input type="text" value={editForm.dni} onChange={e => setEditForm({...editForm, dni: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                            </div>
                            <div>
                                <label>Teléfono</label>
                                <input type="tel" value={editForm.telefono} onChange={e => setEditForm({...editForm, telefono: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                            </div>
                            <div>
                                <label>Foto URL</label>
                                <input type="text" value={editForm.fotoUrl} onChange={e => setEditForm({...editForm, fotoUrl: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} placeholder="https://..." />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setShowEditProfile(false)} className="btn-secondary" style={{ flex: 1 }}>Cancelar</button>
                                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Guardar Cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

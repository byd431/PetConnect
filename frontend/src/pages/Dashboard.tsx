import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import './Dashboard.scss';

interface Pet {
    id: number;
    name: string;
    breed: string;
    chip: string;
    weight: number;
    birthDate: string;
}

const Dashboard = () => {
    // const { user } = useAuthStore();
    const [pets, setPets] = useState<Pet[]>([]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await api.get('/pets');
                setPets(response.data);
            } catch (error) {
                console.error('Failed to fetch pets', error);
            }
        };
        fetchPets();
    }, []);

    const generateQR = (petId: number) => {
        const url = `${window.location.origin}/pets/${petId}`;
        alert(`QR Code Link Generated: ${url}\n\n(Simulated QR Code Display)`);
    };

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <h2>My Pets</h2>
                <Link to="/pets/new" className="btn action">+ Add Pet</Link>
            </header>

            <div className="pets-grid">
                {pets.map(pet => (
                    <div key={pet.id} className="pet-card">
                        <div className="pet-icon">🐶</div>
                        <h3>{pet.name}</h3>
                        <p><strong>Breed:</strong> {pet.breed}</p>
                        <p><strong>Chip:</strong> {pet.chip}</p>
                        <div className="pet-actions">
                            <button className="btn outline sm" onClick={() => generateQR(pet.id)}>Show QR</button>
                            <Link to={`/pets/${pet.id}`} className="btn secondary sm">Edit</Link>
                        </div>
                    </div>
                ))}
                {pets.length === 0 && (
                    <div className="empty-state">
                        <p>No pets found. Add your first pet!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

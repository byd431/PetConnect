import { useEffect, useState } from 'react';
import { useAuthStore } from '../features/auth/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const VetDashboard = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const [stats] = useState({
        pendingAppointments: 5,
        totalPets: 120,
        todayCases: 3
    });

    useEffect(() => {
        if (!user || !user.roles.includes('ROLE_VET')) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span>Hola, {user?.nombre}</span>
                    <button onClick={logout} className="btn-secondary" style={{ borderRadius: '50px', padding: '0.5rem 1.5rem' }}>Cerrar Sesión</button>
                </div>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="card" style={{ borderTop: '4px solid var(--primary-orange)' }}>
                    <h3>Citas Pendientes</h3>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{stats.pendingAppointments}</div>
                    <p style={{ color: 'var(--text-secondary)' }}>Para hoy</p>
                </div>
                <div className="card" style={{ borderTop: '4px solid var(--success-green)' }}>
                    <h3>Pacientes Totales</h3>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{stats.totalPets}</div>
                    <p style={{ color: 'var(--text-secondary)' }}>Registrados en clínica</p>
                </div>
                <div className="card" style={{ borderTop: '4px solid var(--error-red)' }}>
                    <h3>Urgencias Hoy</h3>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{stats.todayCases}</div>
                    <p style={{ color: 'var(--text-secondary)' }}>Atendidas</p>
                </div>
            </div>

            <h2 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>Próximas Citas</h2>
            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                            <th style={{ padding: '1rem' }}>Hora</th>
                            <th style={{ padding: '1rem' }}>Paciente</th>
                            <th style={{ padding: '1rem' }}>Dueño</th>
                            <th style={{ padding: '1rem' }}>Motivo</th>
                            <th style={{ padding: '1rem' }}>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { time: '09:00', pet: 'Max', owner: 'Juan Pérez', reason: 'Vacunación', status: 'Pendiente' },
                            { time: '10:30', pet: 'Luna', owner: 'Ana García', reason: 'Revisión General', status: 'Confirmada' },
                            { time: '11:15', pet: 'Toby', owner: 'Carlos Ruiz', reason: 'Urgencia', status: 'En Sala' },
                        ].map((appt, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem' }}>{appt.time}</td>
                                <td style={{ padding: '1rem' }}>{appt.pet}</td>
                                <td style={{ padding: '1rem' }}>{appt.owner}</td>
                                <td style={{ padding: '1rem' }}>{appt.reason}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ 
                                        padding: '0.25rem 0.5rem', 
                                        borderRadius: '4px', 
                                        backgroundColor: appt.status === 'Urgencia' ? '#ffebee' : '#e8f5e9',
                                        color: appt.status === 'Urgencia' ? 'var(--error-red)' : 'var(--success-green)'
                                    }}>
                                        {appt.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

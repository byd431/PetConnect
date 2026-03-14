import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/useAuthStore';
import { authService } from '../features/auth/authService';

export const Login = () => {
    const [email, setEmail] = useState('usuario@test.com');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const loginStore = useAuthStore((state) => state.login);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await authService.login(email, password);
            loginStore(data);
            if (data.roles.includes('ROLE_VET')) {
                navigate('/vet-dashboard');
            } else {
                navigate('/map');
            }
        } catch (err) {
            setError('Credenciales inválidas');
        }
    };


    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '1rem'
        }}>
            <div className="card login-card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ color: 'var(--primary-blue)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>PetConnect</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Bienvenido de nuevo</p>
                </div>

                {/* Test Credentials Hint */}
                <div style={{ background: '#e0f2fe', color: '#0369a1', padding: '0.8rem', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
                    <b>Prueba:</b> juan@example.com / password123
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', marginLeft: '0.2rem' }}>Correo Electrónico</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="hola@ejemplo.com"
                        />
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', marginLeft: '0.2rem' }}>Contraseña</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    
                    {error && (
                        <div style={{ 
                            background: '#fee2e2', 
                            color: '#e53e3e', 
                            padding: '1rem', 
                            borderRadius: '12px', 
                            marginBottom: '1.5rem',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <button type="submit" className="btn-primary" style={{ 
                        width: '100%', 
                        fontSize: '1.1rem', 
                        padding: '1rem',
                        background: 'linear-gradient(90deg, #4682ca 0%, #2faaaf 100%)',
                        boxShadow: '0 4px 15px rgba(70, 130, 202, 0.4)'
                    }}>
                        Entrar a la App
                    </button>
                    
                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', color: '#7f8c8d' }}>
                        <p style={{ marginBottom: '0.5rem' }}>¿Nuevo aquí? <a href="#" style={{ color: '#4682ca', fontWeight: 'bold' }}>Crear cuenta</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

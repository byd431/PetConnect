import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/useAuthStore';
import './Navbar.scss'; // We can keep using SCSS or move to modules, but sticking to existing pattern is safer.

export const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">
                    <h1>🐾 PetConnect</h1>
                </Link>
            </div>
            <div className="navbar-links">
                {isAuthenticated ? (
                    <>
                        <Link to="/map" className="nav-link">📍 Mapa</Link>
                        <Link to="/social" className="nav-link">📢 Tablón</Link>
                        <Link to="/profile" className="nav-link">👤 Mi Perfil</Link>
                        
                        {/* Settings Toggles (Visual) */}
                        <div style={{ display: 'flex', gap: '0.5rem', margin: '0 0.5rem' }}>
                            <button className="btn-icon" title="Cambiar Tema" style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '1.2rem'}} onClick={() => alert('Modo Oscuro: Próximamente')}>🌙</button>
                            <button className="btn-icon" title="Cambiar Idioma" style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '1.2rem'}} onClick={() => alert('Idioma: Próximamente')}>🌐</button>
                        </div>

                        {user?.roles.includes('ADMIN') && <span className="badge-admin">Admin</span>}
                        {user?.roles.includes('VET') && <span className="badge-vet">Vet</span>}
                        <button onClick={handleLogout} className="btn-secondary" style={{ borderRadius: '50px', padding: '0.5rem 1.5rem' }}>Cerrar Sesión</button>
                    </>
                ) : (
                    <Link to="/login" className="btn-primary">Iniciar Sesión</Link>
                )}
            </div>
        </nav>
    );
};

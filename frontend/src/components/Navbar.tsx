import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import './Navbar.scss';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          <span className="logo-icon">🐾</span> PetConnect
        </Link>
        <div className="nav-links">
          {user && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/map">Clinics</Link>
              <span className="user-name">Hello, {user.name}</span>
              <button onClick={handleLogout} className="btn-secondary" style={{ borderRadius: '50px', padding: '0.5rem 1.5rem' }}>Cerrar Sesión</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

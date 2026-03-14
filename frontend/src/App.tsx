import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { HomeMap } from './pages/HomeMap';
import { SocialFeed } from './pages/SocialFeed';
import { UserProfile } from './pages/UserProfile';
import { PetProfile } from './pages/PetProfile';
import { VetDashboard } from './pages/VetDashboard';
import { useAuthStore } from './features/auth/useAuthStore';
import SOSButton from './components/SOSButton';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Navbar />

            <div className="main-content">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/map" element={
                        <PrivateRoute>
                            <HomeMap />
                        </PrivateRoute>
                    } />
                    <Route path="/social" element={
                        <PrivateRoute>
                            <SocialFeed />
                        </PrivateRoute>
                    } />
                    <Route path="/profile" element={
                        <PrivateRoute>
                            <UserProfile />
                        </PrivateRoute>
                    } />
                    <Route path="/pets/:id" element={
                        <PrivateRoute>
                            <PetProfile />
                        </PrivateRoute>
                    } />
                    <Route path="/vet-dashboard" element={
                        <PrivateRoute>
                            <VetDashboard />
                        </PrivateRoute>
                    } />
                    {/* Default redirect to Map if authenticated, else Login */}
                    <Route path="*" element={<Navigate to="/map" />} />
                </Routes>
            </div>
            {/* SOS Button always visible if auth */}
            <SOSButton />
        </Router>
    );
}

export default App;

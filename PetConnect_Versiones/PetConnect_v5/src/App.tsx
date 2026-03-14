import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { MainLayout } from './components/MainLayout';
import { HomeMap } from './pages/HomeMap';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { UserProfile } from './pages/UserProfile';
import { PetProfile } from './pages/PetProfile';
import { NfcStore } from './pages/NfcStore';
import { SosScanner } from './pages/SosScanner';
import { SocialFeed } from './pages/SocialFeed';
import { ClinicDashboard } from './pages/ClinicDashboard';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <Routes>
        {/* SOS is public and has its own full-screen layout */}
        <Route path="/sos/:nfc_id" element={<SosScanner />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomeMap />} />
          <Route path="mapa" element={<HomeMap />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="pet/:id" element={<PetProfile />} />
          <Route path="store" element={<NfcStore />} />
          <Route path="social" element={<SocialFeed />} />
          <Route path="clinic-dashboard" element={<ClinicDashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<HomeMap />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { MainLayout } from './components/MainLayout';
import { HomeMap } from './pages/HomeMap';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { UserProfile } from './pages/UserProfile';
import { PetProfile } from './pages/PetProfile';
import { NfcStore } from './pages/NfcStore';
import { SosScanner } from './pages/SosScanner';
import { SocialFeed } from './pages/SocialFeed';
import { AdoptionDetail } from './pages/AdoptionDetail';
import { ContactSupport } from './pages/ContactSupport';
import { SupportDesk } from './pages/SupportDesk';
import { ClinicDashboard } from './pages/ClinicDashboard';
import { VetDashboard } from './pages/VetDashboard';
import { AdminPanel } from './pages/AdminPanel';
import { useAuthStore } from './store/useAuthStore';
import type { AppUser } from './store/useAuthStore';
import { CustomCursor } from './components/CustomCursor';

/* ── Conditional index route ──────────────────────────────── */
const IndexRoute = () => {
  const { session, initialized } = useAuthStore();
  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  return session ? <HomeMap /> : <LandingPage />;
};

/* ── Protected Route wrapper ──────────────────────────────── */
const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode; allowedRole: string }) => {
  const { session, user } = useAuthStore();
  const meta = (user as AppUser)?.user_metadata || {};
  if (!session) return <Navigate to="/login" replace />;
  if (meta.role !== allowedRole) return <Navigate to="/" replace />;
  return <>{children}</>;
};

function App() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        {/* SOS is public and has its own full-screen layout */}
        <Route path="/sos/:nfc_id" element={<SosScanner />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<IndexRoute />} />
          <Route path="mapa" element={<HomeMap />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="pet/:id" element={<PetProfile />} />
          <Route path="store" element={<NfcStore />} />
          <Route path="social" element={<SocialFeed />} />
          <Route path="adoption/:postId" element={<AdoptionDetail />} />
          <Route path="contact" element={<ContactSupport />} />
          <Route path="support" element={<SupportDesk />} />
          <Route path="clinic-dashboard" element={<ClinicDashboard />} />

          {/* Protected role-based routes */}
          <Route path="vet-panel" element={<ProtectedRoute allowedRole="VET"><VetDashboard /></ProtectedRoute>} />
          <Route path="admin-panel" element={<ProtectedRoute allowedRole="ADMIN"><AdminPanel /></ProtectedRoute>} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<IndexRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

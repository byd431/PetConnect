import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { MainLayout } from './components/MainLayout';
import { HomeMap } from './pages/HomeMap';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomeMap />} />
          <Route path="mapa" element={<HomeMap />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<HomeMap />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

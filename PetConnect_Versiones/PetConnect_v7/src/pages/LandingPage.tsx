import { Link } from 'react-router-dom';
import { Shield, Cpu, Heart, MapPin, Crown, Building2, CheckCircle, XCircle, Smartphone } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1920&q=80"
            alt="Perro feliz con su dueño"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 md:py-40 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-5xl">🐾</span>
            <h1 className="font-play text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
              PetConnect
            </h1>
          </div>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            Protege, cuida y conecta con tu mascota
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              id="btn-empezar-gratis"
              className="inline-flex items-center gap-2 bg-[#f29933] hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
            >
              <Heart size={22} /> Empezar Gratis
            </Link>
            <Link
              to="/mapa"
              id="btn-explorar-mapa"
              className="inline-flex items-center gap-2 bg-[#4682ca] hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
            >
              <MapPin size={22} /> Explorar Mapa
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ROW ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Shield size={40} />, title: 'Perfiles Completos', desc: 'Historial veterinario, vacunas y documentos de tu mascota siempre accesibles.' },
            { icon: <MapPin size={40} />, title: 'Mapa Interactivo', desc: 'Encuentra clínicas, urgencias 24h y mascotas perdidas en tu zona.' },
            { icon: <Heart size={40} />, title: 'Comunidad', desc: 'Adopciones, eventos y un tablón social para conectar con otros dueños.' },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-shadow hover:-translate-y-1 transition-transform duration-300">
              <div className="w-20 h-20 mx-auto mb-5 bg-[#ecf0f9] rounded-2xl flex items-center justify-center text-[#4682ca]">
                {f.icon}
              </div>
              <h3 className="font-play text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NFC SECTION ──────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#4682ca] to-[#2faaaf] rounded-3xl flex items-center justify-center shadow-xl">
            <Cpu size={48} className="text-white" />
          </div>
          <h2 className="font-play text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Collar Inteligente con <span className="text-[#f29933]">NFC</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
            Nuestro collar con tecnología NFC permite que cualquier persona escanee la chapa de tu mascota con su móvil. 
            Al instante, se envía una alerta con tu información de contacto para que puedas reunirte con tu compañero peludo lo antes posible.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { step: '1', icon: <Smartphone size={28} />, text: 'Alguien encuentra a tu mascota y escanea la chapa NFC' },
              { step: '2', icon: <Shield size={28} />, text: 'Se muestra tu perfil de contacto y la ficha del animal' },
              { step: '3', icon: <Heart size={28} />, text: 'Recibes la alerta y te reúnes con tu mascota' },
            ].map((s, i) => (
              <div key={i} className="bg-[#ecf0f9] rounded-2xl p-6 relative">
                <span className="absolute -top-3 -left-3 w-8 h-8 bg-[#f29933] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  {s.step}
                </span>
                <div className="text-[#4682ca] mb-3">{s.icon}</div>
                <p className="text-sm text-gray-600 font-medium">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING SECTION ──────────────────────────────────────── */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-play text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Planes y Precios</h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">Elige el plan que mejor se adapte a tus necesidades</p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Gratis */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:border-[#4682ca] transition-colors flex flex-col">
            <h3 className="font-play text-2xl font-bold text-gray-900 mb-2">Gratis</h3>
            <p className="text-gray-400 text-sm mb-6">Para empezar a cuidar de tu mascota</p>
            <div className="text-4xl font-bold text-gray-900 mb-8">0€ <span className="text-base font-normal text-gray-400">/siempre</span></div>
            <ul className="space-y-3 text-sm text-gray-600 mb-8 flex-1">
              {['Perfil de 1 mascota', 'Mapa de clínicas', 'Tablón comunidad', 'Con publicidad'].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  {i < 3 ? <CheckCircle size={16} className="text-[#41b7a1] flex-shrink-0" /> : <XCircle size={16} className="text-gray-300 flex-shrink-0" />}
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/register" className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors">
              Crear Cuenta
            </Link>
          </div>

          {/* Premium */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#f29933] relative flex flex-col ring-4 ring-[#f29933]/20">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#f29933] text-white px-5 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
              <Crown size={14} /> MÁS POPULAR
            </div>
            <h3 className="font-play text-2xl font-bold text-gray-900 mb-2">Premium</h3>
            <p className="text-gray-400 text-sm mb-6">Todo lo que necesitas, sin límites</p>
            <div className="text-4xl font-bold text-gray-900 mb-8">39,90€ <span className="text-base font-normal text-gray-400">/año</span></div>
            <ul className="space-y-3 text-sm text-gray-600 mb-8 flex-1">
              {['Mascotas ilimitadas', 'Sin publicidad', 'Collar NFC incluido', 'Vet-AI asistente 24/7', 'Exportar historial PDF', 'Insignia Premium ✨'].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#41b7a1] flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Link to="/register" className="block text-center bg-[#f29933] hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg">
              Hazte Premium
            </Link>
          </div>

          {/* Clínicas */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:border-[#2faaaf] transition-colors flex flex-col">
            <h3 className="font-play text-2xl font-bold text-gray-900 mb-2">Clínicas</h3>
            <p className="text-gray-400 text-sm mb-6">Para profesionales veterinarios</p>
            <div className="text-4xl font-bold text-gray-900 mb-8">199,90€ <span className="text-base font-normal text-gray-400">/año</span></div>
            <ul className="space-y-3 text-sm text-gray-600 mb-8 flex-1">
              {['Dashboard profesional', 'Gestión de pacientes', 'Visibilidad en el mapa', 'Alertas de urgencia', 'Soporte prioritario'].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Building2 size={16} className="text-[#2faaaf] flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Link to="/register" className="block text-center bg-[#2faaaf] hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition-colors">
              Registrar Clínica
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="bg-[#4682ca] text-white py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="font-play text-xl font-bold">PetConnect</span>
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <Link to="/mapa" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">Mapa</Link>
            <Link to="/social" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">Comunidad</Link>
            <Link to="/store" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">Tienda NFC</Link>
            <Link to="/contact" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">Contacto y Soporte</Link>
          </div>
          <p className="text-xs opacity-60">© 2026 PetConnect. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

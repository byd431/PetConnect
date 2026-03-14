import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { Shield, Heart, MapPin, Crown, Building2, CheckCircle, XCircle, PawPrint } from 'lucide-react';

/* ── 3D Background Particles ──────────────────────────────────────── */
const BackgroundParticles = (props: any) => {
  const ref = useRef<any>(null);
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 });

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#f29933"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

/* ── MAIN COMPONENT ──────────────────────────────────────────────── */
export const LandingPage = () => {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-[#0b101a] font-sans overflow-hidden">
      
      {/* ── HERO SECTION (3D Canvas & Framer Motion) ─────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 1] }}>
            <BackgroundParticles />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b101a]/50 to-[#0b101a] z-10" />
        </div>

        {/* Hero Content */}
        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="text-6xl drop-shadow-[0_0_15px_rgba(242,153,51,0.5)]">🐾</span>
            <h1 className="font-play text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-orange-400 drop-shadow-2xl selection:bg-orange-500/30">
              PetConnect
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-3xl font-light max-w-3xl mx-auto mb-12 text-gray-300"
          >
            Protección digital, salud y comunidad. <br/>
            <span className="font-semibold text-white">El ecosistema definitivo para tu mascota.</span>
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              to="/register"
              className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#f29933] to-orange-500 text-white font-bold px-10 py-5 rounded-2xl text-lg shadow-[0_0_30px_rgba(242,153,51,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(242,153,51,0.6)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Heart size={24} className="relative z-10" /> 
              <span className="relative z-10">Empezar Gratis</span>
            </Link>
            <Link
              to="/mapa"
              className="group inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold px-10 py-5 rounded-2xl text-lg transition-all hover:scale-105"
            >
              <MapPin size={24} /> Explorar Mapa
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES ROW (Scroll Reveal) ──────────────────────────── */}
      <section className="bg-white rounded-t-[3rem] relative z-30 px-6 py-24 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="font-play text-4xl font-bold text-gray-900 mb-4">Todo en un solo lugar</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Tecnología de vanguardia diseñada para la tranquilidad de los dueños y la eficiencia de las clínicas.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Shield size={40} />, title: 'Historial Encriptado', desc: 'Vacunas, citas y documentos vitales accesibles al instante y de forma segura.' },
              { icon: <MapPin size={40} />, title: 'Red de Urgencias', desc: 'Mapa interactivo en tiempo real con clínicas 24h y mascotas perdidas.' },
              { icon: <Heart size={40} />, title: 'Comunidad Activa', desc: 'Adopciones, foros y eventos. Conecta con otros amantes de los animales.' },
            ].map((f, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="w-20 h-20 mb-6 bg-gradient-to-br from-[#4682ca] to-blue-400 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  {f.icon}
                </div>
                <h3 className="font-play text-2xl font-bold text-gray-900 mb-4">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Walking Pet Silhouette (Scroll Effect) ──────────────── */}
        <motion.div
           className="absolute -bottom-8 left-0 text-[#f29933] opacity-20 select-none pointer-events-none z-0"
           initial={{ x: '-10vw' }}
           whileInView={{ x: '100vw' }}
           transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
           viewport={{ once: false }}
        >
          <div className="flex gap-4">
            <PawPrint size={48} className="transform rotate-45 -translate-y-4" />
            <PawPrint size={48} className="transform rotate-45" />
          </div>
        </motion.div>
      </section>

      {/* ── PRICING SECTION ──────────────────────────────────────── */}
      <section className="bg-gray-50 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-play text-4xl md:text-5xl font-bold text-gray-900 mb-6">Planes adaptados a ti</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Empieza gratis o desbloquea todo el potencial de PetConnect con nuestros planes Premium y Clínicas.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Gratis */}
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100"
            >
              <h3 className="font-play text-2xl font-bold text-gray-900 mb-2">Básico</h3>
              <p className="text-gray-500 mb-6">Para empezar a probar la app</p>
              <div className="text-5xl font-bold text-gray-900 mb-8">0€ <span className="text-base font-normal text-gray-400">/mes</span></div>
              <ul className="space-y-4 mb-10">
                {['Perfil de 1 mascota', 'Mapa de clínicas', 'Foro comunitario', 'Con publicidad'].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    {i < 3 ? <CheckCircle size={20} className="text-[#41b7a1]" /> : <XCircle size={20} className="text-gray-300" />}
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-xl transition-colors">
                Crear Cuenta Gratis
              </Link>
            </motion.div>

            {/* Premium */}
            <motion.div 
              initial={{ opacity: 0, y: 150 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 250, damping: 10, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#1a2332] rounded-3xl shadow-2xl p-10 relative md:-my-8 ring-4 ring-[#f29933]/50 transform md:scale-105 z-10"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#f29933] to-orange-500 text-white px-6 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                <Crown size={16} /> MÁS POPULAR
              </div>
              <h3 className="font-play text-3xl font-bold text-white mb-2">Premium</h3>
              <p className="text-gray-400 mb-6">El ecosistema completo para tu mascota</p>
              <div className="text-5xl font-bold text-white mb-8">39,90€ <span className="text-base font-normal text-gray-400">/año</span></div>
              <ul className="space-y-4 mb-10">
                {['Mascotas ilimitadas', 'Chapa NFC Inteligente incluida', 'Citas Online', 'Insignias y Nivel', 'Helpdesk Prioritario'].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle size={20} className="text-[#f29933]" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="block text-center bg-gradient-to-r from-[#f29933] to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(242,153,51,0.3)] hover:shadow-[0_0_30px_rgba(242,153,51,0.5)]">
                Hazte Premium Hoy
              </Link>
            </motion.div>

            {/* Clínicas */}
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100"
            >
              <h3 className="font-play text-2xl font-bold text-gray-900 mb-2">Clínicas B2B</h3>
              <p className="text-gray-500 mb-6">Herramientas Enterprise para centros</p>
              <div className="text-5xl font-bold text-gray-900 mb-8">199€ <span className="text-base font-normal text-gray-400">/año</span></div>
              <ul className="space-y-4 mb-10">
                {['Dashboard Veterinario', 'Gestión de Citas', 'Visibilidad GPS', 'Urgencias 24h Toggle', 'Suscripción cartillas'].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <Building2 size={20} className="text-[#2faaaf]" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="block text-center bg-[#2faaaf] hover:bg-teal-600 text-white font-bold py-4 rounded-xl transition-colors">
                Panel B2B
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

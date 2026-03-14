import { Link } from 'react-router-dom';
import { LifeBuoy, Map, MessageSquare, ShoppingBag, Twitter, Instagram, Facebook, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#1a2332] text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Social */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold font-play flex items-center gap-2 mb-4">
              <span className="text-3xl">🐾</span> PetConnect
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              El ecosistema definitivo para el cuidado digital de tu mascota. Innovación médica y social al alcance de tu mano.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#4682ca] transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#f29933] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#4682ca] transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-play font-bold text-lg mb-4 text-gray-200">Explorar</h4>
            <ul className="space-y-3">
              <li><Link to="/mapa" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors"><Map size={16} /> Mapa</Link></li>
              <li><Link to="/social" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors"><MessageSquare size={16} /> Comunidad</Link></li>
              <li><Link to="/store" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors"><ShoppingBag size={16} /> Tienda NFC</Link></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="col-span-1">
            <h4 className="font-play font-bold text-lg mb-4 text-gray-200">Soporte</h4>
            <ul className="space-y-3">
              <li><Link to="/support" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors"><LifeBuoy size={16} /> Helpdesk</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="font-play font-bold text-lg mb-4 text-gray-200">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Recibe las últimas novedades y consejos veterinarios.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="Tu email..." 
                  className="w-full bg-black/20 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#4682ca] transition-colors"
                />
              </div>
              <button className="w-full bg-[#primary] hover:bg-[#4682ca] bg-[#4682ca] text-white font-bold py-2 rounded-lg text-sm transition-colors">
                Suscribirse
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 PetConnect Enterprise by Deepmind. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <span>Hecho con</span>
            <span className="text-red-500 text-sm">❤️</span>
            <span>para las mascotas</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

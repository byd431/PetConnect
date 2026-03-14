import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { ROUTES } from '@/core/constants/routes';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
             <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 p-0.5">
                 <div className="h-full w-full rounded-full bg-white flex items-center justify-center font-bold text-blue-600 text-sm">
                    P
                 </div>
              </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 font-title">
              PetConnect
            </span>
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed">
            La plataforma integral para el cuidado de tus mascotas. Conectamos dueños y veterinarios para una vida más saludable.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-slate-800 mb-4">Enlaces Rápidos</h4>
          <ul className="flex flex-col gap-2 text-slate-600">
            <li><Link href={ROUTES.HOME} className="hover:text-blue-500 transition-colors">Inicio</Link></li>
            <li><Link href={ROUTES.TABLON} className="hover:text-blue-500 transition-colors">Tablón de Anuncios</Link></li>
            <li><Link href={ROUTES.MAPA} className="hover:text-blue-500 transition-colors">Busca Veterinarios</Link></li>
            <li><Link href={ROUTES.LOGIN} className="hover:text-blue-500 transition-colors">Acceso Profesionales</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-slate-800 mb-4">Contacto</h4>
          <ul className="flex flex-col gap-3 text-slate-600">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-blue-500" />
              <span className="text-sm">soporte@petconnect.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-blue-500" />
              <span className="text-sm">+34 900 123 456</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-500" />
              <span className="text-sm">Madrid, España</span>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-bold text-slate-800 mb-4">Síguenos</h4>
          <div className="flex gap-4">
            <a href="#" className="btn-icon hover:text-blue-600"><Facebook size={20} /></a>
            <a href="#" className="btn-icon hover:text-sky-500"><Twitter size={20} /></a>
            <a href="#" className="btn-icon hover:text-pink-600"><Instagram size={20} /></a>
          </div>
        </div>

      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-100 text-center text-slate-400 text-sm">
        © {new Date().getFullYear()} PetConnect. Todos los derechos reservados.
      </div>
    </footer>
  );
};

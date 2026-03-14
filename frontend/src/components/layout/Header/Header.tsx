"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Bell } from 'lucide-react';
import { ROUTES } from '@/core/constants/routes';
import { Button } from '@/components/ui/Button';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href={ROUTES.HOME} className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 p-0.5">
             <div className="h-full w-full rounded-full bg-white flex items-center justify-center font-bold text-blue-600">
                P
             </div>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 font-title">
            PetConnect
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href={ROUTES.HOME} className="font-semibold text-slate-600 hover:text-blue-600 transition-colors">Inicio</Link>
          <Link href={ROUTES.TABLON} className="font-semibold text-slate-600 hover:text-blue-600 transition-colors">Tablón</Link>
          <Link href={ROUTES.MAPA} className="font-semibold text-slate-600 hover:text-blue-600 transition-colors">Veterinarios</Link>
          <Link href={ROUTES.PERFIL} className="font-semibold text-slate-600 hover:text-blue-600 transition-colors">Perfil</Link>
          <Link href={ROUTES.HOME} className="font-semibold text-slate-600 hover:text-blue-600 transition-colors">Blog</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
            <button className="btn-icon">
                <Bell size={20} />
            </button>
            <Link href={ROUTES.LOGIN}>
                <Button variant="outline" size="sm">Iniciar Sesión</Button>
            </Link>
             <Link href={ROUTES.REGISTER}>
                <Button size="sm">Registrarse</Button>
            </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
           <Link href={ROUTES.HOME} className="p-3 font-semibold text-slate-600 hover:bg-slate-50 rounded-lg">Inicio</Link>
           <Link href={ROUTES.TABLON} className="p-3 font-semibold text-slate-600 hover:bg-slate-50 rounded-lg">Tablón</Link>
           <Link href={ROUTES.MAPA} className="p-3 font-semibold text-slate-600 hover:bg-slate-50 rounded-lg">Veterinarios</Link>
           <Link href={ROUTES.PERFIL} className="p-3 font-semibold text-slate-600 hover:bg-slate-50 rounded-lg">Perfil</Link>
           <div className="h-px bg-slate-100 my-2"></div>
           <Link href={ROUTES.LOGIN} className="w-full">
            <Button variant="outline" className="w-full justify-center">Iniciar Sesión</Button>
           </Link>
           <Link href={ROUTES.REGISTER} className="w-full">
            <Button className="w-full justify-center">Registrarse</Button>
           </Link>
        </div>
      )}
    </header>
  );
};

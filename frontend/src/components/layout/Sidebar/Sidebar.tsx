"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ClipboardList, Map, User, Settings, LogOut } from 'lucide-react';
import { ROUTES } from '@/core/constants/routes';
import { twMerge } from 'tailwind-merge';

export const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: ROUTES.HOME, label: 'Inicio', icon: Home },
    { href: ROUTES.TABLON, label: 'Tablón', icon: ClipboardList },
    { href: ROUTES.MAPA, label: 'Mapa', icon: Map },
    { href: ROUTES.PERFIL, label: 'Perfil', icon: User },
    { href: ROUTES.PRECIOS, label: 'Planes', icon: ClipboardList }, // Reuse icon or import new one (CreditCard/Tag)
    // { href: ROUTES.SETTINGS, label: 'Configuración', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-white border-r border-slate-200 p-6 shadow-sm">
      <div className="mb-8 flex items-center gap-3 px-2">
         <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 p-0.5">
             <div className="h-full w-full rounded-full bg-white flex items-center justify-center font-bold text-blue-600">
                P
             </div>
          </div>
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 font-title">
            PetConnect
        </span>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
                <Link 
                    key={link.href} 
                    href={link.href}
                    className={twMerge(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                        isActive 
                            ? "bg-blue-50 text-blue-600 font-bold shadow-sm" 
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                >
                    <Icon size={20} className={isActive ? "text-blue-600" : "text-slate-400"} />
                    {link.label}
                </Link>
            )
        })}
      </nav>

      <div className="pt-4 border-t border-slate-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-500 transition-colors">
            <LogOut size={20} />
            Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

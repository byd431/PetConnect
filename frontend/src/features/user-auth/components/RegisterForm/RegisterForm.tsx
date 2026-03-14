"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ROUTES } from '@/core/constants/routes';

export const RegisterForm = () => {
    const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'OWNER' | 'VET'>('OWNER');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push(ROUTES.LOGIN);
    }, 1500);
  };

  return (
    <div className="w-full max-w-lg p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Crear Cuenta</h2>
        <p className="text-slate-500">Únete a la comunidad PetConnect</p>
      </div>

      <div className="flex gap-4 mb-8 bg-slate-100 p-1 rounded-2xl">
          <button 
            type="button"
            className={`flex-1 py-2 rounded-xl font-bold transition-all ${role === 'OWNER' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setRole('OWNER')}
          >
            Dueño
          </button>
           <button 
            type="button"
            className={`flex-1 py-2 rounded-xl font-bold transition-all ${role === 'VET' ? 'bg-white shadow text-teal-600' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setRole('VET')}
          >
            Veterinario
          </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex gap-4">
             <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><User size={20} /></div>
                <Input placeholder="Nombre" className="pl-12" required />
            </div>
             <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><User size={20} /></div>
                <Input placeholder="Apellidos" className="pl-12" required />
            </div>
        </div>

        <div className="relative">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Mail size={20} /></div>
             <Input type="email" placeholder="Correo electrónico" className="pl-12" required />
        </div>
        
        <div className="relative">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Phone size={20} /></div>
             <Input type="tel" placeholder="Teléfono" className="pl-12" required />
        </div>

        {role === 'VET' && (
             <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><MapPin size={20} /></div>
                <Input placeholder="ID Clínica / Licencia" className="pl-12" required />
            </div>
        )}

        <div className="relative">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Lock size={20} /></div>
             <Input type="password" placeholder="Contraseña" className="pl-12" required />
        </div>
        <div className="relative">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Lock size={20} /></div>
             <Input type="password" placeholder="Confirmar Contraseña" className="pl-12" required />
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full text-lg shadow-blue-500/20 mt-2">
            Registrarse
        </Button>
      </form>

      <div className="mt-8 text-center text-slate-500">
        ¿Ya tienes cuenta? {' '}
        <Link href={ROUTES.LOGIN} className="text-blue-600 font-bold hover:underline">
            Inicia Sesión
        </Link>
      </div>
    </div>
  );
};

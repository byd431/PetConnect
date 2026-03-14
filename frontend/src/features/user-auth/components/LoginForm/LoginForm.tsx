"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ROUTES } from '@/core/constants/routes';

export const LoginForm = () => {
    const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push(ROUTES.PERFIL); // Redirect to profile on success
    }, 1500);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Bienvenido</h2>
        <p className="text-slate-500">Inicia sesión para continuar con PetConnect</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="relative">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Mail size={20} />
             </div>
             <Input 
                type="email" 
                placeholder="Correo electrónico" 
                className="pl-12"
                required
             />
        </div>
        
        <div className="relative">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock size={20} />
             </div>
             <Input 
                type={showPassword ? "text" : "password"} 
                placeholder="Contraseña" 
                className="pl-12 pr-12"
                required
             />
            <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>

        <div className="flex justify-end">
            <Link href="#" className="text-sm text-blue-600 hover:underline font-medium">
                ¿Olvidaste tu contraseña?
            </Link>
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full text-lg shadow-blue-500/20">
            Iniciar Sesión
        </Button>
      </form>

      <div className="mt-8 text-center text-slate-500">
        ¿No tienes cuenta? {' '}
        <Link href={ROUTES.REGISTER} className="text-blue-600 font-bold hover:underline">
            Regístrate aquí
        </Link>
      </div>
    </div>
  );
};

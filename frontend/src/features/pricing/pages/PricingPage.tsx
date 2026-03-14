"use client";
import React from 'react';
import { Check, Info } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const PricingPage = () => {
  return (
    <MainLayout>
      <div className="py-12 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Planes diseñados para ti</h1>
        <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto">
          Elige el plan que mejor se adapte a las necesidades de tu mascota. Tranquilidad total desde 0€.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
            
            {/* Free Plan */}
            <Card className="flex flex-col p-8 border hover:border-blue-200 transition-colors">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">PetConnect Free</h3>
                <div className="text-4xl font-bold text-blue-600 mb-6">0€<span className="text-sm text-slate-400 font-normal">/mes</span></div>
                <p className="text-slate-500 mb-8 border-b pb-8">Para dueños que quieren tenerlo todo organizado.</p>
                
                <ul className="space-y-4 mb-8 text-left flex-1">
                    <li className="flex items-start gap-3">
                        <Check className="text-green-500 mt-0.5" size={18} />
                        <span className="text-slate-600">Perfil de Mascota básico</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <Check className="text-green-500 mt-0.5" size={18} />
                        <span className="text-slate-600">Historial de vacunas</span>
                    </li>
                     <li className="flex items-start gap-3">
                        <Check className="text-green-500 mt-0.5" size={18} />
                        <span className="text-slate-600">Buscador de Clínicas</span>
                    </li>
                     <li className="flex items-start gap-3">
                        <Check className="text-green-500 mt-0.5" size={18} />
                        <span className="text-slate-600">Sistema SOS (Online)</span>
                    </li>
                </ul>
                <Button variant="outline" className="w-full">Comenzar Gratis</Button>
            </Card>

            {/* Premium Plan */}
            <Card className="flex flex-col p-8 border-2 border-blue-500 relative transform md:-translate-y-4 shadow-2xl shadow-blue-500/10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-b-xl text-sm font-bold shadow-md">
                    RECOMENDADO
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2 mt-4">PetConnect Premium</h3>
                <div className="text-4xl font-bold text-blue-600 mb-6">4,99€<span className="text-sm text-slate-400 font-normal">/mes</span></div>
                <p className="text-slate-500 mb-8 border-b pb-8">La máxima seguridad para tu mejor amigo.</p>
                
                <ul className="space-y-4 mb-8 text-left flex-1">
                    <li className="flex items-start gap-3">
                        <Check className="text-green-500 mt-0.5" size={18} />
                        <span className="text-slate-800 font-bold">Todo lo de Free</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <Check className="text-green-500 mt-0.5" size={18} />
                        <span className="text-slate-600">Sistema SOS <span className="font-bold text-blue-600">Offline</span></span>
                    </li>
                     <li className="flex items-start gap-3">
                        <Check className="text-green-500 mt-0.5" size={18} />
                        <span className="text-slate-600">Tecnología NFC ilimitada</span>
                    </li>
                     <li className="flex items-start gap-3">
                        <Check className="text-green-500 mt-0.5" size={18} />
                        <span className="text-slate-600">Almacenamiento de pruebas médicas</span>
                    </li>
                     <li className="flex items-start gap-3">
                        <Check className="text-green-500 mt-0.5" size={18} />
                        <span className="text-slate-600">Descuentos en clínicas asociadas</span>
                    </li>
                </ul>
                <Button className="w-full py-4 text-lg shadow-blue-500/25">Prueba 30 días gratis</Button>
            </Card>

            {/* Vet Plan */}
            <Card className="flex flex-col p-8 border hover:border-teal-200 transition-colors bg-slate-50/50">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Para Veterinarios</h3>
                <div className="text-4xl font-bold text-teal-600 mb-6">29€<span className="text-sm text-slate-400 font-normal">/mes</span></div>
                <p className="text-slate-500 mb-8 border-b pb-8">Gestiona tu clínica y conecta con nuevos clientes.</p>
                
                <ul className="space-y-4 mb-8 text-left flex-1">
                    <li className="flex items-start gap-3">
                        <Check className="text-teal-500 mt-0.5" size={18} />
                        <span className="text-slate-600">Perfil de Clínica verificado</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <Check className="text-teal-500 mt-0.5" size={18} />
                        <span className="text-slate-600">Gestión de historiales médicos</span>
                    </li>
                     <li className="flex items-start gap-3">
                        <Check className="text-teal-500 mt-0.5" size={18} />
                        <span className="text-slate-600">Escritura de etiquetas NFC</span>
                    </li>
                     <li className="flex items-start gap-3">
                        <Check className="text-teal-500 mt-0.5" size={18} />
                        <span className="text-slate-600">Visibilidad prioritaria en Mapa</span>
                    </li>
                </ul>
                <Button variant="secondary" className="w-full">Registrar Clínica</Button>
            </Card>

        </div>
        
        <div className="mt-16 bg-blue-50 p-6 rounded-2xl max-w-3xl mx-auto flex items-start gap-4">
            <Info className="text-blue-500 flex-shrink-0 mt-1" />
            <div className="text-left">
                <h4 className="font-bold text-slate-800">¿Eres una protectora?</h4>
                <p className="text-slate-600 mt-1">
                    En PetConnect apoyamos la adopción. Ofrecemos cuentas Premium gratuitas para todas las protectoras y refugios registrados.
                    <a href="#" className="text-blue-600 font-bold ml-1 hover:underline">Contáctanos.</a>
                </p>
            </div>
        </div>
      </div>
    </MainLayout>
  );
};

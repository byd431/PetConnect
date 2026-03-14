"use client";
import React from 'react';
import { Search, MapPin, Phone, Star, Clock } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(() => import('../components/InteractiveMap'), { ssr: false });

const CLINICS = [
    {
        id: 1,
        name: 'Clínica Veterinaria San Antón',
        address: 'Calle Mayor, 45, Madrid',
        rating: 4.8,
        reviews: 124,
        distance: '0.5 km',
        isOpen: true,
        is24h: true,
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 2,
        name: 'Hospital Veterinario Sur',
        address: 'Av. de la Avenida, 12, Madrid',
        rating: 4.5,
        reviews: 89,
        distance: '2.1 km',
        isOpen: true,
        is24h: false,
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'VetCare Center',
        address: 'Plaza de España, 3, Madrid',
        rating: 4.9,
        reviews: 215,
        distance: '3.4 km',
        isOpen: false,
        is24h: false,
        image: 'https://images.unsplash.com/photo-1599443015574-be5fe8a05783?q=80&w=1000&auto=format&fit=crop'
    }
];

export const MapPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row h-[calc(100vh-140px)] gap-6 max-w-[1600px] mx-auto w-full">
        {/* Sidebar List */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-4 overflow-y-auto pr-2 pb-4">
            <div className="sticky top-0 bg-[var(--bg-app)] pt-2 pb-4 z-10">
                <h1 className="text-2xl font-bold text-slate-800 mb-4">Veterinarios Cercanos</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input placeholder="Buscar clínica, especialidad..." className="pl-10" />
                </div>
            </div>

            {CLINICS.map(clinic => (
                <Card key={clinic.id} className="p-4 cursor-pointer hover:border-blue-500 transition-colors group">
                    <div className="flex gap-4">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                            <img src={clinic.image} alt={clinic.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-slate-800 leading-tight truncate pr-2">{clinic.name}</h3>
                                {clinic.is24h && <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full flex-shrink-0">24H</span>}
                            </div>
                            
                            <div className="flex items-center gap-1 text-slate-500 text-xs mt-1 truncate">
                                <MapPin size={12} className="flex-shrink-0" />
                                <span className="truncate">{clinic.address}</span>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-0.5 text-yellow-500 font-bold text-sm">
                                    <Star size={14} fill="currentColor" />
                                    {clinic.rating}
                                </div>
                                <span className="text-slate-400 text-xs">({clinic.reviews})</span>
                            </div>

                             <div className="flex justify-between items-center mt-3">
                                <span className={`text-xs font-bold ${clinic.isOpen ? 'text-green-600' : 'text-slate-400'}`}>
                                    {clinic.isOpen ? 'Abierto ahora' : 'Cerrado'}
                                </span>
                                <span className="text-xs text-slate-500 font-medium">{clinic.distance}</span>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>

        {/* Map Placeholder */}
        <div className="flex-1 rounded-3xl overflow-hidden shadow-xl relative bg-slate-200 min-h-[400px]">
             <InteractiveMap />
        </div>
      </div>
    </MainLayout>
  );
};

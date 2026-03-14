"use client";
import React from 'react';
import { User, Settings, LogOut, Plus, Edit2 } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const ProfilePage = () => {
    // Mock Data
    const user = {
        name: 'Laura Martín',
        email: 'laura.martin@email.com',
        role: 'Dueño',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
    };

    const pets = [
        { id: 1, name: 'Luna', species: 'Perro', breed: 'Border Collie', age: '3 años', weight: '18 kg', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1000&auto=format&fit=crop' },
        { id: 2, name: 'Simba', species: 'Gato', breed: 'Siamés', age: '2 años', weight: '4 kg', image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=1000&auto=format&fit=crop' },
    ];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Mi Perfil</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* User Info */}
            <Card className="col-span-1 h-fit">
                <div className="flex flex-col items-center text-center">
                    <div className="relative w-32 h-32 mb-4">
                        <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow-md">
                            <Edit2 size={16} />
                        </button>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold mt-2">{user.role}</span>
                    <p className="text-slate-500 text-sm mt-2">{user.email}</p>
                    
                    <div className="w-full mt-6 space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                            <Settings size={18} className="mr-2" />
                            Configuración
                        </Button>
                         <Button variant="ghost" className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600">
                            <LogOut size={18} className="mr-2" />
                            Cerrar Sesión
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Pets List */}
            <div className="col-span-1 md:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-slate-800">Mis Mascotas</h3>
                    <Button size="sm">
                        <Plus size={18} className="mr-1" />
                         Añadir Mascota
                    </Button>
                </div>

                {pets.map(pet => (
                    <Card key={pet.id} className="flex flex-col sm:flex-row gap-6 p-4">
                        <div className="w-full sm:w-48 aspect-video sm:aspect-square rounded-2xl overflow-hidden bg-slate-100">
                            <img src={pet.image} alt={pet.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                        {pet.name}
                                        {pet.species === 'Perro' ? '🐕' : '🐈'}
                                    </h4>
                                    <p className="text-slate-500 font-medium">{pet.breed}</p>
                                </div>
                                <Button variant="ghost" size="sm" className="p-2"><Edit2 size={18} /></Button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-400 font-bold uppercase">Edad</p>
                                    <p className="font-semibold text-slate-700">{pet.age}</p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-400 font-bold uppercase">Peso</p>
                                    <p className="font-semibold text-slate-700">{pet.weight}</p>
                                </div>
                            </div>
                            
                            <div className="mt-4 flex gap-2">
                                <Button variant="outline" size="sm" className="w-full">Cartilla</Button>
                                <Button variant="secondary" size="sm" className="w-full">QR / NFC</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </MainLayout>
  );
};

"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, Radio, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MainLayout } from '@/components/layout/MainLayout';
import { ROUTES } from '@/core/constants/routes';

export const HomePage = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-2xl py-20 px-8 mb-16">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            PetConnect: <br />
            Tu mascota, segura.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-50 font-medium">
            La plataforma definitiva que conecta dueños y veterinarios. 
            Historial médico digital, urgencias 24h y tecnología NFC.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link href={ROUTES.REGISTER} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-gradient-to-r from-white to-blue-50 text-blue-700 px-8 py-3 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all shadow-lg border border-white/50">
                Empezar Ahora
                </button>
            </Link>
            <Link href={ROUTES.MAPA} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-blue-700/30 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-3 rounded-2xl font-bold text-lg hover:bg-blue-700/50 transition-colors">
                Buscar Veterinario
                </button>
            </Link>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-20 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl"></div>
      </section>

      {/* SOS System Preview */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
                <div className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full font-bold text-sm mb-4">
                    🚨 Novedad Mundial
                </div>
                <h2 className="text-4xl font-bold text-slate-800 mb-6">Sistema SOS Inteligente</h2>
                <p className="text-lg text-slate-600 mb-8">
                    En caso de emergencia, cada segundo cuenta. Nuestro botón SOS localiza la clínica 24h más cercana y te conecta al instante, incluso sin internet.
                </p>
                <div className="flex gap-4">
                    <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <div className="bg-red-100 p-3 rounded-full text-red-600">
                            <Phone size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-800">Llamada Directa</p>
                            <p className="text-sm text-slate-500">Conexión inmediata</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-800">Geolocalización</p>
                            <p className="text-sm text-slate-500">Ruta más rápida</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex justify-center">
                 {/* Mockup SOS Button */}
                <div className="relative w-72 h-72 rounded-full bg-red-500 flex items-center justify-center shadow-red-200 shadow-2xl pulse cursor-pointer hover:scale-105 transition-transform">
                     <span className="text-white font-black text-6xl tracking-widest">SOS</span>
                     <div className="absolute inset-0 border-4 border-red-400 rounded-full animate-ping opacity-20"></div>
                </div>
            </div>
        </div>
      </section>

      {/* NFC Feature */}
      <section className="mb-20 bg-slate-900 text-white rounded-3xl p-12 overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
             <div className="flex-1">
                 {/* Mockup NFC Tag */}
                 <div className="w-full aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 flex items-center justify-center p-8 relative">
                     <div className="absolute top-4 left-4 text-slate-500 font-mono text-xs">PetConnect ID Tag</div>
                     <Radio size={80} className="text-teal-400 mb-4" />
                     <div className="text-center">
                         <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">Acerca tu móvil</p>
                         <p className="text-slate-400 mt-2">Tecnología Contactless</p>
                     </div>
                 </div>
             </div>
             <div className="flex-1">
                <h2 className="text-4xl font-bold mb-6">Identificación NFC Offline</h2>
                <p className="text-xl text-slate-300 mb-8">
                    Olvídate de los chips tradicionales que solo leen los veterinarios. Con PetConnect NFC, cualquier persona con un móvil puede identificar a tu mascota y ver datos de contacto si se pierde.
                </p>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                        <div className="bg-teal-500/20 p-2 rounded-full text-teal-400"><ArrowRight size={16} /></div>
                        <span>Funciona sin batería ni internet</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="bg-teal-500/20 p-2 rounded-full text-teal-400"><ArrowRight size={16} /></div>
                        <span>Compatible con Android y iPhone</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="bg-teal-500/20 p-2 rounded-full text-teal-400"><ArrowRight size={16} /></div>
                        <span>Actualización instantánea desde la App</span>
                    </li>
                </ul>
             </div>
          </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <Link href={ROUTES.LOGIN} className="block group">
            <Card hoverEffect={true} className="h-full border-t-4 border-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">Historial Médico en la Nube</h3>
                <p className="text-slate-600">
                    Accede a las vacunas, cirugías y tratamientos de tu mascota desde cualquier lugar. Validado por veterinarios colegiados.
                </p>
            </Card>
          </Link>

          <Link href={ROUTES.TABLON} className="block group">
            <Card hoverEffect={true} className="h-full border-t-4 border-teal-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-teal-600 transition-colors">Tablón de Comunidad</h3>
                <p className="text-slate-600">
                    Adopciones, mascotas perdidas, consejos y quedadas. Una comunidad activa para amantes de los animales.
                </p>
            </Card>
          </Link>

          <Link href={ROUTES.MAPA} className="block group">
             <Card hoverEffect={true} className="h-full border-t-4 border-purple-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-purple-600 transition-colors">Directorio de Clínicas</h3>
                <p className="text-slate-600">
                    Encuentra los mejores especialistas cerca de ti. Filtra por urgencias, especialidad y valoraciones de otros usuarios.
                </p>
            </Card>
          </Link>
      </section>
    </MainLayout>
  );
};

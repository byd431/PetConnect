"use client";
import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PostCard, PostProps } from '../components/PostCard';

const MOCK_POSTS: PostProps[] = [
  {
    id: '1',
    author: { name: 'María García', role: 'OWNER' },
    content: '¡Hola a todos! Acabo de adoptar a este pequeño y estoy buscando recomendaciones de veterinarios por la zona centro. ¿Alguna sugerencia?',
    type: 'ADOPTION',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop',
    likes: 24,
    comments: 12,
    timeAgo: 'Hace 2 horas',
    location: 'Madrid Centro'
  },
  {
    id: '2',
    author: { name: 'Clínica VetVida', role: 'VET' },
    content: 'Recordatorio importante: La temporada de procesionaria está comenzando. Tened mucho cuidado en los parques con pinos.',
    type: 'TIP',
    likes: 156,
    comments: 45,
    timeAgo: 'Hace 5 horas'
  },
   {
    id: '3',
    author: { name: 'Juan Pérez', role: 'OWNER' },
    content: 'PERDIDO: Mi perro Toby se escapó esta mañana en el Retiro. Es un Golden Retriever con collar rojo. Por favor, si lo veis contactadme.',
    type: 'LOST',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1000&auto=format&fit=crop',
    likes: 89,
    comments: 34,
    timeAgo: 'Hace 1 hora',
    location: 'El Retiro, Madrid'
  }
];

export const FeedPage = () => {
    return (
        <MainLayout>
            <div className="max-w-2xl mx-auto">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Tablón</h1>
                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Buscar..." 
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <Button size="sm" variant="secondary" className="px-3">
                            <Filter size={18} />
                        </Button>
                         <Button size="sm">
                            <Plus size={18} className="mr-1" />
                            Nuevo
                        </Button>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                    <button className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-bold whitespace-nowrap">Todo</button>
                    <button className="px-4 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-full text-sm font-bold whitespace-nowrap hover:bg-slate-50">Adopciones</button>
                    <button className="px-4 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-full text-sm font-bold whitespace-nowrap hover:bg-slate-50">Perdidos</button>
                    <button className="px-4 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-full text-sm font-bold whitespace-nowrap hover:bg-slate-50">Consejos</button>
                     <button className="px-4 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-full text-sm font-bold whitespace-nowrap hover:bg-slate-50">Eventos</button>
                </div>

                {/* Feed */}
                <div>
                    {MOCK_POSTS.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, X, Calendar, Heart, Search, MessageSquare } from 'lucide-react';

type PostType = 'Todos' | 'Eventos' | 'Adopción' | 'Perdidos';

interface Post {
  id: number;
  titulo: string;
  tipo: string;
  contenido: string;
  autor: string;
  created_at: string;
}

const typeBadgeColors: Record<string, string> = {
  Evento: 'bg-purple-100 text-purple-700',
  Adopción: 'bg-green-100 text-green-700',
  Perdido: 'bg-orange-100 text-orange-700',
  PERDIDO: 'bg-orange-100 text-orange-700',
  General: 'bg-blue-100 text-blue-700',
};

export const SocialFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<PostType>('Todos');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('General');
  const [newContent, setNewContent] = useState('');

  const filters: PostType[] = ['Todos', 'Eventos', 'Adopción', 'Perdidos'];
  const filterToDb: Record<PostType, string | null> = {
    Todos: null,
    Eventos: 'Evento',
    Adopción: 'Adopción',
    Perdidos: 'PERDIDO',
  };

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    setLoading(true);
    let query = supabase.from('posts').select('*').order('created_at', { ascending: false });

    const dbFilter = filterToDb[filter];
    if (dbFilter) {
      query = query.eq('tipo', dbFilter);
    }

    const { data, error } = await query;
    if (!error && data) setPosts(data);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) return;

    const { error } = await supabase.from('posts').insert({
      titulo: newTitle,
      tipo: newType,
      contenido: newContent,
      autor: 'Usuario Anónimo',
    });

    if (!error) {
      setShowModal(false);
      setNewTitle('');
      setNewContent('');
      fetchPosts();
    }
  };

  return (
    <div className="min-h-full bg-background p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-play font-bold text-gray-900 mb-6 flex items-center gap-2">
          <MessageSquare size={28} className="text-primary" /> Comunidad
        </h1>

        {/* ── Filter tabs ──────────────────────────────────── */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
                filter === f
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {f === 'Eventos' && '📅 '}
              {f === 'Adopción' && '❤️ '}
              {f === 'Perdidos' && '🔍 '}
              {f === 'Todos' && '📋 '}
              {f}
            </button>
          ))}
        </div>

        {/* ── Posts feed ────────────────────────────────────── */}
        {loading ? (
          <p className="text-gray-500 text-center py-10">Cargando publicaciones...</p>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <Search size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hay publicaciones en esta categoría.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{post.titulo}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${typeBadgeColors[post.tipo] || 'bg-gray-100 text-gray-600'}`}>
                    {post.tipo}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{post.contenido}</p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Por <strong className="text-gray-600">{post.autor}</strong></span>
                  <span>{new Date(post.created_at).toLocaleDateString('es-ES')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── FAB create button ──────────────────────────────── */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#4682ca] hover:bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
      >
        <Plus size={28} />
      </button>

      {/* ── Create post modal ──────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Nueva Publicación</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700"><X size={24} /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Título de la publicación..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tipo</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="General">General</option>
                  <option value="Evento">Evento</option>
                  <option value="Adopción">Adopción</option>
                  <option value="PERDIDO">Perdido</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Contenido</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Escribe tu publicación..."
                />
              </div>
              <button
                onClick={handleCreate}
                className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

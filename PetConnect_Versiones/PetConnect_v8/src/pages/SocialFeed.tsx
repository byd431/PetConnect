import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Calendar, Heart, Search, MessageSquare, Eye, Image as ImageIcon, Video, Paperclip } from 'lucide-react';

type PostType = 'Todos' | 'Eventos' | 'Adopción' | 'Perdidos';

interface Post {
  id: number;
  titulo: string;
  tipo: string;
  contenido: string;
  autor: string;
  created_at: string;
  views?: number;
  likes?: number;
  comments?: number;
  media_url?: string;
}

const typeBadgeColors: Record<string, string> = {
  Evento: 'bg-purple-100 text-purple-700',
  Adopción: 'bg-green-100 text-green-700',
  Perdido: 'bg-orange-100 text-orange-700',
  PERDIDO: 'bg-orange-100 text-orange-700',
  General: 'bg-blue-100 text-blue-700',
};

// Internal component for like logic and floating hearts
const LikeCounter = ({ initialLikes = 0 }: { initialLikes?: number }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [hearts, setHearts] = useState<{ id: number }[]>([]);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
    const newHeart = { id: Date.now() + Math.random() };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 800);
  };

  return (
    <div
      onClick={handleLike}
      className="relative flex items-center gap-1.5 text-gray-500 hover:text-red-500 transition-colors cursor-pointer group"
    >
      <Heart size={18} className="transition-colors group-hover:text-red-500" />
      <span className="font-semibold">{likes}</span>

      {hearts.map((h) => (
        <Heart
          key={h.id}
          size={20}
          className="absolute -top-4 left-0 text-red-500 fill-red-500 animate-float-heart pointer-events-none"
        />
      ))}
    </div>
  );
};

export const SocialFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<PostType>('Todos');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Form
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('General');
  const [newContent, setNewContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (!error && data) {
      // Simulate random metrics for gamification if they don't exist
      const enrichedData = data.map(post => ({
        ...post,
        views: Math.floor(Math.random() * 500) + 50,
        likes: Math.floor(Math.random() * 100) + 10,
        comments: Math.floor(Math.random() * 30) + 2,
        media_url: Math.random() > 0.7 ? 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' : null
      }));
      setPosts(enrichedData);
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) return;

    const { error } = await supabase.from('posts').insert({
      titulo: newTitle,
      tipo: newType,
      contenido: newContent,
      autor: 'Usuario Anónimo',
      // In a real app we would upload the file to Supabase Storage and save the URL here
    });

    if (!error) {
      setShowModal(false);
      setNewTitle('');
      setNewContent('');
      setSelectedFile(null);
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

                {/* Simulated Media Preview */}
                {post.media_url && (
                  <div className="mt-4 rounded-xl overflow-hidden h-48 bg-gray-100">
                    <img src={post.media_url} alt="Media" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* ── Gamification Counters ──────────────────── */}
                <div className="flex items-center gap-6 mt-5 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors cursor-pointer">
                    <Eye size={18} />
                    <span className="font-semibold">{post.views}</span>
                  </div>
                  
                  <LikeCounter initialLikes={post.likes} />

                  <div className="flex items-center gap-1.5 text-gray-500 hover:text-primary transition-colors cursor-pointer group">
                    <MessageSquare size={18} className="group-hover:fill-primary transition-colors" />
                    <span className="font-semibold">{post.comments}</span>
                  </div>
                </div>

                {/* ── Adoption CTA Button ──────────────────── */}
                {post.tipo === 'Adopción' && (
                  <button
                    onClick={() => navigate(`/adoption/${post.id}`)}
                    className="mt-4 w-full bg-[#2faaaf] hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition-all hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Heart size={18} /> Me interesa adoptar
                  </button>
                )}
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

              {/* Multimedia Upload Simulation */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Multimedia</label>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  accept="image/*,video/*"
                />
                
                {!selectedFile ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-primary transition-colors cursor-pointer"
                  >
                    <div className="flex gap-4 mb-2">
                      <ImageIcon size={28} className="text-blue-400" />
                      <Video size={28} className="text-purple-400" />
                    </div>
                    <p className="text-sm font-semibold">Pulsa para añadir imágenes o vídeo</p>
                    <p className="text-xs mt-1">Soporta JPG, PNG o MP4 cortos</p>
                  </div>
                ) : (
                  <div className="bg-[#ecf0f9] border border-blue-100 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Paperclip size={20} className="text-primary" />
                      <span className="text-sm font-bold text-gray-800 truncate max-w-[200px]">{selectedFile.name}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedFile(null)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleCreate}
                className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors mt-2"
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

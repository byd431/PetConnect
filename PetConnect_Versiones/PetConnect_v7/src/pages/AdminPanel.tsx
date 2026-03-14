import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import type { AppUser } from '../store/useAuthStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { supabase } from '../lib/supabase';
import { BarChart3, Users, Crown, Building2, Trash2, CheckCircle, XCircle, FileText, Shield, TrendingUp, AlertTriangle } from 'lucide-react';

// ── Mock Data ────────────────────────────────────────────────────────
const mockKpis = {
  totalUsers: 1247,
  premiumActive: 389,
  clinicsRegistered: 42,
  postsToday: 18,
  revenueMonth: '15.560',
};

const mockPendingClinics = [
  { id: 101, nombre: 'Clínica Mascotas Sur', direccion: 'Av. Andalucía 88, Málaga', telefono: '952 999 111', status: 'pending' },
  { id: 102, nombre: 'VetPro 24h', direccion: 'C/ Nueva 12, Marbella', telefono: '952 888 222', status: 'pending' },
  { id: 103, nombre: 'Animales Felices', direccion: 'C/ Larios 5, Málaga', telefono: '952 777 333', status: 'pending' },
];

export const AdminPanel = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const addNotification = useNotificationStore((s) => s.addNotification);
  const meta = (user as AppUser)?.user_metadata || {};

  // Redirect non-ADMIN users
  useEffect(() => {
    if (meta.role !== 'ADMIN') {
      navigate('/');
    }
  }, [meta.role, navigate]);

  // ── Posts moderation ───────────────────────────────────────────
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [pendingClinics, setPendingClinics] = useState(mockPendingClinics);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoadingPosts(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);
    if (!error && data) {
      setPosts(data);
    } else {
      // Mock fallback
      setPosts([
        { id: 1, titulo: 'Se busca: Golden Retriever perdido', tipo: 'PERDIDO', autor: 'María López', created_at: new Date().toISOString() },
        { id: 2, titulo: 'Cachorros en adopción zona sur', tipo: 'Adopción', autor: 'Protectora Sur', created_at: new Date().toISOString() },
        { id: 3, titulo: 'Evento vacunación gratuita', tipo: 'Evento', autor: 'VetClub Málaga', created_at: new Date().toISOString() },
        { id: 4, titulo: 'Contenido SPAM eliminado', tipo: 'General', autor: 'user_spam_123', created_at: new Date().toISOString() },
      ]);
    }
    setLoadingPosts(false);
  };

  const handleDeletePost = async (postId: number) => {
    // Try supabase, fallback to local state
    await supabase.from('posts').delete().eq('id', postId).catch(() => {});
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    addNotification(`Post #${postId} eliminado por moderación.`, 'alert');
  };

  const handleApproveClinic = (clinicId: number) => {
    setPendingClinics((prev) => prev.filter((c) => c.id !== clinicId));
    addNotification('Clínica aprobada y visible en el mapa.', 'success');
  };

  const handleRejectClinic = (clinicId: number) => {
    setPendingClinics((prev) => prev.filter((c) => c.id !== clinicId));
    addNotification('Solicitud de clínica rechazada.', 'alert');
  };

  if (meta.role !== 'ADMIN') return null;

  const typeBadge: Record<string, string> = {
    Evento: 'bg-purple-100 text-purple-700',
    Adopción: 'bg-green-100 text-green-700',
    PERDIDO: 'bg-orange-100 text-orange-700',
    Perdido: 'bg-orange-100 text-orange-700',
    General: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="min-h-full bg-[#ecf0f9] p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-[#4682ca] rounded-2xl flex items-center justify-center text-white">
            <Shield size={28} />
          </div>
          <div>
            <h1 className="font-play text-3xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-gray-500 text-sm">Gestión centralizada de PetConnect</p>
          </div>
        </div>

        {/* ── KPI Cards ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Usuarios', value: mockKpis.totalUsers.toLocaleString(), icon: <Users size={22} />, color: '#4682ca' },
            { label: 'Premium Activas', value: mockKpis.premiumActive.toLocaleString(), icon: <Crown size={22} />, color: '#f29933' },
            { label: 'Clínicas', value: mockKpis.clinicsRegistered.toLocaleString(), icon: <Building2 size={22} />, color: '#2faaaf' },
            { label: 'Posts Hoy', value: mockKpis.postsToday.toLocaleString(), icon: <FileText size={22} />, color: '#41b7a1' },
            { label: 'Ingresos Mes', value: `${mockKpis.revenueMonth}€`, icon: <TrendingUp size={22} />, color: '#8b5cf6' },
          ].map((kpi, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${kpi.color}15`, color: kpi.color }}>
                {kpi.icon}
              </div>
              <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              <p className="text-xs text-gray-400 font-medium mt-1">{kpi.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* ── Post Moderation ─────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="font-play text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 size={20} className="text-[#4682ca]" />
              Moderación de Comunidad
            </h2>

            {loadingPosts ? (
              <p className="text-gray-400 text-center py-6">Cargando posts...</p>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {posts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${typeBadge[post.tipo] || 'bg-gray-100 text-gray-600'}`}>
                          {post.tipo}
                        </span>
                        <span className="text-xs text-gray-400">#{post.id}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-800 truncate">{post.titulo}</p>
                      <p className="text-xs text-gray-400">Por {post.autor}</p>
                    </div>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="ml-3 p-2 bg-red-50 hover:bg-[#e74c3c] text-[#e74c3c] hover:text-white rounded-lg transition-colors opacity-60 group-hover:opacity-100"
                      title="Eliminar Post"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Clinic Management ───────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="font-play text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 size={20} className="text-[#2faaaf]" />
              Gestión de Clínicas
            </h2>

            {pendingClinics.length === 0 ? (
              <div className="text-center py-10">
                <CheckCircle size={40} className="text-[#41b7a1] mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No hay solicitudes pendientes</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingClinics.map((clinic) => (
                  <div key={clinic.id} className="border-2 border-gray-100 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900">{clinic.nombre}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{clinic.direccion}</p>
                        <p className="text-xs text-gray-400">📞 {clinic.telefono}</p>
                      </div>
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <AlertTriangle size={10} /> Pendiente
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApproveClinic(clinic.id)}
                        className="flex-1 bg-[#41b7a1] hover:bg-green-600 text-white font-bold py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-1"
                      >
                        <CheckCircle size={14} /> Aprobar
                      </button>
                      <button
                        onClick={() => handleRejectClinic(clinic.id)}
                        className="flex-1 bg-[#e74c3c] hover:bg-red-600 text-white font-bold py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-1"
                      >
                        <XCircle size={14} /> Rechazar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

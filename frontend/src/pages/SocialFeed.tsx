import { useEffect, useState } from 'react';
import { Post } from '../types';
import { socialService } from '../features/social/socialService';

export const SocialFeed = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [newPost, setNewPost] = useState({ titulo: '', contenido: '', tipo: 'DUDA' });
    const [commentInput, setCommentInput] = useState<{ [key: number]: string }>({});
    const [expandedComments, setExpandedComments] = useState<{ [key: number]: boolean }>({});
    const [filterType, setFilterType] = useState('ALL');
    const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
    const [expandedImage, setExpandedImage] = useState<string | null>(null);

    useEffect(() => {
        loadFeed();
    }, []);

    const loadFeed = () => {
        setLoading(true);
        socialService.getFeed()
            .then(data => {
                setPosts(data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const handleLike = (postId: number) => {
        setLikedPosts(prev => {
            const newLiked = new Set(prev);
            if (newLiked.has(postId)) {
                newLiked.delete(postId);
            } else {
                newLiked.add(postId);
            }
            return newLiked;
        });
    };

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPost.titulo || !newPost.contenido) return;
        try {
            await socialService.createPost(newPost);
            setShowCreate(false);
            setNewPost({ titulo: '', contenido: '', tipo: 'DUDA' });
            loadFeed();
        } catch (error) {
            console.error('Error creating post', error);
        }
    };

    const handleAddComment = async (postId: number) => {
        const content = commentInput[postId];
        if (!content) return;
        try {
            // Optimistic update to prevent scroll reset
            const newCommentObj = await socialService.addComment(postId, content);
            
            setPosts(prevPosts => prevPosts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        comments: [...(post.comments || []), newCommentObj]
                    };
                }
                return post;
            }));
            
            setCommentInput({ ...commentInput, [postId]: '' });
        } catch (error) {
            console.error('Error adding comment', error);
        }
    };

    const toggleComments = (postId: number) => {
        setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    const getPostTypeLabel = (type: string) => {
        switch (type) {
            case 'EVENTO': return '📅 Evento';
            case 'ADOPCION': return '🏡 Adopción';
            case 'PERDIDO': return '🆘 Perdido';
            case 'DUDA': return '❓ Duda';
            default: return '🐾 General';
        }
    };

    const filteredPosts = filterType === 'ALL' 
        ? posts 
        : posts.filter(post => post.tipo === filterType);


    if (loading) return (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <div className="pulse" style={{ fontSize: '2rem', marginBottom: '1rem' }}>🐾</div>
            Cargando tablón...
        </div>
    );

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Comunidad</h1>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Conecta con otros dueños de mascotas</p>
                </div>
                <button className="btn-primary" onClick={() => setShowCreate(!showCreate)} style={{ fontSize: '1.2rem', padding: '0.8rem 1.5rem' }}>
                    {showCreate ? '✖ Cancelar' : '✏ Publicar'}
                </button>
            </div>

            {/* Filter Bar */}
            <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    marginBottom: '2rem', 
                    overflowX: 'auto', 
                    paddingBottom: '1rem', // More space for shadow
                    paddingLeft: '0.5rem',
                    scrollbarWidth: 'none' 
                }}>
                {[
                    { id: 'ALL', label: 'Todo' },
                    { id: 'DUDA', label: '❓ Dudas' },
                    { id: 'EVENTO', label: '📅 Eventos' },
                    { id: 'ADOPCION', label: '🏡 Adopción' },
                    { id: 'PERDIDO', label: '🆘 Perdidos' },
                ].map(filter => (
                    <button
                        key={filter.id}
                        onClick={() => setFilterType(filter.id)}
                        style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: '20px',
                            border: 'none',
                            background: filterType === filter.id ? 'var(--primary-gradient)' : 'white',
                            color: filterType === filter.id ? 'white' : 'var(--text-secondary)',
                            fontWeight: '600',
                            boxShadow: filterType === filter.id ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>



            {showCreate && (
                <div style={{ 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    background: 'rgba(0, 0, 0, 0.8)', 
                    backdropFilter: 'blur(8px)',
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    zIndex: 1000,
                    padding: '1rem',
                    animation: 'fadeIn 0.2s ease'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem', borderRadius: '24px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                             <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Crear Publicación</h3>
                             <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>✕</button>
                        </div>
                        
                        <form onSubmit={handleCreatePost}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label>Título</label>
                                <input 
                                    type="text"
                                    value={newPost.titulo}
                                    onChange={e => setNewPost({...newPost, titulo: e.target.value})}
                                    placeholder="Escribe un título interesante..."
                                    required
                                    style={{ padding: '1rem' }}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label>Tipo de Post</label>
                                <select 
                                    value={newPost.tipo}
                                    onChange={e => setNewPost({...newPost, tipo: e.target.value})}
                                    style={{ padding: '1rem' }}
                                >
                                    <option value="DUDA">❓ Duda / Consulta</option>
                                    <option value="EVENTO">📅 Evento / Quedada</option>
                                    <option value="ADOPCION">🏡 Adopción</option>
                                    <option value="PERDIDO">🆘 Mascota Perdida</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label>Mensaje</label>
                                <textarea 
                                    value={newPost.contenido}
                                    onChange={e => setNewPost({...newPost, contenido: e.target.value})}
                                    style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', minHeight: '150px', borderRadius: '12px', border: '1px solid transparent', fontFamily: 'var(--font-main)', fontSize: '1rem' }}
                                    placeholder="¿Qué quieres compartir con la comunidad?"
                                    required
                                />
                            </div>
                            <div style={{ textAlign: 'right', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                <button type="button" onClick={() => setShowCreate(false)} className="btn-secondary">Cancelar</button>
                                <button type="submit" className="btn-primary">Publicar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {filteredPosts.map(post => {
                    const postComments = post.comments || [];
                    const isExpanded = expandedComments[post.id];
                    
                    return (
                    <div key={post.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem 1.5rem 0 1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <img 
                                    src={post.autor.fotoUrl || `https://ui-avatars.com/api/?name=${post.autor.nombre}&background=random`} 
                                    alt={post.autor.nombre}
                                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', boxShadow: 'var(--shadow-sm)' }}
                                />
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{post.autor.nombre}</h3>
                                        <span style={{ 
                                            background: '#f1f5f9',
                                            color: 'var(--text-main)', 
                                            padding: '0.3rem 0.8rem', 
                                            borderRadius: '20px', 
                                            fontSize: '0.85rem',
                                            fontWeight: 'bold',
                                        }}>
                                            {getPostTypeLabel(post.tipo)}
                                        </span>
                                    </div>
                                    <small style={{ color: 'var(--text-secondary)' }}>
                                        {new Date(post.fecha).toLocaleDateString()} a las {new Date(post.fecha).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </small>
                                </div>
                            </div>

                            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.8rem', marginTop: '1rem' }}>{post.titulo}</h2>
                            <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7', color: '#4a5568', marginBottom: '1.5rem', fontSize: '1.05rem' }}>{post.contenido}</p>

                            {/* Decorative Image */}
                            {post.contenido.length > 50 && (
                                <div style={{ margin: '0 -1.5rem 1.5rem -1.5rem', cursor: 'pointer', overflow: 'hidden' }} onClick={() => setExpandedImage(`https://picsum.photos/seed/${post.id}/1200/800`)}>
                                    <img 
                                        src={`https://picsum.photos/seed/${post.id}/800/400`} 
                                        alt="Post content" 
                                        style={{ width: '100%', height: 'auto', maxHeight: '350px', objectFit: 'cover', transition: 'transform 0.3s' }} 
                                        className="hover-zoom"
                                    />
                                </div>
                            )}
                        </div>
                        
                        <div style={{ background: '#f8fafc', padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <button 
                                    onClick={() => toggleComments(post.id)}
                                    style={{ 
                                        background: 'none', 
                                        border: 'none', 
                                        cursor: 'pointer', 
                                        color: 'var(--text-main)', // Darker text
                                        fontWeight: '700',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem'
                                    }}
                                >
                                    <span style={{ fontSize: '1.2rem' }}>💬</span> 
                                    {postComments.length} Comentarios
                                </button>
                                <button 
                                    onClick={() => handleLike(post.id)}
                                    style={{ 
                                        background: 'none', 
                                        border: 'none', 
                                        cursor: 'pointer', 
                                        fontSize: '1.5rem', 
                                        color: likedPosts.has(post.id) ? 'var(--error-red)' : 'var(--text-secondary)',
                                        transition: 'transform 0.2s'
                                    }}
                                    className={likedPosts.has(post.id) ? "pulse" : ""}
                                >
                                    {likedPosts.has(post.id) ? '❤' : '🤍'}
                                </button>
                            </div>

                            {isExpanded && (
                                <div style={{ marginTop: '1.5rem', animation: 'fadeIn 0.2s ease' }}>
                                    {postComments.map(comment => (
                                        <div key={comment.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <img 
                                                src={comment.autor.fotoUrl || `https://ui-avatars.com/api/?name=${comment.autor.nombre}&background=random`} 
                                                alt={comment.autor.nombre}
                                                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', marginTop: '2px' }}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ 
                                                    background: '#f1f5f9', 
                                                    padding: '0.8rem 1.2rem', 
                                                    borderRadius: '0 16px 16px 16px', 
                                                    display: 'inline-block',
                                                    maxWidth: '100%'
                                                }}>
                                                    <div style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.2rem', color: '#2d3748' }}>{comment.autor.nombre}</div>
                                                    <div style={{ color: '#4a5568', lineHeight: '1.5' }}>{comment.contenido}</div>
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: '#a0aec0', marginTop: '0.3rem', marginLeft: '0.5rem' }}>
                                                    {new Date(comment.fecha).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                                        <input 
                                            type="text" 
                                            placeholder="Escribe un comentario..." 
                                            value={commentInput[post.id] || ''}
                                            onChange={e => setCommentInput({...commentInput, [post.id]: e.target.value})}
                                            style={{ flex: 1, borderRadius: '24px', paddingLeft: '1.2rem' }}
                                            onKeyPress={e => e.key === 'Enter' && handleAddComment(post.id)}
                                        />
                                        <button 
                                            onClick={() => handleAddComment(post.id)}
                                            className="btn-primary"
                                            style={{ borderRadius: '50%', width: '42px', height: '42px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            ➤
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )})}
                
                {posts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                        <p>No hay publicaciones aún. ¡Sé el primero en escribir!</p>
                    </div>
                )}
            </div>
            {expandedImage && (
                <div 
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
                    onClick={() => setExpandedImage(null)}
                >
                    <img src={expandedImage} style={{ maxWidth: '95vw', maxHeight: '95vh', objectFit: 'contain', borderRadius: '8px' }} />
                </div>
            )}
        </div>
    );
};

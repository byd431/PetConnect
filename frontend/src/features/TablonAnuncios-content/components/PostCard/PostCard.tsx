import React from 'react';
import { Heart, MessageCircle, Share2, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export interface PostProps {
  id: string;
  author: {
    name: string;
    avatar?: string;
    role: 'OWNER' | 'VET' | 'SHELTER';
  };
  content: string;
  image?: string;
  type: 'ADOPTION' | 'LOST' | 'TIP' | 'EVENT';
  location?: string;
  likes: number;
  comments: number;
  timeAgo: string;
}

export const PostCard = ({ post }: { post: PostProps }) => {
  const getTypeBadge = (type: PostProps['type']) => {
    switch (type) {
      case 'ADOPTION': return <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-bold">Adopción</span>;
      case 'LOST': return <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold">Perdido</span>;
      case 'TIP': return <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">Consejo</span>;
      case 'EVENT': return <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">Evento</span>;
      default: return null;
    }
  };

  return (
    <Card className="mb-6 p-0 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold overflow-hidden">
             {post.author.avatar ? (
                <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
             ) : (
                post.author.name.charAt(0)
             )}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">{post.author.name}</h4>
            <p className="text-xs text-slate-500">{post.timeAgo}</p>
          </div>
        </div>
        {getTypeBadge(post.type)}
      </div>

      <div className="px-4 pb-4">
        <p className="text-slate-700 leading-relaxed text-sm mb-3">
            {post.content}
        </p>
        
        {post.location && (
            <div className="flex items-center gap-1 text-slate-500 text-xs mb-3">
                <MapPin size={14} />
                <span>{post.location}</span>
            </div>
        )}
      </div>

      {post.image && (
        <div className="w-full aspect-[4/3] bg-slate-100 relative overflow-hidden">
            <img 
                src={post.image} 
                alt="Post content" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
        </div>
      )}

      <div className="p-4 flex items-center justify-between border-t border-slate-50">
         <div className="flex gap-4">
            <button className="flex items-center gap-1 text-slate-500 hover:text-red-500 transition-colors">
                <Heart size={18} />
                <span className="text-xs font-medium">{post.likes}</span>
            </button>
            <button className="flex items-center gap-1 text-slate-500 hover:text-blue-500 transition-colors">
                <MessageCircle size={18} />
                <span className="text-xs font-medium">{post.comments}</span>
            </button>
         </div>
         <button className="text-slate-400 hover:text-slate-600">
             <Share2 size={18} />
         </button>
      </div>
    </Card>
  );
};

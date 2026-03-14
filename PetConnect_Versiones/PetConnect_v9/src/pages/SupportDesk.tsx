import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Send, Paperclip, Image as ImageIcon, FileText, CheckCircle2, Headset, ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotificationStore } from '../store/useNotificationStore';

interface Message {
  id: string;
  ticket_id: string;
  sender_id: string;
  sender_role: 'user' | 'support';
  message: string;
  attachment_url: string | null;
  created_at: string;
}

export const SupportDesk = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const addNotification = useNotificationStore(s => s.addNotification);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Welcome message mock
  useEffect(() => {
    const defaultWelcome: Message = {
      id: 'welcome-1',
      ticket_id: 'temp-ticket',
      sender_id: 'support-agent',
      sender_role: 'support',
      message: '¡Hola! Bienvenido al soporte técnico de PetConnect. ¿En qué podemos ayudarte hoy?',
      attachment_url: null,
      created_at: new Date().toISOString(),
    };
    setMessages([defaultWelcome]);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && !selectedFile) return;

    setIsSending(true);

    // Mock attachment URL if a file is selected (since we're simulating Storage)
    let mockUrl = null;
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        mockUrl = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=80'; // Mock image
      } else {
        mockUrl = 'mock-document.pdf';
      }
    }

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      ticket_id: 'temp-ticket',
      sender_id: user?.id || 'anonymous',
      sender_role: 'user',
      message: newMessage,
      attachment_url: mockUrl,
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setNewMessage('');
    setSelectedFile(null);
    setIsSending(false);

    // Simulate Agent Reply after 2 seconds
    setTimeout(() => {
      const agentReply: Message = {
        id: crypto.randomUUID(),
        ticket_id: 'temp-ticket',
        sender_id: 'support-agent',
        sender_role: 'support',
        message: 'Hemos recibido tu mensaje' + (mockUrl ? ` y el archivo adjunto` : '') + '. Un agente revisará tu caso en breve. El ID de tu ticket es #TCK-3498.',
        attachment_url: null,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, agentReply]);
      addNotification('Soporte ha respondido a tu ticket.', 'info');
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-full bg-gray-50 flex flex-col pt-4 pb-8 px-4" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="max-w-4xl mx-auto w-full h-full flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* ── Chat Header ─────────────────────────────────────── */}
        <div className="bg-[#2c3e50] text-white p-5 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-inner">
                  <Headset size={24} className="text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-[#2c3e50] rounded-full"></div>
              </div>
              <div>
                <h2 className="font-play font-bold text-xl leading-tight">Soporte Técnico</h2>
                <p className="text-gray-300 text-sm">Responden de inmediato</p>
              </div>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <p className="font-bold text-sm bg-white/10 px-3 py-1 rounded-full">Ticket #TCK-3498</p>
          </div>
        </div>

        {/* ── Chat Messages Area ──────────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
          <div className="text-center pb-4">
            <p className="text-xs font-bold text-gray-400 bg-gray-200 inline-block px-3 py-1 rounded-full uppercase tracking-wider">Hoy</p>
          </div>

          {messages.map((msg) => {
            const isUser = msg.sender_role === 'user';
            
            return (
              <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} group animate-slide-up`}>
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center mr-3 mt-auto shadow-sm">
                    <Headset size={16} className="text-white" />
                  </div>
                )}
                
                <div className={`max-w-[85%] sm:max-w-[70%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div 
                    className={`relative px-5 py-3.5 shadow-sm ${
                      isUser 
                        ? 'bg-[#4682ca] text-white rounded-2xl rounded-br-sm' 
                        : 'bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-sm'
                    }`}
                  >
                    {/* Attachment preview */}
                    {msg.attachment_url && (
                      <div className="mb-3 rounded-lg overflow-hidden border-2 border-white/20">
                        {msg.attachment_url.includes('unsplash') ? (
                          <img src={msg.attachment_url} alt="Attached media" className="max-w-full h-auto max-h-48 object-cover hover:scale-105 transition-transform cursor-pointer" />
                        ) : (
                          <div className="bg-gray-100 p-3 flex items-center gap-2 text-gray-700">
                            <FileText size={20} className="text-primary" />
                            <span className="text-sm font-bold truncate">Documento adjunto</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Message text */}
                    {msg.message && <p className="leading-relaxed whitespace-pre-wrap text-[15px]">{msg.message}</p>}
                    
                  </div>
                  <span className={`text-[11px] font-medium text-gray-400 mt-1 select-none flex items-center gap-1 ${isUser ? 'self-end' : 'self-start'}`}>
                    {new Date(msg.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    {isUser && <CheckCircle2 size={12} className="text-[#4682ca]" />}
                  </span>
                </div>

              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* ── Chat Input Area ─────────────────────────────────── */}
        <div className="bg-white p-4 border-t border-gray-100 shadow-lg z-10 relative">
          
          {/* Selected file preview pill */}
          {selectedFile && (
            <div className="absolute -top-14 left-4 right-4 sm:right-auto sm:w-80 bg-white border border-blue-100 shadow-xl rounded-xl p-3 flex items-center justify-between animate-slide-up">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-primary flex-shrink-0">
                  {selectedFile.type.startsWith('image/') ? <ImageIcon size={18} /> : <FileText size={18} />}
                </div>
                <div className="truncate">
                  <p className="text-sm font-bold text-gray-800 truncate">{selectedFile.name}</p>
                  <p className="text-xs text-gray-400">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button onClick={() => setSelectedFile(null)} className="text-gray-400 hover:text-red-500 transition-colors bg-gray-50 rounded-full p-1.5 flex-shrink-0">
                <X size={16} />
              </button>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex items-end gap-3 max-w-4xl mx-auto">
            
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              accept="image/*, .pdf, .doc, .docx"
            />
            
            <button 
              type="button" 
              onClick={() => fileInputRef.current?.click()}
              className={`p-3.5 rounded-2xl transition-colors flex-shrink-0 ${
                selectedFile ? 'bg-blue-50 text-[#4682ca]' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              <Paperclip size={24} className={selectedFile ? 'animate-pulse' : ''} />
            </button>

            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-3xl flex items-center focus-within:border-[#4682ca] focus-within:ring-2 focus-within:ring-blue-100 transition-all overflow-hidden">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe tu mensaje o detalla tu problema..."
                className="w-full bg-transparent px-5 py-3.5 focus:outline-none resize-none min-h-[52px] max-h-32 text-gray-700 placeholder:text-gray-400"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSending || (!newMessage.trim() && !selectedFile)}
              className="p-4 rounded-full bg-[#f29933] hover:bg-orange-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white shadow-md transition-all hover:shadow-xl active:scale-95 flex-shrink-0"
            >
              {isSending ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send size={24} className="ml-1" />
              )}
            </button>
          </form>
          <div className="text-center mt-2">
            <p className="text-[10px] text-gray-400">Nuestro equipo está activo 24/7. Puedes adjuntar capturas de pantalla si hay un error en la app.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

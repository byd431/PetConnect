import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', text: '¡Hola! Soy Vet-AI, tu asistente virtual. ¿En qué puedo ayudarte hoy con tu mascota?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', text: userText };
    
    setMessages((prev) => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI network delay and response
    setTimeout(() => {
      let botResponse = 'Entiendo. Como asistente Vet-AI, te sugiero vigilar ese comportamiento.';
      
      const lowerInput = userText.toLowerCase();
      if (lowerInput.includes('tose') || lowerInput.includes('vómito') || lowerInput.includes('sangre')) {
        botResponse = '⚠️ Eso parece grave. Te recomiendo encarecidamente visitar una clínica veterinaria lo antes posible. Puedes buscar la más cercana en nuestro Mapa de Urgencias 24h.';
      } else if (lowerInput.includes('comida') || lowerInput.includes('pienso')) {
        botResponse = 'La nutrición es clave. Asegúrate de darle alimento adecuado para su edad y raza, y siempre dispón de agua fresca.';
      }

      setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* ── Floating Button ──────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 left-8 z-[1000] w-14 h-14 bg-[#2faaaf] hover:bg-teal-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare size={28} />
      </button>

      {/* ── Chat Window ──────────────────────────────────────── */}
      <div
        className={`fixed bottom-6 left-6 z-[1000] w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 origin-bottom-left ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-[#4682ca] text-white p-4 flex items-center justify-between shadow-md relative z-10">
          <div className="flex items-center gap-2">
            <Bot size={24} />
            <h3 className="font-bold text-lg">Vet-AI Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-blue-600 p-1 rounded transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-[#f29933] text-white' : 'bg-[#2faaaf] text-white'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-[#4682ca] text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2 max-w-[85%] mr-auto">
              <div className="w-8 h-8 rounded-full bg-[#2faaaf] text-white flex items-center justify-center flex-shrink-0">
                <Bot size={16} />
              </div>
              <div className="p-4 bg-white border border-gray-100 rounded-2xl rounded-tl-none flex gap-1 items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregunta sobre tu mascota..."
            className="flex-1 px-4 py-2 bg-gray-100 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-[#4682ca] focus:bg-white transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 bg-[#4682ca] hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
};

import { useState } from 'react';
import { HelpCircle, Send, CheckCircle, LifeBuoy, AlertTriangle } from 'lucide-react';

export const ContactSupport = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message.trim()) return;

    // Show success toast
    setShowToast(true);
    setSubject('');
    setMessage('');

    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="min-h-full bg-background p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto mb-5 bg-[#4682ca]/10 rounded-2xl flex items-center justify-center">
            <LifeBuoy size={40} className="text-[#4682ca]" />
          </div>
          <h1 className="font-play text-3xl md:text-4xl font-bold text-[#4682ca] mb-3">
            ¿Necesitas ayuda o quieres reportar una estafa?
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Nuestro equipo revisará tu mensaje y te responderá lo antes posible.
          </p>
        </div>

        {/* Info cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-md flex items-start gap-3">
            <HelpCircle size={22} className="text-[#4682ca] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-gray-800 text-sm">Soporte Técnico</h4>
              <p className="text-xs text-gray-500 mt-1">Problemas con tu cuenta, la app o los collares NFC.</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-md flex items-start gap-3">
            <AlertTriangle size={22} className="text-[#f29933] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-gray-800 text-sm">Reportar Estafa</h4>
              <p className="text-xs text-gray-500 mt-1">¿Sospechas de un usuario fraudulento? Avísanos.</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Asunto</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                id="contact-subject"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4682ca] focus:border-[#4682ca] transition-all appearance-none bg-white"
              >
                <option value="">Selecciona un asunto...</option>
                <option value="Problema técnico">Problema técnico</option>
                <option value="Reportar usuario">Reportar usuario</option>
                <option value="Duda sobre compra NFC">Duda sobre compra NFC</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Mensaje</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                id="contact-message"
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4682ca] focus:border-[#4682ca] resize-none transition-all"
                placeholder="Describe tu problema o reporte con el mayor detalle posible..."
              />
            </div>

            <button
              type="submit"
              id="btn-enviar-reporte"
              className="w-full bg-[#f29933] hover:bg-orange-500 text-white font-bold py-4 rounded-xl transition-all hover:shadow-xl flex items-center justify-center gap-2 text-lg"
            >
              <Send size={20} /> Enviar Reporte
            </button>
          </div>
        </form>
      </div>

      {/* ── Success Toast ────────────────────────────────────────── */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[2000] bg-[#41b7a1] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-up">
          <CheckCircle size={24} />
          <div>
            <p className="font-bold">¡Reporte enviado con éxito!</p>
            <p className="text-sm opacity-90">Nuestro equipo lo revisará pronto.</p>
          </div>
        </div>
      )}
    </div>
  );
};

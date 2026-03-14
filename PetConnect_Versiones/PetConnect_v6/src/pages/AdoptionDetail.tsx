import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, CheckCircle2, FileText, AlertTriangle, Home, PawPrint } from 'lucide-react';

export const AdoptionDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  // ── Form state ─────────────────────────────────────────────────
  const [hasGarden, setHasGarden] = useState('');
  const [hasOtherPets, setHasOtherPets] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── Mock post data ─────────────────────────────────────────────
  const mockAnimal = {
    name: 'Luna',
    species: 'Perra mestiza',
    age: '2 años',
    description: 'Luna es una perra mestiza cariñosa y juguetona. Rescatada de la calle, busca un hogar donde recibir todo el amor que merece. Está vacunada, esterilizada y desparasitada. Se lleva bien con otros perros y niños.',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80',
    shelter: 'Protectora Patitas Felices',
  };

  // ── File handler ───────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setErrors((prev) => ({ ...prev, file: '' }));
    }
  };

  // ── Submit ─────────────────────────────────────────────────────
  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!hasGarden) newErrors.garden = 'Este campo es obligatorio';
    if (!hasOtherPets) newErrors.pets = 'Este campo es obligatorio';
    if (!fileName) newErrors.file = 'Debes adjuntar un documento';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
  };

  // ── SUCCESS / ORDER SUMMARY ────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-full bg-background flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-[#41b7a1]/10 rounded-full flex items-center justify-center">
            <CheckCircle2 size={48} className="text-[#41b7a1]" />
          </div>
          <h2 className="font-play text-3xl font-bold text-gray-900 mb-3">¡Solicitud Enviada!</h2>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Tu solicitud de adopción para <strong className="text-gray-800">{mockAnimal.name}</strong> ha sido registrada correctamente.
          </p>

          {/* Order Summary */}
          <div className="bg-[#ecf0f9] rounded-2xl p-6 mb-6 text-left space-y-3 text-sm">
            <h4 className="font-bold text-gray-800 text-base mb-2">📋 Resumen de Solicitud</h4>
            <div className="flex justify-between"><span className="text-gray-500">Animal:</span><span className="font-medium text-gray-800">{mockAnimal.name} — {mockAnimal.species}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">¿Jardín?</span><span className="font-medium text-gray-800">{hasGarden}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">¿Otras mascotas?</span><span className="font-medium text-gray-800">{hasOtherPets}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Documento:</span><span className="font-medium text-gray-800 truncate max-w-[180px]">{fileName}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Protectora:</span><span className="font-medium text-gray-800">{mockAnimal.shelter}</span></div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-700 flex items-start gap-3 text-left">
            <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
            <p>La protectora <strong>{mockAnimal.shelter}</strong> revisará tu documentación y se pondrá en contacto contigo en un plazo de <strong>48 horas</strong>.</p>
          </div>

          <Link
            to="/social"
            className="inline-flex items-center gap-2 bg-[#4682ca] hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <ArrowLeft size={18} /> Volver a Comunidad
          </Link>
        </div>
      </div>
    );
  }

  // ── ADOPTION FORM ──────────────────────────────────────────────
  return (
    <div className="min-h-full bg-background p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition-colors text-sm font-medium">
          <ArrowLeft size={18} /> Volver al tablón
        </button>

        {/* Animal Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3 h-56 md:h-auto">
              <img src={mockAnimal.image} alt={mockAnimal.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 md:flex-1">
              <div className="flex items-center gap-2 mb-2">
                <PawPrint size={24} className="text-[#f29933]" />
                <h2 className="font-play text-2xl font-bold text-gray-900">{mockAnimal.name}</h2>
              </div>
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold mb-4">{mockAnimal.species} • {mockAnimal.age}</span>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{mockAnimal.description}</p>
              <p className="text-xs text-gray-400">Publicado por <strong className="text-gray-600">{mockAnimal.shelter}</strong> • Post #{postId}</p>
            </div>
          </div>
        </div>

        {/* Legal Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex items-start gap-4">
          <AlertTriangle size={24} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800 leading-relaxed">
            <strong className="block mb-1">Aviso Legal — Proceso de Adopción</strong>
            Al enviar esta solicitud, te comprometes a proporcionar información veraz. La protectora se reserva el derecho de solicitar documentación adicional, realizar una visita previa al hogar y rechazar la solicitud si no se cumplen las condiciones mínimas de bienestar animal. La adopción es un acto de responsabilidad civil amparado por la Ley 7/2023 de Protección de los Derechos y el Bienestar de los Animales.
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="font-play text-xl font-bold text-gray-900 mb-6">Formulario de Adopción</h3>

          <div className="space-y-6">
            {/* Garden */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Home size={16} className="inline mr-1 -mt-0.5" /> ¿Tienes jardín o espacio exterior?
              </label>
              <div className="flex gap-4">
                {['Sí', 'No'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setHasGarden(opt); setErrors((p) => ({ ...p, garden: '' })); }}
                    className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${
                      hasGarden === opt
                        ? 'border-[#4682ca] bg-[#4682ca]/5 text-[#4682ca]'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {errors.garden && <p className="text-red-500 text-xs mt-1">{errors.garden}</p>}
            </div>

            {/* Other pets */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <PawPrint size={16} className="inline mr-1 -mt-0.5" /> ¿Tienes otras mascotas actualmente?
              </label>
              <div className="flex gap-4">
                {['Sí', 'No'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setHasOtherPets(opt); setErrors((p) => ({ ...p, pets: '' })); }}
                    className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${
                      hasOtherPets === opt
                        ? 'border-[#4682ca] bg-[#4682ca]/5 text-[#4682ca]'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {errors.pets && <p className="text-red-500 text-xs mt-1">{errors.pets}</p>}
            </div>

            {/* File upload */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <FileText size={16} className="inline mr-1 -mt-0.5" /> Subir nómina o justificante de ingresos (PDF)
              </label>
              <label className="flex items-center justify-center gap-3 w-full py-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#4682ca] cursor-pointer transition-colors bg-gray-50 hover:bg-[#ecf0f9]">
                <Upload size={24} className="text-gray-400" />
                <span className="text-sm text-gray-500 font-medium">
                  {fileName ? fileName : 'Haz clic para seleccionar archivo'}
                </span>
                <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" className="hidden" onChange={handleFileChange} />
              </label>
              {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              id="btn-enviar-adopcion"
              className="w-full bg-[#2faaaf] hover:bg-teal-600 text-white font-bold py-4 rounded-xl transition-all hover:shadow-xl text-lg"
            >
              Enviar Solicitud de Adopción
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

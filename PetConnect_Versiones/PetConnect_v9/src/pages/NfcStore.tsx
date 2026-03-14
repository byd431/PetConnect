import { useState, useEffect } from 'react';
import { ShoppingCart, Check, Tag, CreditCard, X, PawPrint } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';


const products = [
  {
    id: 1,
    name: 'Collar PetConnect Azul',
    color: '#4682ca',
    price: 14.99,
    description: 'Collar inteligente con chip NFC integrado. Resistente al agua y perfecto para el día a día.',
    features: ['NFC integrado', 'Resistente al agua', 'Cierre seguro'],
  },
  {
    id: 2,
    name: 'Collar PetConnect Naranja',
    color: '#f29933',
    price: 14.99,
    description: 'Collar de alta visibilidad con tecnología NFC. Ideal para paseos nocturnos.',
    features: ['NFC integrado', 'Alta visibilidad', 'Reflectante'],
  },
];

export const NfcStore = () => {
  const { user } = useAuthStore();
  const [pets, setPets] = useState<{ id: number; nombre: string }[]>([]);
  
  // Checkout Modal State
  const [checkoutProduct, setCheckoutProduct] = useState<typeof products[0] | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedPet, setSelectedPet] = useState<number | ''>('');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form State
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      const fetchId = user?.id || '22222222-2222-2222-2222-222222222222';
      const { data } = await supabase.from('pets').select('id, nombre').eq('owner_id', fetchId);
      if (data) setPets(data);
    };
    fetchPets();
  }, [user]);

  const handleOpenCheckout = (product: typeof products[0]) => {
    setCheckoutProduct(product);
    setQuantity(1);
    setSelectedPet('');
    setShowSuccess(false);
  };

  const handleCloseCheckout = () => {
    if (isProcessing) return;
    setCheckoutProduct(null);
    setShowSuccess(false);
    setCardName('');
    setCardNumber('');
    setExpiry('');
    setCvv('');
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutProduct) return;
    
    setIsProcessing(true);

    // Si seleccionó una mascota y una cantidad (ej cantidad 1), asignamos a esa mascota en BD.
    if (selectedPet) {
      const fakeUuid = crypto.randomUUID();
      await supabase.from('nfc_tags').upsert({ pet_id: selectedPet, nfc_uuid: fakeUuid, linked_at: new Date().toISOString() });
    }

    // Simulate Stripe network delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);

      setTimeout(() => {
        handleCloseCheckout();
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-full bg-background p-6 md:p-10 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-play font-bold text-gray-900 mb-3">
            <Tag size={32} className="inline text-accent mr-2" />
            Tienda de Collares NFC
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Protege a tus mascotas con nuestros collares inteligentes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative">
              <div className="h-48 bg-gray-50 flex items-center justify-center">
                <div
                  className="w-32 h-32 rounded-full shadow-inner border-4 border-white transition-transform hover:scale-110 duration-300"
                  style={{ backgroundColor: product.color, boxShadow: `0 8px 32px ${product.color}40` }}
                />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.description}</p>

                <ul className="space-y-1">
                  {product.features.map((f) => (
                    <li key={f} className="text-sm text-gray-600 flex items-center gap-2">
                      <Check size={14} className="text-success" /> {f}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-3xl font-bold text-gray-900">{product.price.toString().replace('.', ',')}€</span>
                  <button
                    onClick={() => handleOpenCheckout(product)}
                    className="bg-[#f29933] hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-md"
                  >
                    <ShoppingCart size={18} /> Comprar Collar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {checkoutProduct && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative my-8">
            
            {showSuccess ? (
              <div className="p-12 text-center animate-in zoom-in duration-300">
                <div className="w-24 h-24 bg-[#41b7a1] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(65,183,161,0.4)]">
                  <Check size={48} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Pago completado!</h2>
                <p className="text-gray-600">Procesado para {quantity} collar(es). Recibirás tu pedido pronto.</p>
              </div>
            ) : (
              <>
                <div className="bg-[#ecf0f9] p-6 border-b flex justify-between items-center sticky top-0 z-10">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <CreditCard size={24} className="text-primary" /> Checkout
                    </h2>
                  </div>
                  <button 
                    onClick={handleCloseCheckout} 
                    disabled={isProcessing}
                    className="p-2 text-gray-400 hover:text-gray-800 hover:bg-white rounded-full transition-colors disabled:opacity-50"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 border-b bg-gray-50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: checkoutProduct.color }} />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{checkoutProduct.name}</h4>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Cantidad</label>
                      <select 
                        value={quantity} onChange={e => setQuantity(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 outline-none"
                      >
                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1"><PawPrint size={14} className="inline"/> Asignar a</label>
                      <select 
                        value={selectedPet} onChange={e => setSelectedPet(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 outline-none"
                      >
                        <option value="">Sin asignar (Regalo)</option>
                        {pets.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <span className="font-bold text-gray-600">Total:</span>
                    <span className="font-bold text-2xl text-gray-900">{(checkoutProduct.price * quantity).toFixed(2).replace('.', ',')}€</span>
                  </div>
                </div>

                <form onSubmit={handlePay} className="p-6 space-y-4">
                  <div>
                    <input type="text" required placeholder="Nombre en tarjeta" value={cardName} onChange={e => setCardName(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none" />
                  </div>
                  <div className="relative">
                    <input type="text" required placeholder="0000 0000 0000 0000" maxLength={19} value={cardNumber} onChange={e => setCardNumber(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg outline-none font-mono" />
                    <CreditCard size={18} className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                  <div className="flex gap-4">
                    <input type="text" required placeholder="MM/AA" maxLength={5} value={expiry} onChange={e => setExpiry(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none font-mono" />
                    <input type="text" required placeholder="CVC" maxLength={4} value={cvv} onChange={e => setCvv(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none font-mono" />
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-4 bg-[#f29933] hover:bg-orange-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-80 active:scale-[0.98]"
                  >
                    {isProcessing ? 'Procesando...' : `Pagar ${(checkoutProduct.price * quantity).toFixed(2).replace('.', ',')}€`}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

import { useState } from 'react';
import { ShoppingCart, Check, Tag, CreditCard, X, ShieldCheck } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Collar PetConnect Azul',
    color: '#4682ca',
    price: '14,99',
    description: 'Collar inteligente con chip NFC integrado. Resistente al agua y perfecto para el día a día.',
    features: ['NFC integrado', 'Resistente al agua', 'Cierre seguro'],
  },
  {
    id: 2,
    name: 'Collar PetConnect Naranja',
    color: '#f29933',
    price: '14,99',
    description: 'Collar de alta visibilidad con tecnología NFC. Ideal para paseos nocturnos.',
    features: ['NFC integrado', 'Alta visibilidad', 'Reflectante'],
  },
];

export const NfcStore = () => {
  const [purchased, setPurchased] = useState<number | null>(null);
  
  // Checkout Modal State
  const [checkoutProduct, setCheckoutProduct] = useState<typeof products[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form State
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleOpenCheckout = (product: typeof products[0]) => {
    setCheckoutProduct(product);
    setShowSuccess(false);
  };

  const handleCloseCheckout = () => {
    if (isProcessing) return;
    setCheckoutProduct(null);
    setShowSuccess(false);
    // Reset Form
    setCardName('');
    setCardNumber('');
    setExpiry('');
    setCvv('');
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutProduct) return;
    
    setIsProcessing(true);

    // Simulate Stripe network delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setPurchased(checkoutProduct.id);

      // Auto-close after 3 seconds of showing success
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
            Protege a tu mascota con nuestros collares inteligentes. Un simple escaneo puede reunir a una mascota perdida con su dueño.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative">
              {/* Added linked badge if already bought */}
              {purchased === product.id && (
                <div className="absolute top-4 right-4 bg-[#41b7a1] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 z-10 shadow-md">
                  <Check size={14} /> ADQUIRIDO
                </div>
              )}
              
              {/* Color circle display */}
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
                  <span className="text-3xl font-bold text-gray-900">{product.price}€</span>
                  <button
                    onClick={() => handleOpenCheckout(product)}
                    disabled={purchased === product.id}
                    className="bg-[#f29933] hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  >
                    <ShoppingCart size={18} />
                    {purchased === product.id ? 'Comprado' : 'Comprar Collar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Checkout Modal (Stripe Simulation) ────────────────── */}
      {checkoutProduct && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative">
            
            {showSuccess ? (
              // ── SUCCESS VIEW ──
              <div className="p-12 text-center animate-in zoom-in duration-300">
                <div className="w-24 h-24 bg-[#41b7a1] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(65,183,161,0.4)]">
                  <Check size={48} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Pago completado!</h2>
                <p className="text-gray-600">Hemos vinculado tu pedido a tu cuenta. Recibirás tu {checkoutProduct.name} pronto.</p>
              </div>
            ) : (
              // ── CHECKOUT FORM VIEW ──
              <>
                {/* Header */}
                <div className="bg-[#ecf0f9] p-6 border-b flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <CreditCard size={24} className="text-primary" /> Checkout
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Simulación segura (No real)</p>
                  </div>
                  <button 
                    onClick={handleCloseCheckout} 
                    disabled={isProcessing}
                    className="p-2 text-gray-400 hover:text-gray-800 hover:bg-white rounded-full transition-colors disabled:opacity-50"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Summary */}
                <div className="p-6 border-b bg-gray-50 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: checkoutProduct.color }} />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{checkoutProduct.name}</h4>
                    <span className="text-gray-500 text-sm">Hardware físico NFC</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg text-gray-900">{checkoutProduct.price}€</span>
                  </div>
                </div>

                {/* Payment Form */}
                <form onSubmit={handlePay} className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Titular de la tarjeta</label>
                    <input 
                      type="text" required 
                      placeholder="Nombre Apellido"
                      value={cardName} onChange={e => setCardName(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Número de tarjeta</label>
                    <div className="relative">
                      <input 
                        type="text" required 
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        value={cardNumber} onChange={e => setCardNumber(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-mono" 
                      />
                      <CreditCard size={18} className="absolute left-3 top-3.5 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Caducidad</label>
                      <input 
                        type="text" required 
                        placeholder="MM/AA"
                        maxLength={5}
                        value={expiry} onChange={e => setExpiry(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-mono" 
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">CVC</label>
                      <input 
                        type="text" required 
                        placeholder="123"
                        maxLength={4}
                        value={cvv} onChange={e => setCvv(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-mono" 
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-4 bg-[#f29933] hover:bg-orange-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-80 active:scale-[0.98]"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando pago...
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={20} />
                        Pagar {checkoutProduct.price}€ de forma segura
                      </>
                    )}
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

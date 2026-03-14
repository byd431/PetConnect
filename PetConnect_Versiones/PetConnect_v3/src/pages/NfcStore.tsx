import { useState } from 'react';
import { ShoppingCart, Check, Tag } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Collar PetConnect Azul',
    color: '#4682ca',
    price: '14,99€',
    description: 'Collar inteligente con chip NFC integrado. Resistente al agua y perfecto para el día a día.',
    features: ['NFC integrado', 'Resistente al agua', 'Cierre seguro'],
  },
  {
    id: 2,
    name: 'Collar PetConnect Naranja',
    color: '#f29933',
    price: '14,99€',
    description: 'Collar de alta visibilidad con tecnología NFC. Ideal para paseos nocturnos.',
    features: ['NFC integrado', 'Alta visibilidad', 'Reflectante'],
  },
];

export const NfcStore = () => {
  const [purchased, setPurchased] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBuy = (productId: number) => {
    setPurchased(productId);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <div className="min-h-full bg-background p-6 md:p-10">
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
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Color circle display */}
              <div className="h-48 bg-gray-50 flex items-center justify-center">
                <div
                  className="w-32 h-32 rounded-full shadow-inner border-4 border-white"
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
                  <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                  <button
                    onClick={() => handleBuy(product.id)}
                    disabled={purchased === product.id}
                    className="bg-[#f29933] hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    <ShoppingCart size={18} />
                    {purchased === product.id ? 'Comprado ✓' : 'Comprar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Success Toast ──────────────────────────────────── */}
      {showSuccess && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#41b7a1] text-white px-8 py-4 rounded-xl shadow-2xl text-center font-semibold animate-bounce">
          🎉 ¡Compra simulada con éxito! Recibirás tu collar pronto.
        </div>
      )}
    </div>
  );
};

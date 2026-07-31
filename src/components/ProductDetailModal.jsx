import { useState } from 'react';
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';

export default function ProductDetailModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const sizes = ['S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    // Tambahkan variabel size ke objek produk
    addToCart({ ...product, selectedSize });
    setIsAdded(true);

    // Reset tombol kembali normal setelah 1.5 detik
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 1. Backdrop Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* 2. Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <div className="relative w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all my-8">
          
          {/* Tombol Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 p-2 text-zinc-400 hover:text-zinc-900 bg-white/80 backdrop-blur-md rounded-full transition-colors"
            aria-label="Close detail modal"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Column: Big Product Image */}
            <div className="relative aspect-[3/4] bg-zinc-100 overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-zinc-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  New Arrival
                </span>
              )}
            </div>

            {/* Right Column: Product Info & Actions */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Category & Rating */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full border border-amber-200">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-amber-900">{product.rating}</span>
                    <span className="text-xs text-amber-700">({product.reviews} reviews)</span>
                  </div>
                </div>

                {/* Title & Price */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight leading-snug">
                    {product.name}
                  </h2>
                  <p className="text-2xl font-black text-zinc-950 mt-2">
                    {formatCurrency(product.price)}
                  </p>
                </div>

                <hr className="border-zinc-100" />

                {/* Size Selector */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                      Select Size
                    </span>
                    <button className="text-xs text-zinc-500 underline hover:text-zinc-900">
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                            : 'border-zinc-200 text-zinc-700 hover:border-zinc-400 bg-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                    Description
                  </span>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Designed for everyday elegance, crafted with high-density breathable cotton for superior comfort. Tailored fit for modern street aesthetic.
                  </p>
                </div>
              </div>

              {/* Action Buttons & Value Props */}
              <div className="mt-8 space-y-4">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-white active:scale-98'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={18} /> Added to Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} /> Add to Bag • {selectedSize}
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-100 text-[10px] text-zinc-500 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Truck size={16} className="text-zinc-700" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck size={16} className="text-zinc-700" />
                    <span>Authentic 100%</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RefreshCw size={16} className="text-zinc-700" />
                    <span>30-Day Return</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
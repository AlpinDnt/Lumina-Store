import { ShoppingBag, Star } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';

// 1. Terima props onSelectProduct
export default function ProductCard({ product, onSelectProduct }) {
  const { name, price, category, imageUrl, rating, reviews } = product;
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-zinc-100 rounded-lg overflow-hidden group transition-all hover:border-zinc-200 hover:shadow-lg flex flex-col justify-between">
      
      {/* 2. Klik Gambar/Judul membuka Product Detail Modal */}
      <div 
        onClick={() => onSelectProduct(product)} 
        className="cursor-pointer"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-zinc-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              New
            </span>
          )}
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              {category}
            </span>
            <div className="flex items-center gap-1.5">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-semibold text-zinc-700">{rating.toFixed(1)}</span>
              <span className="text-xs text-zinc-400">({reviews})</span>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-zinc-900 line-clamp-2 group-hover:text-zinc-600 transition-colors">
            {name}
          </h3>
        </div>
      </div>

      {/* Footer Card: Price & Quick Add */}
      <div className="p-4 pt-0 flex items-center justify-between gap-4">
        <p className="text-lg font-bold text-zinc-950">
          {formatCurrency(price)}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation(); // Mencegah modal terbuka saat tombol Add to Cart diklik
            addToCart(product);
          }}
          className="flex items-center gap-2 bg-zinc-900 text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-zinc-700 transition-colors active:scale-95 cursor-pointer"
        >
          <ShoppingBag size={16} />
          Add to Cart
        </button>
      </div>

    </div>
  );
}
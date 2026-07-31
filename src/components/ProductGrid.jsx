import ProductCard from './ProductCard';

export default function ProductGrid({ products, onSelectProduct }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-zinc-200 rounded-2xl bg-white">
        <h3 className="text-lg font-semibold text-zinc-800">No products found</h3>
        <p className="text-zinc-500 mt-2 text-xs">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onSelectProduct={onSelectProduct} 
        />
      ))}
    </div>
  );
}